import { Hono } from "hono";
import { authenticate, requireAdmin } from "../../middleware/authenticate.js";
import { adminRequest, noStore } from "../../middleware/adminRequest.js";
import { AppError } from "../../middleware/errors.js";
import { formatAuditCsv } from "./auditCsv.js";
import { auditListQuery } from "./auditSchema.js";

function parseListQuery(c) {
  const raw = {
    page: c.req.query("page"),
    category: c.req.query("category"),
    actor: c.req.query("actor"),
    from: c.req.query("from"),
    to: c.req.query("to"),
    q: c.req.query("q"),
  };
  const result = auditListQuery.safeParse(raw);
  if (!result.success) {
    const first = result.error.issues[0]?.message;
    throw new AppError(422, "INVALID_QUERY", first || "Filtros de auditoría inválidos.");
  }
  return result.data;
}

export function createAdminAuditRoutes(audit, auth, config) {
  const routes = new Hono();
  routes.use("*", noStore, adminRequest(config), authenticate(auth), requireAdmin);

  routes.get("/", async (c) => c.json({ data: await audit.list(parseListQuery(c)) }));
  routes.get("/actors", async (c) => c.json({ data: { actors: await audit.actors() } }));
  routes.get("/export", async (c) => {
    const query = parseListQuery(c);
    const rows = await audit.exportRows(c.get("actor"), c.get("requestId"), query);
    const csv = formatAuditCsv(rows);
    c.header("Content-Type", "text/csv; charset=utf-8");
    c.header("Content-Disposition", 'attachment; filename="auditoria-ipc.csv"');
    c.header("X-Content-Type-Options", "nosniff");
    return c.body(csv);
  });

  return routes;
}
