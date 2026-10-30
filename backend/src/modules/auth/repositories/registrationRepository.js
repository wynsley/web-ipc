import { AppError } from "../../../middleware/errors.js";
import { publicAdmin } from "../../admins/adminRepository.js";
import { recordAudit } from "../../audit/auditRepository.js";
import { assertAdminSession } from "../sessionPolicy.js";

export function createRegistrationRepository(db) {
  return {
    async bootstrap(data, tokenHash, expiresAt) {
      return db.$transaction(async (tx) => {
        // Serializa dos ejecuciones simultáneas del bootstrap.
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(49201701)`;
        if (await tx.admin.count())
          throw new AppError(
            409,
            "BOOTSTRAP_CLOSED",
            "Ya existen cuentas. El bootstrap no modifica cuentas existentes.",
          );
        const admin = await tx.admin.create({ data, select: publicAdmin });
        await tx.activation.create({ data: { adminId: admin.id, tokenHash, expiresAt } });
        await recordAudit(tx, "admin.bootstrap", null, admin.id, "cli");
        return admin;
      });
    },
    async register(actor, data, tokenHash, expiresAt, requestId) {
      try {
        return await db.$transaction(async (tx) => {
          await assertAdminSession(tx, actor);
          const admin = await tx.admin.create({ data, select: publicAdmin });
          await tx.activation.create({ data: { adminId: admin.id, tokenHash, expiresAt } });
          await recordAudit(tx, "admin.register", actor.admin.id, admin.id, requestId);
          return admin;
        });
      } catch (error) {
        if (error.code === "P2002")
          throw new AppError(409, "ACCOUNT_EXISTS", "Ya existe una cuenta con ese correo.");
        throw error;
      }
    },
  };
}
