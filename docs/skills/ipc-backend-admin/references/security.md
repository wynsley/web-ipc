# Acceso y protección de datos

Diseño recomendado pendiente de implementación. Aplicar en las tareas correspondientes, sin construir módulos completos por una edición documental.

## Autenticación

Argon2id con biblioteca mantenida y parámetros probados en el servidor. Sin prefijos públicos simulando secretos ni contraseñas reversibles. Configuración necesaria falla al arrancar si falta; no secretos de respaldo incrustados.

Recomendado: sesiones opacas aleatorias con hash en PostgreSQL, vencimiento/revocación; no necesita access+refresh JWT para este panel. Cookie HttpOnly incluso en desarrollo, Secure en producción, SameSite/origen/path definidos. No localStorage ni comprobación de mera existencia de cookie.

TOTP, secreto cifrado con clave separada del repositorio; códigos de recuperación de un solo uso como hashes. Enrolamiento comprobado con código real, intentos limitados, prevención de reutilización de OTP dentro de ventana. Tras contraseña, desafío limitado sin acceso administrativo hasta completar MFA. Primer acceso restringido a cambio inicial/enrolamiento, sin permisos de módulos.

Rotar sesión al autenticar/elevación; revocar al desactivar, recuperar o cambiar contraseña. Cambios de rol afectan sesiones abiertas. Comprobar usuario activo/permisos actuales. Valores sugeridos: 30 minutos inactivo y 8 horas absolutas, ajustables tras probar trabajo de oficina.

CSRF y origen para mutaciones; SameSite/CORS no sustituyen protección completa. Límites por cuenta/origen con proxy/IP bien configurados, sin bloqueos permanentes abusables. Errores sin enumeración de cuentas. Nunca logs de contraseña, OTP, cookie, tokens o secretos.

## Cuentas y recuperación

Bootstrap interno para primer admin, sin endpoint público ni credenciales en seeds/Git/Bruno. Idempotente: no resetea una cuenta existente. Cuentas posteriores creadas por admin, invitación/código de un solo uso, identidad/canal verificados y MFA propio.

Admin con MFA reciente puede iniciar recuperación asistida de otra cuenta con token breve, auditoría y revocación. Recuperar contraseña no elimina MFA; reemplazar segundo factor exige flujo específico de verificación.

Principal: códigos custodiados por titular, recuperación de contraseña por correo institucional verificado cuando se configure, o procedimiento interno con responsable autorizado IPC. Si pierde contraseña y MFA, verificación externa y operación excepcional auditada; sin puerta universal. Definir/ensayar procedimiento antes de producción.

Proteger último admin activo frente a baja o cambio de rol mediante transacción/bloqueo. Personal saliente pierde sesiones, pero conserva atribución histórica. No compartir cuentas.

## Permisos, auditoría y privacidad

Matriz de scope.md, denegar por defecto, comprobar rol y recurso en lecturas/mutaciones sensibles. Menús no son autorización. events no lee consultas ni cambia roles; admissions no publica contenido institucional.

Auditar actor, acción, recurso, resultado, fecha, requestId y diferencias pertinentes: cuentas, MFA/recuperación, publicación, reprogramación, borrado/exportación. No cuerpos completos con PII. Lectura admin, sin edición ordinaria; retención institucional pendiente. Tabla protegida no equivale a inmutabilidad frente a operador de BD.

## Archivos

Autorizar; validar tamaño/cantidad/formato real además de extensión. Claves generadas sin paths del usuario. Aislar ejecución/almacenamiento, acceso privado a borradores, limitar procesamiento de imágenes y quitar metadatos sensibles cuando proceda.

CSV/exportaciones sin fórmulas ejecutables introducidas por usuarios. Solo campos autorizados, sin links públicos permanentes; auditar. Notas internas nunca en respuesta pública.

## Operación

Separar entornos, datos ficticios en pruebas. Documentar variable: propósito, tipo, obligación, ejemplo ficticio y secreto/no secreto; no volcar .env.

Propuesta de backups: diario externo al servidor, antes de migraciones relevantes, conservación inicial de 30 días y restauración probada antes de entregar. Incluir BD/archivos y custodia segura separada de secretos necesarios. Esto apunta a perder hasta 24 horas de datos, no cero. Evaluar recuperación a punto en tiempo según presupuesto; RPO/RTO definitivos pendientes.

Retención de consultas de scope.md es propuesta, sin borrado automático hasta aprobación; incluir exportaciones/backups en política. Revisar privacidad real y proveedores antes del lanzamiento; no certificar cumplimiento legal aquí.

## Referencias oficiales

- [Sesiones OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [Contraseñas OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [MFA OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html)
- [Archivos OWASP](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
