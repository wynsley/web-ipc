CREATE TABLE "events" (
  "id" UUID PRIMARY KEY,
  "title" VARCHAR(160) NOT NULL,
  "description" VARCHAR(2000) NOT NULL,
  "location" VARCHAR(200) NOT NULL,
  "startsAt" TIMESTAMPTZ(3) NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "version" INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX "events_published_startsAt_id_idx" ON "events" ("published", "startsAt", "id");
