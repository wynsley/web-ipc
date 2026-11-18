import { assertEventDates, eventConflict, scheduleChanges } from "./eventSchedulePolicy.js";
import { recordScheduleChange } from "./eventChangeRepository.js";
import { AppError } from "../../middleware/errors.js";
import { recordAudit } from "../audit/auditRepository.js";
import { isSessionActive, unauthorized } from "../auth/sessionPolicy.js";

const visible = {
  status: true,
  scheduleNotice: true,
  previousStartsAt: true,
  previousEndsAt: true,
  id: true,
  title: true,
  description: true,
  location: true,
  startsAt: true,
  endsAt: true,
  imageUrl: true,
  imageCrop: true,
  highlights: true,
  featured: true,
};
const orderBy = [{ startsAt: "asc" }, { id: "asc" }];
const pageSize = 20;
export const canManageEvents = (role) => role === "events" || role === "admin";
export const missingEvent = () => new AppError(404, "EVENT_NOT_FOUND", "Evento no encontrado.");

export function createEventRepository(db) {
  async function assertImage(tx, imageUrl) {
    if (!imageUrl?.startsWith("/api/v1/media/")) return;
    const imageId = imageUrl.split("/").pop();
    await tx.$queryRaw`SELECT id FROM images WHERE id = ${imageId}::uuid FOR UPDATE`;
    const image = await tx.image.findUnique({
      where: { id: imageUrl.split("/").pop() },
      select: { id: true, deletedAt: true },
    });
    if (!image || image.deletedAt)
      throw new AppError(422, "INVALID_IMAGE", "La imagen subida ya no está disponible.");
    await tx.image.update({ where: { id: imageId }, data: { orphanedAt: null } });
  }
  async function write(actor, requestId, action, operation) {
    return db.$transaction(async (tx) => {
      const session = await tx.session.findUnique({
        where: { id: actor.sessionId },
        include: { admin: true },
      });
      if (!isSessionActive(session)) throw unauthorized();
      if (!canManageEvents(session.admin.role))
        throw new AppError(403, "FORBIDDEN", "No tienes permisos para gestionar eventos.");
      const event = await operation(tx);
      await recordAudit(tx, action, actor.admin.id, event.id, requestId);
      return event;
    });
  }
  return {
    async list(page, publicOnly) {
      const rows = await db.event.findMany({
        where: publicOnly ? { published: true } : {},
        select: publicOnly ? visible : { ...visible, published: true, version: true },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize + 1,
      });
      return {
        events: rows.slice(0, pageSize),
        hasMore: rows.length > pageSize,
        serverTime: new Date().toISOString(),
      };
    },
    async history(id, page) {
      if (!(await db.event.findUnique({ where: { id }, select: { id: true } })))
        throw missingEvent();
      const changes = await db.eventChange.findMany({
        where: { eventId: id },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize + 1,
      });
      return { changes: changes.slice(0, pageSize), hasMore: changes.length > pageSize };
    },
    transition(actor, requestId, id, action, input) {
      return write(actor, requestId, "event." + action, async (tx) => {
        await tx.$queryRaw`SELECT id FROM events WHERE id = ${id}::uuid FOR UPDATE`;
        const current = await tx.event.findUnique({ where: { id } });
        if (!current) throw missingEvent();
        if (current.version !== input.version) throw eventConflict();
        const changes = scheduleChanges(current, action, input);
        const event = await tx.event.update({
          where: { id },
          data: { ...changes, version: { increment: 1 } },
        });
        await recordScheduleChange(tx, current, event, action, input.reason, actor);
        return event;
      });
    },
    async get(id) {
      const event = await db.event.findUnique({ where: { id } });
      if (!event) throw missingEvent();
      return event;
    },
    create(actor, requestId, data) {
      return write(actor, requestId, "event.created", async (tx) => {
        assertEventDates(data);
        await assertImage(tx, data.imageUrl);
        return tx.event.create({ data });
      });
    },
    update(actor, requestId, id, version, changes, action) {
      return write(actor, requestId, action, async (tx) => {
        const current = await tx.event.findUnique({ where: { id } });
        if (!current) throw missingEvent();
        assertEventDates({ ...current, ...changes });
        if (
          (changes.startsAt && +changes.startsAt !== +current.startsAt) ||
          (changes.endsAt !== undefined && +changes.endsAt !== +current.endsAt)
        ) {
          changes = {
            ...changes,
            previousStartsAt: current.startsAt,
            previousEndsAt: current.endsAt,
            scheduleNotice: "Horario actualizado.",
          };
        }
        await assertImage(tx, changes.imageUrl);
        const [event] = await tx.event.updateManyAndReturn({
          where: { id, version, published: changes.published === false },
          data: { ...changes, version: { increment: 1 } },
        });
        if (event) {
          if (+current.startsAt !== +event.startsAt || +current.endsAt !== +event.endsAt)
            await recordScheduleChange(
              tx,
              current,
              event,
              "draft_dates",
              "Corrección de fechas del borrador",
              actor,
            );
          return event;
        }
        if (!(await tx.event.findUnique({ where: { id }, select: { id: true } })))
          throw missingEvent();
        throw new AppError(
          409,
          "EVENT_CONFLICT",
          "El evento cambió o su estado impide esta acción. Actualiza la lista.",
        );
      });
    },
  };
}
