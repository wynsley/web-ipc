# Arquitectura de carpetas del backend

## JWT y refresh rotativo — 30 de octubre de 2026

authService.js compone invitationService, loginService y refreshService; accessTokenService firma/verifica JWT y deriva CSRF. authCookies centraliza cookies. authRoutes y credentialRoutes separan contratos de cuentas y credenciales. repositories/refreshRepository conserva el historial y serializa rotaciones por familia; sessionRepository valida familias, las crea y revoca. Los detalles actuales están en [authentication.md](authentication.md). El diseño conserva un monolito modular y consultas Prisma en repositorios.


Actualizado: 29 de octubre de 2026.

## Actualización de autenticación

Ya hay implementación en config/, middleware/, infrastructure/database/ y modules/auth/, junto con scripts, tests y bruno. src/app.js compone Hono y src/index.js conecta Prisma y abre el puerto. Las descripciones de carpetas vacías de abajo corresponden al paso inicial. Consulta [authentication.md](authentication.md) para el mapa de archivos actual y sus contratos. admins/ contiene la consulta de cuentas y audit/ la escritura de auditoría. auth/repositories/ separa registro, activaciones, sesiones y límites; authRepository.js los compone. El resto de funcionalidades continúa pendiente.

## Preparación inicial de carpetas (histórico)

En este paso se preparó únicamente la estructura de directorios de `backend/` solicitada por el usuario, contrastando los acuerdos vigentes con el documento `Documentación_Proyecto_web_IPC_v01.docx`. No se agregaron rutas, controladores, servicios ni tablas nuevas. Cada carpeta vacía incluye un archivo `.gitkeep` para que Git la conserve al compartir el repositorio con el equipo; cuando una carpeta reciba archivos reales, su `.gitkeep` podrá retirarse.

## Estado y límites de esta estructura

La arquitectura es un monolito modular: una sola API Hono, organizada por funcionalidades. Las carpetas reservan responsabilidades futuras; todavía no contienen servicios, repositorios, conexión de Prisma, tareas programadas ni pruebas. La única lógica HTTP actual vive en `src/index.js`: `GET /` y una demostración `POST /` añadida para clase. Ese POST devuelve el JSON recibido; no crea registros ni administradores y no constituye un endpoint de producción.

Esta preparación de carpetas fue pedida expresamente por el usuario y es una excepción a la recomendación general de la skill de crearlas conforme aparezca código. No autoriza implementar los módulos automáticamente.

## Árbol actual de `backend/`

```text
backend/
├── bruno/                      # Colección de peticiones para probar la API en Bruno
├── prisma/                     # Esquema de base de datos y migraciones SQL
│   ├── migrations/
│   └── schema.prisma
├── scripts/                    # Utilidades locales de desarrollo (como resetDatabase.js)
├── src/
│   ├── index.js                # Punto de entrada actual del servidor Hono
│   ├── config/                 # Carga y validación de variables de entorno y ajustes
│   ├── middleware/             # Autenticación, permisos por rol, errores y límites
│   ├── infrastructure/         # Conexiones y adaptadores técnicos compartidos
│   │   ├── database/           # Instancia compartida de Prisma Client
│   │   ├── storage/            # Almacenamiento de archivos (PDF e imágenes)
│   │   └── mail/               # Envío opcional de correos/notificaciones SMTP o API
│   ├── jobs/                   # Tareas programadas persistentes (como publicación de eventos)
│   └── modules/                # Módulos del negocio separados por responsabilidad
│       ├── auth/               # Inicio/cierre de sesión, MFA (TOTP), sesiones y recuperación
│       ├── admins/             # Gestión de cuentas administrativas y roles (admin, admissions, events)
│       ├── careers/            # Catálogo y detalle de carreras profesionales
│       ├── documents/          # Documentos académicos/institucionales (PDF, mallas, prospectos, reglamentos)
│       ├── events/             # Eventos institucionales, estados, recurrencias, contador y avisos SSE
│       ├── media/              # Biblioteca de imágenes y recursos visuales reutilizables
│       ├── content/            # Contenido institucional editable (inicio, nosotros, vida estudiantil, egresados, admisión)
│       ├── inquiries/          # Consultas de contacto/admisión, estados, notas y compatibilidad con POST /contact
│       └── audit/              # Registro de auditoría de acciones administrativas
└── tests/                      # Pruebas automatizadas del backend
```

