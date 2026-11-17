import { Hono } from "hono";
import { requireAdmin, requireCsrf } from "../../middleware/authenticate.js";
import { readInput } from "../../middleware/readInput.js";
import {
  activateSchema,
  reauthSchema,
  changePasswordSchema,
  issueRecoverySchema,
} from "./authSchema.js";

export function createRecoveryRoutes(service, authenticated, throttle) {
  const routes = new Hono();
  routes.post("/password/change", authenticated, requireCsrf, throttle, async (c) => {
    const data = await readInput(c, changePasswordSchema);
    return c.json({ data: await service.changePassword(c.get("actor"), data, c.get("requestId")) });
  });
  routes.post("/recovery/codes", authenticated, requireCsrf, throttle, async (c) => {
    const data = await readInput(c, reauthSchema);
    return c.json({
      data: await service.regenerateCodes(c.get("actor"), data, c.get("requestId")),
    });
  });
  routes.post("/recovery/issue", authenticated, requireAdmin, requireCsrf, throttle, async (c) => {
    const data = await readInput(c, issueRecoverySchema);
    return c.json({ data: await service.issueRecovery(c.get("actor"), data, c.get("requestId")) });
  });
  routes.post("/recovery/complete", throttle, async (c) => {
    const data = await readInput(c, activateSchema);
    return c.json({ data: await service.redeemRecovery(data, c.get("requestId")) });
  });
  return routes;
}
