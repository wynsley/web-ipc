ALTER TABLE "admins"
  ADD COLUMN "resetHash" CHAR(64),
  ADD COLUMN "resetExpiresAt" TIMESTAMPTZ(3),
  ADD COLUMN "resetMfa" BOOLEAN NOT NULL DEFAULT false;
CREATE UNIQUE INDEX "admins_resetHash_key" ON "admins"("resetHash");
