import { Hono } from "hono";
import { authenticate, requireCsrf } from "../../middleware/authenticate.js";
import { adminRequest, noStore } from "../../middleware/adminRequest.js";
import { limitBody } from "../../middleware/requestBody.js";
import { AppError } from "../../middleware/errors.js";
import { IMAGE_MAX_BYTES } from "./imageService.js";

export function createImageUploadRoutes(images, auth, config, clientIp) {
  const routes = new Hono();
  routes.post(
    "/",
    noStore,
    adminRequest(config),
    authenticate(auth),
    requireCsrf,
    async (c, next) => {
      images.assertCanUpload(c.get("actor"));
      await auth.throttleMediaUpload(clientIp(c), c.get("actor").admin.id);
      await next();
    },
    limitBody(IMAGE_MAX_BYTES + 64 * 1024),
    async (c) => {
      if (!c.req.header("Content-Type")?.toLowerCase().startsWith("multipart/form-data;"))
        throw new AppError(415, "MULTIPART_REQUIRED", "Envía la imagen como formulario multipart.");
      let form;
      try {
        form = await c.req.formData();
      } catch {
        throw new AppError(400, "INVALID_FORM", "Formulario de imagen inválido.");
      }
      if ([...form.keys()].length !== 1 || !form.has("image"))
        throw new AppError(422, "INVALID_IMAGE", "Selecciona una sola imagen.");
      const image = await images.upload(form.get("image"), c.get("actor"), c.get("requestId"));
      return c.json({ data: image }, 201);
    },
  );
  return routes;
}

export function createImageRoutes(images) {
  const routes = new Hono();
  routes.get("/:id", async (c) => {
    c.header("Cache-Control", "no-store");
    c.header("X-Content-Type-Options", "nosniff");
    c.header("Vary", "Authorization");
    const match = /^Bearer ([A-Za-z0-9_.-]+)$/i.exec(c.req.header("Authorization") ?? "");
    const result = await images.read(c.req.param("id"), match?.[1], c.req.header("If-None-Match"));
    if (result.isPublic) {
      c.header("Cache-Control", "public, no-cache");
      c.header("ETag", result.etag);
    } else {
      c.header("Cache-Control", "private, no-store");
    }
    if (result.notModified) return c.body(null, 304);
    c.header("Content-Type", "image/webp");
    return c.body(result.data);
  });
  return routes;
}
