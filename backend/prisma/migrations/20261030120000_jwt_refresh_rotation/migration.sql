BEGIN;
-- La cookie de sesión anterior deja de autenticar; las cuentas se conservan.
UPDATE "sessions" SET "revokedAt" = CURRENT_TIMESTAMP WHERE "revokedAt" IS NULL;
DROP INDEX "sessions_tokenHash_key";
ALTER TABLE "sessions" DROP COLUMN "tokenHash";

CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL,
    "tokenHash" CHAR(64) NOT NULL,
    "sessionId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMPTZ(3),
    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "refresh_tokens_tokenHash_key" ON "refresh_tokens"("tokenHash");
CREATE INDEX "refresh_tokens_sessionId_idx" ON "refresh_tokens"("sessionId");
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_sessionId_fkey"
  FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
