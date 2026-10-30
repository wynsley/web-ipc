import { publicAdmin } from "../../admins/adminRepository.js";
import { recordAudit } from "../../audit/auditRepository.js";
import { isSessionActive } from "../sessionPolicy.js";

export function createRefreshRepository(db) {
  return {
    findRefresh: (tokenHash) =>
      db.refreshToken.findUnique({
        where: { tokenHash },
        include: { session: { include: { admin: { select: publicAdmin } } } },
      }),
    async rotateRefresh(tokenHash, nextHash, requestId) {
      return db.$transaction(async (tx) => {
        const existing = await tx.refreshToken.findUnique({ where: { tokenHash } });
        if (!existing) return { error: "INVALID_REFRESH" };
        // Bloquear la familia antes de releer el token: solo una rotación puede consumirlo.
        await tx.$queryRaw`SELECT id FROM sessions WHERE id = ${existing.sessionId}::uuid FOR UPDATE`;
        const token = await tx.refreshToken.findUnique({ where: { tokenHash } });
        const session = await tx.session.findUnique({
          where: { id: existing.sessionId },
          include: { admin: { select: publicAdmin } },
        });
        if (!token || !session) return { error: "INVALID_REFRESH" };
        if (token.usedAt) {
          await tx.session.update({ where: { id: session.id }, data: { revokedAt: new Date() } });
          await recordAudit(
            tx,
            "auth.refresh_reuse",
            session.admin.id,
            session.admin.id,
            requestId,
          );
          // Retornar y confirmar la transacción; lanzar aquí revertiría la revocación.
          return { error: "REFRESH_REUSED" };
        }
        if (!isSessionActive(session)) return { error: "INVALID_REFRESH" };
        await tx.refreshToken.update({ where: { id: token.id }, data: { usedAt: new Date() } });
        await tx.refreshToken.create({ data: { sessionId: session.id, tokenHash: nextHash } });
        await tx.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } });
        await recordAudit(tx, "auth.refresh", session.admin.id, session.admin.id, requestId);
        return { session };
      });
    },
  };
}
