# MFA: contrato vigente — 4 de noviembre de 2026

Esta guía sustituye el login directo descrito antes en authentication.md. MFA obligatorio para los tres roles. No cambia la contraseña ni elimina cuentas existentes.

## Flujo en Bruno

1. Ejecutar login con correo y contraseña. Responde **202**, sin JWT ni refresh; guarda challengeToken en memoria.
2. Si enrollmentRequired es true, agregar manualmente secret a una aplicación autenticadora TOTP (6 dígitos, SHA1, 30 segundos, emisor IPC). En el panel, escanear con Authy u otra aplicación TOTP el QR que el navegador genera a partir de provisioningUri. «Introducir la clave manualmente» permite configurar la cuenta desde el mismo teléfono. El QR solo aparece durante el enrolamiento.
3. Definir mfaCode en el entorno local privado de Bruno con el código actual. Ejecutar 09-mfa-verify antes de cinco minutos.
4. La respuesta 200 entrega accessToken, tokenType, expiresIn, csrfToken y cookie refresh HttpOnly. En el primer enrolamiento también entrega diez recoveryCodes, una sola vez. Guardarlos privadamente antes de cerrar la respuesta.
5. Continuar con me, refresh y logout existentes. En próximos logins se repiten contraseña y código, sin entregar nuevamente el secreto.
6. Si se pierde el autenticador, introducir uno de los recoveryCodes como mfaCode después del login. Se consume una vez y revoca las otras sesiones. No elimina ni reemplaza el factor configurado.

El código TOTP conserva ceros iniciales: enviarlo como string. Un código aceptado no puede reutilizarse; esperar el siguiente intervalo. Tras errores 429 esperar la ventana indicada por la política y realizar login de nuevo si expiró el desafío.

## Contrato HTTP

POST /api/v1/auth/login: entrada anterior; salida 202 con data { mfaRequired, enrollmentRequired, challengeToken, expiresIn: 300 } y, solo para enrolamiento, secret/provisioningUri. No crea sesión administrativa.

POST /api/v1/auth/mfa/verify: { challengeToken, code }. Admite seis dígitos TOTP o código de recuperación base64url de 43 caracteres. Devuelve tokens exclusivamente tras verificar ambos factores. 401 para código/desafío inválido, usado, vencido o cuenta inactiva; 422 formato incorrecto; 429 exceso de intentos. Exige JSON, X-IPC-Client: admin y las comprobaciones de origen del router. El desafío impredecible es una credencial breve y no autoriza otras rutas. No requiere CSRF de una sesión que aún no existe.

Refresh y logout conservan sus contratos y CSRF. No persistir JWT, desafío, secreto ni recuperación en archivos compartidos o localStorage.

Si el panel pierde la respuesta durante el primer enrolamiento, conserva la cuenta en la aplicación autenticadora y usa «Reiniciar acceso» al recuperar la conexión. Las demás pestañas esperan hasta que termine la cancelación. El siguiente login indica si debes configurar el autenticador o introducir un código actual. Si la API ya entregó los códigos de recuperación y la respuesta se perdió, entra con tu autenticador y genera un juego nuevo desde el escritorio.

## Persistencia y concurrencia

Admin almacena mfaSecret cifrado AES-256-GCM con IV aleatorio y AAD ligado a su UUID; mfaLastStep previene replay TOTP con ventana ±1 intervalo. La clave independiente vive exclusivamente en MFA_ENCRYPTION_KEY.

mfa_challenges guarda hash del token, huella de versión de contraseña, secreto pendiente cifrado, expiración y consumo. recovery_codes guarda solo hashes de códigos aleatorios de 256 bits. Confirmar enrolamiento, consumir OTP/código/desafío y crear sesión ocurre en una transacción con bloqueo de cuenta; todas las verificaciones pendientes de esa cuenta quedan consumidas al completar una. Un login posterior requiere nuevo desafío.

Máximo cinco verificaciones por desafío cada cinco minutos, diez por cuenta cada quince minutos, más límites globales/IP del router. MFA correcto permite el login auditado; enrolamiento y uso de recuperación generan eventos específicos sin secretos.

## Configuración y migración

pnpm mfa:key genera MFA_ENCRYPTION_KEY (32 bytes hex) en backend/.env sin mostrarla ni sobrescribir un valor existente. Es obligatoria y distinta de JWT_SECRET. Custodiar copia privada junto al procedimiento de restauración: cambiarla sin recifrar impide leer factores registrados. No versionarla.

La migración add_mfa añade campos/tablas y revoca sesiones anteriores; no borra cuentas ni contraseñas. El primer login existente exige enrolar MFA. Otros equipos: pnpm install, pnpm mfa:key, pnpm db:migrate, pnpm db:generate. No usar db:reset para actualizar.

