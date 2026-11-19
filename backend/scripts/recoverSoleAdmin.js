import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { loadConfig } from "../src/config/env.js";
import { createDatabase } from "../src/infrastructure/database/prisma.js";
import { emailSchema } from "../src/modules/auth/authSchema.js";
import { issueSoleAdminRecovery } from "./issueSoleAdminRecovery.js";

const terminal = createInterface({ input: stdin, output: stdout });
const db = createDatabase(loadConfig().databaseUrl);
try {
  if (!stdin.isTTY || !stdout.isTTY) throw new Error("Usa una terminal privada interactiva.");
  const email = emailSchema.parse(
    await terminal.question("Correo del único administrador activo: "),
  );
  const incident = (
    await terminal.question("Referencia de la autorización institucional: ")
  ).trim();
  if (!/^[A-Za-z0-9_-]{1,48}$/.test(incident)) throw new Error("Introduce una referencia válida.");
  const mode = await terminal.question(
    "Escribe CONTRASEÑA o FACTORES según el alcance autorizado: ",
  );
  if (!["CONTRASEÑA", "FACTORES"].includes(mode)) throw new Error("Operación cancelada.");
  if (
    (await terminal.question("Confirma la identidad y autorización escribiendo VERIFICADO: ")) !==
    "VERIFICADO"
  )
    throw new Error("Operación cancelada.");
  const token = await issueSoleAdminRecovery(db, email, incident, mode === "FACTORES");
  stdout.write("Entrega privada al titular. Código válido durante 15 minutos:\n" + token + "\n");
} catch (error) {
  console.error(error.name === "Error" ? error.message : "No se pudo emitir el código.");
  process.exitCode = 1;
} finally {
  terminal.close();
  await db.$disconnect();
}