## Cómo se organizará cada módulo dentro de `src/modules/`

Cuando implementemos un módulo paso a paso, sus archivos vivirán dentro de su carpeta usando nombres en `lowerCamelCase`:

- `*Routes.js`: define los endpoints HTTP en Hono y conecta los middlewares necesarios.
- `*Schema.js`: valida los datos de entrada (body, parámetros y filtros) con Zod.
- `*Service.js`: contiene las reglas de negocio y coordina transacciones.
- `*Repository.js`: concentra las consultas a PostgreSQL mediante Prisma.

Si un controlador solo reenvía datos del servicio a la ruta, no hace falta crear un archivo intermedio adicional. Cuando separemos la configuración de Hono del arranque del puerto, `src/app.js` armará la aplicación y `src/index.js` encenderá el servidor.

## Qué se incorporó del documento Word y qué se mantiene de los acuerdos

El documento `Documentación_Proyecto_web_IPC_v01.docx` (elaborado por el equipo: Wynsley Durán, Yerson Fustamante y Juan Gabriel Carranza) aporta requerimientos funcionales y no funcionales útiles para la estructura del backend:

1. **Separación de `careers/` y `documents/`:**
   - El documento distingue explícitamente el módulo de carreras (RF-03, RF-04 y Fase 4) y la gestión documental en PDF para mallas curriculares, planes de estudio, prospectos de admisión y reglamentos vinculados a carreras o a la institución (RF-05, RF-06, RF-07, RNF-11 y RNF-12).
   - Separarlos de `content/` y `media/` evita mezclar archivos PDF oficiales y su validación de descarga con las imágenes generales o los textos editables de las páginas.
2. **Vida estudiantil y acompañamiento (RF-11 y RF-12):**
   - Forman parte de las secciones informativas editables dentro de `content/`, junto con inicio, nosotros, egresados y admisión.
3. **Consultas y correo (RF-13 a RF-18):**
   - Se agrupan en `modules/inquiries/` con apoyo técnico en `infrastructure/mail/`.
   - **Criterio vigente:** primero se guarda la consulta en PostgreSQL y se gestiona desde el panel; el envío de correo es una notificación complementaria que no debe hacer perder la consulta si el proveedor SMTP falla o aún no está configurado. Durante la transición se mantendrá compatibilidad con los 7 campos actuales del frontend (`name`, `email`, `phone`, `address`, `career`, `shift`, `message`) y `POST /contact`.
4. **Decisiones actuales que prevalecen sobre el texto anterior del Word:**
   - Se mantiene **Hono sobre Node.js** (en lugar de Express) con **JavaScript moderno (`import`/`export` y `async/await`)**, sin TypeScript ni JSDoc.
   - Se conserva la tabla `admins` y el enum `AdminRole` (`admin`, `admissions`, `events`), junto con pruebas de API en **Bruno** (`backend/bruno/`).


## Límites entre módulos

`careers` gestiona la oferta académica; `content` los textos y bloques institucionales restantes. `documents` gestiona la clasificación y vinculación de PDFs oficiales; `media` la biblioteca visual. Ambos reutilizarán `infrastructure/storage` para guardar y recuperar archivos, sin duplicar el manejo físico del almacenamiento.

`events` proporcionará fechas y avisos de cambios; el contador por segundo seguirá calculándose en el navegador. `admins` gestiona cuentas y roles, mientras `auth` gestiona la identidad y las sesiones. Los roles se comprobarán en la API.

La validación de entradas HTTP se hará con Zod cuando corresponda instalarlo e implementar rutas; Prisma se ocupa de persistencia y restricciones de datos. La mención del Word a Prisma como validador de formularios no se adopta. El correo sigue siendo opcional y los objetivos de disponibilidad y rendimiento del documento quedan pendientes de validar con el alojamiento real.


## Middleware compartido — 30 de octubre de 2026

app.js aplica solo reglas HTTP generales. authRoutes monta controles propios de origen/cliente, no-store y JSON limitado. middleware/requestBody.js permite combinar límites por ruta con formatos; middleware/readInput.js y validationMessages.js comparten parseo y validación sin acoplar módulos a authSchema.js. Los próximos módulos deben declarar sus límites, autorización y formato expresamente.
