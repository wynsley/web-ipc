import assert from "node:assert/strict";
import { test } from "node:test";
import { auditActionInfo } from "../src/helpers/auditMeta.js";

test("auditActionInfo devuelve etiquetas en español y severidad correcta", () => {
  const reuse = auditActionInfo("auth.refresh_reuse", "auth");
  assert.equal(reuse.severity, "danger");
  assert.equal(reuse.variant, "danger");
  assert.equal(reuse.categoryLabel, "Seguridad");
  assert.match(reuse.label, /reutilización/i);

  const exportInq = auditActionInfo("inquiry.exported", "inquiry");
  assert.equal(exportInq.severity, "warning");
  assert.equal(exportInq.categoryLabel, "Admisión");

  const published = auditActionInfo("event.published", "event");
  assert.equal(published.severity, "success");
  assert.equal(published.categoryLabel, "Eventos");
});

test("auditActionInfo maneja acciones futuras desconocidas sin fallar", () => {
  const future = auditActionInfo("content.published", "content");
  assert.equal(future.label, "content.published");
  assert.equal(future.severity, "neutral");
  assert.equal(future.categoryLabel, "Contenido");
});
