---
name: ipc-backend-admin
description: Diseña, implementa y revisa la API Hono y el panel administrativo del IPC en JavaScript moderno. Aplica a autenticación, permisos, eventos, medios, contenido, consultas y sus contratos con la web pública; no a rediseños independientes del frontend ni a otros proyectos.
metadata:
  version: "1.0.0"
  language: "es"
---

# Backend y administración del IPC

Skill personal del usuario especializada para IPC Platform. Implementa la tarea solicitada, no todo el alcance al activar esta skill. V1 se entrega por etapas pequeñas. Actualización del 29 de octubre: primero inicialización mínima y explicación de herramientas; no ejecutar Prisma, crear módulos o avanzar a autenticación automáticamente. Consultar el estado vigente antes de implementar.

## Recuperar contexto

Lee el AGENTS.md y docs/BACKEND_ADMIN.md del workspace actual. Revisa código, consumidores, manifiestos y cambios locales antes de editar. No deduzcas implementación de un README histórico o dependencias instaladas. No uses rutas absolutas personales para localizar el proyecto.

Consulta solo las referencias de la tarea:

- [Alcance](references/scope.md): requisitos, roles y pendientes.
- [Arquitectura](references/architecture.md): stack, contratos, datos, SSE, eventos y medios.
- [Seguridad](references/security.md): autenticación, MFA, recuperación, permisos y archivos.
- [Trabajo y continuidad](references/workflow.md): etapas, Bruno, pruebas, documentación y relevo.
- [Revisión de referencia docente](references/classroomReview.md): patrones de login aprovechables y defectos que no se deben copiar.

Decisiones posteriores del usuario y documentación vigente del repositorio prevalecen sobre copias antiguas de la skill. Distingue requisitos confirmados, base técnica recomendada y pendientes. Nunca presentes diseño como código implementado.

## Convenciones acordadas

- JavaScript moderno con ESM y async/await, confirmado por el usuario; sin TypeScript ni JSDoc. JSX para componentes. Async/await es posterior a ES6: no imponer ES2015 estricto por una guía antigua.
- Código, carpetas, campos y claves de error en inglés; interfaz, mensajes y documentación en español. Imports backend con extensión .js. Archivos nuevos en lowerCamelCase siguiendo el código local.
- Documenta contratos, modelos, unidades, configuración y decisiones en docs/. No documentes mecánicamente cada variable local. Comentarios breves que expliquen decisiones siguen permitidos.
- Base recomendada: Hono en Node.js, PostgreSQL, Prisma y Zod; monolito modular REST. Prisma/Zod aprovechan el proyecto docente, pero no copiar su configuración ni fijar versiones obsoletas sin comprobar compatibilidad. Cloudflare no es requisito.
- Apps separadas frontend/, admin/ y backend/ en pnpm. No crear carpetas vacías para módulos futuros. Añadir admin al workspace cuando exista.
- Rutas/controladores HTTP, servicios de negocio y repositorios con responsabilidades reales. Se pueden fusionar ruta y controlador si este solo reenvía; evitar clases base y abstracciones sin uso.
- Tres roles: admin, admissions, events. Sin registro público. La URL o esconder botones no sustituyen autorización en API.
- Conservar el contacto actual mediante submitContact y POST /contact durante transición; cualquier cambio de contrato actualiza consumidores y documentación conjuntamente.
- Para intervenir páginas públicas, leer docs/ESTADO_PROYECTO.md y docs/GUIA_NUEVAS_PAGINAS.md. Reutilizar Image y tokens institucionales; fondo ante fuente ausente/error y alt apropiado. En admin, no crear imports frágiles fuera de la app: compartir explícitamente o documentar un adaptador compatible.

## Implementar y verificar

Antes de un endpoint define método, ruta, permisos, entrada/salida, estados HTTP y efectos persistentes. Valida en servidor y controla transacciones. No adoptes los roles, datos personales o políticas de contraseña del ejemplo docente: corresponden a otro dominio.

Bruno es el primer consumidor solicitado. Complementarlo con pruebas automatizadas de comportamientos críticos. No conectar/rediseñar el sitio público ni publicar servicios antes de que la tarea lo contemple. No enviar notificaciones reales desde pruebas locales.

Separar reloj local de actualizaciones remotas: el navegador calcula la cuenta regresiva con la fecha del servidor; SSE avisa de cambios públicos con reconexión y reconsulta. No enviar ticks por segundo.

Al terminar, actualizar docs/BACKEND_ADMIN.md con cambios, contratos, pruebas, pendientes y siguiente tarea. No declarar éxito de autenticación por un build o un HTTP 200 aislado.

## Distribución y compatibilidad

La copia editable compartida vive en docs/skills/ipc-backend-admin/. Puede copiarse completa a una instalación personal. Mantener las copias sincronizadas; el estado actual del repo tiene prioridad sobre snapshots personales.

La skill original hono-cloudflare.md se conserva sin cambios y no es una dependencia de esta. Las pautas históricas Express y ES6 estricto de react-web-ipc quedan superadas para este backend por las decisiones actuales; conservar sus convenciones visuales pertinentes. No modificar otras skills personales incidentalmente.
