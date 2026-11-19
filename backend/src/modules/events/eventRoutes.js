import { Hono } from "hono";
import { z } from "zod";
import { authenticate, requireCsrf } from "../../middleware/authenticate.js";
import { adminRequest, noStore } from "../../middleware/adminRequest.js";
import { jsonBody } from "../../middleware/requestBody.js";
import { readInput } from "../../middleware/readInput.js";
import { AppError } from "../../middleware/errors.js";
import { canManageEvents, missingEvent } from "./eventRepository.js";
import {
  eventFields,
  editInput,
  versionInput,
  scheduleActionInput,
  rescheduleInput,
} from "./eventSchema.js";

function page(c) {
  const result = z.coerce
    .number()
    .int()
    .min(1)
    .max(100000)
    .safeParse(c.req.query("page") ?? 1);
  if (!result.success) throw new AppError(422, "INVALID_PAGE", "Página inválida.");
  return result.data;
}
function scope(c) {
  const result = z
    .enum(["all", "published", "drafts", "past"])
    .safeParse(c.req.query("scope") ?? "all");
  if (!result.success) throw new AppError(422, "INVALID_SCOPE", "Filtro de eventos inválido.");
  return result.data;
}
export function createPublicEventRoutes(events) {
  const routes = new Hono();
  routes.get("/", noStore, async (c) => c.json({ data: await events.list(page(c), true) }));
  return routes;
}

export function createAdminEventRoutes(events, auth, config) {
  const routes = new Hono();
  routes.use(
    "*",
    noStore,
    adminRequest(config),
    authenticate(auth),
    async (c, next) => {
      if (!canManageEvents(c.get("actor").admin.role))
        throw new AppError(403, "FORBIDDEN", "No tienes permisos para gestionar eventos.");
      await next();
    },
    ...jsonBody(),
  );
  routes.use("/:id/*", async (c, next) => {
    if (!z.uuid().safeParse(c.req.param("id")).success) throw missingEvent();
    await next();
  });
  routes.get("/", async (c) => c.json({ data: await events.list(page(c), false, scope(c)) }));
  routes.get("/:id/history", async (c) =>
    c.json({ data: await events.history(c.req.param("id"), page(c)) }),
  );
  for (const action of ["reschedule", "postpone", "cancel"]) {
    routes.post("/:id/" + action, requireCsrf, async (c) => {
      const input = await readInput(
        c,
        action === "reschedule" ? rescheduleInput : scheduleActionInput,
      );
      return c.json({
        data: await events.transition(
          c.get("actor"),
          c.get("requestId"),
          c.req.param("id"),
          action,
          input,
        ),
      });
    });
  }
  routes.get("/:id", async (c) => c.json({ data: await events.get(c.req.param("id")) }));
  routes.post("/", requireCsrf, async (c) =>
    c.json(
      {
        data: await events.create(
          c.get("actor"),
          c.get("requestId"),
          await readInput(c, eventFields),
        ),
      },
      201,
    ),
  );
  routes.patch("/:id", requireCsrf, async (c) => {
    const { version, ...changes } = await readInput(c, editInput);
    return c.json({
      data: await events.update(
        c.get("actor"),
        c.get("requestId"),
        c.req.param("id"),
        version,
        changes,
        "event.edited",
      ),
    });
  });
  for (const [path, published, action] of [
    ["publish", true, "event.published"],
    ["unpublish", false, "event.withdrawn"],
  ]) {
    routes.post("/:id/" + path, requireCsrf, async (c) => {
      const { version } = await readInput(c, versionInput);
      return c.json({
        data: await events.update(
          c.get("actor"),
          c.get("requestId"),
          c.req.param("id"),
          version,
          { published },
          action,
        ),
      });
    });
  }
  routes.delete("/:id", requireCsrf, async (c) => {
    const { version } = await readInput(c, versionInput);
    await events.remove(c.get("actor"), c.get("requestId"), c.req.param("id"), version);
    return c.body(null, 204);
  });
  return routes;
}
