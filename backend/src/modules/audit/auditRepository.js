import { AppError } from "../../middleware/errors.js";
import { isSessionActive, unauthorized } from "../auth/sessionPolicy.js";
import { auditOrderBy, buildAuditWhere } from "./auditFilters.js";
import { AUDIT_CATEGORIES } from "./auditSchema.js";

const pageSize = 30;
const maxExportRows = 5000;
const actorSelect = { id: true, name: true, role: true, isActive: true };

// Recibe la transacción existente para conservar la atomicidad de la operación.
export function recordAudit(tx, action, actorId, targetId, requestId) {
  return tx.auditLog.create({ data: { action, actorId, targetId, requestId } });
}

function actionCategory(action) {
  const prefix = String(action ?? "").split(".")[0];
  return AUDIT_CATEGORIES.includes(prefix) ? prefix : "other";
}

function isAccountTargetAction(action) {
  return action.startsWith("admin.") || action.startsWith("auth.");
}

async function enrichAuditEntries(client, rows) {
  const adminIds = new Set();
  for (const row of rows) {
    if (row.actorId) adminIds.add(row.actorId);
    if (row.targetId && isAccountTargetAction(row.action)) adminIds.add(row.targetId);
  }
  const admins = adminIds.size
    ? await client.admin.findMany({
        where: { id: { in: [...adminIds] } },
        select: actorSelect,
      })
    : [];
  const adminMap = new Map(admins.map((item) => [item.id, item]));

  return rows.map((row) => ({
    id: row.id,
    action: row.action,
    category: actionCategory(row.action),
    actorId: row.actorId,
    actor: row.actorId ? (adminMap.get(row.actorId) ?? null) : null,
    targetId: row.targetId,
    targetAdmin:
      row.targetId && isAccountTargetAction(row.action)
        ? (adminMap.get(row.targetId) ?? null)
        : null,
    requestId: row.requestId,
    createdAt: row.createdAt,
  }));
}

export function createAuditRepository(db) {
  return {
    async list(query) {
      const now = new Date();
      const where = buildAuditWhere(query);
      const [rows, total, grouped] = await Promise.all([
        db.auditLog.findMany({
          where,
          orderBy: auditOrderBy,
          skip: (query.page - 1) * pageSize,
          take: pageSize + 1,
        }),
        db.auditLog.count({ where }),
        db.$queryRaw`
          SELECT split_part(action, '.', 1) AS category, COUNT(*)::int AS total
          FROM audit_logs
          GROUP BY 1
        `,
      ]);

      const counts = { all: 0 };
      for (const category of AUDIT_CATEGORIES) counts[category] = 0;
      for (const entry of grouped) {
        const count = Number(entry.total) || 0;
        counts.all += count;
        if (Object.hasOwn(counts, entry.category)) {
          counts[entry.category] = count;
        }
      }

      const entries = await enrichAuditEntries(db, rows.slice(0, pageSize));
      return {
        entries,
        hasMore: rows.length > pageSize,
        total,
        pageSize,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
        serverTime: now.toISOString(),
        counts,
      };
    },

    actors() {
      return db.admin.findMany({
        select: actorSelect,
        orderBy: [{ name: "asc" }, { id: "asc" }],
      });
    },

    exportRows(actor, requestId, query) {
      return db.$transaction(async (tx) => {
        const session = await tx.session.findUnique({
          where: { id: actor.sessionId },
          include: { admin: true },
        });
        if (!isSessionActive(session)) throw unauthorized();
        if (session.admin.role !== "admin") {
          throw new AppError(403, "FORBIDDEN", "Solo administración puede exportar auditoría.");
        }
        const where = buildAuditWhere(query);
        const rows = await tx.auditLog.findMany({
          where,
          orderBy: auditOrderBy,
          take: maxExportRows,
        });
        const enriched = await enrichAuditEntries(tx, rows);
        await recordAudit(tx, "audit.exported", session.admin.id, null, requestId);
        return enriched;
      });
    },
  };
}
