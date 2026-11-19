# Auditoría administrativa (`audit`)

Estado del 19 de noviembre de 2026. Implementados la API de consulta y exportación segura de `audit_logs` (`/api/v1/admin/audit`), la colección Bruno 34–36, pruebas contra PostgreSQL real y la interfaz operativa en `/admin/auditoria`.

## Principios y modelo de datos

- Usa la tabla existente `audit_logs` (`id`, `actorId`, `targetId`, `action`, `requestId`, `createdAt`), alimentada atómicamente en las transacciones de `auth`, `admins`, `events`, `media`, `inquiries` y `audit`.
- **Inmutable y solo lectura**: no existen rutas de creación, edición ni eliminación desde la API.
- **Sin datos sensibles**: no guarda ni expone contraseñas, tokens, secretos MFA ni correos electrónicos en las respuestas de auditoría.

## Contratos HTTP (`/api/v1/admin/audit`)

Requiere `Bearer`, cabecera `X-IPC-Client: admin`, origen válido y rol exclusivo **`admin`** (`admissions` y `events` reciben `403`). Todas las respuestas usan `Cache-Control: no-store`.

| Método y ruta | Comportamiento |
| --- | --- |
| `GET /api/v1/admin/audit` | Lista paginada (30 por página, más recientes primero). Filtros: `page`, `category` (`all\|auth\|admin\|event\|image\|inquiry\|audit\|content`), `actor` (`all\|system\|<uuid>`), `from` y `to` (`YYYY-MM-DD` interpretados en `America/Lima`; `422` si `from > to`), y `q` (busca por `action`, `requestId` o UUID de `targetId`/`actorId`). Enriquece `actor` y `targetAdmin` (`{ id, name, role, isActive }`) en lote sin exponer correos, y devuelve `total`, `pageSize`, `totalPages`, `hasMore`, `counts` por categoría y `serverTime`. |
| `GET /api/v1/admin/audit/actors` | Devuelve todas las cuentas (`{ id, name, role, isActive }`, activas e inactivas para trazabilidad histórica) sin exponer correos. |
| `GET /api/v1/admin/audit/export` | Exporta hasta 5,000 registros filtrados en CSV UTF-8 con BOM (`Content-Disposition: attachment; filename="auditoria-ipc.csv"`, `X-Content-Type-Options: nosniff`), neutralizando fórmulas peligrosas mediante `backend/src/infrastructure/csv.js` y registrando `audit.exported` en `audit_logs`. |

## Colección Bruno

Peticiones manuales en `backend/bruno/34-audit-list.bru`, `35-audit-actors.bru` y `36-audit-export.bru` (preparadas; ejecución manual en Bruno pendiente).
