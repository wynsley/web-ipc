import { randomUUID } from "node:crypto";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { handleError } from "./middleware/errors.js";
import { createAuthRepository } from "./modules/auth/authRepository.js";
import { createAuthService } from "./modules/auth/authService.js";
import { createAuthRoutes } from "./modules/auth/authRoutes.js";

import { createEventRepository } from "./modules/events/eventRepository.js";
import { createPublicEventRoutes, createAdminEventRoutes } from "./modules/events/eventRoutes.js";

import { createImageRepository } from "./modules/media/imageRepository.js";
import { createImageService } from "./modules/media/imageService.js";
import { createImageRoutes, createImageUploadRoutes } from "./modules/media/imageRoutes.js";

import { createLocalImageStorage } from "./infrastructure/storage/localImageStorage.js";

export async function createApp({
  db,
  config,
  clientIp,
  storage = createLocalImageStorage(config.mediaDirectory),
}) {
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
  const images = createImageService(createImageRepository(db), service, storage);
  app.route("/api/v1/admin/images", createImageUploadRoutes(images, service, config, clientIp));
  app.route("/api/v1/media", createImageRoutes(images));
  const events = createEventRepository(db);
  app.route("/api/v1/events", createPublicEventRoutes(events));
  app.route("/api/v1/admin/events", createAdminEventRoutes(events, service, config));
  app.get("/", (c) =>
    c.json({
      message: "Backend del IPC iniciado",
    }),
  );

  return app;
}
