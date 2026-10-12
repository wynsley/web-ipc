import { apiFetch } from "./apiFetch.js";
import { contactConfig } from "./contactConfig.js";
import { sendContactEmail } from "./sendContactEmail.js";

// Contrato estable para la UI: resuelve si el servicio acepta; rechaza si falla.
function submitContact(values) {
  if (contactConfig.provider === "formsubmit") {
    return sendContactEmail(values, contactConfig.recipient);
  }
  if (contactConfig.provider === "api") {
    return apiFetch("/contact", "POST", values).then((response) => {
      if (!response) throw new Error("No se pudo enviar la solicitud. Intenta nuevamente.");
      return response;
    });
  }
  return Promise.reject(new Error("El servicio de contacto no está configurado correctamente."));
}

export { submitContact };
