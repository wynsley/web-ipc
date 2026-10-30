import { randomUUID } from "node:crypto";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { handleError } from "./middleware/errors.js";
import { createAuthRepository } from "./modules/auth/authRepository.js";
import { createAuthService } from "./modules/auth/authService.js";
import { createAuthRoutes } from "./modules/auth/authRoutes.js";

export async function createApp({ db, config, clientIp }) {
  const app = new Hono();
  const service = await createAuthService(createAuthRepository(db), config);
  app.use("*", async (c, next) => {
    c.set("requestId", randomUUID());
    c.header("X-Request-Id", c.get("requestId"));
    await next();
  });
  app.use("*", secureHeaders());
  app.onError(handleError);
  app.notFound((c) =>
    c.json({ error: { code: "NOT_FOUND", message: "Ruta no encontrada." } }, 404),
  );
  app.route("/api/v1/auth", createAuthRoutes(service, config, clientIp));
  app.get("/", (c) =>
    c.json({
      message: "Backend del IPC iniciado",
    }),
  );

  return app;
}
