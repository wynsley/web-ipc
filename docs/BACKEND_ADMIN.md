# Backend y administración: punto de entrada

## Módulo de Auditoría (`/api/v1/admin/audit` y `/admin/auditoria`) — 19 de noviembre de 2026

- **API modular solo lectura (exclusiva para rol `admin`)**: creados `auditSchema.js`, `auditFilters.js`, `auditCsv.js`, `auditRoutes.js` y ampliado `auditRepository.js` en `backend/src/modules/audit/`, montados en `/api/v1/admin/audit` (`GET /`, `GET /actors`, `GET /export`). Extraída la utilidad compartida `backend/src/infrastructure/csv.js` (`safeCsvCell`, `formatCsv`, `formatLimaCsvDate`) reutilizada por `inquiryCsv.js` y `auditCsv.js`.
- **Enriquecimiento seguro e inmutabilidad**: enriquece actores y cuentas afectadas en lote sin exponer correos ni secretos, soporta filtros por módulo (`auth`, `admin`, `event`, `inquiry`, `image`, `audit`, `content`), actor (`all`, `system`, UUID), rango de fechas en `America/Lima` (`from`/`to`) y búsqueda (`action`, `requestId`, UUID). Exportación CSV con UTF-8 BOM, protección contra fórmulas, `Cache-Control: no-store` y registro de `audit.exported`. Sin rutas de escritura ni borrado.
- **Panel `/admin/auditoria`**: retirado `pending: true` en `workspaceAreas.js`; creados `services/audit.js`, `helpers/auditMeta.js` (catálogo en español con severidades para todas las acciones de la plataforma), `helpers/fileDownload.js` (compartido con Admisión), `hooks/useAuditManager.js` (con refresco automático `useAutoRefresh`), `auditTabs.jsx`, `auditFiltersBar.jsx`, `auditEntryRow.jsx` (trazabilidad desplegable con copia de `requestId`/`targetId`) y `auditPanel.jsx`.
- **Bruno y documentación**: peticiones manuales `backend/bruno/34-audit-list.bru`–`36-audit-export.bru` (no ejecutadas manualmente en Bruno) y contrato completo en [audit.md](backend/audit.md).
- **Paginación numerada compartida en el panel**: los listados administrativos (`GET /api/v1/admin/audit`, `/api/v1/admin/inquiries` y `/api/v1/admin/events`) ahora devuelven `total`, `pageSize` y `totalPages` exactos para los filtros activos. La nueva molécula reutilizable `admin/src/components/molecules/pagination.jsx` (apoyada en `admin/src/helpers/paginationRange.js` con pruebas en `admin/tests/paginationRange.test.js`) sustituye los botones simples en **Auditoría**, **Admisión** y **Eventos** por navegación numerada con indicador *Mostrando X–Y de Z*, botones directos hasta 10 páginas y puntos suspensivos con ventana activa y las 3 últimas páginas cuando hay más de 10.
- **Verificación**: `pnpm test:backend` (69/69 con PostgreSQL real, incluyendo la nueva suite `backend/tests/audit.test.js`), `pnpm test:admin` (9/9, incluyendo `auditMeta.test.js` y `paginationRange.test.js`), `pnpm test:frontend` (11/11), `pnpm lint` (0 errores en los 3 paquetes), `pnpm format:check:backend` y `pnpm build` (`frontend` y `admin`) en verde. Verificación visual en navegador pendiente con el servidor local.
- **Pendiente principal de V1**: módulo de **Contenido institucional (`/admin/contenido`)** (única área aún en preparación).

## Unificación del formulario de Admisión y mejoras operativas en `/admin/admision` — 19 de noviembre de 2026

- **Formulario público unificado (`frontend/`)**: [admissionsContactForm.jsx](../frontend/src/components/molecules/admissions/admissionsContactForm.jsx) usa ahora el mismo diseño oscuro `bg-blue-deep` con `ContactForm showSteps` que `ModalMessage` y `HomeMessage`. Se retiró la variante `appearance="light"` de `ContactForm`/`ContactSuccess` y se eliminaron las reglas CSS exclusivas de `.contact-form--light` en `frontend/src/index.css`.
- **Contacto directo en 1 clic sin Outlook (`admin/`)**:
  - `admin/src/helpers/inquiryContactLinks.js` normaliza celulares peruanos (`9XXXXXXXX` → `519XXXXXXXX`, conservando prefijos internacionales) para abrir WhatsApp (`https://wa.me/...`) y genera enlaces directos al compositor web de Gmail (`https://mail.google.com/mail/?view=cm&fs=1&...`, evitando `mailto:`/Outlook), ambos con mensaje sugerido editable que incluye nombre, carrera y turno.
  - Nueva molécula `inquiryQuickReplyButtons.jsx` (versión compacta en fila y completa en detalle) y botones de copiado rápido con confirmación para correo y teléfono en `inquiryDetailPanel.jsx`.
- **Tiempo transcurrido y alertas de urgencia**: `admin/src/helpers/inquiryElapsedTime.js` y `admin/src/hooks/useClockTick.js` muestran el tiempo transcurrido en cada fila (*Hace X min/h/días*, con fecha exacta de Lima en `title`) y resaltan consultas `new` con más de 6 h (aviso) o más de 24 h sin atender (`Sin atender > 24 h`, más contador en cabecera).
- **Mayor densidad visual, flujo estricto por etapa y modularización**: `inquiryCard.jsx` muestra una fila compacta de 2 líneas con acciones estrictamente acotadas a la etapa: **Nueva** solo muestra «Tomar y atender» + «Detalle» (al tomarla salta automáticamente a **En seguimiento** con la ficha desplegada para responder de inmediato); **En seguimiento** habilita los accesos directos de **WhatsApp** y **Gmail** junto a «Marcar como resuelta»; **Resueltas** vuelve a ocultar WhatsApp/Gmail y muestra el tiempo transcurrido desde la resolución más los días restantes para el auto-archivado de 30 días (`inquiryArchiveCountdown`); **Archivadas** muestra únicamente «Reabrir seguimiento» y «Detalle». Al reabrir desde *Resueltas* o *Archivadas* vuelve a enfocar la consulta desplegada en *En seguimiento*. El detalle completo, acciones de etapa y notas viven en `inquiryDetailPanel.jsx`, `inquiryActionsBar.jsx` e `inquiryNotesThread.jsx`, y `inquiryFiltersBar.jsx` se compactó a una sola barra en escritorio.
- **Pruebas y verificación**: añadida suite `admin/tests/inquiryHelpers.test.js` y script raíz `pnpm test:admin` (4/4 pruebas en verde), además de `pnpm lint` (0 errores en los 3 paquetes), `pnpm format:check:backend`, `pnpm test:frontend` (11/11), `pnpm test:backend` (68/68 con PostgreSQL real) y `pnpm build` (`frontend` y `admin`). Verificación visual en navegador pendiente con el servidor local.

## Admisión: flujo guiado, transiciones automáticas, auto-archivado (30 días) y refresco — 18 de noviembre de 2026

