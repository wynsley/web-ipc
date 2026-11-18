import { randomUUID } from "node:crypto";

export function createImageMaintenanceService(repository, storage, retentionDays = 7) {
  return {
    async cleanup(now = new Date()) {
      const before = new Date(now.getTime() - retentionDays * 86400000);
      let cursor;
      let removed = 0;
      let failures = 0;
      while (true) {
        const rows = await repository.list(cursor);
        if (!rows.length) break;
        for (const row of rows) {
          try {
            const image = await repository.claim(row.id, now, before);
            if (!image) continue;
            if (image.storageKey) await storage.remove(image.storageKey);
            await repository.finish(image.id);
            removed++;
          } catch {
            failures++;
          }
        }
        cursor = rows.at(-1).id;
      }
      for (const key of await storage.oldKeys(before)) {
        if (!(await repository.hasKey(key))) await storage.remove(key);
      }
      return { removed, failures };
    },
    async migrate() {
      let migrated = 0;
      while (true) {
        const rows = await repository.legacy();
        if (!rows.length) break;
        for (const image of rows) {
          const key = randomUUID() + ".webp";
          await storage.write(key, image.data);
          const stored = await storage.read(key);
          if (!stored || !Buffer.from(image.data).equals(stored))
            throw new Error("Image verification failed");
          const result = await repository.migrate(image.id, key);
          if (result.count) migrated++;
          else await storage.remove(key);
        }
      }
      return { migrated };
    },
  };
}
