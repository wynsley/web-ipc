import { createResetTicket, generateRecoveryCodes } from "./recoveryCredentials.js";
import { AppError } from "../../middleware/errors.js";
import { digest, hashPassword, verifyPassword } from "./authCrypto.js";
import { createMfaCrypto } from "./mfaCrypto.js";

export function createAccountRecoveryService(repository, config) {
  const crypto = createMfaCrypto(config.mfaEncryptionKey);
  async function verifyActor(actor, data) {
    await repository.limit(digest("security:" + actor.admin.id), 10, 15 * 60_000);
    const admin = await repository.findByEmail(actor.admin.email);
    const reject = () =>
      new AppError(
        403,
        "REAUTH_REQUIRED",
        "Comprueba tu contraseña y usa un código nuevo del autenticador.",
      );
    if (
      !admin?.isActive ||
      !admin.mfaSecret ||
      !(await verifyPassword(admin.passwordHash, data.password))
    )
      throw reject();
    const step = crypto.step(
      crypto.decrypt(admin.mfaSecret, admin.id),
      data.code,
      admin.mfaLastStep,
    );
    if (step === null) throw reject();
    return { admin, step };
  }
  return {
    async changePassword(actor, data, requestId) {
      const proof = await verifyActor(actor, data);
      await repository.changePassword(
        actor,
        proof,
        await hashPassword(data.newPassword),
        requestId,
      );
      return { changed: true };
    },
    async regenerateCodes(actor, data, requestId) {
      const proof = await verifyActor(actor, data);
      const recoveryCodes = generateRecoveryCodes();
      await repository.replaceCodes(actor, proof, recoveryCodes.map(digest), requestId);
      return { recoveryCodes };
    },
    async issueRecovery(actor, data, requestId) {
      const proof = await verifyActor(actor, data);
      const { token, expiresAt, record } = createResetTicket(data.resetMfa);
      await repository.issueRecovery(actor, proof, data.email, record, requestId);
      return { token, expiresAt };
    },
    async redeemRecovery(data, requestId) {
      await repository.redeemRecovery(
        digest(data.token),
        await hashPassword(data.password),
        requestId,
      );
      return { recovered: true };
    },
  };
}