- **Máquina de estados en backend (`backend/src/modules/inquiries/inquiryLifecyclePolicy.js`)**: reemplaza el cambio libre de estados por transiciones válidas (`new → in_progress|archived`, `in_progress → resolved|archived`, `resolved → in_progress|archived`, `archived → in_progress`), rechazando saltos inválidos (`422 INVALID_STATUS_TRANSITION`, como volver a `new` o saltar directo `new → resolved`) y bloqueando `claim` sobre consultas cerradas (`409 INQUIRY_NOT_OPEN`).
- **Avance automático con primera nota (`inquiryRepository.js`)**: al añadir una nota interna a una consulta en `new`, avanza automáticamente a `in_progress` y la asigna al autor si no tenía responsable dentro de la misma transacción (`autoAdvanced`, `autoAssigned`, `inquiryVersion`).
- **Auto-archivado a los 30 días (`INQUIRY_ARCHIVE_DAYS=30`)**: `backend/src/modules/inquiries/inquiryMaintenanceService.js` y el trabajo periódico horario `backend/src/jobs/inquiryAutoArchive.js` (conectado al apagado limpio de `backend/src/index.js`) archivan en lotes atómicos (`FOR UPDATE SKIP LOCKED`) las consultas `resolved` con más de 30 días desde `resolvedAt`, registrando `inquiry.auto_archived` en `audit_logs`.
- **Interfaz guiada y modular en `admin/`**: retirado el `<select>` libre de 4 estados; extraído `components/molecules/admissions/inquiryActionsBar.jsx` con botones contextuales por etapa (`Tomar y atender`, `Marcar como resuelta`, `Archivar`, `Reabrir seguimiento`), avisos por pestaña (`INQUIRY_TAB_HINTS`), botón «Actualizar» y hook reutilizable `hooks/useAutoRefresh.js` (refresco silencioso sin parpadeo cada 30 s en pestaña visible, pausado con notas abiertas o acciones en curso).
- **Verificación**: `pnpm test:backend` (68/68 con PostgreSQL real, incluyendo la nueva suite de ciclo guiado, avance automático por nota y auto-archivado a 30 días), `pnpm test:frontend` (11/11), `pnpm lint` (0 errores en los 3 paquetes), `pnpm format:check:backend` y `pnpm build` en verde. Verificación visual en navegador pendiente con el servidor local.

## Admisión / Consultas (`inquiries`) — Paso 3 (Conexión del formulario público y retiro de FormSubmit) — 18 de noviembre de 2026

- **Envío directo a la API propia (`frontend/src/helpers/submitContact.js`)**: reemplaza el adaptador temporal FormSubmit por `POST /api/v1/inquiries` (mismo origen, `credentials: "omit"`, tiempo máximo de 15 s, comprobación de `data.id` y propagación estructurada de errores `422` por campo y `429` anti-spam).
- **Idempotencia y errores por campo (`frontend/src/hooks/globals/useContactForm.js`)**: genera y reutiliza una clave `Idempotency-Key` por borrador sin cambios para que los reintentos tras fallos de red no dupliquen consultas; la clave se renueva al editar campos o completar el envío. Los errores `422` devueltos por el servidor se muestran directamente en cada campo afectado.
- **Validación cliente alineada (`frontend/src/validations/validationCredentials.js`)**: acepta cualquier dominio de correo válido (retirada la restricción a `gmail`/`hotmail`/`yahoo`), nombres hasta 100 caracteres con tildes/apóstrofos/guiones, direcciones peruanas (`.`, `,`, `-`, `#`, `°`, `/`, hasta 200 caracteres), teléfonos de 9 a 15 dígitos y mensajes hasta 1000 caracteres.
- **Proxy de desarrollo y limpieza**: añadido `/api/v1/inquiries` al proxy de `frontend/vite.config.js`; retirados `sendContactEmail.js`, `sendContactEmail.test.js`, `contactConfig.js` y `apiFetch.js`; actualizado `frontend/.env.example` y marcado `docs/CONTACTO_TEMPORAL.md` como histórico.
- **Pruebas y verificación**: nueva suite `frontend/tests/submitContact.test.js` (5 pruebas cubriendo envío normalizado + `Idempotency-Key`, respuesta `200` idempotente, errores `422`/`429`, fallos de red y validación `ContactFormValidator`). `pnpm test:frontend` (11/11), `pnpm test:backend` (67/67 con PostgreSQL real), `pnpm lint` (0 errores en los 3 paquetes), `pnpm format:check:backend` y `pnpm build` (`frontend` y `admin`) en verde. Verificación visual/E2E en navegador pendiente con los servidores locales en marcha.

## Admisión / Consultas (`inquiries`) — Paso 2 (Panel `/admin/admision`) y pie de página público — 18 de noviembre de 2026

- **Bandeja completa en `/admin/admision`**: reemplazada la vista provisional (`admissionsSummaryCard.jsx` eliminada) y retirado el marcador `pending: true` del área `admision` en `admin/src/data/workspaceAreas.js`. `AdminApp` y `AreaPage` pasan `session.admin` a `AdmissionsPanel`.
- **Arquitectura modular en `admin/`**:
  - `services/inquiries.js`: cliente autenticado para listado paginado con filtros, responsables activos, detalle con notas, toma atómica (`claim`), asignación manual (`assign`), cambio de estado (`status`), nuevas notas internas (`notes`) y descarga de CSV (`export`) usando `authenticated` (renovación automática en 401).
  - `helpers/inquiryMeta.js`: etiquetas, variantes de insignia, opciones y textos vacíos en español.
  - `hooks/useInquiriesManager.js`: estado por pestaña (`Nuevas`, `En seguimiento`, `Resueltas`, `Archivadas`, `Todas`), filtros combinables (`career`, `shift`, `assigned`, búsqueda `q`), paginación, detalle desplegable con notas, recarga automática en conflictos `409` y protección contra pérdida de borradores mediante `useUnsavedChanges`.
  - Moléculas en `components/molecules/admissions/`: `InquiryTabs` (navegación por teclado y contadores), `InquiryFiltersBar`, `InquiryCard` (enlaces `mailto:`/`tel:`, mensaje de solo lectura, botón «Tomar consulta», selector de estado y selector de responsable visible solo para `admin` mientras la API sigue imponiendo `403`), e `InquiryNotesThread` (notas cronológicas de solo anexo con `useDraftGuard`).
  - `components/organisms/admissions/admissionsPanel.jsx`: coordina cabecera con botón «Exportar CSV» (aplica los filtros activos), pestañas, filtros, avisos, listado y paginación.
- **Corrección visual en el pie público (`frontend/src/components/molecules/footer/footerBrand.jsx`)**: corregida la superposición del logo Q10 sobre el logo IPC en la columna estrecha del footer (`lg:grid-cols-4`), usando ancho fluido `min-w-0 flex-1 max-w-44` para el logo IPC y ancho proporcional `w-16 sm:w-20 lg:w-14 xl:w-20 shrink-0` para Q10.
- **Verificación**: `pnpm lint` (`backend`, `frontend` y `admin` con 0 errores), `pnpm format:check:backend` correcto, `pnpm test:frontend` (9/9), `pnpm test:backend` (67/67 con PostgreSQL real) y `pnpm build` (`frontend` y `admin`) correctos. Verificación visual en navegador pendiente de ejecutar con el servidor local.
- **Pendiente inmediato**: Paso 3 (conectar `submitContact` en `frontend/` a `POST /api/v1/inquiries` con `Idempotency-Key`, relajar `validationCredentials.js` para cualquier dominio válido y direcciones peruanas, configurar proxy dev y retirar FormSubmit temporal).

## Admisión / Consultas (`inquiries`) — Paso 1 (Backend, BD, pruebas y Bruno) — 18 de noviembre de 2026

