import { digest, hashPassword, newToken } from "./authCrypto.js";

export function createInvitationService(repository) {
  const invite = async (data, actor, requestId) => {
    const token = newToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60_000);
    const account = { ...data, isActive: false, passwordHash: await hashPassword(newToken()) };
    const admin = actor
      ? await repository.register(actor, account, digest(token), expiresAt, requestId)
      : await repository.bootstrap(account, digest(token), expiresAt);
    return { admin, activationToken: token, expiresAt };
  };
  return {
    bootstrap: (data) => invite({ ...data, role: "admin" }),
    register: (actor, data, requestId) => invite(data, actor, requestId),
    async reissue(email, actor, requestId = "cli") {
      const activationToken = newToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60_000);
      const admin = await repository.reissue(
        email,
        digest(activationToken),
        expiresAt,
        actor,
        requestId,
      );
      return { admin, activationToken, expiresAt };
    },
    async activate(data, requestId) {
      return repository.activate(digest(data.token), await hashPassword(data.password), requestId);
    },
  };
}
