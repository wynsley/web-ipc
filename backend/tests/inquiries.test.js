import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { test } from "node:test";
import { digest } from "../src/modules/auth/authCrypto.js";
import { safeCsvCell } from "../src/modules/inquiries/inquiryCsv.js";
import { createInquiryMaintenanceService } from "../src/modules/inquiries/inquiryMaintenanceService.js";
import { createJwtContext } from "./helpers/jwtContext.js";
import { finishTestLogin } from "./helpers/mfaLogin.js";

const validPayload = {
  name: "María José Quispe",
  email: "Maria.Quispe@outlook.com",
  phone: "+51 987-654-321",
  address: "Jr. Lima #234, Celendín - Cajamarca",
  career: "administracion",
  shift: "manana",
  message: "Quisiera información sobre vacantes y horarios de matrícula.",
};

test("Consultas públicas: validación, adaptador /contact, idempotencia y límite anti-spam", async () => {
  const ctx = await createJwtContext();
  const ids = [];
  try {
    const submit = (path, body, headers = {}) =>
      ctx.app.request(path, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(body),
      });

    // Rechaza campos inválidos y campos extra con errores por campo
    const bad = await submit("/api/v1/inquiries", {
      ...validPayload,
      email: "no-es-correo",
      career: "medicina",
      extra: "bloqueado",
    });
    assert.equal(bad.status, 422);
    const badBody = await bad.json();
    assert.ok(badBody.error.fields.email);
    assert.ok(badBody.error.fields.career);
    assert.ok(badBody.error.fields._form);

    // Rechaza clave de idempotencia inválida
    assert.equal(
      (await submit("/api/v1/inquiries", validPayload, { "Idempotency-Key": "corta" })).status,
      422,
    );

    // Envío válido en /api/v1/inquiries con clave de idempotencia y reintento concurrente
    const key = "inq-test-" + randomBytes(8).toString("hex");
    const [first, second] = await Promise.all([
      submit("/api/v1/inquiries", validPayload, { "Idempotency-Key": key }),
      submit("/api/v1/inquiries", validPayload, { "Idempotency-Key": key }),
    ]);
    assert.deepEqual([first.status, second.status].sort(), [200, 201]);
    const bodyA = (await first.json()).data;
    const bodyB = (await second.json()).data;
    assert.equal(bodyA.id, bodyB.id);
    assert.equal(bodyA.status, "new");
    assert.equal("notes" in bodyA, false);
    assert.equal("email" in bodyA, false);
    ids.push(bodyA.id);

    // Adaptador transicional /contact usa la misma lógica y normaliza email
    const viaContact = await submit("/contact", {
      ...validPayload,
      email: "postulante@ipc.edu.pe",
      career: "informatica",
      shift: "noche",
    });
    assert.equal(viaContact.status, 201);
    const contactId = (await viaContact.json()).data.id;
    ids.push(contactId);
    const stored = await ctx.db.inquiry.findUnique({ where: { id: contactId } });
    assert.equal(stored.email, "postulante@ipc.edu.pe");

    // Límite anti-spam independiente del login
    await ctx.db.authRateLimit.update({
      where: { key: digest("inquiry-ip:jwt-tests") },
      data: { hits: 5 },
    });
    assert.equal((await submit("/api/v1/inquiries", validPayload)).status, 429);
    const loginAttempt = await ctx.app.request("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-IPC-Client": "admin" },
      body: JSON.stringify({ email: "otro@ipc.test", password: "ClaveDePruebaSegura123!" }),
    });
    assert.equal(loginAttempt.status, 401);
  } finally {
    await ctx.db.inquiry.deleteMany({ where: { id: { in: ids } } });
    await ctx.db.$disconnect();
  }
});

