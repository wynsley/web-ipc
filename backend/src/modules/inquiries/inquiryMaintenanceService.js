import { randomUUID } from "node:crypto";
import { archiveCutoffDate } from "./inquiryLifecyclePolicy.js";

const BATCH_SIZE = 100;

export function createInquiryMaintenanceService(db, archiveDays = 30) {
  return {
    async archiveResolved(now = new Date()) {
      const before = archiveCutoffDate(archiveDays, now);
      const runId = "job:" + randomUUID();
      let archived = 0;

      while (true) {
        const rows = await db.$transaction(async (tx) => {
          const updated = await tx.$queryRaw`
            UPDATE inquiries
            SET status = 'archived'::"InquiryStatus",
                version = version + 1,
                "updatedAt" = ${now}
            WHERE id IN (
              SELECT id FROM inquiries
              WHERE status = 'resolved'::"InquiryStatus"
                AND "resolvedAt" IS NOT NULL
                AND "resolvedAt" <= ${before}
              ORDER BY "resolvedAt" ASC, id ASC
              LIMIT ${BATCH_SIZE}
              FOR UPDATE SKIP LOCKED
            )
            RETURNING id
          `;
          if (updated.length > 0) {
            await tx.auditLog.createMany({
              data: updated.map(({ id }) => ({
                action: "inquiry.auto_archived",
                actorId: null,
                targetId: id,
                requestId: runId,
              })),
            });
          }
          return updated;
        });

        archived += rows.length;
        if (rows.length < BATCH_SIZE) break;
      }

      return { archived };
    },
  };
}
