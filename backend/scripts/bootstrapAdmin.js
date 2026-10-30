import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { loadConfig } from "../src/config/env.js";
import { createDatabase } from "../src/infrastructure/database/prisma.js";
import { createAuthRepository } from "../src/modules/auth/authRepository.js";
import { createInvitationService } from "../src/modules/auth/invitationService.js";
import { registerSchema, reissueSchema } from "../src/modules/auth/authSchema.js";

const db = createDatabase(loadConfig().databaseUrl);
const terminal = createInterface({ input: stdin, output: stdout });
try {
  const reissue = process.argv[2] === "--reissue";
  if (process.argv.slice(2).some((arg) => arg !== "--reissue"))
    throw new Error("Argumento no permitido");
  const name = reissue ? null : await terminal.question("Nombre del primer administrador: ");
  const email = await terminal.question("Correo de la cuenta: ");
  const data = reissue
    ? reissueSchema.parse({ email })
    : registerSchema.parse({ name, email, role: "admin" });
  const service = await createInvitationService(createAuthRepository(db));
  const result = reissue ? await service.reissue(data.email) : await service.bootstrap(data);
  console.log(
    "Cuenta pendiente creada. Actívala en POST /api/v1/auth/activate dentro de 24 horas.",
  );
  console.log("Código privado de un solo uso (no guardarlo en Git ni compartir capturas):");
  console.log(result.activationToken);
} catch (error) {
  console.error(
    ["BOOTSTRAP_CLOSED", "ACCOUNT_ACTIVE", "ACCOUNT_NOT_FOUND"].includes(error.code)
      ? error.message
      : "No se pudo crear la cuenta. Revisa los datos y la conexión; las cuentas existentes no se modifican.",
  );
  process.exitCode = 1;
} finally {
  terminal.close();
  await db.$disconnect();
}
