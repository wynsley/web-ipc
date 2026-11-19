ALTER TABLE "events" ADD COLUMN "imageCrop" JSONB NOT NULL DEFAULT '{"x":50,"y":50,"zoom":1}';