test("Consultas administrativas: permisos por rol, toma atómica, asignación, estados, notas y CSV seguro", async () => {
  const ctx = await createJwtContext();
  const ids = [];
  const adminIds = [];
  try {
    const adminSession = await ctx.login();

    // Crear una cuenta activa con rol admissions y otra con rol events
    async function createActiveStaff(name, email, role) {
      const regRes = await ctx.request("/register", { name, email, role }, adminSession);
      assert.equal(regRes.status, 201);
      const invited = (await regRes.json()).data;
      adminIds.push(invited.admin.id);
      const password = randomBytes(24).toString("hex");
      const actRes = await ctx.request("/activate", { token: invited.activationToken, password });
      assert.equal(actRes.status, 200);
      const begin = await ctx.request("/login", { email, password });
      const session = await ctx.read(
        await finishTestLogin(begin, ctx.request, ctx.db, ctx.config, email),
      );
      return session;
    }

    const admissionsSession = await createActiveStaff(
      "Operadora Admisión",
      "admision@example.test",
      "admissions",
    );
    const eventsSession = await createActiveStaff(
      "Operador Eventos",
      "eventos@example.test",
      "events",
    );

    const api = (session, path, method = "GET", input, extra = {}) =>
      ctx.app.request("/api/v1/admin/inquiries" + path, {
        method,
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "Content-Type": "application/json",
          "X-IPC-Client": "admin",
          "X-CSRF-Token": session.csrf,
          ...extra,
        },
        ...(input && { body: JSON.stringify(input) }),
      });

    // Crear 2 consultas (una con fórmula peligrosa para probar CSV)
    const firstRes = await ctx.app.request("/api/v1/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });
    assert.equal(firstRes.status, 201);
    const inq1 = (await firstRes.json()).data.id;
    ids.push(inq1);

    const secondRes = await ctx.app.request("/api/v1/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...validPayload,
        name: "Carlos Vega",
        email: "carlos@empresa.pe",
        career: "contabilidad",
        shift: "tarde",
        message: "=CMD|' /C calc'!A0 consulta maliciosa",
      }),
    });
    assert.equal(secondRes.status, 201);
    const inq2 = (await secondRes.json()).data.id;
    ids.push(inq2);

    // Sin sesión -> 401; rol events -> 403 en todo el módulo
    assert.equal((await ctx.app.request("/api/v1/admin/inquiries")).status, 401);
    assert.equal((await api(eventsSession, "")).status, 403);
    assert.equal((await api(eventsSession, "/" + inq1)).status, 403);
    assert.equal((await api(eventsSession, "/assignees")).status, 403);
    assert.equal((await api(eventsSession, "/export")).status, 403);
    assert.equal(
      (await api(eventsSession, "/" + inq1 + "/claim", "POST", { version: 1 })).status,
      403,
    );

    // Rutas estáticas /assignees y /export no colisionan con validación UUID /:id
    const assigneesRes = await api(admissionsSession, "/assignees");
    assert.equal(assigneesRes.status, 200);
    const assignees = (await assigneesRes.json()).data.assignees;
    assert.equal(assignees.length, 2);
    assert.ok(assignees.every((a) => a.role !== "events" && !("email" in a)));
    assert.equal((await api(admissionsSession, "/no-es-uuid")).status, 404);

    // CSRF requerido en mutaciones
    assert.equal(
      (
        await api(
          admissionsSession,
          "/" + inq1 + "/claim",
          "POST",
          { version: 1 },
          { "X-CSRF-Token": "" },
        )
      ).status,
      403,
    );

    // Toma atómica concurrente: solo uno de los dos operadores logra tomarla
    const raced = await Promise.all([
      api(admissionsSession, "/" + inq1 + "/claim", "POST", { version: 1 }),
      api(adminSession, "/" + inq1 + "/claim", "POST", { version: 1 }),
    ]);
    assert.deepEqual(raced.map((r) => r.status).sort(), [200, 409]);
    const claimed = (await (await api(adminSession, "/" + inq1)).json()).data;
    assert.equal(claimed.status, "in_progress");
    assert.equal(claimed.version, 2);
    assert.ok(claimed.assignedToId);

    // Solo admin puede reasignar; admissions recibe 403
    assert.equal(
      (
        await api(admissionsSession, "/" + inq1 + "/assign", "PATCH", {
          version: 2,
          assigneeId: admissionsSession.admin.id,
        })
      ).status,
      403,
    );
    // Admin no puede asignar a un usuario con rol events
    assert.equal(
      (
        await api(adminSession, "/" + inq1 + "/assign", "PATCH", {
          version: 2,
          assigneeId: eventsSession.admin.id,
        })
      ).status,
      422,
    );
    // Admin reasigna a admissions y luego libera asignación
    const reassigned = await api(adminSession, "/" + inq1 + "/assign", "PATCH", {
      version: 2,
      assigneeId: admissionsSession.admin.id,
    });
    assert.equal(reassigned.status, 200);
    assert.equal((await reassigned.json()).data.assignedToId, admissionsSession.admin.id);

    // Notas internas no alteran el mensaje original
    const noteRes = await api(admissionsSession, "/" + inq1 + "/notes", "POST", {
      body: "Llamada realizada; interesada en turno mañana.",
    });
    assert.equal(noteRes.status, 201);
    const detail = (await (await api(admissionsSession, "/" + inq1)).json()).data;
    assert.equal(detail.message, validPayload.message);
    assert.equal(detail.notes.length, 1);
    assert.equal(detail.notes[0].authorName, "Operadora Admisión");

    // Cambios de estado, versión optimista y resolvedAt
    assert.equal(
      (
        await api(admissionsSession, "/" + inq1 + "/status", "PATCH", {
          version: 2,
          status: "resolved",
        })
      ).status,
      409,
    );
    assert.equal(
      (
        await api(admissionsSession, "/" + inq1 + "/status", "PATCH", {
          version: 3,
          status: "in_progress",
        })
      ).status,
      422,
    );
    const resolved = await api(admissionsSession, "/" + inq1 + "/status", "PATCH", {
      version: 3,
      status: "resolved",
    });
    assert.equal(resolved.status, 200);
    const resolvedData = (await resolved.json()).data;
    assert.ok(resolvedData.resolvedAt);
    const archived = await api(admissionsSession, "/" + inq1 + "/status", "PATCH", {
      version: 4,
      status: "archived",
    });
    assert.equal(archived.status, 200);
    assert.equal((await archived.json()).data.resolvedAt, resolvedData.resolvedAt);

    // Listado, filtros y conteos disjuntos
    const listedAll = (await (await api(admissionsSession, "")).json()).data;
    assert.equal(listedAll.total, 2);
    assert.equal(listedAll.pageSize, 20);
    assert.equal(listedAll.totalPages, 1);
    assert.deepEqual(listedAll.counts, {
      new: 1,
      in_progress: 0,
      resolved: 0,
      archived: 1,
      all: 2,
    });
    const filtered = (
      await (
        await api(admissionsSession, "?status=new&career=contabilidad&assigned=unassigned&q=Carlos")
      ).json()
    ).data;
    assert.deepEqual(
      filtered.inquiries.map((i) => i.id),
      [inq2],
    );

    // Exportación CSV neutraliza fórmulas, usa no-store y deja auditoría sin PII
    const exportRes = await api(admissionsSession, "/export?status=new");
    assert.equal(exportRes.status, 200);
    assert.equal(exportRes.headers.get("cache-control"), "no-store");
    assert.match(exportRes.headers.get("content-type"), /^text\/csv/);
    const csvBytes = Buffer.from(await exportRes.arrayBuffer());
    assert.deepEqual([...csvBytes.subarray(0, 3)], [0xef, 0xbb, 0xbf]);
    const csv = csvBytes.subarray(3).toString("utf8");
    assert.ok(csv.includes("'=CMD|' /C calc'!A0 consulta maliciosa"));
    assert.ok(csv.includes("'+51 987-654-321"));
    assert.equal(safeCsvCell("=SUM(A1)"), "'=SUM(A1)");
    assert.equal(safeCsvCell("  @HYPERLINK(1)"), "'  @HYPERLINK(1)");
    assert.equal(safeCsvCell("\t+1"), "'\t+1");

    const exportAudit = await ctx.db.auditLog.findFirst({
      where: { action: "inquiry.exported", actorId: admissionsSession.admin.id },
    });
    assert.ok(exportAudit);
  } finally {
    await ctx.db.inquiry.deleteMany({ where: { id: { in: ids } } });
    await ctx.db.admin.deleteMany({ where: { id: { in: adminIds } } });
    await ctx.db.$disconnect();
  }
});

