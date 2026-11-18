export function createImageMaintenanceRepository(db) {
  return {
    list(cursor) {
      return db.image.findMany({
        orderBy: { id: "asc" },
        take: 100,
        ...(cursor && { where: { id: { gt: cursor } } }),
        select: { id: true },
      });
    },
    async claim(id, now, before) {
      return db.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT id FROM images WHERE id = ${id}::uuid FOR UPDATE`;
        const image = await tx.image.findUnique({ where: { id } });
        if (!image) return null;
        const reference = await tx.event.findFirst({
          where: { imageUrl: "/api/v1/media/" + id },
          select: { id: true },
        });
        if (reference) {
          if (image.orphanedAt)
            await tx.image.update({ where: { id }, data: { orphanedAt: null } });
          return null;
        }
        if (!image.orphanedAt && !image.deletedAt) {
          await tx.image.update({ where: { id }, data: { orphanedAt: now } });
          return null;
        }
        if (!image.deletedAt && image.orphanedAt > before) return null;
        return tx.image.update({
          where: { id },
          data: { deletedAt: image.deletedAt ?? now },
          select: { id: true, storageKey: true },
        });
      });
    },
    finish(id) {
      return db.image.deleteMany({ where: { id, deletedAt: { not: null } } });
    },
    async hasKey(storageKey) {
      return Boolean(await db.image.findUnique({ where: { storageKey }, select: { id: true } }));
    },
    legacy() {
      return db.image.findMany({
        where: { data: { not: null }, storageKey: null, deletedAt: null },
        take: 100,
        select: { id: true, data: true },
      });
    },
    migrate(id, storageKey) {
      return db.image.updateMany({
        where: { id, storageKey: null, deletedAt: null },
        data: { storageKey, data: null },
      });
    },
  };
}
