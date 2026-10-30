import assert from "node:assert/strict";
import { test } from "node:test";
import { Hono } from "hono";
import { z } from "zod";
import { readInput } from "../src/middleware/readInput.js";
import { handleError } from "../src/middleware/errors.js";
import { registerSchema, reissueSchema, activateSchema } from "../src/modules/auth/authSchema.js";

const app = new Hono();
app.onError(handleError);
for (const [path, schema] of [
  ["register", registerSchema],
  ["reissue", reissueSchema],
  ["activate", activateSchema],
]) {
  app.post("/" + path, async (c) => c.json(await readInput(c, schema)));
}
app.post("/custom", async (c) =>
  c.json(
    await readInput(
      c,
      z.object({
        person: z.object({ email: z.email({ error: "Revisa el correo de la persona." }) }),
      }),
      { message: "Revisa la persona." },
    ),
  ),
);
const request = (path, body) =>
  app.request("/" + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

test("errores de correo no mencionan contraseña ni devuelven datos recibidos", async () => {
  const response = await request("reissue", { email: "private-invalid-value" });
  assert.equal(response.status, 422);
  const result = await response.json();
  assert.equal(result.error.message, "Revisa los campos enviados.");
  assert.deepEqual(result.error.fields, { email: ["Introduce un correo válido."] });
  assert.equal(JSON.stringify(result).includes("private-invalid-value"), false);
});

test("registra errores por campo y agrupa campos extra en _form", async () => {
  const response = await request("register", {
    name: "a",
    email: "bad",
    role: "owner",
    password: "private-secret",
  });
  const result = await response.json();
  assert.equal(response.status, 422);
  assert.deepEqual(Object.keys(result.error.fields).sort(), ["_form", "email", "name", "role"]);
  assert.equal(JSON.stringify(result).includes("private-secret"), false);
});

test("activación informa el límite de contraseña únicamente cuando ese campo falla", async () => {
  const response = await request("activate", { token: "a".repeat(43), password: "short" });
  assert.deepEqual((await response.json()).error.fields, {
    password: ["Debe tener al menos 15 caracteres."],
  });
});

test("mantiene normalización y distingue JSON malformado de entrada inválida", async () => {
  assert.equal((await request("reissue", "{")).status, 400);
  const missing = await request("reissue", {});
  assert.equal(missing.status, 422);
  assert.deepEqual((await missing.json()).error.fields, {
    email: ["Este campo es obligatorio o tiene un tipo incorrecto."],
  });
  const valid = await request("reissue", { email: "  ADMIN@EXAMPLE.TEST  " });
  assert.equal(valid.status, 200);
  assert.deepEqual(await valid.json(), { email: "admin@example.test" });
});

test("admite mensajes personalizados y rutas de campos anidados", async () => {
  const response = await request("custom", { person: { email: "bad" } });
  assert.deepEqual((await response.json()).error, {
    code: "INVALID_INPUT",
    message: "Revisa la persona.",
    fields: { "person.email": ["Revisa el correo de la persona."] },
  });
});