## Alcance y pendientes

Desde el 16 de noviembre, en el primer enrolamiento se pueden copiar los diez códigos o descargar un archivo de texto con un código por línea. La descarga se genera en el navegador y la persona confirma por separado que guardó su copia.

### Recuperación de cuentas activas

En el escritorio, los tres roles pueden renovar sus diez códigos o cambiar su contraseña. Cada operación requiere una sesión activa, CSRF, la contraseña actual y un TOTP aún sin usar. Si acabas de iniciar sesión, espera al siguiente código del autenticador. Renovar sustituye todos los hashes en una transacción. Cambiar la contraseña revoca las sesiones, los desafíos pendientes y el código de restablecimiento que pudiera existir.

| POST bajo `/api/v1/auth` | Datos | Resultado |
| --- | --- | --- |
| `/recovery/codes` | password, code | 200 con diez recoveryCodes entregados una vez |
| `/password/change` | password, code, newPassword | 200 y nuevo inicio de sesión obligatorio |
| `/recovery/issue` | password y code del operador, email del titular, identityVerified, resetMfa | 200 con token y expiresAt. Solo rol admin para otra cuenta activa |
| `/recovery/complete` | token, password nueva de 15–128 caracteres | 200. El titular debe iniciar sesión y completar MFA |

#### Procedimiento asistido

1. El titular contacta con el responsable institucional. El responsable coteja la identidad presencialmente o por un canal previamente registrado y comprueba la cuenta en el registro institucional. Anota en el expediente quién verificó la identidad, cuándo y qué se autorizó. Mantén los secretos fuera del expediente.
2. En **Cuentas → Restablecer el acceso de otra cuenta**, el administrador indica el correo del titular. Para una contraseña olvidada conserva el autenticador y los códigos. Marca el reemplazo del autenticador solo tras confirmar también la pérdida de los factores.
3. El administrador confirma la identidad e introduce su propia contraseña y un TOTP nuevo. Entrega el código por el canal privado verificado. Cada emisión sustituye la anterior y vence en 15 minutos. En la base solo queda el hash.
4. En **Recuperar cuenta**, el titular introduce el código y elige su contraseña. El canje se realiza una sola vez y revoca las sesiones y desafíos de la cuenta. Si se autorizó reemplazar los factores, se eliminan el secreto TOTP anterior y los códigos de respaldo. En el siguiente acceso el titular configura el autenticador, confirma un TOTP y guarda sus diez códigos nuevos.
5. Si el afectado es el único administrador activo, un operador autorizado con acceso al servidor verifica la identidad y registra la autorización institucional antes de ejecutar `pnpm --filter backend admin:recover` en una terminal privada. Introduce la referencia del expediente, el correo y el alcance. La operación comprueba el rol y la unicidad del administrador y registra la referencia en auditoría. El titular completa el mismo canje en el panel. Cuando hay otro administrador activo se usa el flujo del panel.

El IPC debe designar a los responsables y el canal de entrega para su despliegue. La aplicación registra la emisión y el canje, pero la comprobación de identidad es una actuación del responsable institucional.

Desde el 8 de noviembre, el panel envía el código como texto a `POST /api/v1/auth/mfa/verify`. En el enrolamiento muestra la clave manual y, tras el 200, los diez códigos de recuperación hasta que el usuario confirme que los guardó. Una cuenta ya configurada puede elegir entre TOTP y un código de recuperación. Ante un 401 puede corregir el código mientras el desafío siga vigente. Al vencer el desafío o recibir un 429 vuelve al acceso con el mensaje correspondiente.

El desafío, el JWT, el token CSRF y los códigos de recuperación se mantienen solo en memoria. La API entrega el refresh en una cookie HttpOnly. El panel restaura y renueva la sesión con esa cookie y permite cerrar sesión. Durante el primer enrolamiento, las demás pestañas esperan hasta confirmar los códigos o cancelar el acceso. Recargar la pestaña original antes de confirmar pierde los códigos visibles y cancela esa sesión. Producción requiere revisar HTTPS/cookies, infraestructura y recuperación operativa. También falta la limpieza periódica de desafíos y filas vencidas.

## Verificación

48 pruebas reportadas aprobadas (incluidos contenedores): regresión JWT, enrolamiento concurrente, desafío sin permisos, cifrado ligado a cuenta, origen ajeno, replay TOTP, recuperación concurrente, expiración, cuenta inactiva y límites. Los helpers antiguos preparan el contador solo en la base aislada para probar JWT sin esperas; la suite MFA no hace ese ajuste y verifica anti-replay real.

Referencias: [OTPAuth](https://hectorm.github.io/otpauth/classes/TOTP.html), [OWASP MFA](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html).
