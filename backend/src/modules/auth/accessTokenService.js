import { createHmac, createSecretKey, randomUUID } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";
import { ACCESS_SECONDS, JWT_ISSUER, JWT_AUDIENCE } from "./authSettings.js";
import { unauthorized } from "./sessionPolicy.js";

const claims = z.object({ sub: z.uuid(), sid: z.uuid(), jti: z.uuid() });
export function createAccessTokenService(config) {
  if (!/^[a-f0-9]{64}$/i.test(config.jwtSecret ?? "")) {
    throw new Error("JWT_SECRET debe contener 32 bytes aleatorios en hexadecimal.");
  }
  const key = createSecretKey(Buffer.from(config.jwtSecret, "hex"));
  const csrfKey = createHmac("sha256", key).update("ipc-csrf-key-v1").digest();
  return {
    csrf: (sessionId) => createHmac("sha256", csrfKey).update(sessionId).digest("hex"),
    async issue(session) {
      const now = Math.floor(Date.now() / 1000);
      const expiresAt = Math.min(
        now + ACCESS_SECONDS,
        Math.floor(session.expiresAt.getTime() / 1000),
      );
      const accessToken = await new SignJWT({ sid: session.id })
        .setProtectedHeader({ alg: "HS256", typ: "at+jwt" })
        .setSubject(session.admin.id)
        .setIssuer(JWT_ISSUER)
        .setAudience(JWT_AUDIENCE)
        .setJti(randomUUID())
        .setIssuedAt(now)
        .setExpirationTime(expiresAt)
        .sign(key);
      return { accessToken, tokenType: "Bearer", expiresIn: expiresAt - now };
    },
    async verify(token) {
      try {
        const { payload } = await jwtVerify(token, key, {
          algorithms: ["HS256"],
          typ: "at+jwt",
          issuer: JWT_ISSUER,
          audience: JWT_AUDIENCE,
          requiredClaims: ["sub", "sid", "jti", "iat", "exp"],
          maxTokenAge: ACCESS_SECONDS,
        });
        return claims.parse(payload);
      } catch {
        throw unauthorized();
      }
    },
  };
}
