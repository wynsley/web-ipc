# Consultas de admisión (`inquiries`)

Estado del 18 de noviembre de 2026. Completados los tres pasos del módulo: Paso 1 (modelo PostgreSQL/Prisma, API pública y privada, exportación CSV segura, colección Bruno 26–33 y pruebas automatizadas), Paso 2 (bandeja completa en `/admin/admision` con pestañas por estado, filtros combinables, toma atómica, asignación exclusiva de `admin`, notas internas y exportación CSV) y Paso 3 (conexión del formulario público de `frontend/` a `POST /api/v1/inquiries` con `Idempotency-Key`, validación relajada y retiro de FormSubmit).

## Modelo de datos

- `inquiries`: `id`, `name`, `email`, `phone`, `address`, `career` (`administracion | contabilidad | informatica | idiomas`), `shift` (`manana | tarde | noche`), `message`, `status` (`new | in_progress | resolved | archived`), `assignedToId` (FK opcional a `admins`, `ON DELETE SET NULL`), `idempotencyKey` (hash SHA-256 único opcional), `version`, `resolvedAt`, `createdAt`, `updatedAt`.
- `inquiry_notes`: `id`, `inquiryId` (FK a `inquiries`, `ON DELETE CASCADE`), `authorId` (FK opcional a `admins`, `ON DELETE SET NULL`), `authorName` (conserva atribución histórica), `body`, `createdAt`.
- Migración: `backend/prisma/migrations/20261119020351_add_inquiries/migration.sql`.

## Contratos HTTP

### Envío público

| Método y ruta | Comportamiento |
| --- | --- |
| `POST /api/v1/inquiries` | Público (`application/json`, máx. 16 KiB, `Cache-Control: no-store`). Valida los 7 campos con Zod: acepta cualquier dominio de correo válido (normalizado a minúsculas) y direcciones peruanas (`.`, `,`, `-`, `#`, `°`, `/`). Aplica límite anti-spam independiente del login (5 intentos/15 min por IP, 100 globales). Admite cabecera opcional `Idempotency-Key` (8–128 caracteres `[A-Za-z0-9._:-]+`): devuelve `201` al crear o `200` con `duplicate: true` en reintentos. Solo devuelve `{ id, status, createdAt }`, sin exponer notas internas. |
| `POST /contact` | Adaptador transicional montado sobre el mismo router de `inquiries`, sin duplicar lógica. |

### Gestión administrativa (`/api/v1/admin/inquiries`)

Requiere `Bearer`, cabecera `X-IPC-Client: admin`, origen válido y rol `admin` o `admissions` (`events` recibe `403`). Las mutaciones exigen además `X-CSRF-Token`.

