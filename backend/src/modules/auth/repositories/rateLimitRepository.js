import { AppError } from "../../../middleware/errors.js";

export function createRateLimitRepository(db) {
  return {
    async limit(key, max, windowMs) {
      const rows = await db.$queryRaw`
        INSERT INTO auth_rate_limits (key, hits, "expiresAt")
        VALUES (${key}, 1, NOW() + ${windowMs} * INTERVAL '1 millisecond')
        ON CONFLICT (key) DO UPDATE SET
          hits = CASE WHEN auth_rate_limits."expiresAt" <= NOW() THEN 1 ELSE auth_rate_limits.hits + 1 END,
          "expiresAt" = CASE WHEN auth_rate_limits."expiresAt" <= NOW()
            THEN NOW() + ${windowMs} * INTERVAL '1 millisecond' ELSE auth_rate_limits."expiresAt" END
        RETURNING hits`;
      if (rows[0].hits > max)
        throw new AppError(
          429,
          "TOO_MANY_ATTEMPTS",
          "Demasiados intentos. Espera 15 minutos antes de volver a intentar.",
        );
    },
  };
}
