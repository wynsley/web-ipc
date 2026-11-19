import {
  INQUIRY_CAREER_LABELS,
  INQUIRY_SHIFT_LABELS,
} from "./inquiryMeta.js";

export function normalizeWhatsAppPhone(rawPhone) {
  const digits = String(rawPhone ?? "").replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 9 && digits.startsWith("9")) return "51" + digits;
  if (digits.length === 10 && digits.startsWith("09"))
    return "51" + digits.slice(1);
  if (digits.length >= 10 && digits.length <= 15) return digits;
  return null;
}

export function buildInquiryReplyTemplate(inquiry) {
  const firstName =
    String(inquiry.name ?? "")
      .trim()
      .split(/\s+/)[0] || "postulante";
  const career = INQUIRY_CAREER_LABELS[inquiry.career] || inquiry.career;
  const shift = (INQUIRY_SHIFT_LABELS[inquiry.shift] || inquiry.shift)
    .toLowerCase();

  return {
    subject: `Información sobre ${career} — Instituto Privado Celendín`,
    whatsappText: `Hola ${firstName}, te saludamos del área de Admisión del Instituto Privado Celendín (IPC). Recibimos tu consulta sobre ${career} (turno ${shift}). ¿Cómo podemos ayudarte?`,
    gmailBody: [
      `Hola ${inquiry.name},`,
      "",
      `Te saludamos del área de Admisión del Instituto Privado Celendín (IPC). Recibimos tu consulta sobre la carrera de ${career} en el turno ${shift}.`,
      "",
      "",
      "Saludos cordiales,",
      "Área de Admisión — Instituto Privado Celendín",
    ].join("\n"),
  };
}

export function buildWhatsAppUrl(inquiry) {
  const phone = normalizeWhatsAppPhone(inquiry?.phone);
  if (!phone) return null;
  const { whatsappText } = buildInquiryReplyTemplate(inquiry);
  return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappText)}`;
}

export function buildGmailComposeUrl(inquiry) {
  const email = String(inquiry?.email ?? "").trim();
  if (!email) return null;
  const { subject, gmailBody } = buildInquiryReplyTemplate(inquiry);
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email,
    su: subject,
    body: gmailBody,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