- **Esquema y migración**: creada y aplicada `20261119020351_add_inquiries` (`InquiryStatus`, `inquiries` e `inquiry_notes`) en desarrollo y pruebas, con `version` para concurrencia optimista, `idempotencyKey` único opcional, `resolvedAt` e índices por estado/responsable/carrera/fecha.
- **Módulo modular `backend/src/modules/inquiries/`**: `inquirySchema.js`, `inquiryFilters.js`, `inquiryCsv.js`, `inquiryRepository.js` e `inquiryRoutes.js`. Montado en `POST /api/v1/inquiries`, adaptador transicional `POST /contact` y gestión privada `/api/v1/admin/inquiries/*` (roles `admin` y `admissions`; asignación manual exclusiva de `admin`, toma atómica de consultas libres para ambos, notas internas separadas, filtros, conteos y exportación CSV segura contra *Formula Injection* con auditoría sin PII).
- **Anti-spam e idempotencia**: `throttlePublicInquiry` (5/15 min por IP, 100 globales) aislado de auth y medios; cabecera `Idempotency-Key` soporta reintentos concurrentes sin duplicar registros.
- **Documentación y Bruno**: contrato completo en [inquiries.md](backend/inquiries.md) y 8 peticiones en `backend/bruno/26-inquiry-submit.bru`–`33-inquiries-export.bru` (preparadas, no ejecutadas manualmente en la aplicación Bruno).
- **Verificación**: 67/67 pruebas del backend en verde con PostgreSQL real (incluyendo envío público, adaptador `/contact`, idempotencia concurrente, anti-spam aislado, roles `admin`/`admissions`/`events`, toma atómica concurrente, asignación exclusiva de `admin`, estados/`resolvedAt`, notas internas, filtros y exportación CSV con protección contra fórmulas), ESLint y Prettier en verde, y 13 migraciones al día en desarrollo y pruebas.
- **Pendiente inmediato**: Paso 2 (bandeja de Admisión en `admin/`) y Paso 3 (conectar `submitContact` en `frontend/` a `POST /api/v1/inquiries`, relajar `validationCredentials.js` y retirar FormSubmit temporal).

## Rediseño compacto y expiración automática de avisos en `/events` — 18 de noviembre de 2026

- **Franja compacta + modal «Ver todos»**: `EventNotices` ahora muestra una barra institucional de altura fija (`EventNoticeCard` en modo compacto) con navegación 1-a-1 (`< 1 / N >`), resumen por estado y botón «Ver todos» hacia `EventNoticesModal` (con filtros por tipo, trampa de foco y cierre con Escape). Además, `EventsShowcase` muestra la insignia «Horario actualizado» en la tarjeta del evento reprogramado.
- **Expiración automática de avisos públicos (`visibleEventNotices` / `noticeExpiresAt`)**: los avisos de eventos reprogramados se ocultan automáticamente al finalizar el evento; los cancelados se mantienen 24 horas después de su finalización programada y luego se ocultan solos; los pospuestos sin nueva fecha se mantienen hasta 7 días después de su fecha original (sin borrar registros ni historial en BD ni en el panel). `nextLifecycleBoundary` programa el ocultamiento exacto sin recargar la página.
- **Verificación**: `pnpm test:frontend` (9/9 pruebas en verde), `pnpm --filter frontend lint` (0 errores) y `pnpm --filter frontend run build` correcto. Verificación visual en navegador pendiente de ejecutar con el servidor local.

## Optimización de medios, modularización, ESLint en admin e higiene — 18 de noviembre de 2026

- **Modularización**: `backend/src/modules/events/eventFilters.js` separa la lógica pura de filtros y cortes en hora de Lima de `eventRepository.js`. En `admin/`, `eventsPanel.jsx` (503 → ~130 líneas) se dividió en `hooks/useEventsManager.js`, `components/molecules/events/eventCard.jsx` y `helpers/eventDates.js` (centralizando los formateadores `America/Lima` compartidos con `eventForm`, `eventScheduleForm` y `eventHistory`). `context/unsavedChangesContext.js` separa contexto y hooks del proveedor para Fast Refresh.
- **ESLint en `admin/` y scripts raíz**: configurado `admin/eslint.config.js` y `"lint": "eslint ."` en `admin/package.json`; resueltos los 12 errores y 1 advertencia detectados (`0` errores en los 3 paquetes). Añadidos `pnpm lint`, `pnpm lint:frontend`, `pnpm lint:admin`, `pnpm test:frontend` (incluyendo `sendContactEmail.test.js`) y `pnpm build` (compila `frontend` y `admin`).
- **Higiene de Git y formato**: añadidos `admin/dist/`, `admin/.vite/`, `admin/.env` y `admin/node_modules/` a `.gitignore`, retirado `admin/dist/` del índice de Git (`git rm --cached`), ignorados `.agents/`, `.claude/` y `.local/` en `backend/.prettierignore` (`pnpm format:check:backend` en verde), y renombrado `frontend/src/data/home/ agreements.js` a `agreements.js`.
- **Sitio público**: convertidos los 8 PNG grandes en uso a WebP con transparencia conservada (`13.87 MB → 0.79 MB`, -94.3%), migradas las 15 etiquetas `<img>` pendientes al átomo compartido `Image`, y añadida ruta comodín 404 (`NotFoundPage`).
- **Verificación**: `pnpm lint` (0 errores en `backend`, `frontend` y `admin`), `pnpm format:check:backend` correcto, `pnpm test:frontend` (8/8), `pnpm test:backend` (65/65 con PostgreSQL real) y `pnpm build` (`frontend` y `admin`) correctos; comprobada la ausencia de etiquetas `<img>` fuera de `atoms/image.jsx`. Verificación visual en navegador pendiente de ejecutar con el servidor local.

## Pestañas y borrado de borradores en Eventos — 18 de noviembre de 2026

- **Organización por pestañas en el panel y API**: `GET /api/v1/admin/events` admite el parámetro opcional `scope` (`published`, `drafts`, `past`, `all`; `all` por defecto) y devuelve `data.counts` (`{ published, drafts, past, all }`) con partición exacta y consistente con la zona `America/Lima` (incluidos registros heredados sin `endsAt`). El panel organiza la agenda en **Publicados**, **Borradores**, **Finalizados** y **Todos** mediante `EventTabs`, con contadores por pestaña y navegación por teclado. Al crear un borrador cambia automáticamente a la pestaña **Borradores**.
- **Eliminación definitiva de borradores (Opción B)**: añadido `DELETE /api/v1/admin/events/:id` (roles `admin` y `events`, requiere Bearer, CSRF y `{ version }`, responde `204`). Solo permite eliminar eventos en borrador (`published: false`); los eventos publicados o finalizados deben retirarse primero a borrador (`409` en caso contrario o ante concurrencia). Registra `event.deleted` en `audit_logs` dentro de la misma transacción; las imágenes que queden sin referencias pasan a la limpieza automática tras el plazo de retención. Confirmación en línea en el panel mediante `EventDeleteConfirm` y petición manual en `backend/bruno/25-event-delete.bru`.
- **Verificación**: 65 pruebas del backend en verde con PostgreSQL real (incluyendo filtros `published`/`drafts`/`past`/`all`, registros heredados sin `endsAt`, permisos, concurrencia `DELETE`/`publish` y auditoría `event.deleted`), ESLint/Prettier del backend en verde y compilación de `admin` correcta. Verificación visual en navegador pendiente de ejecutar con el servidor local.

## Correcciones críticas de eventos, medios y rendimiento — 18 de noviembre de 2026

