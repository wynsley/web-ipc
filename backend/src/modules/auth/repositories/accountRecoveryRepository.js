import { AppError } from "../../../middleware/errors.js";
import { recordAudit } from "../../audit/auditRepository.js";
import { isSessionActive, unauthorized } from "../sessionPolicy.js";

async function consumeProof(tx, actor, { admin, step }) {
  await tx.$queryRaw`SELECT id FROM sessions WHERE id = ${actor.sessionId}::uuid FOR UPDATE`;
  const session = await tx.session.findUnique({
    where: { id: actor.sessionId },
    include: { admin: true },
  });
  if (!isSessionActive(session) || session.adminId !== admin.id) throw unauthorized();
  const result = await tx.admin.updateMany({
    where: {
      id: admin.id,
      isActive: true,
      passwordHash: admin.passwordHash,
      mfaSecret: admin.mfaSecret,
      OR: [{ mfaLastStep: null }, { mfaLastStep: { lt: step } }],
    },
    data: { mfaLastStep: step },
  });
  if (!result.count)
    throw new AppError(403, "REAUTH_REQUIRED", "Usa un código nuevo del autenticador.");
  return session.admin.role;
}

async function revokeAccess(tx, adminId) {
  await tx.session.updateMany({
    where: { adminId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
  await tx.mfaChallenge.updateMany({
    where: { adminId, usedAt: null },
    data: { usedAt: new Date() },
  });
}

export function createAccountRecoveryRepository(db) {
  return {
    async changePassword(actor, proof, passwordHash, requestId) {
      const adminId = actor.admin.id;
      return db.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT id FROM admins WHERE id = ${adminId}::uuid FOR UPDATE`;
        await consumeProof(tx, actor, proof);
        await tx.admin.update({
          where: { id: adminId },
          data: { passwordHash, resetHash: null, resetExpiresAt: null, resetMfa: false },
        });
        await revokeAccess(tx, adminId);
        await recordAudit(tx, "auth.password_changed", adminId, adminId, requestId);
      });
    },
    async replaceCodes(actor, proof, hashes, requestId) {
      return db.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT id FROM admins WHERE id = ${actor.admin.id}::uuid FOR UPDATE`;
        await consumeProof(tx, actor, proof);
        const adminId = actor.admin.id;
        await tx.recoveryCode.deleteMany({ where: { adminId } });
        await tx.recoveryCode.createMany({
          data: hashes.map((tokenHash) => ({ adminId, tokenHash })),
        });
        await recordAudit(tx, "auth.recovery_codes_replaced", adminId, adminId, requestId);
      });
    },
    async issueRecovery(actor, proof, email, ticket, requestId) {
      return db.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT id FROM admins WHERE email = ${email} OR id = ${actor.admin.id}::uuid ORDER BY id FOR UPDATE`;
        const role = await consumeProof(tx, actor, proof);
        if (role !== "admin") throw new AppError(403, "FORBIDDEN", "Se requiere un administrador.");
        const target = await tx.admin.findUnique({ where: { email } });
        if (!target?.isActive || target.id === actor.admin.id)
          throw new AppError(409, "INVALID_TARGET", "Selecciona otra cuenta activa.");
        await tx.admin.update({ where: { id: target.id }, data: ticket });
        await recordAudit(
          tx,
          ticket.resetMfa ? "admin.factor_recovery_issued" : "admin.password_recovery_issued",
          actor.admin.id,
          target.id,
          requestId,
        );
      });
    },
    async redeemRecovery(resetHash, passwordHash, requestId) {
      const invalid = () =>
        new AppError(
          400,
          "INVALID_RECOVERY",
          "El código de recuperación de cuenta venció o ya no es válido.",
        );
      return db.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT id FROM admins WHERE "resetHash" = ${resetHash} FOR UPDATE`;
        const admin = await tx.admin.findUnique({ where: { resetHash } });
        if (!admin?.isActive || !admin.resetExpiresAt || admin.resetExpiresAt <= new Date())
          throw invalid();
        const adminId = admin.id;
        await tx.admin.update({
          where: { id: adminId },
          data: {
            passwordHash,
            resetHash: null,
            resetExpiresAt: null,
            resetMfa: false,
            ...(admin.resetMfa && { mfaSecret: null, mfaLastStep: null }),
          },
        });
        if (admin.resetMfa) await tx.recoveryCode.deleteMany({ where: { adminId } });
        await revokeAccess(tx, adminId);
        await recordAudit(
          tx,
          admin.resetMfa ? "auth.factor_recovered" : "auth.password_recovered",
          adminId,
          adminId,
          requestId,
        );
      });
    },
  };
}
