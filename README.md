# IPC Platform

Sitio público del IPC y backend en su etapa de inicialización.

## Iniciar

Desde la raíz, con Node y pnpm disponibles:

~~~sh
pnpm install --ignore-scripts
pnpm dev
~~~

El comando inicia el frontend y el backend. Ctrl+C detiene ambos.
Backend: http://127.0.0.1:3000.

## Comandos

- pnpm dev:backend — solo backend con Nodemon.
- pnpm dev:frontend — solo frontend.
- pnpm format:backend — formatear backend con Prettier.
- pnpm format:check:backend — comprobar formato.
- pnpm build — construir frontend.

## Estado

Backend mínimo: Hono, adaptador Node, Nodemon y Prettier. Prisma configurado en PostgreSQL/WSL con la primera tabla admins y sus roles. Todavía no hay cuentas, login ni rutas de negocio. El frontend sigue independiente.

- [Todos los scripts y comandos](docs/SCRIPTS.md)
- [Guía corta del backend](docs/backend/configuration.md)
- [Estado y siguiente paso](docs/BACKEND_ADMIN.md)
- [Arquitectura futura y skill](docs/skills/ipc-backend-admin/SKILL.md)
- [Estado del frontend](docs/ESTADO_PROYECTO.md)

La arquitectura futura es referencia, no una orden para implementar todas las etapas. Avanzamos en pasos pequeños.


## Autenticación del backend

Ya están implementados registro por invitación, activación, login con JWT Bearer y refresh rotativo en Prisma, permisos y logout. En un equipo nuevo configura backend/.env y ejecuta `pnpm auth:key`. Crea la primera cuenta con `pnpm admin:bootstrap` y sigue la [guía de autenticación y Bruno](docs/backend/authentication.md). Pruebas: `pnpm test:backend`, exclusivamente en ipc_backend_auth_test. MFA es el siguiente paso; esta etapa todavía no está habilitada para producción.