| Método y ruta | Permisos | Comportamiento |
| --- | --- | --- |
| `GET /api/v1/admin/inquiries` | `admin`, `admissions` | Lista paginada (20/página, más recientes primero). Filtros: `page`, `status` (o `scope`: `all\|new\|in_progress\|resolved\|archived`), `career`, `shift`, `assigned` (`all\|unassigned\|mine\|<uuid>`), `q` (búsqueda en nombre, correo, teléfono y mensaje). Devuelve `inquiries`, `hasMore`, `total`, `pageSize`, `totalPages`, `serverTime` y `counts` por estado. |
| `GET /api/v1/admin/inquiries/assignees` | `admin`, `admissions` | Devuelve cuentas activas con rol `admin` o `admissions` (`{ id, name, role }`, sin correos ni cuentas `events`). |
| `GET /api/v1/admin/inquiries/export` | `admin`, `admissions` | Exporta hasta 5,000 filas filtradas en CSV UTF-8 con BOM (`Content-Disposition: attachment`, `Cache-Control: no-store`). Neutraliza fórmulas peligrosas (`=`, `+`, `-`, `@`, `\t`) anteponiendo `'` y registra `inquiry.exported` en `audit_logs` sin PII. |
| `GET /api/v1/admin/inquiries/:id` | `admin`, `admissions` | Detalle completo de la consulta con responsable asignado y notas internas en orden cronológico. |
| `POST /api/v1/admin/inquiries/:id/claim` | `admin`, `admissions` | Recibe `{ version }`. Toma atómicamente (`FOR UPDATE`) una consulta abierta y libre (`status` `new` o `in_progress`, `assignedToId === null`), la pasa a `in_progress` si estaba en `new` y responde `409` si ya fue tomada, está cerrada (`resolved`/`archived`) o cambió de versión. |
| `PATCH /api/v1/admin/inquiries/:id/assign` | Solo `admin` | Recibe `{ version, assigneeId }` (`uuid` o `null`). Asigna a una cuenta activa `admin`/`admissions` (`422` si es inactiva o `events`) o libera la asignación; si estaba en `new`, avanza a `in_progress`. |
| `PATCH /api/v1/admin/inquiries/:id/status` | `admin`, `admissions` | Recibe `{ version, status }`. Aplica la máquina de estados guiada (`inquiryLifecyclePolicy.js`): `new → in_progress\|archived`, `in_progress → resolved\|archived`, `resolved → in_progress\|archived`, `archived → in_progress`. Rechaza saltos inválidos (como volver a `new` o saltar de `new` a `resolved`) con `422 INVALID_STATUS_TRANSITION`, conflictos con `409` y gestiona `resolvedAt`. |
| `POST /api/v1/admin/inquiries/:id/notes` | `admin`, `admissions` | Recibe `{ body }` (1–1000 caracteres). Añade nota interna separada sin alterar el mensaje original (`201`). Si la consulta estaba en `new`, la avanza automáticamente a `in_progress` (y la asigna al autor si estaba libre) dentro de la misma transacción, devolviendo `autoAdvanced`, `autoAssigned`, `inquiryStatus` e `inquiryVersion`. |

## Auto-archivado y refresco de bandeja

- **Auto-archivado a los 30 días (`INQUIRY_ARCHIVE_DAYS=30`)**: `inquiryMaintenanceService.js` y el trabajo horario `backend/src/jobs/inquiryAutoArchive.js` archivan en lotes seguros (`FOR UPDATE SKIP LOCKED`) las consultas en estado `resolved` cuyo `resolvedAt` tenga al menos 30 días, conservando `resolvedAt`, incrementando `version` y registrando `inquiry.auto_archived` en `audit_logs` con `actorId: null` (sin PII).
- **Refresco automático en `/admin/admision`**: `useAutoRefresh` actualiza silenciosamente la bandeja cada 30 s cuando la pestaña está visible y al recuperar foco/conexión (pausado mientras hay una acción en curso o un panel de notas abierto), sin parpadeos y acompañado de un botón manual «Actualizar».
- **Canales directos, tiempos y densidad en `/admin/admision`**: filas compactas con adelanto de 1 línea y panel desplegable `InquiryDetailPanel`; botones directos a WhatsApp (`wa.me`) y compositor web de Gmail (`mail.google.com/mail/?view=cm&fs=1`, evitando `mailto:`/Outlook) visibles únicamente en estado `in_progress` (al pulsar «Tomar y atender» o «Reabrir seguimiento» la vista salta a *En seguimiento* con la ficha abierta); copiado rápido de correo/teléfono, tiempo transcurrido con alerta >24 h para `new` y cuenta regresiva de auto-archivado a 30 días en `resolved`.

## Auditoría y privacidad

- Todas las operaciones relevantes registran `inquiry.created`, `inquiry.claimed`, `inquiry.assigned`, `inquiry.status_changed`, `inquiry.note_added`, `inquiry.exported` e `inquiry.auto_archived` en `audit_logs` dentro de la misma transacción, sin almacenar datos personales en el registro de auditoría.
- No existe borrado automático por retención hasta que la institución apruebe el plazo y política definitiva (`resolvedAt` queda registrado para facilitarlo cuando se defina).

## Colección Bruno

Peticiones manuales con datos ficticios en `backend/bruno/26-inquiry-submit.bru` hasta `33-inquiries-export.bru` (preparadas; ejecución manual en Bruno pendiente).
