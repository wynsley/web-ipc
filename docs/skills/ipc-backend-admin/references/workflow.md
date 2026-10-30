# Equipo y continuidad

## Etapas V1

El 29 de octubre de 2026 el usuario pidió reiniciar a una inicialización mínima: Hono, Nodemon, Prettier y Prisma instalado sin ejecutar. Las etapas siguientes son una hoja de ruta; no están implementadas en el backend activo. Consultar docs/BACKEND_ADMIN.md para el estado actual. Ordenar no significa recortar alcance.

1. Base Hono/Node, configuración validada, PostgreSQL/Prisma/migraciones, errores/health y Bruno.
2. Bootstrap, credenciales, MFA, sesiones, recuperación, cuentas/permisos y auditoría; Bruno y pruebas antes de UI.
3. admin/: login/MFA, sesión, layout escritorio y menús por rol, errores/expiración.
4. Medios/eventos: biblioteca, CRUD, fechas, recurrencias, estados, revisiones, programación, preview/SSE; integración pública.
5. Contenido: inventario completo, campos editables, revisión/publicación/preview y documentos; migración gradual.
6. Consultas: bandeja, estados, responsables, notas/filtros/exportación; retiro de FormSubmit después de verificar API. Aviso por correo opcional.
7. Cierre: pruebas cruzadas, fallos/reintentos, backups/restauración, deploy, manual y mantenimiento.

Fechas intermedias según disponibilidad real. Objetivo aproximado: semana del 20 de diciembre. Dejar margen de estabilización; no garantizar cronograma sin estimar trabajo. Hosting/responsable se deciden antes del cierre, no al lanzar.

## Equipo

Reparto recomendado: responsable base/auth/contratos; responsable eventos/medios; responsable UI/contenido/pruebas guiadas. Tras estabilizar base, tareas verticales pequeñas con API, prueba y docs. Menor experiencia requiere tareas acotadas/revisión, no seguridad crítica aislada.

Issues con aceptación, ramas breves, PR y revisión de otro integrante. Prefijo codex/ al crear ramas salvo convenio distinto. Cambios de sesión/roles/esquema/errores requieren coordinar consumidores; un responsable coordina migraciones. No crear PR, hacer push o fusionar solo por leer esta guía sin tarea que lo autorice.

No editar migraciones ya aplicadas. Evitar tres estilos diferentes de auth por repartir trabajo. No datos personales reales en seeds.

## Bruno y pruebas

Colección backend/bruno/ al crear backend, URLs locales/datos ficticios versionados; tokens, cookies, contraseñas y TOTP fuera de Git. Documentar cookie jar y pasos MFA sin simularlo en producción.

Primera colección: health, login inválido, desafío MFA sin permisos, MFA inválido/válido, me, logout, sesión revocada, denegación por rol, último admin protegido; recuperación/expiración/CSRF al implementar contratos.

Bruno no reemplaza regresión automatizada. Usar framework existente o node:test sin dependencia extra; app.request para HTTP Hono y PostgreSQL aislado para integraciones/transacciones/migraciones. Mock de repositorio no verifica persistencia.

Eventos: zona horaria, multi-día/simultáneos, reprogramación, aplazado sin fecha, cancelado publicado, excepciones recurrentes, job duplicado, conflicto de edición y reconexión SSE/retirada de publicación. Público nunca recibe borradores.

Medios: contenido disfrazado, tamaño, fallo de proceso, URL rota, acceso privado, borrado referenciado/restauración. Consultas: persistir antes de éxito, entrada inválida, duplicados, roles, exportación y fallo opcional de correo.

No certificar seguridad por compilar. Registrar comandos/resultados/límites. Una tarea documental no requiere instalar/ejecutar backend.

## Documentación y relevo

docs/BACKEND_ADMIN.md es estado vivo. Crear docs/backend/api.md, dataModel.md, configuration.md, operations.md y adminGuide.md progresivamente cuando haya contratos reales, no como archivos vacíos. Documentar variables persistentes/configuración, no cada variable local. README/scripts históricos se corrigen al implementar backend.

Al terminar: fecha, cambios, contratos, pruebas, pendientes y próxima tarea. Leer archivos vigentes al iniciar chat; no depender de transcripciones. La copia repo de skill es editable, instalación personal es copia sincronizable.

Prompt:

> Lee AGENTS.md, docs/BACKEND_ADMIN.md y docs/skills/ipc-backend-admin/SKILL.md. Consulta referencias pertinentes, verifica código y preserva cambios locales. Continúa con [tarea]. Actualiza estado/contratos al finalizar.

Otra IA puede leer estos archivos aunque no soporte skills. Si no tiene acceso al repo, adjuntar documentos y carpeta completa. No prometer carga automática ni memoria compartida entre chats.

Original D:/DEV/SKILLS/hono-cloudflare.md preservado sin cambios. Esta skill personal es específica para IPC, portable y no dependiente de la original.
