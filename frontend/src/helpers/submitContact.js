const REQUEST_TIMEOUT_MS = 15_000;
const GENERIC_ERROR =
  "No se pudo enviar la solicitud. Intenta nuevamente en unos minutos.";
const NETWORK_ERROR =
  "No pudimos confirmar el envío. Revisa tu conexión antes de intentarlo nuevamente.";
const INVALID_RESPONSE_ERROR =
  "El servicio no confirmó el registro de tu consulta. Intenta nuevamente; si persiste, comunícate con el instituto.";

function normalizePayload(values) {
  return {
    name: values.name?.trim() ?? "",
    email: values.email?.trim() ?? "",
    phone: values.phone?.trim() ?? "",
    address: values.address?.trim() ?? "",
    career: values.career ?? "",
    shift: values.shift ?? "",
    message: values.message?.trim() ?? "",
  };
}

function firstFieldError(fields) {
  if (!fields || typeof fields !== "object") return "";
  return Object.values(fields).flat().find(Boolean) || "";
}

// Contrato estable para la UI: resuelve con { id, status, createdAt } o rechaza con Error.
async function submitContact(values, { idempotencyKey } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

  try {
    const response = await fetch("/api/v1/inquiries", {
      method: "POST",
      headers,
      credentials: "omit",
      signal: controller.signal,
      body: JSON.stringify(normalizePayload(values)),
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      const fields = body?.error?.fields;
      const fallback =
        response.status === 429
          ? "Has enviado varias consultas seguidas. Espera unos minutos antes de volver a intentarlo."
          : GENERIC_ERROR;
      const error = new Error(
        firstFieldError(fields) || body?.error?.message || fallback,
      );
      error.status = response.status;
      error.code = body?.error?.code;
      error.fields = fields;
      throw error;
    }

    if (!body?.data?.id) {
      throw new Error(INVALID_RESPONSE_ERROR);
    }

    return body.data;
  } catch (error) {
    if (error?.name === "AbortError" || error instanceof TypeError) {
      throw new Error(NETWORK_ERROR);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export { submitContact };
