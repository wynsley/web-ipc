import { digest } from "./authCrypto.js";
import { createAccessTokenService } from "./accessTokenService.js";
import { createInvitationService } from "./invitationService.js";
import { createLoginService } from "./loginService.js";
import { createRefreshService } from "./refreshService.js";

export async function createAuthService(repository, config) {
  const tokens = createAccessTokenService(config);
  return {
    ...createInvitationService(repository),
    ...(await createLoginService(repository, tokens)),
    ...createRefreshService(repository, tokens),
    async authenticate(token) {
      const claims = await tokens.verify(token);
      const actor = await repository.session(claims.sid, claims.sub);
      return { ...actor, csrfToken: tokens.csrf(claims.sid) };
    },
    async throttle(ip) {
      await repository.limit(digest("global-auth"), 200, 15 * 60_000);
      await repository.limit(digest("ip:" + ip), 30, 15 * 60_000);
    },
    async throttleRefresh(ip) {
      await repository.limit(digest("refresh-global"), 600, 15 * 60_000);
      await repository.limit(digest("refresh-ip:" + ip), 120, 15 * 60_000);
    },
  };
}
