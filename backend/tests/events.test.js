import assert from "node:assert/strict";
import { test } from "node:test";
import { createJwtContext } from "./helpers/jwtContext.js";

test("Eventos: permisos, borradores, publicación y retiro", async () => {
  const ctx = await createJwtContext();
  let id;
  try {
    const session = await ctx.login();
    const request = (path, method = "GET", input, headers = {}) =>
      ctx.app.request("/api/v1/admin/events" + path, {
        method,
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "Content-Type": "application/json",
          "X-IPC-Client": "admin",
          "X-CSRF-Token": session.csrf,
          ...headers,
        },
        ...(input && { body: JSON.stringify(input) }),
      });
    const visible = async () =>
      (await (await ctx.app.request("/api/v1/events")).json()).data.events.filter(
        (e) => e.id === id,
      );
    const data = {
      title: "Taller",
      description: "Capacitación",
      location: "Auditorio",
      startsAt: "2027-01-01T10:00:00-05:00",
    };
    assert.equal((await request("", "GET", null, { Authorization: "" })).status, 401);
    assert.equal((await request("", "POST", data, { "X-CSRF-Token": "" })).status, 403);
    assert.equal((await request("", "POST", { ...data, published: true })).status, 422);
    assert.equal((await request("/invalido")).status, 404);
    assert.equal(
      (await request("", "POST", { ...data, imageCrop: { x: 101, y: 50, zoom: 1 } })).status,
      422,
    );
    assert.equal(
      (await request("", "POST", { ...data, imageCrop: { x: 50, y: 50, zoom: 0 } })).status,
      422,
    );
    assert.equal(
      (await request("", "POST", { ...data, endsAt: "2027-01-01T09:00:00-05:00" })).status,
      422,
    );
    const res = await request("", "POST", data);
    assert.equal(res.status, 201);
    const event = (await res.json()).data;
    id = event.id;
    assert.equal(
      (await request("/" + id, "PATCH", { version: 1, endsAt: "2026-12-31T10:00:00-05:00" }))
        .status,
      422,
    );
    assert.equal(event.published, false);
    assert.equal(event.featured, false);
    assert.deepEqual(event.imageCrop, { x: 50, y: 50, zoom: 1 });
    assert.deepEqual(await visible(), []);
    const setRole = (role) =>
      ctx.db.admin.update({ where: { id: session.admin.id }, data: { role } });
    await setRole("admissions");
    assert.equal((await request("")).status, 403);
    assert.equal((await request("/" + id + "/publish", "POST", { version: 1 })).status, 403);
    await setRole("events");
    assert.equal((await request("/" + id)).status, 200);
    assert.equal(
      (
        await request("/" + id, "PATCH", {
          version: 1,
          title: "Nuevo taller",
          featured: true,
          imageCrop: { x: 25, y: 75, zoom: 2 },
          imageUrl: "https://example.test/taller.webp",
          highlights: ["Demostración"],
        })
      ).status,
      200,
    );
    assert.equal((await request("/" + id + "/publish", "POST", { version: 1 })).status, 409);
    const publish = () => request("/" + id + "/publish", "POST", { version: 2 });
    assert.deepEqual(
      (await Promise.all([publish(), publish()])).map((r) => r.status).sort(),
      [200, 409],
    );
    assert.deepEqual(await visible(), [
      {
        id,
        title: "Nuevo taller",
        imageUrl: "https://example.test/taller.webp",
        highlights: ["Demostración"],
        featured: true,
        imageCrop: { x: 25, y: 75, zoom: 2 },
        description: data.description,
        location: data.location,
        startsAt: "2027-01-01T15:00:00.000Z",
        endsAt: null,
        status: "scheduled",
        scheduleNotice: null,
        previousStartsAt: null,
        previousEndsAt: null,
      },
    ]);
    assert.equal((await request("/" + id, "PATCH", { version: 3, title: "Cambio" })).status, 409);
    assert.equal((await request("/" + id + "/unpublish", "POST", { version: 3 })).status, 200);
    assert.deepEqual(await visible(), []);
    assert.equal((await request("/" + id, "PATCH", { version: 4, featured: false })).status, 200);
    assert.equal((await request("/" + id + "/publish", "POST", { version: 5 })).status, 200);
    assert.equal((await visible())[0].featured, false);
    assert.equal(await ctx.db.auditLog.count({ where: { targetId: id } }), 6);
  } finally {
    if (id) await ctx.db.event.deleteMany({ where: { id } });
    await ctx.db.$disconnect();
  }
});

