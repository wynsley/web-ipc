import { AppError } from "../../middleware/errors.js";
import { digest, equalSecret, newToken } from "./authCrypto.js";
import { isSessionActive, unauthorized } from "./sessionPolicy.js";

export function createRefreshService(repository, tokens) {
  const find = async (token) => {
    if (!/^[A-Za-z0-9_-]{43}$/.test(token ?? "")) throw unauthorized();
    const record = await repository.findRefresh(digest(token));
    if (!record) throw unauthorized();
    return record;
  };
  const verifyCsrf = (sessionId, csrf) => {
    if (!equalSecret(csrf, tokens.csrf(sessionId))) {
      throw new AppError(403, "INVALID_CSRF", "Token de seguridad inválido.");
    }
  };
  return {
    async refresh(token, csrf, requestId) {
      const record = await find(token);
      verifyCsrf(record.sessionId, csrf);
      const refreshToken = newToken();
      const result = await repository.rotateRefresh(digest(token), digest(refreshToken), requestId);
      if (result.error)
        throw new AppError(
          401,
          result.error,
          "La sesión no puede renovarse. Inicia sesión nuevamente.",
        );
      return {
        ...(await tokens.issue(result.session)),
        refreshToken,
        admin: result.session.admin,
        csrfToken: tokens.csrf(record.sessionId),
        sessionExpiresAt: result.session.expiresAt,
      };
    },
    async refreshCsrf(token) {
      const record = await find(token);
      if (record.usedAt || !isSessionActive(record.session)) throw unauthorized();
      return tokens.csrf(record.sessionId);
    },
    async logout(token, csrf, requestId) {
      const record = await find(token);
      verifyCsrf(record.sessionId, csrf);
      await repository.logout(record.sessionId, requestId);
    },
  };
}
