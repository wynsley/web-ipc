import { CONTACT_FORM_GROUPS } from "../data/contactFormFields.js";

// Adaptador temporal: se puede eliminar al activar el backend propio.
function sendContactEmail(values, recipient) {
  const fields = CONTACT_FORM_GROUPS.flat().reduce((result, field) => {
    const option = field.options && field.options.find((item) => item.value === values[field.name]);
    result[field.name === "email" ? "email" : field.label] = option ? option.text : values[field.name];
    return result;
  }, {});
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  return fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    signal: controller.signal,
    body: JSON.stringify(Object.assign({}, fields, {
      _subject: "IPC — Nueva solicitud de información",
      _template: "table",
      _replyto: values.email,
    })),
  })
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo enviar la solicitud. Intenta nuevamente en unos minutos.");
      return response.json();
    })
    .then((result) => {
      if (result.success !== true && result.success !== "true") {
        throw new Error("El servicio no confirmó el envío. Intenta nuevamente; si persiste, comunícate con el instituto.");
      }
      return result;
    })
    .catch((error) => {
      if (error.name === "AbortError" || error instanceof TypeError) {
        throw new Error("No pudimos confirmar el envío. Revisa tu conexión antes de intentarlo nuevamente.");
      }
      throw error;
    })
    .finally(() => clearTimeout(timeout));
}

export { sendContactEmail };
