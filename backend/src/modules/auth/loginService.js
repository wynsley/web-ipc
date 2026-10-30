import { AppError } from "../../middleware/errors.js";
import { digest, hashPassword, newToken, verifyPassword } from "./authCrypto.js";

export async function createLoginService(repository, tokens) {
  const dummyHash = await hashPassword(newToken());
  return {
    async login(data, previousToken, requestId) {
      await repository.limit(digest("account:" + data.email), 10, 15 * 60_000);
      const admin = await repository.findByEmail(data.email);
      const matches = await verifyPassword(admin?.passwordHash ?? dummyHash, data.password);
      if (!matches || !admin?.isActive) {
        throw new AppError(401, "INVALID_CREDENTIALS", "Correo o contraseña incorrectos.");
      }
      const refreshToken = newToken();
      const session = await repository.createSession(
        admin,
        digest(refreshToken),
        previousToken ? digest(previousToken) : null,
        requestId,
      );
      return {
        ...(await tokens.issue(session)),
        refreshToken,
        admin: session.admin,
        csrfToken: tokens.csrf(session.id),
        sessionExpiresAt: session.expiresAt,
      };
    },
  };
}
