import { AppError } from "./errors.js";
import { validationMessage, validationFields } from "./validationMessages.js";

export async function readInput(c, schema, { message = "Revisa los campos enviados." } = {}) {
  let body;
  try {
    body = await c.req.json();
  } catch {
    throw new AppError(400, "INVALID_JSON", "El cuerpo debe contener JSON válido.");
  }
  const parsed = schema.safeParse(body, { error: validationMessage });
  if (!parsed.success) {
    throw new AppError(422, "INVALID_INPUT", message, validationFields(parsed.error.issues));
  }
  return parsed.data;
}
