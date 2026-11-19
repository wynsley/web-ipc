import { createResetTicket } from "../src/modules/auth/recoveryCredentials.js";
import { recordAudit } from "../src/modules/audit/auditRepository.js";

export async function issueSoleAdminRecovery(db, email, incident, resetMfa) {
  const { token, record } = createResetTicket(resetMfa);
  await db.$transaction(async (tx) => {
    const rows =
      await tx.$queryRaw`SELECT id, email FROM admins WHERE role = 'admin' AND "isActive" ORDER BY id FOR UPDATE`;
    if (rows.length !== 1 || rows[0].email !== email)
      throw new Error(
        "La recuperación local exige que el titular sea el único administrador activo.",
      );
    const targetId = rows[0].id;
    await tx.admin.update({
      where: { id: targetId },
      data: record,
    });
    await recordAudit(
      tx,
      resetMfa ? "ops.factor_recovery_issued" : "ops.password_recovery_issued",
      null,
      targetId,
      "case-" + incident,
    );
  });
  return token;
}
