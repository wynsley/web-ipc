# Alcance y decisiones

Base: respuestas del usuario del 28 de octubre de 2026. Confirmado = requisito; recomendado = decisión técnica propuesta; pendiente = definición institucional posterior. Nada se considera implementado por aparecer aquí.

## Producto

- Exclusivamente IPC; proyecto final de curso y sitio solicitado por la institución. Entrega aproximada en la semana del 20 de diciembre de 2026.
- V1 completa: acceso administrativo, eventos, medios, contenido institucional y consultas. Por etapas; comenzar con base de administrador y API probada en Bruno antes de integrar UI.
- Tres estudiantes, experiencia desigual, GitHub y tareas repartidas.
- Q10 externo; fuera de V1: alumnado, notas, matrículas, pagos e integración Q10.
- Visitantes solo ven eventos: sin cuentas públicas, inscripciones, cupos ni asistencia.
- Panel prioritariamente de escritorio, con accesibilidad básica; no se exige experiencia móvil completa.
- Español, texto sencillo y campos definidos en diseños existentes; sin editor HTML ni constructor libre de páginas.
- JS moderno con async/await, sin TS/JSDoc. Documentación separada en docs; código en inglés.

## Cuentas

Tres roles confirmados. Matriz recomendada inicial:

| Capacidad | admin | admissions | events |
| --- | --- | --- | --- |
| Crear/desactivar cuentas, roles y recuperación asistida | Sí | No | No |
| Cambiar contraseña y configurar su MFA | Sí | Sí | Sí |
| Consultas, notas, responsables, filtros/exportaciones | Sí | Sí | No |
| Crear/editar/publicar eventos y sus medios | Sí | No | Sí |
| Contenido institucional y configuración general | Sí | No | No |
| Auditoría completa | Sí | No | No |
| Reutilizar medios públicos | Sí | Si su tarea lo necesita | Sí |
| Eliminar medios globales/modificar usos ajenos | Sí, comprobando referencias | No | No |

Recomendado: admin cumple la función principal, sin cuarto rol. Cuenta individual por persona, un rol por cuenta en V1; más de una cuenta admin si el IPC lo decide. Proteger al último admin activo incluso ante concurrencia. Cuando cambie personal, desactivar su cuenta y revocar sesiones, sin compartir ni transferir contraseñas.

Correo/contraseña y segundo factor confirmados. Recomendado: TOTP mediante aplicación autenticadora y códigos de recuperación. Google/Microsoft/Apple son deseos condicionados a costo/viabilidad, no requisitos cerrados de V1. Verificar condiciones antes de prometer gratuidad. Identidad externa no habilita autoalta ni asignación libre de roles.

## Eventos

Título, categoría/tipo, descripción corta/larga, portada, galería, inicio/fin, ubicación, modalidad, organizador, destinatarios y enlaces. Definir obligatoriedad en el contrato; no exigir ubicación física a un evento virtual.

Borradores, publicación directa y programada, preview, cancelación, aplazamiento, reprogramación, finalización e históricos. Multi-día, simultáneos y recurrentes (semanales, quincenales, anuales), con excepciones por ocurrencia. Listados paginados, 10 por página como valor inicial recomendado.

Próximo evento para contador: selección determinista por destacado/fecha y desempate estable; aplazados sin nueva fecha no muestran contador falso. Cambios deben llegar en segundos a páginas abiertas, sujeto a conectividad y capacidad real de infraestructura.

## Medios y contenido

Subidas y enlaces, biblioteca reutilizable, recorte básico y optimización; PDF confirmado, video posible. Recomendado para V1: videos enlazados desde proveedores aprobados; subida propia requiere decisión de volumen, costo y procesamiento.

Registrar autor de subida/cambios. No se exige gestión de créditos; mantener alt descriptivo cuando sea informativo. Impedir borrar recursos referenciados, incluidas revisiones restaurables. Reemplazo explícito mostrando usos afectados.

Todo el contenido institucional editable: inicio/banners, carreras, equipo/docentes, egresados/testimonios, convenios, contactos, horarios, costos y documentos. Inventariar el frontend antes de modelar cada bloque; no certificar datos de muestra. Campos definidos, texto sencillo, preview e historial; publicar directamente. Restaurar crea nueva revisión. No permitir cambiar diseños libremente.

## Consultas

Bandeja, estados, notas internas, filtros/exportación y atención por canales externos. Notificar por correo es opcional; destinatario pendiente. Persistencia es fuente de verdad.

Recomendado: new, in_progress, resolved, archived. Responsable opcional, sin asignación inicial; admin asigna a admisión o a sí mismo. Admisión puede tomar consultas libres con operación atómica; no implementar reparto automático complejo para uno o dos operadores.

Retención propuesta: revisar a los 12 meses desde cierre y eliminar/anonimizar según política del IPC. No activar borrado automático hasta aprobación institucional, excepciones y responsable definidos. Propuesta operativa, no plazo legal certificado. La política de privacidad existente es borrador y debe reflejar el uso real antes de lanzamiento.

## Pendientes institucionales

Dominio/hosting, especificaciones y responsable del posible servidor, presupuesto, correo institucional, titulares iniciales, mantenimiento y retención. No bloquean diseño/desarrollo local; sí deben resolverse antes de producción. Estimación del usuario de 100–500 visitas/mes es incierta, no medición ni sustituto de pruebas de campaña.

Desarrollo local sin contratar servicios. No prometer gratuidad permanente de dominio, correo, hosting o almacenamiento. Definir respaldo/restauración y recuperación del principal antes de entregar.