test("Consultas: ciclo de vida guiado, avance automático con nota y auto-archivado a los 30 días", async () => {
  const ctx = await createJwtContext();
  const ids = [];
  try {
    const adminSession = await ctx.login();
    const api = (path, method = "GET", input) =>
      ctx.app.request("/api/v1/admin/inquiries" + path, {
        method,
        headers: {
          Authorization: "Bearer " + adminSession.accessToken,
          "Content-Type": "application/json",
          "X-IPC-Client": "admin",
          "X-CSRF-Token": adminSession.csrf,
        },
        ...(input && { body: JSON.stringify(input) }),
      });

    async function createPublicInquiry(name) {
      const res = await ctx.app.request("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validPayload, name }),
      });
      assert.equal(res.status, 201);
      const id = (await res.json()).data.id;
      ids.push(id);
      return id;
    }

    // 1. Transiciones inválidas bloqueadas y avance automático al escribir primera nota
    const inqAuto = await createPublicInquiry("Lucía Paredes");
    // No permite saltar directo de new -> resolved
    const skipToResolved = await api("/" + inqAuto + "/status", "PATCH", {
      version: 1,
      status: "resolved",
    });
    assert.equal(skipToResolved.status, 422);
    assert.equal((await skipToResolved.json()).error.code, "INVALID_STATUS_TRANSITION");

    // Escribir la primera nota sobre una consulta nueva la pasa a in_progress y la asigna al autor
    const firstNoteRes = await api("/" + inqAuto + "/notes", "POST", {
      body: "Primer contacto realizado por WhatsApp.",
    });
    assert.equal(firstNoteRes.status, 201);
    const firstNote = (await firstNoteRes.json()).data;
    assert.equal(firstNote.autoAdvanced, true);
    assert.equal(firstNote.autoAssigned, true);
    assert.equal(firstNote.inquiryStatus, "in_progress");
    assert.equal(firstNote.inquiryVersion, 2);

    // Una segunda nota ya no cambia estado ni versión
    const secondNoteRes = await api("/" + inqAuto + "/notes", "POST", {
      body: "Confirmó visita presencial para mañana.",
    });
    assert.equal(secondNoteRes.status, 201);
    const secondNote = (await secondNoteRes.json()).data;
    assert.equal(secondNote.autoAdvanced, false);
    assert.equal(secondNote.inquiryVersion, 2);

    // No se puede volver de in_progress -> new
    const backToNew = await api("/" + inqAuto + "/status", "PATCH", {
      version: 2,
      status: "new",
    });
    assert.equal(backToNew.status, 422);
    assert.equal((await backToNew.json()).error.code, "INVALID_STATUS_TRANSITION");

    // Resolver -> rechazar vuelta a new -> archivar -> rechazar claim y vuelta a new/resolved -> reabrir seguimiento
    const toResolved = await api("/" + inqAuto + "/status", "PATCH", {
      version: 2,
      status: "resolved",
    });
    assert.equal(toResolved.status, 200);
    assert.equal(
      (await api("/" + inqAuto + "/status", "PATCH", { version: 3, status: "new" })).status,
      422,
    );
    assert.equal(
      (await api("/" + inqAuto + "/status", "PATCH", { version: 3, status: "archived" })).status,
      200,
    );
    assert.equal(
      (await api("/" + inqAuto + "/status", "PATCH", { version: 4, status: "new" })).status,
      422,
    );
    assert.equal(
      (await api("/" + inqAuto + "/status", "PATCH", { version: 4, status: "resolved" })).status,
      422,
    );
    assert.equal((await api("/" + inqAuto + "/claim", "POST", { version: 4 })).status, 409);

    const reopened = await api("/" + inqAuto + "/status", "PATCH", {
      version: 4,
      status: "in_progress",
    });
    assert.equal(reopened.status, 200);
    const reopenedData = (await reopened.json()).data;
    assert.equal(reopenedData.status, "in_progress");
    assert.equal(reopenedData.resolvedAt, null);

    // 2. Archivar spam directo desde new está permitido y bloquea claim
    const inqSpam = await createPublicInquiry("Prueba Spam");
    assert.equal(
      (await api("/" + inqSpam + "/status", "PATCH", { version: 1, status: "archived" })).status,
      200,
    );
    const claimArchived = await api("/" + inqSpam + "/claim", "POST", { version: 2 });
    assert.equal(claimArchived.status, 409);
    assert.equal((await claimArchived.json()).error.code, "INQUIRY_NOT_OPEN");

    // 3. Auto-archivado a los 30 días desde resolvedAt
    const inqOldResolved = await createPublicInquiry("Postulante Antigua");
    const inqRecentResolved = await createPublicInquiry("Postulante Reciente");
    const now = new Date("2026-12-20T12:00:00.000Z");
    const thirtyOneDaysAgo = new Date(now.getTime() - 31 * 86_400_000);
    const twentyNineDaysAgo = new Date(now.getTime() - 29 * 86_400_000);

    await ctx.db.inquiry.update({
      where: { id: inqOldResolved },
      data: { status: "resolved", resolvedAt: thirtyOneDaysAgo, version: 3 },
    });
    await ctx.db.inquiry.update({
      where: { id: inqRecentResolved },
      data: { status: "resolved", resolvedAt: twentyNineDaysAgo, version: 3 },
    });

    const maintenance = createInquiryMaintenanceService(ctx.db, 30);
    const result = await maintenance.archiveResolved(now);
    assert.equal(result.archived, 1);

    const oldAfter = await ctx.db.inquiry.findUnique({ where: { id: inqOldResolved } });
    const recentAfter = await ctx.db.inquiry.findUnique({ where: { id: inqRecentResolved } });
    assert.equal(oldAfter.status, "archived");
    assert.equal(oldAfter.version, 4);
    assert.equal(oldAfter.resolvedAt.toISOString(), thirtyOneDaysAgo.toISOString());
    assert.equal(recentAfter.status, "resolved");
    assert.equal(recentAfter.version, 3);

    const autoAudit = await ctx.db.auditLog.findFirst({
      where: { action: "inquiry.auto_archived", targetId: inqOldResolved, actorId: null },
    });
    assert.ok(autoAudit);
  } finally {
    await ctx.db.auditLog.deleteMany({
      where: { targetId: { in: ids }, action: "inquiry.auto_archived" },
    });
    await ctx.db.inquiry.deleteMany({ where: { id: { in: ids } } });
    await ctx.db.$disconnect();
  }
});
