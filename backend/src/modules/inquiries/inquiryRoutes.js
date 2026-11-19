import { Hono } from "hono";
import { z } from "zod";
import { authenticate, requireAdmin, requireCsrf } from "../../middleware/authenticate.js";
import { adminRequest, noStore } from "../../middleware/adminRequest.js";
import { jsonBody } from "../../middleware/requestBody.js";
import { readInput } from "../../middleware/readInput.js";
import { AppError } from "../../middleware/errors.js";
import { digest } from "../auth/authCrypto.js";
import { formatInquiriesCsv } from "./inquiryCsv.js";
import { canManageInquiries, missingInquiry } from "./inquiryRepository.js";
import {
  idempotencyKeySchema,
  inquiryAssignInput,
  inquiryListQuery,
  inquiryNoteInput,
  inquiryStatusInput,
  inquiryVersionInput,
  publicInquiryInput,
} from "./inquirySchema.js";

function parseListQuery(c) {
  const raw = {
    page: c.req.query("page"),
    status: c.req.query("status") ?? c.req.query("scope"),
    career: c.req.query("career"),
    shift: c.req.query("shift"),
    assigned: c.req.query("assigned"),
    q: c.req.query("q"),
  };
  const result = inquiryListQuery.safeParse(raw);
  if (!result.success) {
    throw new AppError(422, "INVALID_QUERY", "Filtros de consulta inválidos.");
  }
  return result.data;
}

function assertInquiryId(c) {
  const id = c.req.param("id");
  if (!z.uuid().safeParse(id).success) throw missingInquiry();
  return id;
}

export function createPublicInquiryRoutes(inquiries, auth, clientIp) {
  const routes = new Hono();
  routes.post("/", noStore, ...jsonBody(), async (c) => {
    await auth.throttlePublicInquiry(clientIp(c));
    const rawKey = c.req.header("Idempotency-Key");
    let keyHash = null;
    if (rawKey !== undefined) {
      const parsedKey = idempotencyKeySchema.safeParse(rawKey);
      if (!parsedKey.success) {
        throw new AppError(422, "INVALID_IDEMPOTENCY_KEY", "Clave de idempotencia inválida.");
      }
      keyHash = digest("inquiry-idempotency:" + parsedKey.data);
    }
    const input = await readInput(c, publicInquiryInput);
    const { inquiry, duplicate } = await inquiries.createPublic(input, keyHash, c.get("requestId"));
    return c.json(
      { data: duplicate ? { ...inquiry, duplicate: true } : inquiry },
      duplicate ? 200 : 201,
    );
  });
  return routes;
}

export function createAdminInquiryRoutes(inquiries, auth, config) {
  const routes = new Hono();
  routes.use(
    "*",
    noStore,
    adminRequest(config),
    authenticate(auth),
    async (c, next) => {
      if (!canManageInquiries(c.get("actor").admin.role)) {
        throw new AppError(403, "FORBIDDEN", "No tienes permisos para gestionar consultas.");
      }
      await next();
    },
    ...jsonBody(),
  );

  // Rutas estáticas antes que rutas dinámicas /:id
  routes.get("/", async (c) =>
    c.json({ data: await inquiries.list(c.get("actor"), parseListQuery(c)) }),
  );
  routes.get("/assignees", async (c) =>
    c.json({ data: { assignees: await inquiries.assignees() } }),
  );
  routes.get("/export", async (c) => {
    const query = parseListQuery(c);
    const rows = await inquiries.exportRows(c.get("actor"), c.get("requestId"), query);
    const csv = formatInquiriesCsv(rows);
    c.header("Content-Type", "text/csv; charset=utf-8");
    c.header("Content-Disposition", 'attachment; filename="consultas-ipc.csv"');
    c.header("X-Content-Type-Options", "nosniff");
    return c.body(csv);
  });

  routes.get("/:id", async (c) => c.json({ data: await inquiries.get(assertInquiryId(c)) }));
  routes.post("/:id/claim", requireCsrf, async (c) => {
    const id = assertInquiryId(c);
    const { version } = await readInput(c, inquiryVersionInput);
    return c.json({
      data: await inquiries.claim(c.get("actor"), c.get("requestId"), id, version),
    });
  });
  routes.patch("/:id/assign", requireAdmin, requireCsrf, async (c) => {
    const id = assertInquiryId(c);
    const { version, assigneeId } = await readInput(c, inquiryAssignInput);
    return c.json({
      data: await inquiries.assign(c.get("actor"), c.get("requestId"), id, version, assigneeId),
    });
  });
  routes.patch("/:id/status", requireCsrf, async (c) => {
    const id = assertInquiryId(c);
    const { version, status } = await readInput(c, inquiryStatusInput);
    return c.json({
      data: await inquiries.updateStatus(c.get("actor"), c.get("requestId"), id, version, status),
    });
  });
  routes.post("/:id/notes", requireCsrf, async (c) => {
    const id = assertInquiryId(c);
    const { body } = await readInput(c, inquiryNoteInput);
    return c.json(
      { data: await inquiries.addNote(c.get("actor"), c.get("requestId"), id, body) },
      201,
    );
  });

  return routes;
}