- **Medios públicos con ETag y límite independiente**: `GET /api/v1/media/:id` ahora responde `Cache-Control: public, no-cache`, `ETag` y `304 Not Modified` para imágenes de eventos publicados (evitando re-descargar bytes mientras respeta `404` inmediato al retirar la publicación) y conserva `private, no-store` para borradores. `POST /api/v1/admin/images` usa su propio contador de intentos (`throttleMediaUpload`), independiente del límite de login/MFA.
- **Borradores sin aviso público falso**: editar fechas de un borrador por `PATCH` mantiene el registro `draft_dates` en el historial privado, pero ya no asigna `scheduleNotice`, `previousStartsAt` ni `previousEndsAt` públicos.
- **Agenda pública y carrusel sin re-descargas por segundo**: `usePublishedEvents` reemplaza el `setInterval` de 1 s por un temporizador al próximo cambio de inicio/fin (`nextLifecycleBoundary`) y preserva referencias si el sondeo no trajo cambios; `useCountdown` y `EventsShowcase` usan el reloj sincronizado con el servidor; `useCarousel` precarga cada URL única una sola vez.
- **Lint y carga inicial del sitio público**: resueltos los 14 errores de ESLint en `frontend` (`0` errores) y aplicado *code-splitting* por ruta y carga diferida de `PdfViewerModal` (chunk inicial de JS reducido de 1,542 kB a 550 kB; 174.7 kB gzip). Quedan pendientes comprimir los 8 PNG grandes de `frontend/src/assets`, añadir ESLint a `admin/` y sacar `admin/dist/` de Git.
- **Verificación**: 64 pruebas del backend en verde con PostgreSQL real, ESLint y Prettier de `backend/src|tests|scripts` en verde, ESLint de `frontend` con 0 errores, 5 pruebas de ciclo temporal/calendario + 3 pruebas de contacto en verde y compilación de `frontend` correcta.

## Cambios de horario y situación — 18 de noviembre de 2026

Implementadas reprogramación, posposición sin fecha y cancelación con acciones explícitas en API/admin. status (scheduled/postponed/cancelled) es independiente de published. Reprogramar conserva identidad y publicación, valida el intervalo y reactiva un pospuesto/cancelado con confirmación. En curso/finalizado se calculan con las fechas. El motivo de la acción se muestra públicamente cuando el evento está publicado; la interfaz lo advierte antes de guardar.

El historial privado conserva snapshots antes/después, acción, motivo, autor y momento. Cambio, historial y auditoría se confirman juntos, con bloqueo de fila y control de versión. Las correcciones de fechas en borradores también dejan historial. No se reconstruye el historial anterior a la migración. La API rechaza repetición de cancelación/posposición y cambios concurrentes obsoletos. Las acciones requieren rol admin/events y CSRF; el historial es paginado y no se expone en la API pública.

La web muestra «Cambios en la agenda» con horario anterior/nuevo y avisos. Pospuestos y cancelados permanecen visibles como avisos pero se excluyen de destacados, cuenta regresiva, galería y exportaciones de calendario. Reprogramar fechas pasadas o futuras reclasifica el evento automáticamente. Las descargas y enlaces a calendarios avisan que son copias sin actualización automática; no hay suscripción de calendario ni notificaciones externas.

Reglas en eventSchedulePolicy.js, escritura de historial en eventChangeRepository.js, formularios e historial administrativo separados. Bruno 21–24 documenta acciones y consulta; variables eventChangeReason, eventStart y eventEnd. Migración aplicada en desarrollo y pruebas, conservando existentes como scheduled.

Verificación: 62 pruebas del backend y cuatro del ciclo temporal/calendarios aprobadas; ESLint de backend y archivos públicos modificados correcto; compilaciones admin/web correctas. Edge con Hono y PostgreSQL de pruebas verificó reprogramación publicada, avisos, aplazamiento, confirmación de cancelación, recuperación al histórico, cuatro entradas de historial y formulario móvil de 390 px. La colección Bruno está preparada, no ejecutada en la aplicación. Persiste el aviso previo del tamaño del bundle público.


## Historial automático y medios — 18 de noviembre de 2026

Actualización vigente que sustituye los pendientes anteriores de almacenamiento, limpieza y actualización de la agenda. El usuario confirmó que todos los eventos publicados finalizados pasan a «Revive nuestros eventos» y que las imágenes externas deben poder proceder de cualquier proveedor mediante URL HTTPS.

El panel incorpora finalización en hora de Lima; la API valida endsAt > startsAt y conserva compatibilidad con entradas anteriores sin endsAt. Los registros antiguos sin finalización se consideran vigentes hasta terminar el día de inicio en Lima. La web separa vigentes e históricos; los finalizados salen del carrusel/destacados y aparecen en la galería con la misma foto del evento, título y datos. No se genera automáticamente un álbum de fotografías nuevas. El histórico conserva la publicación y aparece también en el calendario; retirarlo lo oculta de todas las secciones públicas. La galería permite cargar más de 20 registros y reutiliza Image para sus fotos y visor, incluidos los fallbacks institucionales.

La colección publicada se consulta cada 15 segundos mientras la página está visible y al recuperar foco/conexión; hay cancelación, límite de espera y retroceso ante fallos. La clasificación temporal se recalcula cada segundo usando el reloj de la API como referencia. Se conservan los últimos datos con aviso cuando falla una actualización. No se implementó SSE.

Los archivos subidos se almacenan en backend/.local/media (MEDIA_DIRECTORY configurable); PostgreSQL conserva los metadatos. La API privada/pública y las URLs permanecen iguales. Migración aplicada en desarrollo y pruebas; dos imágenes existentes migradas tras verificar igualdad de bytes. Los enlaces externos no se descargan ni se restringen a una lista de proveedores. La limpieza horaria mantiene cualquier referencia de evento, incluidos borradores e históricos, espera siete días sin uso (MEDIA_RETENTION_DAYS), coordina asociaciones concurrentes y reintenta errores de eliminación. Comandos y respaldo: [Medios](backend/media.md).

Verificación: 61 pruebas del backend y dos pruebas del ciclo temporal aprobadas; ESLint del backend y archivos públicos modificados correcto; ambas compilaciones correctas. Edge con Hono/PostgreSQL aislado verificó fecha final inválida, subida local, paso automático al histórico, retirada por actualización periódica, URL externa y fallback al fallar, foco del visor y navegación por teclado, móvil 390 px y pausas manuales. Se revisó captura de la galería. No se realizó prueba con lector de pantalla nativo ni teléfono físico; la comprobación de roles/foco no equivale a esa prueba. Persiste el aviso previo de tamaño del bundle público.

No se ha contratado ni configurado un proveedor remoto porque el usuario aún no ha elegido uno. La carpeta local debe ser persistente y respaldarse junto con PostgreSQL. Se mantienen las restricciones previas de despliegue a producción.


Actualización del 17 de noviembre de 2026. El formulario de Eventos incorpora «Destacar evento». El campo featured es booleano, opcional en entradas de API y falso por defecto para eventos existentes. La sección de destacados consume los eventos publicados marcados; se oculta si no hay ninguno. Para cambiar la selección de una publicación se retira, edita y publica nuevamente. Se verificaron 58 pruebas del backend, lint, ambas compilaciones y en Edge el filtrado, la tarjeta única, el fondo sin foto y la sección vacía con datos simulados.


Actualizado: 16 de noviembre de 2026, America/Lima.

## Cierre funcional de eventos e imágenes — 18 de noviembre de 2026

El formulario detecta cambios en campos, foto y encuadre. Confirma antes de cancelar, cambiar de ruta o cerrar sesión voluntariamente; la recarga y salida del documento usan el aviso nativo del navegador. Durante el guardado se bloquea el formulario y la navegación interna y se muestra «Guardando…». No hay autoguardado: una sesión vencida o revocada sigue cerrándose por seguridad y el navegador puede omitir beforeunload en determinados cierres móviles.

