import { AppError } from "../../middleware/errors.js";
export const eventConflict = () =>
  new AppError(
    409,
    "EVENT_CONFLICT",
    "El evento cambió o su estado impide esta acción. Actualiza la lista.",
  );
export function assertEventDates(data) {
  if (data.endsAt && data.endsAt <= data.startsAt)
    throw new AppError(
      422,
      "INVALID_EVENT_DATES",
      "La finalización debe ser posterior al inicio.",
      { endsAt: ["La finalización debe ser posterior al inicio."] },
    );
}
export function scheduleChanges(current, action, input) {
  if (action === "reschedule") {
    assertEventDates(input);
    if (
      current.status === "scheduled" &&
      +current.startsAt === +input.startsAt &&
      +current.endsAt === +input.endsAt
    )
      throw new AppError(422, "UNCHANGED_SCHEDULE", "Indica un horario diferente.");
    return {
      status: "scheduled",
      startsAt: input.startsAt,
      endsAt: input.endsAt,
      scheduleNotice: input.reason,
      previousStartsAt: current.startsAt,
      previousEndsAt: current.endsAt,
    };
  }
  if (action === "postpone" && current.status !== "scheduled") throw eventConflict();
  if (action === "cancel" && current.status === "cancelled") throw eventConflict();
  return {
    status: action === "postpone" ? "postponed" : "cancelled",
    scheduleNotice: input.reason,
  };
}