test("Eventos: filtros por pestaña y borrado seguro solo en borrador", async () => {
  const ctx = await createJwtContext();
  const ids = [];
  try {
    const session = await ctx.login();
    const request = (path, method = "GET", input, headers = {}) =>
      ctx.app.request("/api/v1/admin/events" + path, {
        method,
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "Content-Type": "application/json",
          "X-IPC-Client": "admin",
          "X-CSRF-Token": session.csrf,
          ...headers,
        },
        ...(input && { body: JSON.stringify(input) }),
      });
    async function create(overrides) {
      const res = await request("", "POST", {
        title: "Evento",
        description: "Prueba de organización",
        location: "IPC",
        startsAt: "2030-01-01T10:00:00-05:00",
        endsAt: "2030-01-01T12:00:00-05:00",
        ...overrides,
      });
      assert.equal(res.status, 201);
      const event = (await res.json()).data;
      ids.push(event.id);
      return event;
    }
    const draft = await create({ title: "Borrador interno" });
    const active = await create({ title: "Evento vigente" });
    const legacyActive = await create({
      title: "Heredado futuro sin fin",
      endsAt: null,
      startsAt: "2030-06-01T10:00:00-05:00",
    });
    const legacyPast = await create({
      title: "Heredado pasado sin fin",
      endsAt: null,
      startsAt: "2020-01-01T10:00:00-05:00",
    });
    const finished = await create({
      title: "Evento finalizado",
      startsAt: "2021-01-01T10:00:00-05:00",
      endsAt: "2021-01-01T12:00:00-05:00",
    });
    const cancelled = await create({
      title: "Evento cancelado antiguo",
      startsAt: "2021-02-01T10:00:00-05:00",
      endsAt: "2021-02-01T12:00:00-05:00",
    });
    for (const item of [active, legacyActive, legacyPast, finished, cancelled]) {
      assert.equal((await request("/" + item.id + "/publish", "POST", { version: 1 })).status, 200);
    }
    assert.equal(
      (
        await request("/" + cancelled.id + "/cancel", "POST", {
          version: 2,
          reason: "Suspendido por prueba",
        })
      ).status,
      200,
    );
    assert.equal((await request("?scope=invalido")).status, 422);
    const listBy = async (scope) => (await (await request("?scope=" + scope)).json()).data;
    const publishedList = await listBy("published");
    const draftsList = await listBy("drafts");
    const pastList = await listBy("past");
    const allList = await listBy("all");
    assert.deepEqual(
      publishedList.events.map((e) => e.id).sort(),
      [active.id, legacyActive.id, cancelled.id].sort(),
    );
    assert.deepEqual(
      draftsList.events.map((e) => e.id),
      [draft.id],
    );
    assert.deepEqual(
      pastList.events.map((e) => e.id),
      [finished.id, legacyPast.id],
    );
    assert.deepEqual(allList.counts, { published: 3, drafts: 1, past: 2, all: 6 });

    // Seguridad y reglas de borrado
    assert.equal(
      (await request("/" + draft.id, "DELETE", { version: 1 }, { "X-CSRF-Token": "" })).status,
      403,
    );
    assert.equal((await request("/" + active.id, "DELETE", { version: 2 })).status, 409);
    assert.equal((await request("/" + finished.id, "DELETE", { version: 2 })).status, 409);
    await ctx.db.admin.update({ where: { id: session.admin.id }, data: { role: "admissions" } });
    assert.equal((await request("/" + draft.id, "DELETE", { version: 1 })).status, 403);
    await ctx.db.admin.update({ where: { id: session.admin.id }, data: { role: "events" } });

    // Concurrencia entre eliminar y publicar
    const raced = await Promise.all([
      request("/" + draft.id, "DELETE", { version: 1 }),
      request("/" + draft.id + "/publish", "POST", { version: 1 }),
    ]);
    const statuses = raced.map((r) => r.status).sort();
    assert.ok(
      (statuses[0] === 200 && statuses[1] === 409) || (statuses[0] === 204 && statuses[1] === 404),
    );
    if (statuses[0] === 200) {
      assert.equal(
        (await request("/" + draft.id + "/unpublish", "POST", { version: 2 })).status,
        200,
      );
      assert.equal((await request("/" + draft.id, "DELETE", { version: 3 })).status, 204);
    }

    // Retirar un evento finalizado antiguo y eliminarlo definitivamente
    assert.equal(
      (await request("/" + finished.id + "/unpublish", "POST", { version: 2 })).status,
      200,
    );
    assert.equal((await request("/" + finished.id, "DELETE", { version: 2 })).status, 409);
    assert.equal((await request("/" + finished.id, "DELETE", { version: 3 })).status, 204);
    assert.equal((await request("/" + finished.id)).status, 404);
    const deletedAudit = await ctx.db.auditLog.findFirst({
      where: { targetId: finished.id, action: "event.deleted" },
    });
    assert.ok(deletedAudit);
  } finally {
    await ctx.db.event.deleteMany({ where: { id: { in: ids } } });
    await ctx.db.$disconnect();
  }
});