La protección compartida vive en context/unsavedChanges.jsx; main.jsx usa createBrowserRouter y RouterProvider para habilitar useBlocker, conservando las rutas de AdminApp. La validación del formulario está en helpers/eventFormErrors.js. Field y TextareaField admiten errorMessage, asociado con aria-describedby y aria-invalid. Se enfoca el primer campo inválido; errores generales enfocan el aviso. Retirar una publicación requiere confirmación y conserva el evento como borrador.

Verificación: 59 pruebas de regresión del backend aprobadas y ESLint correcto; compilaciones de admin y frontend correctas (persiste el aviso de tamaño del bundle público). Edge con Hono y PostgreSQL de pruebas verificó validaciones locales, foco, cancelación de salida por cancelar/navegar/logout/recarga, bloqueo durante el envío, subida local real, recuperación privada tras recargar, persistencia del encuadre, publicación en carrusel y destacados, retiro y edición. Un 422 por campo se inyectó en el navegador para comprobar su presentación y el reintento; las demás operaciones del recorrido usaron la API real. Se comprobó teclado en el zoom, ausencia de desbordamiento y captura visual a 390 px. No se realizó prueba con lector de pantalla ni dispositivo móvil físico.

Pendientes posteriores: retención y limpieza de imágenes sin referencias, almacenamiento externo según infraestructura y actualización de la agenda sin recarga. El cierre corresponde al flujo funcional de eventos e imágenes, no a toda V1 ni a una certificación integral de accesibilidad.

## Revisión de interfaz — 18 de noviembre de 2026

Se consultaron las skills instaladas `design-taste-frontend` y `web-design-guidelines`. En el editor de imágenes del admin se incorporó el átomo `Slider`, reutilizado para zoom y posiciones, con foco visible y área de interacción mínima de 44 px. Se reutiliza `Label`, se identifican el grupo de formatos y los valores de los deslizadores para tecnologías de asistencia, y el zoom muestra dos decimales para reflejar su paso de 0,05. Los botones de formato, quitar, restablecer y selección local tienen al menos 44 px de altura. Se conserva el diseño institucional; las recetas de landing pages de Taste no se aplican al formulario administrativo. Compilación del admin y formato correctos. Pendiente: comprobación visual y con lector de pantalla de estos ajustes; esto no constituye una auditoría integral del panel ni de la web pública.

## Encuadre de imágenes

El panel permite mover y acercar la foto desde la vista previa. ImageCropEditor es el componente de interacción y el átomo Image aplica el encuadre en el carrusel y destacados. Los valores se guardan como imageCrop y los eventos anteriores reciben encuadre centrado. [Contrato](backend/events.md).

## Imágenes de eventos

El formulario usa un selector segmentado «URL» / «Desde el equipo», con el campo correspondiente y vista previa. Conserva cada selección al alternar. EventImageField compone la interfaz, LocalImageInput valida la selección local y useImagePreview administra la carga privada y las URLs temporales. Compilación y comprobación en Edge móvil correctas. Los archivos se normalizan a WebP y se guardan en PostgreSQL; su acceso público depende de que un evento publicado los utilice. Pruebas y contratos en [Eventos](backend/events.md). Se verificaron 59 pruebas, ambas compilaciones y las vistas previas en Edge con respuestas controladas.

## Eventos

La agenda ya permite crear y editar borradores, publicar y retirar eventos con los roles admin y events. La web consulta la lista publicada al abrir `/events`. Pasaron las 58 pruebas del backend y ambas compilaciones. En Edge se verificó el recorrido de borrador privado, publicación y retiro con Hono y PostgreSQL de pruebas. El carrusel y el calendario ya consumen las publicaciones. El formulario permite añadir la URL HTTPS de la foto y cuatro puntos destacados opcionales. En Edge con datos simulados se comprobó la navegación entre eventos de distintas páginas de la API, la apertura del calendario y la agenda vacía. [Contrato y alcance](backend/events.md).

## Organización del código

Refactorización del módulo de imágenes (17 de noviembre de 2026): `imageRoutes.js` conserva multipart, cabeceras, middleware y respuestas HTTP; `imageService.js` coordina validación, normalización y permisos de lectura/subida; `imageRepository.js` concentra las consultas Prisma y la transacción que guarda imagen y auditoría. `app.js` compone sus dependencias. Se mantienen los contratos, el almacenamiento en PostgreSQL y la visibilidad pública solo cuando un evento publicado utiliza la imagen. Verificado: 59 pruebas del backend aprobadas, ESLint y formato correctos. Pendientes de medios: limpieza de archivos sin referencias y evolución del almacenamiento según infraestructura; esta refactorización no los implementa.

En la API, `authRoutes.js` monta el middleware del módulo y los routers de credenciales, cuentas y recuperación bajo el prefijo existente. Cada router declara los permisos y el CSRF de sus acciones. Los esquemas de entrada están en `authSchema.js`. Los servicios coordinan las operaciones y los repositorios conservan los bloqueos y escrituras que deben confirmarse juntos. El enrolamiento y la renovación de códigos usan el mismo generador. La recuperación asistida y el comando excepcional del único administrador comparten la generación, el hash y el vencimiento del código de restablecimiento.

En el panel, `main.jsx` monta React y el router. `adminApp.jsx` elige las vistas y `hooks/useAdminSession.js` conecta React con la restauración y los avisos de sesión. Los formularios para cambiar contraseña, regenerar códigos y asistir a otra cuenta declaran sus propios campos y resultados. Comparten `ReauthenticationForm` para las credenciales, el envío y los errores. Las solicitudes de recuperación y las de gestión de cuentas se encuentran en `services/accountRecovery.js` y `services/accounts.js`.

Verificación del 16 de noviembre: 57 pruebas con PostgreSQL, lint del backend y compilación del panel. En Edge con respuestas simuladas se comprobaron la descarga de códigos, la emisión asistida, la discrepancia de contraseñas, el cierre tras el cambio y el canje de un código desde el acceso.

## Panel visual

Revisión del 16 de noviembre de 2026. En el primer enrolamiento MFA se pueden descargar los diez códigos de recuperación como archivo de texto antes de confirmar que se guardaron. La API conserva sus hashes de un solo uso. Desde el escritorio se pueden regenerar los diez códigos y cambiar la contraseña con reautenticación. En Cuentas, otro administrador verifica la identidad del titular y emite un código breve para recuperar contraseña o reemplazar también el autenticador. El titular lo canjea en «Recuperar cuenta». El procedimiento excepcional para el único administrador activo y los cuatro contratos están en [la guía MFA](backend/mfa.md).

En desarrollo y en la vista previa de Vite, abrir `/admin` redirige automáticamente a `/admin/` y conserva los parámetros de consulta.

