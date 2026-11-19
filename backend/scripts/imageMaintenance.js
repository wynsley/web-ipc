import { loadConfig } from "../src/config/env.js";
import { createDatabase } from "../src/infrastructure/database/prisma.js";
import { createLocalImageStorage } from "../src/infrastructure/storage/localImageStorage.js";
import { createImageMaintenanceRepository } from "../src/modules/media/imageMaintenanceRepository.js";
import { createImageMaintenanceService } from "../src/modules/media/imageMaintenanceService.js";
const action = process.argv[2];
if (!["migrate", "cleanup"].includes(action)) throw new Error("Indica migrate o cleanup.");
const config = loadConfig();
const db = createDatabase(config.databaseUrl);
try {
  const service = createImageMaintenanceService(
    createImageMaintenanceRepository(db),
    createLocalImageStorage(config.mediaDirectory),
    config.mediaRetentionDays,
  );
  console.log(JSON.stringify(await service[action]()));
} finally {
  await db.$disconnect();
}
