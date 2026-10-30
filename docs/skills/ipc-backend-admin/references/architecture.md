# Arquitectura y contratos

Diseño recomendado del 28 de octubre de 2026. El backend se reinició a un servidor mínimo el 29 de octubre; consultar docs/BACKEND_ADMIN.md y docs/backend/ para el alcance activo. Esta arquitectura se aplicará progresivamente cuando el usuario lo solicite. Panel y rutas de negocio siguientes son propuestas hasta verificarse en código.

## Stack

Hono + adaptador Node.js, PostgreSQL, Prisma, Zod, React/Vite para admin. Prisma y Zod aprovechan herramientas presentes en el proyecto docente login; Zod funciona en JS. Mantener Joi en frontend público hasta una migración explícita, con pruebas de equivalencia de contratos.

Fijar Node LTS y versiones compatibles al implementar. No asumir que Prisma 6 del ejemplo debe instalarse sin revisar soporte ni que la documentación de otra versión aplica. Configuración propia en .js/.mjs si la versión lo soporta, cliente utilizable desde JS y sin código TS escrito por el equipo; distinguir tipos internos/generados de dependencias de lenguaje de la aplicación. Prisma es ORM, no proveedor de alojamiento. No sumar Drizzle u otro ORM.

Monolito modular: frontend/ público, admin/ privado y backend/ API. En backend, app.js compone Hono sin abrir puerto; index.js arranca Node/configuración. Las carpetas config/, middleware/, modules/, infrastructure/ (database/, storage/, mail/), jobs/, prisma/, bruno/ y tests/ ya quedaron creadas con `.gitkeep` por solicitud del usuario (ver docs/backend/architecture.md). Prisma se concentra en repositorios; servicios coordinan reglas y transacciones; rutas/controladores traducen HTTP. Es válido unir controlador/ruta que solo reenvía.

Módulos previstos: auth, admins, careers, documents, events, media, content, inquiries, audit. Archivos como eventRoutes.js, eventSchema.js, eventService.js, eventRepository.js; seguir un criterio consistente sin renombrar ajenos incidentalmente.

## Panel y API

Recomendado: admin/ como aplicación separada servida en /admin, sin enlace público; API /api/v1. Mismo origen en producción simplifica cookies/proxy. Desarrollo con puertos/proxy de Vite. Un futuro admin.dominio requiere revisar CORS, cookies y CSRF; no cambia lógica de negocio.

Ruta = ubicación; rol = permisos. Se necesitan ambas. Un bundle admin visible no autoriza una API.

