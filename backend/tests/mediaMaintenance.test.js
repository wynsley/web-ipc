import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createJwtContext } from "./helpers/jwtContext.js";
import { createLocalImageStorage } from "../src/infrastructure/storage/localImageStorage.js";
import { createImageMaintenanceRepository } from "../src/modules/media/imageMaintenanceRepository.js";
import { createImageMaintenanceService } from "../src/modules/media/imageMaintenanceService.js";

test("Medios: migración verificada, retención, referencias y reintento de borrado", async () => {
  const ctx = await createJwtContext();
  const directory = await mkdtemp(join(tmpdir(), "ipc-media-"));
  const storage = createLocalImageStorage(directory);
  const repo = createImageMaintenanceRepository(ctx.db);
  const service = createImageMaintenanceService(repo, storage, 7);
  const ids = [];
  const events = [];
  const now = new Date();
  const day = 86400000;
  async function add() {
    const id = randomUUID();
    ids.push(id);
    await ctx.db.image.create({
      data: { id, data: Buffer.from("legacy-image"), orphanedAt: new Date(now - day * 10) },
    });
    return id;
  }
  try {
    const legacy = await add();
    const result = await service.migrate();
    assert.ok(result.migrated >= 1);
    const migrated = await ctx.db.image.findUnique({ where: { id: legacy } });
    assert.equal(migrated.data, null);
    assert.equal((await storage.read(migrated.storageKey)).toString(), "legacy-image");
    for (const published of [false, true]) {
      const id = await add();
      const event = await ctx.db.event.create({
        data: {
          title: "Retención",
          description: "Prueba",
          location: "IPC",
          startsAt: new Date(now - day * 30),
          endsAt: new Date(now - day * 29),
          published,
          imageUrl: "/api/v1/media/" + id,
        },
      });
      events.push(event.id);
    }
    assert.equal((await service.cleanup(now)).failures, 0);
    assert.equal(await ctx.db.image.findUnique({ where: { id: legacy } }), null);
    assert.equal(await storage.read(migrated.storageKey), null);
    for (const id of ids.slice(1)) assert.ok(await ctx.db.image.findUnique({ where: { id } }));
    await ctx.db.event.deleteMany({ where: { id: { in: events } } });
    await service.cleanup(now);
    for (const id of ids.slice(1)) assert.ok(await ctx.db.image.findUnique({ where: { id } }));
    await service.cleanup(new Date(now.getTime() + 8 * day));
    for (const id of ids) assert.equal(await ctx.db.image.findUnique({ where: { id } }), null);
    const retryId = await add();
    await service.migrate();
    const failing = createImageMaintenanceService(
      repo,
      {
        ...storage,
        remove: async () => {
          throw new Error("disk unavailable");
        },
      },
      7,
    );
    assert.ok((await failing.cleanup(now)).failures >= 1);
    assert.ok((await ctx.db.image.findUnique({ where: { id: retryId } })).deletedAt);
    await service.cleanup(now);
    assert.equal(await ctx.db.image.findUnique({ where: { id: retryId } }), null);
    await assert.rejects(storage.read("../escape.webp"));
  } finally {
    await ctx.db.event.deleteMany({ where: { id: { in: events } } });
    await ctx.db.image.deleteMany({ where: { id: { in: ids } } });
    await ctx.db.$disconnect();
    await rm(directory, { recursive: true, force: true });
  }
});

test("Medios: limpiar y asociar concurrentemente no deja referencias rotas", async () => {
  const ctx = await createJwtContext();
  const ids = [];
  const eventIds = [];
  try {
    const session = await ctx.login();
    const repo = createImageMaintenanceRepository(ctx.db);
    for (let n = 0; n < 4; n++) {
      const id = randomUUID();
      ids.push(id);
      await ctx.db.image.create({
        data: { id, data: Buffer.from("image"), orphanedAt: new Date(0) },
      });
      const [claim, response] = await Promise.all([
        repo.claim(id, new Date(), new Date(Date.now() - 7 * 86400000)),
        ctx.app.request("/api/v1/admin/events", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.accessToken,
            "X-IPC-Client": "admin",
            "X-CSRF-Token": session.csrf,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Carrera de referencias",
            description: "Prueba",
            location: "IPC",
            startsAt: "2030-01-01T10:00:00-05:00",
            imageUrl: "/api/v1/media/" + id,
          }),
        }),
      ]);
      if (response.status === 201) {
        const event = (await response.json()).data;
        eventIds.push(event.id);
        assert.equal(claim, null);
        assert.equal((await ctx.db.image.findUnique({ where: { id } })).deletedAt, null);
      } else {
        assert.equal(response.status, 422);
        assert.ok(claim);
      }
    }
  } finally {
    await ctx.db.event.deleteMany({ where: { id: { in: eventIds } } });
    await ctx.db.image.deleteMany({ where: { id: { in: ids } } });
    await ctx.db.$disconnect();
  }
});
