import { AppError } from "./errors.js";
import { equalSecret } from "../modules/auth/authCrypto.js";

export function authenticate(service) {
  return async (c, next) => {
    const authorization = c.req.header("Authorization") ?? "";
    const match = /^Bearer ([A-Za-z0-9_.-]+)$/i.exec(authorization);
    if (!match || match[1].length > 4096) {
      throw new AppError(401, "UNAUTHENTICATED", "Inicia sesión nuevamente.");
    }
    c.set("actor", await service.authenticate(match[1]));
    await next();
  };
}
export async function requireAdmin(c, next) {
  if (c.get("actor").admin.role !== "admin") {
    throw new AppError(403, "FORBIDDEN", "No tienes permisos para esta operación.");
  }
  await next();
}
export async function requireCsrf(c, next) {
  if (!equalSecret(c.req.header("X-CSRF-Token"), c.get("actor").csrfToken)) {
    throw new AppError(403, "INVALID_CSRF", "Token de seguridad inválido.");
  }
  await next();
}
