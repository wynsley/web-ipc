import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildGmailComposeUrl,
  buildWhatsAppUrl,
  normalizeWhatsAppPhone,
} from "../src/helpers/inquiryContactLinks.js";
import {
  formatRelativeElapsed,
  inquiryElapsedInfo,
} from "../src/helpers/inquiryElapsedTime.js";

const sampleInquiry = {
  name: "María José Quispe",
  email: "maria.quispe@gmail.com",
  phone: "987 654 321",
  career: "administracion",
  shift: "manana",
  status: "new",
  createdAt: "2026-11-18T10:00:00.000Z",
};

test("normalizeWhatsAppPhone añade prefijo 51 a celulares peruanos y conserva prefijos internacionales", () => {
  assert.equal(normalizeWhatsAppPhone("987 654 321"), "51987654321");
  assert.equal(normalizeWhatsAppPhone("0987654321"), "51987654321");
  assert.equal(normalizeWhatsAppPhone("+51 987-654-321"), "51987654321");
  assert.equal(normalizeWhatsAppPhone("+34 612 345 678"), "34612345678");
  assert.equal(normalizeWhatsAppPhone("12345"), null);
});

test("buildWhatsAppUrl y buildGmailComposeUrl generan enlaces directos sin mailto", () => {
  const wa = new URL(buildWhatsAppUrl(sampleInquiry));
  assert.equal(wa.origin, "https://wa.me");
  assert.equal(wa.pathname, "/51987654321");
  assert.match(wa.searchParams.get("text"), /Hola María/);
  assert.match(wa.searchParams.get("text"), /Administración de Empresas/);
  assert.match(wa.searchParams.get("text"), /turno mañana/);

  const gmail = new URL(buildGmailComposeUrl(sampleInquiry));
  assert.equal(gmail.origin, "https://mail.google.com");
  assert.equal(gmail.pathname, "/mail/");
  assert.equal(gmail.searchParams.get("view"), "cm");
  assert.equal(gmail.searchParams.get("fs"), "1");
  assert.equal(gmail.searchParams.get("to"), "maria.quispe@gmail.com");
  assert.match(gmail.searchParams.get("su"), /Administración de Empresas/);
  assert.match(gmail.searchParams.get("body"), /María José Quispe/);
});

test("inquiryElapsedInfo formatea tiempos relativos y marca alertas de consultas nuevas", () => {
  assert.equal(formatRelativeElapsed(20_000), "Hace un momento");
  assert.equal(formatRelativeElapsed(15 * 60_000), "Hace 15 min");
  assert.equal(formatRelativeElapsed(5 * 3_600_000), "Hace 5 h");
  assert.equal(formatRelativeElapsed(2 * 86_400_000), "Hace 2 días");

  const base = Date.parse(sampleInquiry.createdAt);
  const fresh = inquiryElapsedInfo(sampleInquiry, base + 2 * 3_600_000);
  assert.deepEqual(fresh, {
    label: "Hace 2 h",
    isOverdue: false,
    isWarning: false,
  });

  const warning = inquiryElapsedInfo(sampleInquiry, base + 8 * 3_600_000);
  assert.deepEqual(warning, {
    label: "Hace 8 h",
    isOverdue: false,
    isWarning: true,
  });

  const overdue = inquiryElapsedInfo(sampleInquiry, base + 26 * 3_600_000);
  assert.deepEqual(overdue, {
    label: "Hace 1 día",
    isOverdue: true,
    isWarning: false,
  });

  const inProgressOld = inquiryElapsedInfo(
    { ...sampleInquiry, status: "in_progress" },
    base + 48 * 3_600_000,
  );
  assert.equal(inProgressOld.isOverdue, false);
  assert.equal(inProgressOld.isWarning, false);
});
