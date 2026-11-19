import { test } from "node:test";
import assert from "node:assert/strict";
import { submitContact } from "../src/helpers/submitContact.js";
import { ContactFormValidator } from "../src/validations/validationCredentials.js";

const validValues = {
  name: "  Ana Lucía O'Connor-Pérez  ",
  email: "  postulante@outlook.com  ",
  phone: " +51 987 654 321 ",
  address: " Jr. Dos de Mayo N° 420, Mz. A Lt. 3 #2 ",
  career: "administracion",
  shift: "manana",
  message: "  Quisiera conocer horarios, costos y fechas del examen.  ",
};

test("envía los siete campos normalizados a /api/v1/inquiries con Idempotency-Key", async (t) => {
  let request;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    request = { url, options };
    return {
      ok: true,
      status: 201,
      json: async () => ({
        data: {
          id: "01950000-0000-7000-8000-000000000001",
          status: "new",
          createdAt: "2026-11-19T02:00:00.000Z",
        },
      }),
    };
  });

  const receipt = await submitContact(validValues, {
    idempotencyKey: "ipc-test-key-001",
  });

  assert.equal(request.url, "/api/v1/inquiries");
  assert.equal(request.options.method, "POST");
  assert.equal(request.options.credentials, "omit");
  assert.equal(request.options.headers["Content-Type"], "application/json");
  assert.equal(request.options.headers["Idempotency-Key"], "ipc-test-key-001");
  assert.deepEqual(JSON.parse(request.options.body), {
    name: "Ana Lucía O'Connor-Pérez",
    email: "postulante@outlook.com",
    phone: "+51 987 654 321",
    address: "Jr. Dos de Mayo N° 420, Mz. A Lt. 3 #2",
    career: "administracion",
    shift: "manana",
    message: "Quisiera conocer horarios, costos y fechas del examen.",
  });
  assert.equal(receipt.id, "01950000-0000-7000-8000-000000000001");
  assert.equal(receipt.status, "new");
});

test("acepta respuestas 200 idempotentes con duplicate: true", async (t) => {
  t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    status: 200,
    json: async () => ({
      data: {
        id: "01950000-0000-7000-8000-000000000001",
        status: "new",
        createdAt: "2026-11-19T02:00:00.000Z",
        duplicate: true,
      },
    }),
  }));

  const receipt = await submitContact(validValues, {
    idempotencyKey: "ipc-test-key-001",
  });
  assert.equal(receipt.duplicate, true);
});

test("propaga errores 422 por campo y 429 de límite anti-spam", async (t) => {
  const mock422 = t.mock.method(globalThis, "fetch", async () => ({
    ok: false,
    status: 422,
    json: async () => ({
      error: {
        code: "VALIDATION_ERROR",
        message: "Revisa los datos enviados.",
        fields: { email: ["Correo electrónico inválido."] },
      },
    }),
  }));

  await assert.rejects(
    submitContact(validValues),
    (error) =>
      error.status === 422 &&
      error.code === "VALIDATION_ERROR" &&
      error.message === "Correo electrónico inválido." &&
      error.fields?.email?.[0] === "Correo electrónico inválido.",
  );
  mock422.mock.restore();

  t.mock.method(globalThis, "fetch", async () => ({
    ok: false,
    status: 429,
    json: async () => ({
      error: {
        code: "RATE_LIMITED",
        message: "Demasiadas solicitudes. Intenta nuevamente más tarde.",
      },
    }),
  }));

  await assert.rejects(
    submitContact(validValues),
    (error) =>
      error.status === 429 &&
      error.code === "RATE_LIMITED" &&
      /Demasiadas solicitudes/.test(error.message),
  );
});

test("rechaza respuestas sin confirmación de id y comunica fallos de red", async (t) => {
  const mockInvalid = t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    status: 201,
    json: async () => ({ data: {} }),
  }));
  await assert.rejects(
    submitContact(validValues),
    /El servicio no confirmó el registro/,
  );
  mockInvalid.mock.restore();

  t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("Failed to fetch");
  });
  await assert.rejects(
    submitContact(validValues),
    /No pudimos confirmar el envío/,
  );
});

test("ContactFormValidator admite cualquier dominio válido y direcciones peruanas", async () => {
  for (const email of [
    "postulante@outlook.com",
    "admision@ipc.edu.pe",
    "contacto@empresa.com.pe",
    "maria@icloud.com",
  ]) {
    const validated = await ContactFormValidator.validateAsync({
      ...validValues,
      email,
    });
    assert.equal(validated.email, email);
  }

  await assert.rejects(
    ContactFormValidator.validateAsync({
      ...validValues,
      email: "sin-dominio@localhost",
    }),
  );
  await assert.rejects(
    ContactFormValidator.validateAsync({
      ...validValues,
      phone: "12345",
    }),
  );
  await assert.rejects(
    ContactFormValidator.validateAsync({
      ...validValues,
      address: "Av. <script>",
    }),
  );
});
