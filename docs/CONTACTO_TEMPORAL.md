# Contacto por correo para la presentación

Implementado el 11 de octubre de 2026. Inicio, Admisión y modales reutilizan ContactForm y useContactForm. Se envían nombre, correo, teléfono, dirección, carrera, turno y mensaje a `craftyeyo6@gmail.com` mediante FormSubmit. Carrera y turno llegan con sus etiquetas legibles; Reply-To permite responder al solicitante.

## Activación antes de presentar

1. Abrir la web con HTTP/HTTPS y enviar una solicitud de prueba identificada como tal.
2. Revisar la bandeja y spam de `craftyeyo6@gmail.com`, y confirmar el enlace de activación de FormSubmit. El propietario del buzón debe realizar este paso.
3. Enviar otra prueba desde la URL de la presentación y comprobar que llegan los siete campos. No considerar certificada la entrega por ver un mensaje de éxito en la web: solo confirma la aceptación del servicio.

No se ha enviado una prueba real ni verificado el buzón desde esta implementación. Las pruebas automatizadas simulan las respuestas del proveedor sin enviar datos. La entrega real y la activación permanecen pendientes.

## Separación de responsabilidades

- `frontend/src/hooks/globals/useContactForm.js`: validación, bloqueo de envíos simultáneos, estados y mensajes. Conserva datos si falla; limpia inmediatamente tras aceptación para no borrar entradas nuevas con un temporizador.
- `frontend/src/helpers/submitContact.js`: punto único de envío independiente de la interfaz.
- `frontend/src/helpers/sendContactEmail.js`: único adaptador temporal a FormSubmit, con límite de espera de 20 segundos y comprobación HTTP y de éxito del proveedor.
- `frontend/src/helpers/contactConfig.js`: proveedor y destinatario. Los valores actuales funcionan sin crear un archivo de entorno. `.env.example` muestra las variables opcionales; reiniciar Vite o recompilar al modificarlas.

El correo destinatario y las variables VITE son públicos en el bundle. No se utilizan claves SMTP ni contraseñas. Los datos pasan por un tercero; FormSubmit documenta retención de solicitudes de 30 días. Se conserva la validación existente de correo (gmail/hotmail/yahoo). No se implementa respuesta automática al solicitante.

## Sustituir por el backend

1. Implementar `POST /contact` con validación del servidor y configurar su URL real en `apiFetch.js` (actualmente localhost:3000).
2. Configurar `VITE_CONTACT_PROVIDER=api` y recompilar. Esta rama envía el objeto original con los siete nombres de campo actuales; no llama a FormSubmit ni realiza reintentos por otro proveedor.
3. Tras verificar la API, eliminar `sendContactEmail.js`, su prueba y configuración temporal; simplificar `submitContact.js` para usar únicamente la API. Los componentes y el hook conservan su contrato.

Prueba local: desde frontend, `node --test src/helpers/sendContactEmail.test.js`.

Referencias: https://formsubmit.co/documentation y https://formsubmit.co/ajax-documentation.
