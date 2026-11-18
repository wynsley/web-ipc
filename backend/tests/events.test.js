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
