import { serve } from "@hono/node-server";
import { getConnInfo } from "@hono/node-server/conninfo";
import { loadConfig } from "./config/env.js";
import { createDatabase } from "./infrastructure/database/prisma.js";
import { createApp } from "./app.js";

import { createLocalImageStorage } from "./infrastructure/storage/localImageStorage.js";
import { createImageMaintenanceRepository } from "./modules/media/imageMaintenanceRepository.js";
import { createImageMaintenanceService } from "./modules/media/imageMaintenanceService.js";
import { startImageCleanup } from "./jobs/imageCleanup.js";

const config = loadConfig();
const db = createDatabase(config.databaseUrl);
await db.$connect();
const app = await createApp({
  db,
  config,
  // No confiar en X-Forwarded-For enviado por clientes. Revisar proxy antes del despliegue.
  clientIp: (c) => getConnInfo(c).remote.address ?? "unknown",
});
const stopCleanup = startImageCleanup(
  createImageMaintenanceService(
    createImageMaintenanceRepository(db),
    createLocalImageStorage(config.mediaDirectory),
    config.mediaRetentionDays,
  ),
);
const server = serve(
  {
    fetch: app.fetch,
    hostname: "127.0.0.1",
    port: config.port,
  },
  () => console.log(`Backend disponible en http://127.0.0.1:${config.port}`),
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => {
    server.close(async () => {
      await stopCleanup();
      await db.$disconnect();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 5000).unref();
  });
}
