import { createAccountRecoveryService } from "./accountRecoveryService.js";
import { createMfaService } from "./mfaService.js";
import { digest } from "./authCrypto.js";
import { createAccessTokenService } from "./accessTokenService.js";
import { createInvitationService } from "./invitationService.js";
import { createLoginService } from "./loginService.js";
import { createRefreshService } from "./refreshService.js";

export async function createAuthService(repository, config) {
  const tokens = createAccessTokenService(config);
  const mfa = createMfaService(repository, tokens, config);
  return {
    listAccounts: repository.listAccounts,
    async deactivateAccount(actor, id, requestId) {
      return { admin: await repository.deactivateAccount(actor, id, requestId) };
    },
    ...mfa,
    ...createAccountRecoveryService(repository, config),
    ...createInvitationService(repository),
    ...(await createLoginService(repository, mfa)),
    ...createRefreshService(repository, tokens),
    async authenticate(token) {
      const claims = await tokens.verify(token);
      const actor = await repository.session(claims.sid, claims.sub);
      return {
        ...actor,
        csrfToken: tokens.csrf(claims.sid),
      };
    },
    async throttle(ip) {
      await repository.limit(digest("global-auth"), 200, 15 * 60_000);
      await repository.limit(digest("ip:" + ip), 30, 15 * 60_000);
    },
    async throttleRefresh(ip) {
      await repository.limit(digest("refresh-global"), 600, 15 * 60_000);
      await repository.limit(digest("refresh-ip:" + ip), 120, 15 * 60_000);
    },
    async throttleMediaUpload(ip, adminId) {
      await repository.limit(digest("media-upload-global"), 300, 15 * 60_000);
      await repository.limit(digest("media-upload-ip:" + ip), 60, 15 * 60_000);
      if (adminId) {
        await repository.limit(digest("media-upload-account:" + adminId), 60, 15 * 60_000);
      }
    },
    async throttlePublicInquiry(ip) {
      await repository.limit(digest("inquiry-global"), 100, 15 * 60_000);
      await repository.limit(digest("inquiry-ip:" + ip), 5, 15 * 60_000);
    },
  };
}
