import assert from "node:assert/strict";
import { test } from "node:test";
import { createJwtContext } from "./helpers/jwtContext.js";
test("Eventos: reprogramar, posponer, cancelar y recuperar con historial atómico", async () => {
  const ctx = await createJwtContext();
  let id;
  try {
    const session = await ctx.login();
    const request = (path, input, extra = {}) =>
      ctx.app.request("/api/v1/admin/events" + path, {
        method: input ? "POST" : "GET",
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "X-CSRF-Token": session.csrf,
          "X-IPC-Client": "admin",
          "Content-Type": "application/json",
          ...extra,
        },
        ...(input && { body: JSON.stringify(input) }),
      });
    const initial = {
      title: "Conferencia",
      description: "Prueba de cambios",
      location: "IPC",
      startsAt: "2026-01-01T10:00:00-05:00",
      endsAt: "2026-01-01T12:00:00-05:00",
    };
    const created = await request("", initial);
    assert.equal(created.status, 201);
    id = (await created.json()).data.id;
    assert.equal((await request("/" + id + "/publish", { version: 1 })).status, 200);
    const replan = {
      version: 2,
      reason: "Cambio de horario por disponibilidad",
      startsAt: "2030-02-01T10:00:00-05:00",
      endsAt: "2030-02-02T12:00:00-05:00",
    };
    assert.equal(
      (await request("/" + id + "/reschedule", replan, { "X-CSRF-Token": "" })).status,
      403,
    );
    assert.equal(
      (await request("/" + id + "/reschedule", { ...replan, endsAt: initial.endsAt })).status,
      422,
    );
    await ctx.db.admin.update({ where: { id: session.admin.id }, data: { role: "admissions" } });
    assert.equal((await request("/" + id + "/reschedule", replan)).status, 403);
    assert.equal((await request("/" + id + "/history")).status, 403);
    await ctx.db.admin.update({ where: { id: session.admin.id }, data: { role: "events" } });
    const raced = await Promise.all([
      request("/" + id + "/reschedule", replan),
      request("/" + id + "/postpone", { version: 2, reason: "Por confirmar nueva fecha" }),
    ]);
    assert.deepEqual(raced.map((r) => r.status).sort(), [200, 409]);
    let current = (await (await request("/" + id)).json()).data;
    assert.equal(current.published, true);
    assert.equal(current.version, 3);
    if (current.status === "postponed") {
      assert.equal(
        (await request("/" + id + "/reschedule", { ...replan, version: 3 })).status,
        200,
      );
      current = (await (await request("/" + id)).json()).data;
    }
    assert.equal(
      (
        await request("/" + id + "/postpone", {
          version: current.version,
          reason: "Pendiente de confirmar sede",
        })
      ).status,
      200,
    );
    current = (await (await request("/" + id)).json()).data;
    assert.equal(current.status, "postponed");
    assert.equal(
      (
        await request("/" + id + "/postpone", {
          version: current.version,
          reason: "Aplazamiento duplicado",
        })
      ).status,
      409,
    );
    assert.equal(
      (
        await request("/" + id + "/cancel", {
          version: current.version,
          reason: "La actividad no podrá realizarse",
        })
      ).status,
      200,
    );
    current = (await (await request("/" + id)).json()).data;
    assert.equal(current.status, "cancelled");
    assert.equal(current.published, true);
    assert.equal(
      (
        await request("/" + id + "/cancel", {
          version: current.version,
          reason: "Cancelación repetida",
        })
      ).status,
      409,
    );
    assert.equal(
      (
        await request("/" + id + "/reschedule", {
          ...replan,
          version: current.version,
          reason: "La actividad vuelve a programarse",
        })
      ).status,
      200,
    );
    current = (await (await request("/" + id)).json()).data;
    assert.equal(current.status, "scheduled");
    assert.equal(current.published, true);
    const history = (await (await request("/" + id + "/history")).json()).data.changes;
    assert.equal(history.length, current.version - 2);
    assert.ok(
      history.every(
        (row) =>
          row.actorId === session.admin.id &&
          row.actorName &&
          row.reason &&
          row.before.startsAt &&
          row.after.startsAt,
      ),
    );
    const visible = (await (await ctx.app.request("/api/v1/events")).json()).data.events.find(
      (e) => e.id === id,
    );
    assert.equal(visible.status, "scheduled");
    assert.equal(visible.scheduleNotice, "La actividad vuelve a programarse");
    assert.equal("actorId" in visible, false);
  } finally {
    if (id) await ctx.db.event.deleteMany({ where: { id } });
    await ctx.db.$disconnect();
  }
});
