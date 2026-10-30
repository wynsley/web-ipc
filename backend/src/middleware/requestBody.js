import { bodyLimit } from "hono/body-limit";
import { AppError } from "./errors.js";

export const limitBody = (maxBytes) =>
  bodyLimit({
    maxSize: maxBytes,
    onError: () => {
      throw new AppError(413, "BODY_TOO_LARGE", "El cuerpo excede el tamaño permitido.");
    },
  });

export async function requireJson(c, next) {
  if (
    !["GET", "HEAD", "OPTIONS"].includes(c.req.method) &&
    c.req.header("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/json"
  ) {
    throw new AppError(415, "JSON_REQUIRED", "Usa Content-Type: application/json.");
  }
  await next();
}

export const jsonBody = ({ maxBytes = 16 * 1024 } = {}) => [requireJson, limitBody(maxBytes)];
