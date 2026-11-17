import { Hono } from "hono";
import { adminRequest, noStore } from "../../middleware/adminRequest.js";
import { authenticate } from "../../middleware/authenticate.js";
import { jsonBody } from "../../middleware/requestBody.js";
import { createAccountRoutes } from "./accountRoutes.js";
import { createCredentialRoutes } from "./credentialRoutes.js";
import { createRecoveryRoutes } from "./recoveryRoutes.js";

export function createAuthRoutes(service, config, clientIp) {
  const routes = new Hono();
  routes.use("*", noStore, adminRequest(config), ...jsonBody());
  const authenticated = authenticate(service);
  routes.use("*", async (c, next) => {
    c.set("clientIp", clientIp(c));
    await next();
  });
  const throttle = async (c, next) => {
    await service.throttle(c.get("clientIp"));
    await next();
  };
  routes.route("/", createCredentialRoutes(service, config, throttle));
  routes.route("/", createRecoveryRoutes(service, authenticated, throttle));
  routes.route("/", createAccountRoutes(service, authenticated, throttle));
  routes.get("/me", authenticated, (c) =>
    c.json({ data: { admin: c.get("actor").admin, csrfToken: c.get("actor").csrfToken } }),
  );
  return routes;
}
