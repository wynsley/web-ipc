import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import config from "../prisma.config.js";

function main() {
  let url;
  try {
    url = new URL(config.datasource.url);
  } catch {
    throw new Error("DATABASE_URL no es válida.");
  }

  const localHost = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const publicSchema =
    !url.searchParams.has("schema") || url.searchParams.get("schema") === "public";
  if (
    process.env.NODE_ENV !== "development" ||
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    !localHost ||
    url.pathname !== "/ipc_backend_dev" ||
    !publicSchema
  ) {
    throw new Error("Reset permitido solo en development y en la base local ipc_backend_dev.");
  }

  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== "--check")) {
    throw new Error("Solo se admite --check. La confirmación de Prisma no se omite.");
  }

  if (args[0] === "--check") {
    console.log("Destino local verificado: ipc_backend_dev. No se borró ningún dato.");
    return;
  }

  console.log("Se eliminarán los datos de ipc_backend_dev y se reaplicarán las migraciones.");
  console.log("Los archivos de migración se conservan. Prisma pedirá confirmación.");
  const require = createRequire(import.meta.url);
  const result = spawnSync(
    process.execPath,
    [require.resolve("prisma/build/index.js"), "migrate", "reset"],
    { cwd: fileURLToPath(new URL("../", import.meta.url)), stdio: "inherit" },
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
