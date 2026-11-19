import { AppError } from "../../middleware/errors.js";

const DAY_MS = 86_400_000;

export const ALLOWED_STATUS_TRANSITIONS = Object.freeze({
  new: ["in_progress", "archived"],
  in_progress: ["resolved", "archived"],
  resolved: ["in_progress", "archived"],
  archived: ["in_progress"],
});

export function assertCanClaim(current) {
  if (current.status === "resolved" || current.status === "archived") {
    throw new AppError(
      409,
      "INQUIRY_NOT_OPEN",
      "Solo se pueden tomar consultas nuevas o en seguimiento.",
    );
  }
  if (current.assignedToId) {
    throw new AppError(
      409,
      "INQUIRY_ALREADY_ASSIGNED",
      "Esta consulta ya tiene un responsable asignado.",
    );
  }
}

export function assertStatusTransition(currentStatus, nextStatus) {
  if (currentStatus === nextStatus) {
    throw new AppError(422, "UNCHANGED_STATUS", "La consulta ya tiene ese estado.");
  }
  const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus] ?? [];
  if (!allowed.includes(nextStatus)) {
    throw new AppError(
      422,
      "INVALID_STATUS_TRANSITION",
      "No se puede realizar ese cambio de estado desde la etapa actual de la consulta.",
    );
  }
}

export function resolveStatusUpdate(current, nextStatus, now = new Date()) {
  assertStatusTransition(current.status, nextStatus);
  const resolvedAt =
    nextStatus === "resolved" ? now : nextStatus === "archived" ? current.resolvedAt : null;
  return {
    status: nextStatus,
    resolvedAt,
  };
}

export function resolveAutomaticNoteTransition(current, actorAdmin) {
  if (current.status !== "new") return null;
  return {
    status: "in_progress",
    ...(current.assignedToId ? {} : { assignedToId: actorAdmin.id }),
    version: { increment: 1 },
  };
}

export function archiveCutoffDate(archiveDays, now = new Date()) {
  return new Date(now.getTime() - archiveDays * DAY_MS);
}
