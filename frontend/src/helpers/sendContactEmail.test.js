import { test } from "node:test";
import assert from "node:assert/strict";
import { sendContactEmail } from "./sendContactEmail.js";

const values = {
  name: "Persona de prueba", email: "prueba@example.com", phone: "999999999",
  address: "Dirección de prueba", career: "administracion", shift: "manana",
  message: "Mensaje de prueba sin envío real",
};

test("envía los siete campos, etiquetas legibles y Reply-To sin llamar al backend", async (t) => {
  let request;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ success: "true" }) };
  });
  await sendContactEmail(values, "destino@example.com");
  assert.equal(request.url, "https://formsubmit.co/ajax/destino%40example.com");
  const body = JSON.parse(request.options.body);
  assert.deepEqual(body, {
    "Nombre completo": values.name, email: values.email, "Teléfono": values.phone,
    "Dirección": values.address, Carreras: "Administración", Turno: "Mañana",
    Mensaje: values.message, _replyto: values.email,
    _subject: "IPC — Nueva solicitud de información", _template: "table",
  });
});

test("rechaza errores HTTP, rechazo del proveedor y respuestas inválidas", async (t) => {
  for (const response of [
    { ok: false },
    { ok: true, json: async () => ({ success: "false" }) },
    { ok: true, json: async () => ({}) },
    { ok: true, json: async () => { throw new SyntaxError("Invalid JSON"); } },
  ]) {
    const mock = t.mock.method(globalThis, "fetch", async () => response);
    await assert.rejects(sendContactEmail(values, "destino@example.com"));
    mock.mock.restore();
  }
});

test("comunica fallos de red sin afirmar que se entregó el correo", async (t) => {
  t.mock.method(globalThis, "fetch", async () => { throw new TypeError("Failed to fetch"); });
  await assert.rejects(sendContactEmail(values, "destino@example.com"), /No pudimos confirmar el envío/);
});
