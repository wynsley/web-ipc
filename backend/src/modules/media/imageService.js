import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { z } from "zod";
import { canManageEvents } from "../events/eventRepository.js";
import { AppError } from "../../middleware/errors.js";

export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
function matchesEtag(header, etag) {
  if (!header) return false;
  return header
    .split(",")
    .map((part) => part.trim())
    .some((part) => part === "*" || part === etag || part === `W/${etag}`);
}
export async function normalizeImage(file) {
  if (!(file instanceof File) || !file.size || file.size > IMAGE_MAX_BYTES)
    throw new AppError(
      422,
      "INVALID_IMAGE",
      "Selecciona una imagen JPG, PNG o WebP de hasta 5 MB.",
    );
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const options = { limitInputPixels: 25_000_000, failOn: "warning" };
    const metadata = await sharp(buffer, options).metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format) || (metadata.pages ?? 1) > 1)
      throw new Error("format");
    return await sharp(buffer, options)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
  } catch {
    throw new AppError(
      422,
      "INVALID_IMAGE",
      "La imagen debe ser JPG, PNG o WebP estática, válida y de hasta 25 megapíxeles.",
    );
  }
}

export function createImageService(repository, auth, storage) {
  function assertCanUpload(actor) {
    if (!canManageEvents(actor.admin.role))
      throw new AppError(403, "FORBIDDEN", "No tienes permisos para subir imágenes.");
  }
  return {
    assertCanUpload,
    async upload(file, actor, requestId) {
      assertCanUpload(actor);
      const data = await normalizeImage(file);
      const id = randomUUID();
      const key = id + ".webp";
      await storage.write(key, data);
      let image;
      try {
        image = await repository.create(id, key, actor.admin.id, requestId);
      } catch (error) {
        await storage.remove(key).catch(() => {});
        throw error;
      }
      return { imageUrl: "/api/v1/media/" + image.id };
    },
    async read(id, accessToken, ifNoneMatch) {
      const missing = () => new AppError(404, "IMAGE_NOT_FOUND", "Imagen no encontrada.");
      if (!z.uuid().safeParse(id).success) throw missing();
      const isPublic = await repository.isPublished(id);
      if (!isPublic) {
        if (!accessToken) throw missing();
        const actor = await auth.authenticate(accessToken);
        if (!canManageEvents(actor.admin.role)) throw missing();
      }
      const image = await repository.findById(id);
      if (!image || image.deletedAt) throw missing();
      const etag = `"${id}"`;
      if (isPublic && matchesEtag(ifNoneMatch, etag)) {
        return { isPublic, etag, notModified: true, data: null };
      }
      const data = image.storageKey ? await storage.read(image.storageKey) : image.data;
      if (!data) throw missing();
      return { isPublic, etag, notModified: false, data };
    },
  };
}
