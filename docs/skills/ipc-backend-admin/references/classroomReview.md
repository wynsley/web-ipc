# Referencia docente login

Revisión estática: 28 de octubre de 2026. Ruta facilitada: \\wsl.localhost\Ubuntu\home\yeyo\dev\login. No se modificó ni ejecutó contra base de datos; no se leyeron .env. Reemplaza la referencia inicial equivocada backLogin.

## Aprovechable

Express/ESM, app.js y server.js separados, módulos auth/panel, esquemas Zod, servicios, PostgreSQL/Prisma, Argon2 y comprobación de sesión persistida. Prisma/Zod son familiares para el equipo: recomendados en IPC con versiones compatibles y configuración JS. Mantener responsabilidades al adaptar req/res/next a contexto/middleware Hono; no copiar mecánicamente.

## Diferencias a corregir en IPC

- auth.routes.js expone POST /register sin autenticación y register.schema.js acepta ADMINISTRATOR desde el body. No sirve para alta privada de personal: IPC usa bootstrap y alta autorizada, roles propios.
- config/jwt.js tiene secretos de respaldo hardcodeados. IPC debe fallar al faltar secretos/configuración obligatoria.
- config/cookies.js desactiva HttpOnly en su modo developer y usa una etiqueta distinta de development. Mantener HttpOnly también local; Secure según HTTPS real.
- Login/validación/registro duplicado devuelven HTTP 200 para diversos fallos; adoptar estados/error estable.
- Session almacena refreshToken íntegro, sin fechas ni FK explícita al usuario en el esquema inspeccionado. IPC necesita vencimiento/revocación/relación y tokens persistidos como hash.
- auth.middleware.js valida access+refresh y sesión, pero solo asigna id de usuario; no hay guard de rol en panel.routes.js. Autenticación no demuestra autorización.
- Refresh reemite access token sin rotar refresh. Si se conservase JWT, diseñar rotación/reutilización; la base recomendada IPC simplifica a sesiones opacas persistentes.
- Argon2 se aplica a contraseña con prefijo fijo de código; ese prefijo no es un secreto adicional. Usar Argon2id y parámetros explícitos adecuados, sin copiar políticas restrictivas de 5–30 caracteres alfanuméricos.
- No se observaron MFA, logout, recuperación, auditoría o pruebas funcionales. El script test solo falla intencionalmente.
- CORS deriva origen de PORT del servidor; IPC debe configurar orígenes reales de los clientes/proxy.
- Modelo de clase recoge género/nacimiento y roles de otro dominio; no trasladar datos personales que IPC no necesita.

Estos hallazgos son de la copia inspeccionada, no una afirmación sobre versiones posteriores. Es una referencia didáctica útil, no una base lista para producción.
