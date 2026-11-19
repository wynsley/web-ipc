ALTER TABLE "events" ADD COLUMN "status" VARCHAR(16) NOT NULL DEFAULT 'scheduled', ADD COLUMN "scheduleNotice" VARCHAR(500), ADD COLUMN "previousStartsAt" TIMESTAMPTZ(3), ADD COLUMN "previousEndsAt" TIMESTAMPTZ(3);
ALTER TABLE "events" ADD CONSTRAINT "events_status" CHECK ("status" IN ('scheduled','postponed','cancelled'));
CREATE TABLE "event_changes" (
 "id" UUID NOT NULL, "eventId" UUID NOT NULL, "action" VARCHAR(32) NOT NULL, "reason" VARCHAR(500) NOT NULL,
 "before" JSONB NOT NULL, "after" JSONB NOT NULL, "actorId" UUID NOT NULL, "actorName" VARCHAR(100) NOT NULL,
 "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "event_changes_pkey" PRIMARY KEY ("id"),
 CONSTRAINT "event_changes_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "event_changes_eventId_createdAt_idx" ON "event_changes"("eventId", "createdAt");
