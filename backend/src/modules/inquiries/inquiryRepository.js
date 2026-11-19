import { AppError } from "../../middleware/errors.js";
import { recordAudit } from "../audit/auditRepository.js";
import { isSessionActive, unauthorized } from "../auth/sessionPolicy.js";
import { buildInquiryWhere, inquiryOrderBy } from "./inquiryFilters.js";
import {
  assertCanClaim,
  resolveAutomaticNoteTransition,
  resolveStatusUpdate,
} from "./inquiryLifecyclePolicy.js";

const pageSize = 20;
const maxExportRows = 5000;

const assigneeSelect = { id: true, name: true, role: true };
const summarySelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  career: true,
  shift: true,
  message: true,
  status: true,
  assignedToId: true,
  assignedTo: { select: assigneeSelect },
  version: true,
  resolvedAt: true,
  createdAt: true,
  updatedAt: true,
  _count: { select: { notes: true } },
};
const publicReceiptSelect = {
  id: true,
  status: true,
  createdAt: true,
};

export const canManageInquiries = (role) => role === "admissions" || role === "admin";
export const missingInquiry = () =>
  new AppError(404, "INQUIRY_NOT_FOUND", "Consulta no encontrada.");
const inquiryConflict = () =>
  new AppError(
    409,
    "INQUIRY_CONFLICT",
    "La consulta cambió recientemente. Actualiza la bandeja antes de reintentar.",
  );

function mapSummary(row) {
  const { _count, ...rest } = row;
  return { ...rest, notesCount: _count?.notes ?? 0 };
}

