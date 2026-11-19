ALTER TABLE "events" ADD COLUMN "endsAt" TIMESTAMPTZ(3);
ALTER TABLE "events" ADD CONSTRAINT "events_date_order" CHECK ("endsAt" IS NULL OR "endsAt" > "startsAt");
ALTER TABLE "images" ALTER COLUMN "data" DROP NOT NULL;
ALTER TABLE "images" ADD COLUMN "storageKey" VARCHAR(80), ADD COLUMN "orphanedAt" TIMESTAMPTZ(3), ADD COLUMN "deletedAt" TIMESTAMPTZ(3);
CREATE UNIQUE INDEX "images_storageKey_key" ON "images"("storageKey");
