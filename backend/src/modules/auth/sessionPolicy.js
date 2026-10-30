import { AppError } from "../../middleware/errors.js";
import { SESSION_IDLE_MS } from "./authSettings.js";

export const unauthorized = () => new AppError(401, "UNAUTHENTICATED", "Inicia sesión nuevamente.");
export function isSessionActive(session) {
  return Boolean(
    session &&
    !session.revokedAt &&
    session.expiresAt > new Date() &&
    session.lastSeenAt > new Date(Date.now() - SESSION_IDLE_MS) &&
    session.admin.isActive,
  );
}
// Revalidar dentro de la transacción, aunque el middleware ya autorizó la petición.
export async function assertAdminSession(tx, actor) {
  const session = await tx.session.findUnique({
    where: { id: actor.sessionId },
    include: { admin: true },
  });
  if (!isSessionActive(session)) throw unauthorized();
  if (session.admin.role !== "admin") {
    throw new AppError(403, "FORBIDDEN", "No tienes permisos para esta operación.");
  }
}
