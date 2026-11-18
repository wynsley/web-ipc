import { recordAudit } from "../audit/auditRepository.js";

export function createImageRepository(db) {
  return {
    create(id, storageKey, actorId, requestId) {
      return db.$transaction(async (tx) => {
        const image = await tx.image.create({
          data: { id, storageKey, orphanedAt: new Date() },
          select: { id: true },
        });
        await recordAudit(tx, "image.uploaded", actorId, image.id, requestId);
        return image;
      });
    },
    async isPublished(id) {
      const event = await db.event.findFirst({
        where: { imageUrl: "/api/v1/media/" + id, published: true },
        select: { id: true },
      });
      return Boolean(event);
    },
    findById(id) {
      return db.image.findUnique({
        where: { id },
        select: { data: true, storageKey: true, deletedAt: true },
      });
    },
  };
}