El panel React/Vite en `admin/` usa ahora Tailwind CSS v4 (`@tailwindcss/vite`) y `tailwind-merge`, alineado con el sitio público: `admin/src/index.css` conserva únicamente `@import "tailwindcss"`, `@source` hacia el átomo `Image` compartido, `@font-face` (`Poppins` y `Rajdhani`) y `@theme` con los tokens institucionales (`blue`, `blue-light`, `blue-dark`, `blue-deep`, `orange`, `ink`, `muted`, `line`, `surface`, `soft`, `accent`, `focus`, `font-poppins` y `font-hani`), mientras que todos los estilos de páginas y componentes se aplican con utilidades de Tailwind. En `admin/src/components/atoms/` se incorporaron átomos reutilizables con variantes, tamaños y `twMerge` siguiendo el contrato de la web pública: `Button`, `IconButton`, `Badge`, `Code`, `Input`, `Select` (con `options` o `children` y flecha `FiChevronDown`), `Textarea`, `Label`, `Title` (`h1`–`h6` o `as="strong"`), `Paragraph` (`p`, `span` o `strong`) y `Link` (unificado para enlaces internos de React Router con `to` y `nav`, o enlaces `href`). Las moléculas y organismos reutilizables (`Field`, `PasswordField` con icono de ojo para mostrar/ocultar contraseña, `SelectField`, `TextareaField`, `StatusBanner`, `AreaCard`, `Brand`, `SidebarNav` vertical a la izquierda, `RoleRoute` y `WorkspaceDashboard`) permanecen en la raíz de `molecules/` y `organisms/`, mientras que las piezas específicas de cada rol o flujo se organizan en subcarpetas (`auth/`, `admin/`, `admissions/` y `events/`). En el enrolamiento MFA, `AuthenticatorSetup` y `renderQrWithLogo.js` generan el QR con corrección de errores alta (`errorCorrectionLevel: "H"`) e incrustan el logo institucional del IPC (`@ipc/logo`) en el centro.

El panel permite activar cuentas pendientes desde la pantalla de acceso mediante «Activar cuenta con código» (`POST /api/v1/auth/activate`, con código de un solo uso y contraseña de 15 a 128 caracteres confirmada antes de enviar) y envía correo y contraseña a la API para iniciar sesión. Un 202 abre la configuración del autenticador mediante QR o clave manual o la pantalla de código según `enrollmentRequired`. La verificación acepta TOTP y, para cuentas ya configuradas, un código de recuperación. El escritorio muestra el nombre y el rol devueltos por la API después del 200. En el primer acceso, el usuario debe confirmar que guardó sus diez códigos antes de entrar.

Para probarlo localmente, usar `pnpm dev` y abrir http://localhost:5174/admin/. Vite reenvía las solicitudes de autenticación a 127.0.0.1:3000 conservando el origen. Si el archivo local `backend/.env` define el origen anterior, cambiarlo a `ADMIN_ORIGIN=http://localhost:5174` y reiniciar la API. `pnpm dev:admin` inicia solo el panel; el login necesita también la API y su PostgreSQL configurado.

Se verificó la compilación con `pnpm build:admin`. En Edge se probó la distribución compilada con Hono y PostgreSQL local en `ipc_backend_auth_test`, usando cuentas temporales. Se cubrieron el código incorrecto seguido de un reintento válido, el enrolamiento, la confirmación de los diez códigos, el escritorio con el rol de la cuenta, el acceso posterior por TOTP y la recuperación con rechazo de un código ya usado. También se comprobó el retorno al acceso ante un 429 real y al adelantar el reloj del navegador hasta el vencimiento del desafío.

En la prueba del QR, un lector independiente decodificó una captura del panel en Edge. El secreto leído coincidió con la clave manual y el código TOTP generado a partir del QR completó el enrolamiento contra Hono y PostgreSQL. La prueba posterior con la misma cuenta confirmó que el QR solo aparece en el primer acceso. Queda por probar el escaneo físico con Authy en un teléfono.

La sesión del panel se modularizó en `admin/src/services/session/` en archivos pequeños por responsabilidad: recupera la sesión al recargar con `GET /api/v1/auth/csrf` y `POST /api/v1/auth/refresh`, mantiene el JWT en memoria y el refresh en su cookie HttpOnly, y conecta el botón «Cerrar sesión» del encabezado a `POST /api/v1/auth/logout`. Las renovaciones y el cierre se coordinan entre pestañas con Web Locks (`navigator.locks`) y `BroadcastChannel`, con un SharedWorker que ejecuta las solicitudes de refresh y logout en serie cuando falta Web Locks, para evitar reutilizar un refresh consumido. Durante el primer enrolamiento MFA, `RecoveryCodes` activa una advertencia `beforeunload`, permite copiar los diez códigos y `recoveryPending.js` impide que recargar antes de confirmar el guardado abra el escritorio a ciegas (revocando la sesión incompleta y mostrando aviso en el acceso). El JWT solo se renueva cuando hay actividad del usuario dentro de la ventana vigente o al retomar el trabajo antes de los 30 minutos de inactividad, de modo que una pestaña olvidada no mantiene viva la sesión en segundo plano; al vencer realmente la sesión, el panel vuelve al acceso mostrando el aviso de vencimiento.

El panel incorpora `react-router-dom` (`BrowserRouter` con `basename="/admin"`) y el guardia `RoleRoute`: las tres cuentas (`admin`, `admissions` y `events`) inician sesión por el mismo flujo de acceso y MFA, y el escritorio filtra tanto las tarjetas y la barra de navegación como las rutas por rol (`/cuentas`, `/contenido` y `/auditoria` para `admin`; `/eventos` para `admin` y `events`; `/admision` para `admin` y `admissions`), redirigiendo a `/admin` cualquier intento de abrir una ruta no permitida en el cliente (mientras la API sigue siendo la autoridad con 401/403). Para el rol `admin`, incluye la sección «Cuentas e invitaciones» conectada a `POST /api/v1/auth/register` (ofreciendo únicamente los roles Admisión y Eventos en el formulario) y `POST /api/v1/auth/activation/reissue` con Bearer + CSRF, mostrando el código de activación de un solo uso únicamente en memoria con opción de ocultarlo y volver a mostrarlo. En `backend/bruno/` (`01-activate.bru`, `04-register.bru` y `05-reissue.bru`) se sustituyeron los valores literales por variables del entorno privado (`{{activationToken}}`, `{{password}}`, `{{newName}}`, `{{newEmail}}` y `{{newRole}}`). Se verificó en Edge contra Hono y `ipc_backend_auth_test` el ciclo completo, incluidas la recarga antes de confirmar códigos de recuperación, la coordinación de dos pestañas sin `navigator.locks` y las redirecciones por rol en React Router.

## Estado real

MFA TOTP obligatorio implementado el 4 de noviembre. Login ahora devuelve 202 con desafío temporal; POST /mfa/verify entrega JWT/refresh tras segundo factor. Cifrado independiente, anti-replay y códigos de recuperación de un solo uso. Contrato vigente: [mfa.md](backend/mfa.md).

Retirada la ruta POST / de demostración el 30 de octubre; responde 404. GET / se conserva como comprobación básica del servidor.

Registro por invitación, activación, permisos y logout implementados. El usuario pidió expresamente JWT + refresh rotativo para el curso el 30 de octubre: access JWT HS256 de diez minutos, refresh opaco HttpOnly con historial de hashes en Prisma y revocación ante reutilización. Las sesiones/familias siguen venciendo tras treinta minutos inactivas u ocho horas absolutas. JWT se envía como Bearer y también se comprueba la familia en BD.

Migración jwt_refresh_rotation aplicada: añade refresh_tokens, retira tokenHash de sessions y revoca las sesiones del formato previo. Cuentas y contraseñas conservadas; se requiere nuevo login. JWT_SECRET generada privadamente en .env; comando auth:key para otros equipos. No mostrar ni versionar secretos.

POST /refresh y GET /csrf añadidos; logout funciona con cookie + CSRF incluso sin JWT vigente. Bruno actualizado con variables de ejecución para JWT/CSRF y cookie jar para refresh. Los valores personales que estaban en peticiones compartidas se trasladaron a environments/local.bru, ignorado por Git.

MFA implementado por petición del usuario; producción sigue bloqueada por revisión de despliegue y recuperación operativa. Guía vigente y contratos: [authentication.md](backend/authentication.md). Esta elección de JWT reemplaza las recomendaciones anteriores de sesiones opacas sin refresh en referencias históricas de la skill.

