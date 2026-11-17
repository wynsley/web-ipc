import { Hono } from "hono";
import { requireAdmin, requireCsrf } from "../../middleware/authenticate.js";
import { readInput } from "../../middleware/readInput.js";
import {
  activateSchema,
  deactivateAccountSchema,
  registerSchema,
  reissueSchema,
} from "./authSchema.js";

export function createAccountRoutes(service, authenticated, throttle) {
  const routes = new Hono();
  routes.get("/accounts", authenticated, requireAdmin, async (c) =>
    c.json({ data: { accounts: await service.listAccounts() } }),
  );
  routes.post(
    "/accounts/deactivate",
    authenticated,
    requireAdmin,
    requireCsrf,
    throttle,
    async (c) => {
      const data = await readInput(c, deactivateAccountSchema);
      return c.json({
        data: await service.deactivateAccount(c.get("actor"), data.id, c.get("requestId")),
      });
    },
  );
  routes.post("/register", authenticated, requireAdmin, requireCsrf, throttle, async (c) => {
    const data = await readInput(c, registerSchema);
    return c.json({ data: await service.register(c.get("actor"), data, c.get("requestId")) }, 201);
  });
  routes.post(
    "/activation/reissue",
    authenticated,
    requireAdmin,
    requireCsrf,
    throttle,
    async (c) => {
      const data = await readInput(c, reissueSchema);
      return c.json({
        data: await service.reissue(data.email, c.get("actor"), c.get("requestId")),
      });
    },
  );
  routes.post("/activate", throttle, async (c) => {
    const data = await readInput(c, activateSchema);
    return c.json({ data: await service.activate(data, c.get("requestId")) });
  });
  return routes;
}
