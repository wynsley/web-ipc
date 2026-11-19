import { FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import {
  buildGmailComposeUrl,
  buildWhatsAppUrl,
} from "../../../helpers/inquiryContactLinks";

export function InquiryQuickReplyButtons({ inquiry, compact = false }) {
  const whatsappUrl = buildWhatsAppUrl(inquiry);
  const gmailUrl = buildGmailComposeUrl(inquiry);
  const sizing = compact
    ? "min-h-9 gap-1.5 px-2.5 py-1.5 text-xs"
    : "min-h-10 gap-2 px-3.5 py-2 text-sm";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Responder por WhatsApp a ${inquiry.name} (abre en una pestaña nueva)`}
          className={`inline-flex items-center justify-center rounded-lg border border-[#34d399]/30 bg-[#10b981]/12 font-poppins font-semibold text-[#6ee7b7] transition-colors hover:border-[#34d399]/55 hover:bg-[#10b981]/22 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus ${sizing}`}
        >
          <FaWhatsapp aria-hidden="true" className="shrink-0 text-base" />
          <span>{compact ? "WhatsApp" : "Responder por WhatsApp"}</span>
        </a>
      )}
      {gmailUrl && (
        <a
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enviar mensaje por Gmail a ${inquiry.name} (abre en una pestaña nueva)`}
          className={`inline-flex items-center justify-center rounded-lg border border-blue-light/30 bg-blue/15 font-poppins font-semibold text-blue-light transition-colors hover:border-blue-light/55 hover:bg-blue/25 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus ${sizing}`}
        >
          <SiGmail aria-hidden="true" className="shrink-0 text-sm" />
          <span>{compact ? "Gmail" : "Responder por Gmail"}</span>
        </a>
      )}
    </div>
  );
}