## Decisiones

Confirmado: IPC exclusivo; tres roles admin/admissions/events; correo/contraseña, MFA, auditoría, eventos/medios, todo contenido institucional editable con preview/historial y consultas. Sin registro público, inscripciones, asistencia ni integración Q10 en V1.

Confirmado: JS moderno con async/await, sin TS/JSDoc. Código inglés, textos/docs español, docs separados. ES6 no significa ES2015 estricto.

Base actual: Hono/Node + PostgreSQL/Prisma + Zod, monolito modular; admin/ como app en /admin y API /api/v1; JWT con refresh rotativo y familias revocables, TOTP implementado y SSE previsto. Hosting pendiente, sin obligación Cloudflare.

Objetivo: semana del 20 de diciembre de 2026 (aproximada), tres integrantes, etapas. API/Bruno antes de UI.

## Guía y referencias

- [Skill IPC backend/admin](skills/ipc-backend-admin/SKILL.md)
- [Alcance, roles y pendientes](skills/ipc-backend-admin/references/scope.md)
- [Arquitectura y contratos propuestos](skills/ipc-backend-admin/references/architecture.md)
- [Seguridad y operación](skills/ipc-backend-admin/references/security.md)
- [Etapas, equipo y continuidad](skills/ipc-backend-admin/references/workflow.md)
- [Revisión del proyecto docente correcto](skills/ipc-backend-admin/references/classroomReview.md)

Estas decisiones superan las referencias históricas Express/ES6 estricto para backend nuevo. No autorizan migraciones masivas del sitio público.

## Siguiente tarea

Revisión del acceso del 12 de noviembre de 2026. Pasaron las 50 pruebas del backend con PostgreSQL, el lint y la compilación de admin. En Edge un lector independiente decodificó el QR con logo de una cuenta simulada. Se confirmó un cierre pendiente del primer enrolamiento: si la solicitud de verificación falla por red y la persona vuelve al acceso, otra pestaña sigue pidiendo confirmar códigos que nunca se mostraron. Corregido el mismo día. Ante un resultado incierto, la pestaña original conserva la opción «Reiniciar acceso» incluso después del vencimiento. Con conexión, comprueba si hay una sesión accesible por cookie, la cierra si existe y libera la espera de las otras pestañas. En Edge se comprobaron con respuestas controladas la petición perdida y la respuesta perdida después de activar MFA, con y sin cookie recibida. Un 401 por código incorrecto permite corregirlo en el mismo formulario. La recuperación de contraseña y de todos los factores, la prueba física con Authy y la configuración operativa de producción siguen pendientes.

La gestión de cuentas incluye ahora listado de estados (`GET /api/v1/auth/accounts`) y desactivación transaccional con protección del último administrador activo y revocación inmediata de sesiones (`POST /api/v1/auth/accounts/deactivate`). La recuperación asistida propuesta en esta revisión se implementó el 16 de noviembre.

## Verificación del 9 de noviembre

En Edge con respuestas controladas se comprobó que una segunda pestaña, incluso después de recargarla, espera la confirmación de los códigos en la primera. Recargar la pestaña original cancela el acceso pendiente. Los códigos se mantienen en memoria. El almacenamiento del navegador conserva únicamente una marca de coordinación. Sin Web Locks, dos renovaciones de 3,5 segundos se ejecutaron en serie mediante SharedWorker. Si ambos mecanismos faltan, el panel indica que se necesita un navegador compatible.

En móvil y tablet el menú se abre bajo demanda y se cierra al elegir un destino. Los formularios de invitación viven en Cuentas y accesos. El escritorio identifica las áreas en preparación. A 390 px la primera tarjeta empieza a 274 px y a 768 px las tarjetas miden 328 px de ancho. Se verificó también el escritorio a 1440 px y la actualización del listado tras emitir una invitación.

`GET /api/v1/auth/accounts` requiere Bearer y rol `admin`. Devuelve `data.accounts` con id, nombre, correo, rol y estado de activación, ordenados por nombre e id. En PostgreSQL de pruebas se verificaron cuentas activas y pendientes, los campos públicos y las respuestas 401 y 403 para accesos sin sesión o sin permiso. Petición manual disponible en `backend/bruno/10-accounts.bru`.

`POST /api/v1/auth/accounts/deactivate` requiere Bearer, CSRF y rol `admin`. Recibe `{ id }` (UUID), bloquea con `FOR UPDATE` los administradores activos y la cuenta objetivo, impide desactivar al último `admin` activo incluso bajo concurrencia (`409 LAST_ADMIN_PROTECTED`), rechaza cuentas ya inactivas (`409 ACCOUNT_INACTIVE`), marca `isActive = false`, revoca de inmediato todas sus sesiones y desafíos MFA abiertos, limpia invitaciones sin usar, bloquea reemisiones de invitación inicial sobre cuentas dadas de baja (`409 ACCOUNT_DEACTIVATED`) y registra `admin.deactivate` en `audit_logs`. En `admin/`, `AccountList` y `AccountItem` muestran la insignia «Último admin activo» y ofrecen el botón «Desactivar cuenta» con confirmación en línea para las cuentas activas. Petición manual en `backend/bruno/11-deactivate-account.bru`. Verificado con `pnpm test:backend` (50 pruebas en verde) y prueba E2E en Edge contra `ipc_backend_auth_test`.

## Pendientes

Dominio/hosting, características/responsable del posible servidor, presupuesto, correo institucional, cuentas iniciales, retención y mantenimiento. No bloquean desarrollo local; resolver antes de producción. Login social/subida de video sujetos a viabilidad/costo, no requisitos cerrados.

Retención sugerida 12 meses desde cierre pendiente de aprobación; backups diarios propuestos implican hasta 24 h de pérdida, no pérdida cero. RPO/RTO definitivos pendientes.

## Verificación de la base implementada

Las pruebas de la implementación anterior son históricas y ya no describen el backend activo. Verificado: Prettier correcto; pnpm dev inició Nodemon/Hono y Vite, ambos respondieron HTTP 200; los procesos de comprobación quedaron detenidos. No se ejecutó Prisma ni se modificaron bases durante este reinicio.

## Registro del diseño previo

Creada skill específica/portable y referencias; original hono-cloudflare.md preservada. Proyecto docente login revisado estáticamente sin modificarlo. Sin cambios de aplicación, dependencias o servicios externos. Validación completada: quick_validate.py oficial correcto, enlaces locales y metadatos UI correctos, 7 archivos de skill idénticos entre copia repo e instalación personal, git diff --check sin errores (solo avisos de finales de línea). Copia personal instalada en C:/Users/fusta/.codex/skills/ipc-backend-admin/. AGENTS.md y ESTADO_PROYECTO.md enlazan este punto de entrada. No se hicieron commit ni push; compartir estos cambios por Git antes de trabajar desde otro equipo.

## Continuar en otro chat

> Lee AGENTS.md, docs/BACKEND_ADMIN.md y docs/skills/ipc-backend-admin/SKILL.md. Continúa con [tarea concreta], revisando código actual y conservando cambios locales. Actualiza estado y contratos al terminar.

Si la IA no tiene acceso al repo, adjuntar estos documentos y carpeta de skill. Las decisiones viven en archivos versionables, no en memoria de conversación. Tras cada tarea actualizar implementación, pruebas, pendientes y siguiente paso.


## Herramientas de edición — 29 de octubre de 2026

