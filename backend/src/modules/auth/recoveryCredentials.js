import { digest, newToken } from "./authCrypto.js";

export function generateRecoveryCodes() {
  return Array.from({ length: 10 }, () => newToken());
}

export function createResetTicket(resetMfa) {
  const token = newToken();
  const expiresAt = new Date(Date.now() + 15 * 60_000);
  return {
    token,
    expiresAt,
    record: { resetHash: digest(token), resetExpiresAt: expiresAt, resetMfa },
  };
}