export function createInquiryRepository(db) {
  async function write(actor, requestId, action, operation, { adminOnly = false } = {}) {
    return db.$transaction(async (tx) => {
      const session = await tx.session.findUnique({
        where: { id: actor.sessionId },
        include: { admin: true },
      });
      if (!isSessionActive(session)) throw unauthorized();
      if (adminOnly) {
        if (session.admin.role !== "admin") {
          throw new AppError(403, "FORBIDDEN", "Solo administración puede asignar responsables.");
        }
      } else if (!canManageInquiries(session.admin.role)) {
        throw new AppError(403, "FORBIDDEN", "No tienes permisos para gestionar consultas.");
      }
      const { result, targetId } = await operation(tx, session.admin);
      await recordAudit(tx, action, session.admin.id, targetId, requestId);
      return result;
    });
  }

  return {
    async createPublic(data, idempotencyKeyHash, requestId) {
      if (idempotencyKeyHash) {
        const existing = await db.inquiry.findUnique({
          where: { idempotencyKey: idempotencyKeyHash },
          select: publicReceiptSelect,
        });
        if (existing) return { inquiry: existing, duplicate: true };
      }
      try {
        const inquiry = await db.$transaction(async (tx) => {
          const created = await tx.inquiry.create({
            data: {
              ...data,
              ...(idempotencyKeyHash ? { idempotencyKey: idempotencyKeyHash } : {}),
            },
            select: publicReceiptSelect,
          });
          await recordAudit(tx, "inquiry.created", null, created.id, requestId);
          return created;
        });
        return { inquiry, duplicate: false };
      } catch (error) {
        if (error?.code === "P2002" && idempotencyKeyHash) {
          const existing = await db.inquiry.findUnique({
            where: { idempotencyKey: idempotencyKeyHash },
            select: publicReceiptSelect,
          });
          if (existing) return { inquiry: existing, duplicate: true };
        }
        throw error;
      }
    },

    async list(actor, query) {
      const now = new Date();
      const where = buildInquiryWhere(query, actor.admin.id);
      const [rows, total, grouped] = await Promise.all([
        db.inquiry.findMany({
          where,
          select: summarySelect,
          orderBy: inquiryOrderBy,
          skip: (query.page - 1) * pageSize,
          take: pageSize + 1,
        }),
        db.inquiry.count({ where }),
        db.inquiry.groupBy({
          by: ["status"],
          _count: { _all: true },
        }),
      ]);
      const counts = { new: 0, in_progress: 0, resolved: 0, archived: 0, all: 0 };
      for (const entry of grouped) {
        counts[entry.status] = entry._count._all;
        counts.all += entry._count._all;
      }
      return {
        inquiries: rows.slice(0, pageSize).map(mapSummary),
        hasMore: rows.length > pageSize,
        total,
        pageSize,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
        serverTime: now.toISOString(),
        counts,
      };
    },

    async get(id) {
      const inquiry = await db.inquiry.findUnique({
        where: { id },
        select: {
          ...summarySelect,
          notes: {
            select: {
              id: true,
              authorId: true,
              authorName: true,
              body: true,
              createdAt: true,
            },
            orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          },
        },
      });
      if (!inquiry) throw missingInquiry();
      return mapSummary(inquiry);
    },

    assignees() {
      return db.admin.findMany({
        where: { isActive: true, role: { in: ["admin", "admissions"] } },
        select: assigneeSelect,
        orderBy: [{ name: "asc" }, { id: "asc" }],
      });
    },

    claim(actor, requestId, id, version) {
      return write(actor, requestId, "inquiry.claimed", async (tx, admin) => {
        await tx.$queryRaw`SELECT id FROM inquiries WHERE id = ${id}::uuid FOR UPDATE`;
        const current = await tx.inquiry.findUnique({ where: { id } });
        if (!current) throw missingInquiry();
        assertCanClaim(current);
        if (current.version !== version) throw inquiryConflict();
        const updated = await tx.inquiry.update({
          where: { id },
          data: {
            assignedToId: admin.id,
            status: current.status === "new" ? "in_progress" : current.status,
            version: { increment: 1 },
          },
          select: summarySelect,
        });
        return { result: mapSummary(updated), targetId: updated.id };
      });
    },

    assign(actor, requestId, id, version, assigneeId) {
      return write(
        actor,
        requestId,
        "inquiry.assigned",
        async (tx) => {
          if (assigneeId) {
            const target = await tx.admin.findUnique({
              where: { id: assigneeId },
              select: { id: true, role: true, isActive: true },
            });
            if (!target?.isActive || !canManageInquiries(target.role)) {
              throw new AppError(
                422,
                "INVALID_ASSIGNEE",
                "Selecciona una cuenta activa de Admisión o Administración.",
                { assigneeId: ["Selecciona una cuenta activa de Admisión o Administración."] },
              );
            }
          }
          await tx.$queryRaw`SELECT id FROM inquiries WHERE id = ${id}::uuid FOR UPDATE`;
          const current = await tx.inquiry.findUnique({ where: { id } });
          if (!current) throw missingInquiry();
          if (current.version !== version) throw inquiryConflict();
          const updated = await tx.inquiry.update({
            where: { id },
            data: {
              assignedToId: assigneeId,
              status: assigneeId && current.status === "new" ? "in_progress" : current.status,
              version: { increment: 1 },
            },
            select: summarySelect,
          });
          return { result: mapSummary(updated), targetId: updated.id };
        },
        { adminOnly: true },
      );
    },

    updateStatus(actor, requestId, id, version, status) {
      return write(actor, requestId, "inquiry.status_changed", async (tx) => {
        await tx.$queryRaw`SELECT id FROM inquiries WHERE id = ${id}::uuid FOR UPDATE`;
        const current = await tx.inquiry.findUnique({ where: { id } });
        if (!current) throw missingInquiry();
        if (current.version !== version) throw inquiryConflict();
        const changes = resolveStatusUpdate(current, status);
        const updated = await tx.inquiry.update({
          where: { id },
          data: {
            ...changes,
            version: { increment: 1 },
          },
          select: summarySelect,
        });
        return { result: mapSummary(updated), targetId: updated.id };
      });
    },

    addNote(actor, requestId, id, body) {
      return write(actor, requestId, "inquiry.note_added", async (tx, admin) => {
        await tx.$queryRaw`SELECT id FROM inquiries WHERE id = ${id}::uuid FOR UPDATE`;
        const current = await tx.inquiry.findUnique({
          where: { id },
          select: { id: true, status: true, assignedToId: true, version: true },
        });
        if (!current) throw missingInquiry();
        const note = await tx.inquiryNote.create({
          data: {
            inquiryId: id,
            authorId: admin.id,
            authorName: admin.name,
            body,
          },
          select: {
            id: true,
            inquiryId: true,
            authorId: true,
            authorName: true,
            body: true,
            createdAt: true,
          },
        });
        const autoTransition = resolveAutomaticNoteTransition(current, admin);
        let inquiryVersion = current.version;
        let inquiryStatus = current.status;
        if (autoTransition) {
          const updated = await tx.inquiry.update({
            where: { id },
            data: autoTransition,
            select: { status: true, version: true },
          });
          inquiryStatus = updated.status;
          inquiryVersion = updated.version;
        }
        return {
          result: {
            ...note,
            autoAdvanced: Boolean(autoTransition),
            autoAssigned: Boolean(autoTransition && !current.assignedToId),
            inquiryStatus,
            inquiryVersion,
          },
          targetId: id,
        };
      });
    },

    exportRows(actor, requestId, query) {
      return write(actor, requestId, "inquiry.exported", async (tx, admin) => {
        const where = buildInquiryWhere(query, admin.id);
        const rows = await tx.inquiry.findMany({
          where,
          select: summarySelect,
          orderBy: inquiryOrderBy,
          take: maxExportRows,
        });
        return { result: rows, targetId: null };
      });
    },
  };
}