ESLint configurado para backend con reglas recomendadas, entorno Node y comandos lint/lint:fix. Extensión configurada localmente para revisar mientras se escribe; Prettier sigue formateando al guardar. Frontend, servidor y Prisma no se modificaron en este paso.

## Autocompletado — 29 de octubre de 2026

Añadido backend/jsconfig.json con NodeNext, ESNext y checkJs desactivado. Solo configura el editor; no se conectó PostgreSQL ni se ejecutó Prisma en este paso.


## Prisma y administradores — 29 de octubre de 2026

Configuración autorizada por el usuario: base nueva local, únicamente admins con roles admin/admissions/events y scripts de Prisma. db:reset conserva archivos de migración, limita destino local y requiere confirmación de Prisma; no se ejecutó destructivamente. Verificado: migración aplicada y estado al día, cliente generado, esquema válido, ESLint/Prettier correctos; tabla admins vacía y tres roles presentes. El wrapper rechazó production, destinos remotos, otras bases y --force sin ejecutar reset. Credenciales y respaldo excluidos de Git.

## Arquitectura de carpetas — 29 de octubre de 2026

Por petición explícita del usuario y tras contrastar `Documentación_Proyecto_web_IPC_v01.docx`, se crearon las carpetas del backend con `.gitkeep`: `bruno/`, `tests/` y, dentro de `src/`, `config/`, `middleware/`, `infrastructure/` (`database/`, `storage/`, `mail/`), `jobs/` y `modules/` (`auth/`, `admins/`, `careers/`, `documents/`, `events/`, `media/`, `content/`, `inquiries/`, `audit/`). Se incorporan `careers` y `documents` como módulos propios manteniendo Hono, JavaScript moderno y las decisiones actuales. Explicación completa en [architecture.md](backend/architecture.md). No se añadieron rutas ni lógica en este paso.

## Revisión de estructura y demostración de clase — 29 de octubre de 2026

Se verificaron las carpetas preparadas y se conservaron las rutas GET / y POST / añadidas para clase. POST / solo devuelve el JSON recibido y no persiste datos; no es todavía un contrato de negocio ni valida entradas para producción. La guía de arquitectura distingue carpetas vacías de funcionalidades implementadas y explica los límites entre carreras, documentos, medios y contenido. Siguiente paso: explicar y acordar la primera implementación pequeña con el usuario.


## Registro y autenticación inicial — 29 de octubre de 2026

Se añadió Argon2id, Zod y el adaptador PostgreSQL de Prisma. Servicios/repositorio/rutas separados, validación estricta, contraseñas nunca expuestas, invitaciones solo con hash en BD, sesión revocable y consulta de rol actual. Reemisión de invitaciones vencidas por admin o por CLI local autorizado, solo para cuentas pendientes. Auditoría mínima de operaciones exitosas; no registra secretos. La primera cuenta real queda a cargo del usuario.

Pruebas con PostgreSQL aislado: concurrencia de bootstrap/activación/registro, roles, duplicados, campos extra, origen/CSRF, expiración, logout, límites, reemisión y errores internos. Ver el resultado final de pnpm test:backend. Colección Bruno preparada para ejecución manual; no afirmar que se ejecutó en la aplicación.

Verificación final: pnpm test:backend reportó 19 pruebas aprobadas (incluido el contenedor de la suite); ESLint y Prettier correctos; dos migraciones al día. Arranque Node/PostgreSQL comprobado por HTTP en un puerto temporal: GET / 200, POST / de clase 201 y /api/v1/auth/me sin sesión 401. Proceso temporal detenido.


## Modularización de persistencia — 29 de octubre de 2026

authRepository.js pasó de 169 a 15 líneas y ahora compone repositorios por responsabilidad: registro (40), activaciones (57), sesiones (49) y límites (22). La consulta de cuentas vive en admins/adminRepository.js; auditoría en audit/auditRepository.js. sessionPolicy.js centraliza la comprobación transaccional de permisos repetida.

Se mantienen métodos del servicio, rutas, respuestas, bloqueos y límites transaccionales. No se modificó el esquema ni se crearon migraciones. Verificado: las 19 pruebas reportadas pasan en la base aislada y ESLint correcto; archivos modificados formateados con Prettier. La suite de pruebas se mantiene intacta como regresión del comportamiento.


## JWT académico y refresh rotativo — 30 de octubre de 2026

Solicitud explícita del usuario, posterior a la propuesta inicial de sesiones opacas. Implementados con jose, validación estricta de algoritmo/tipo/emisor/audiencia/claims/expiración, Bearer y consulta de rol actual. Servicios pequeños por responsabilidad; refreshRepository confirma la revocación antes de responder al replay. No se modificó el frontend.

Verificación: suite reportó 31 pruebas aprobadas (incluidos dos contenedores); ESLint correcto. Incluye registro anterior, firmas manipuladas, alg none, claims incorrectos, tokens vencidos, rotación, reutilización, concurrencia, logout y CSRF. Detalles y límites actuales en la guía de autenticación.


## Middleware por módulo y validación compartida — 30 de octubre de 2026

Implementadas únicamente las dos mejoras solicitadas: adminRequest/noStore/jsonBody de 16 KiB se aplican al router auth, no a toda la API; el POST de clase conserva su propio límite. requestId, secureHeaders y errores siguen globales. No se añadieron rutas públicas ni uploads reales.

readInput se extrajo a middleware y authSchema quedó limitado a esquemas. Errores 422 incluyen fields por campo en español, sin valores recibidos; JSON inválido sigue en 400 y credenciales incorrectas mantienen su mensaje genérico. Helper reutilizable con mensaje general personalizable.

Verificado: 40 pruebas reportadas aprobadas (incluidos contenedores), ESLint correcto. Nuevas pruebas cubren aislamiento de middleware, JSON público, multipart, límites propios, errores por campo, normalización y mensajes personalizados. No se modificaron Prisma, limpieza de registros ni escrituras de lastSeenAt.

## Retiro de demostración — 30 de octubre de 2026

Eliminado el POST / que devolvía el JSON recibido y sus imports exclusivos de app.js. Actualizada su prueba para exigir 404 sin eco de datos. Se conservan GET /, autenticación, herramientas de desarrollo, pruebas y carpetas aprobadas para los futuros módulos. Las menciones anteriores al POST de clase son históricas.


## MFA — 4 de noviembre de 2026

Implementación y límites en [mfa.md](backend/mfa.md). 48 pruebas reportadas aprobadas y ESLint correcto. Nueva clave privada creada sin exponerla; migración añade MFA y revoca sesiones previas conservando cuentas. Bruno actualizado con variables, sin credenciales literales. Sin cambios al frontend ni publicación.


## Corrección del visor y fechas — 18 de noviembre de 2026

Image combina sus clases con twMerge para que object-contain sustituya object-cover sin depender del orden CSS. El visor compartido reserva una fila para controles, otra flexible para la foto completa y un panel de detalles de hasta 30dvh con desplazamiento propio. Se conserva el fondo institucional y la navegación por teclado. GalleryCaption ahora muestra fecha/horario y ubicación; el adaptador usa startsAt/endsAt, mostrando el período cuando hay varios días.

Se verificó en Edge con datos controlados, fotos verticales y panorámicas, y descripciones extensas a 1280×900, 390×844 y 844×390: ajuste contain, sin transformaciones de recorte, cierre visible, límites del visor y fecha mostrada. ESLint y compilaciones pública/admin correctos. Se consultaron las fechas del evento de prueba: inicio 4 de noviembre y finalización 18 de noviembre; el usuario confirmó que el fin era una prueba. No se modificaron sus datos. El paso al histórico es automático, las fechas programadas no se reemplazan por la fecha actual.
