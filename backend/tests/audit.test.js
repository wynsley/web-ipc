import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { test } from "node:test";
import { createJwtContext } from "./helpers/jwtContext.js";
import { finishTestLogin } from "./helpers/mfaLogin.js";

test("Auditoría: acceso exclusivo admin, filtros, enriquecimiento, inmutabilidad y exportación CSV", async () => {
  const ctx = await createJwtContext();
  const adminIds = [];
  const inquiryIds = [];
  try {
    const adminSession = await ctx.login();

    async function createActiveStaff(name, email, role) {
      const regRes = await ctx.request("/register", { name, email, role }, adminSession);
      assert.equal(regRes.status, 201);
      const invited = (await regRes.json()).data;
      adminIds.push(invited.admin.id);
      const password = randomBytes(24).toString("hex");
      const actRes = await ctx.request("/activate", { token: invited.activationToken, password });
      assert.equal(actRes.status, 200);
      const begin = await ctx.request("/login", { email, password });
      return ctx.read(await finishTestLogin(begin, ctx.request, ctx.db, ctx.config, email));
    }

    const admissionsSession = await createActiveStaff(
      "Operadora Admisión",
      "audit-admision@example.test",
      "admissions",
    );
    const eventsSession = await createActiveStaff(
      "Operador Eventos",
      "audit-eventos@example.test",
      "events",
    );

    // Crear una consulta pública (genera inquiry.created con actorId = null)
    const inqRes = await ctx.app.request("/api/v1/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Postulante Auditoría",
        email: "postulante-audit@example.test",
        phone: "987654321",
        address: "Jr. Bolívar #101, Celendín",
        career: "informatica",
        shift: "noche",
        message: "Consulta generada para validar trazabilidad en auditoría.",
      }),
    });
    assert.equal(inqRes.status, 201);
    const inquiryId = (await inqRes.json()).data.id;
    inquiryIds.push(inquiryId);

    const api = (session, path, method = "GET") =>
      ctx.app.request("/api/v1/admin/audit" + path, {
        method,
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "X-IPC-Client": "admin",
        },
      });

    // Sin sesión -> 401; admissions y events -> 403 en todo el módulo
    assert.equal((await ctx.app.request("/api/v1/admin/audit")).status, 401);
    assert.equal((await api(admissionsSession, "")).status, 403);
    assert.equal((await api(admissionsSession, "/actors")).status, 403);
    assert.equal((await api(admissionsSession, "/export")).status, 403);
    assert.equal((await api(eventsSession, "")).status, 403);
    assert.equal((await api(eventsSession, "/actors")).status, 403);
    assert.equal((await api(eventsSession, "/export")).status, 403);

    // Inmutabilidad: no existen rutas de escritura ni borrado
    assert.equal((await api(adminSession, "", "POST")).status, 404);
    assert.equal((await api(adminSession, "/" + inquiryId, "DELETE")).status, 404);

    // Listado general con enriquecimiento de actor/cuenta afectada y conteos por categoría
    const listRes = await api(adminSession, "");
    assert.equal(listRes.status, 200);
    assert.equal(listRes.headers.get("cache-control"), "no-store");
    const listData = (await listRes.json()).data;
    assert.ok(listData.entries.length > 0);
    assert.equal(listData.pageSize, 30);
    assert.equal(listData.total, listData.counts.all);
    assert.equal(listData.totalPages, Math.max(1, Math.ceil(listData.total / 30)));
    assert.ok(listData.counts.all >= listData.entries.length);
    assert.ok(listData.counts.admin >= 2);
    assert.ok(listData.counts.auth >= 2);
    assert.ok(listData.counts.inquiry >= 1);

    // Ninguna entrada expone correos ni secretos
    for (const entry of listData.entries) {
      if (entry.actor) {
        assert.equal("email" in entry.actor, false);
        assert.equal("passwordHash" in entry.actor, false);
      }
      if (entry.targetAdmin) {
        assert.equal("email" in entry.targetAdmin, false);
      }
    }

    // Filtro por categoría y actor=system (consulta pública)
    const sysRes = await api(adminSession, "?category=inquiry&actor=system&q=" + inquiryId);
    assert.equal(sysRes.status, 200);
    const sysData = (await sysRes.json()).data;
    assert.equal(sysData.entries.length, 1);
    assert.equal(sysData.entries[0].action, "inquiry.created");
    assert.equal(sysData.entries[0].actor, null);
    assert.equal(sysData.entries[0].targetId, inquiryId);

    // Filtro por actor específico y enriquecimiento de targetAdmin en admin.register
    const regAuditRes = await api(
      adminSession,
      "?category=admin&actor=" + adminSession.admin.id + "&q=admin.register",
    );
    assert.equal(regAuditRes.status, 200);
    const regEntries = (await regAuditRes.json()).data.entries;
    assert.ok(regEntries.some((entry) => entry.targetAdmin?.name === "Operadora Admisión"));

    // Validación de rango de fechas (from > to -> 422; fecha inválida -> 422)
    assert.equal((await api(adminSession, "?from=2026-12-10&to=2026-12-01")).status, 422);
    assert.equal((await api(adminSession, "?from=2026-02-30")).status, 422);
    const todayLima = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Lima" }).format(
      new Date(),
    );
    const todayRes = await api(adminSession, `?from=${todayLima}&to=${todayLima}`);
    assert.equal(todayRes.status, 200);
    assert.ok((await todayRes.json()).data.entries.length > 0);

    // Listado de actores incluye todas las cuentas sin exponer correos
    const actorsRes = await api(adminSession, "/actors");
    assert.equal(actorsRes.status, 200);
    const actors = (await actorsRes.json()).data.actors;
    assert.ok(actors.length >= 3);
    assert.ok(actors.every((actor) => !("email" in actor)));

    // Exportación CSV con UTF-8 BOM, no-store y registro de audit.exported
    const exportRes = await api(adminSession, "/export?category=inquiry&q=" + inquiryId);
    assert.equal(exportRes.status, 200);
    assert.equal(exportRes.headers.get("cache-control"), "no-store");
    assert.match(exportRes.headers.get("content-type"), /^text\/csv/);
    const csvBytes = Buffer.from(await exportRes.arrayBuffer());
    assert.deepEqual([...csvBytes.subarray(0, 3)], [0xef, 0xbb, 0xbf]);
    const csv = csvBytes.subarray(3).toString("utf8");
    assert.ok(csv.includes("inquiry.created"));
    assert.ok(csv.includes("Sistema / Público"));
    assert.ok(csv.includes(inquiryId));

    const exportAudit = await ctx.db.auditLog.findFirst({
      where: { action: "audit.exported", actorId: adminSession.admin.id },
    });
    assert.ok(exportAudit);
  } finally {
    await ctx.db.inquiry.deleteMany({ where: { id: { in: inquiryIds } } });
    await ctx.db.admin.deleteMany({ where: { id: { in: adminIds } } });
    await ctx.db.$disconnect();
  }
});
