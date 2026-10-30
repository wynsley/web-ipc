import { AppError } from "./errors.js";

export async function noStore(c, next) {
  c.header("Cache-Control", "no-store");
  await next();
}

// Control del cliente/origen; no sustituye JWT, permisos ni CSRF.
export function adminRequest(config) {
  return async (c, next) => {
    if (!["GET", "HEAD", "OPTIONS"].includes(c.req.method)) {
      const origin = c.req.header("Origin");
      if (
        (origin && origin !== config.origin) ||
        c.req.header("Sec-Fetch-Site") === "cross-site" ||
        c.req.header("X-IPC-Client") !== "admin"
      ) {
        throw new AppError(403, "INVALID_ORIGIN", "Origen de solicitud no permitido.");
      }
    }
    await next();
  };
}