Familias propuestas: /api/v1/auth/*, /api/v1/admin/users, /events, /media, /content, /inquiries, /audit bajo el prefijo admin. Lecturas públicas /api/v1/events y /api/v1/content; SSE /api/v1/events/stream. Registrar rutas específicas frente a dinámicas según router.

Mantener POST /contact durante transición como adaptador al mismo servicio de consultas, sin duplicar lógica. Payload actual: name, email, phone, address, career, shift, message. Corregir restricción accidental de dominios email en ambos lados cuando se integre, conservando valores de carrera/turno hasta transición explícita.

Respuestas propuestas: éxito con data; listas con data/pagination; errores con error.code, error.message, error.fields opcional y requestId. Documentar ejemplos reales al implementar. apiFetch actual devuelve null en fallo y [] en éxito vacío: no asumir que lanza errores.

Estados: 201 creación, 204 sin cuerpo, 400 JSON malformado, 422 validación semántica, 401 sin sesión completa válida, 403 sin permiso, 404 inexistente/no visible, 409 conflicto, 429 límite. No stack traces/SQL. Paginación acotada y orden estable; filtros/orden SQL con listas permitidas.

## Datos y concurrencia

Entidades objetivo: users, sessions/desafíos MFA/recuperación, events/series/occurrences, mediaAssets/referencias, contenido/revisiones, inquiries/notas, auditLogs. Modelar únicamente la etapa actual. Identificadores estables, timestamps con zona, relaciones FK, índices y restricciones reales. ID no sustituye permisos.

Prisma migrate y SQL revisado, no db push como estrategia de producción. No editar migraciones ya aplicadas en entornos compartidos. Versionado optimista en ediciones; responder 409 ante cambios simultáneos. Guardar cambio, revisión y auditoría pertinente en transacción. No permitir asignación arbitraria de campos/roles desde un body.

## Eventos y fechas

Instantes UTC/timestamptz y zona IANA America/Lima para entrada/presentación/recurrencia. ISO con offset, fin posterior a inicio. serverTime permite compensar reloj del navegador.

Separar publicación (draft, scheduled, published, archived) y situación del evento (scheduled, postponed, cancelled, completed). Cancelado puede seguir publicado para informar. En curso se deriva de fechas. Conservar fecha previa y razón al reprogramar; aplazado sin fecha no entra en contador.

Serie + ocurrencias estables, generación acotada por horizonte y unicidad para reintentos; semanal/quincenal/anual con excepciones. Diferenciar editar una ocurrencia de las futuras; no alterar pasadas. Simultáneos son válidos.

Jobs persistentes, idempotentes, recuperables al reiniciar y reclamados con control de concurrencia. No programar publicaciones lejanas con setTimeout en memoria. Lecturas públicas respetan publishAt/visibilidad aunque un job se retrase. Evento finalizado no implica ocultar historial automáticamente.

## Cambios en segundos

El hook actual frontend/src/hooks/events/useCountDown.js calcula cada segundo desde target. Alimentarlo con fechas remotas; manejar ausencia, inválidas, fin y aplazamiento. No transmitir ticks del servidor.

SSE unidireccional comunica invalidaciones/versiones públicas después del commit; cliente reconsulta datos autorizados. Registro persistente de cambios junto a la mutación para recuperación y múltiples procesos. No stream de borradores/notas/datos personales. Retirar publicación también invalida listas existentes.

Reconexión con cursor si hay replay; si no, snapshot completo obligatorio. Reconsulta al recuperar foco/conexión, deduplicación y cierre al desmontar. Polling de respaldo sugerido cada 15 segundos con backoff y pausa en pestaña oculta; reconsulta inmediata al volver.

Objetivo propuesto: visible en hasta 5 segundos con conexión activa e infraestructura normal de prueba; medir, no garantizar ante cortes. Heartbeats, límite de conexiones, proxy sin buffering y timeouts compatibles. No emisor exclusivamente en memoria para varias instancias. No agregar Redis/WebSockets sin necesidad demostrada.

## Medios y publicación

Archivos fuera de PostgreSQL; metadatos, clave, dimensiones, tipo/tamaño, autor, estado y usos en BD. Adaptador local en desarrollo; almacenamiento de objetos o volumen persistente respaldado en producción según infraestructura. No confiar en disco efímero.

Validar bytes/dimensiones/tamaño, nombres generados, derivados optimizados y límites de procesamiento. Recorte no destructivo; preservar original si se permite reedición y contabilizar espacio. PDF controlado; rechazar HTML/SVG ejecutable como imagen genérica.

Enlace externo HTTPS validado como referencia, sin descarga automática backend. Para importación remota futura: controlar SSRF (red privada, redirecciones, DNS). Videos desde proveedores permitidos, nunca HTML arbitrario. Fuentes externas tienen riesgo de caída; conservar fallback visual.

Bloquear borrado de medios usados, incluidas revisiones restaurables. Reemplazo crea versión/recurso y muestra alcance; no sustituir silenciosamente todas las páginas. Limpieza física tras comprobar referencias. Medios de borrador con autorización, no bucket abierto ni URL pública adivinable.

Contenido con esquemas de campos por bloque, texto plano y revisión publicada separada de borrador. Preview autorizado; restaurar crea nueva revisión. No JSON libre de toda la institución ni migración masiva de assets locales sin tarea concreta.

Consultas: persistir antes de confirmar, controlar reintentos duplicados con mecanismo idempotente documentado, notas aparte del mensaje original. Notificación opcional con reintentos persistentes; fallo de correo no elimina consulta. Promesa abandonada no garantiza entrega.

## Fuentes

- [Hono Node](https://hono.dev/docs/getting-started/nodejs)
- [SSE Hono](https://hono.dev/docs/helpers/streaming)
- [Validación Hono](https://hono.dev/docs/guides/validation)
- [Zod y JavaScript](https://zod.dev/)
- [Prisma Config y extensiones JS](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
- [Backups PostgreSQL](https://www.postgresql.org/docs/current/backup.html)

Consultar las versiones efectivas al implementar. Las referencias Cloudflare originales contienen opciones de caché y afirmaciones de plataformas que necesitan corrección; no portarlas cambiando extensiones.
