import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Button } from "@/components/atoms/button";
import { Link } from "@/components/atoms/links";
import { AccountingHighlights } from "./accountingHighlights";
import { points } from "@/data/careers/accounting/hero";

function AccountingHeroIntro({ onRequest }) {
  return (
    <div className="min-w-0">
      <Paragraph
        as="span"
        className="text-xs font-bold uppercase tracking-[0.2em] text-orange"
      >
        Carrera profesional · IPC
      </Paragraph>
      <Title
        id="accounting-title"
        level="h1"
        variant="primary"
        weight="bold"
        size="hero"
        className="mt-4 font-hani leading-none"
      >
        <span className="block text-[clamp(2.5rem,6vw,5rem)]">
          Contabilidad
        </span>
      </Title>
      <Paragraph
        size="comfortable"
        variant="primary"
        className="mt-6 max-w-xl leading-relaxed text-neutral-white/85"
      >
        Forma profesionales capaces de registrar, interpretar y comunicar la
        información financiera con rigor técnico y visión estratégica para
        fortalecer la gestión y el crecimiento de las organizaciones.
      </Paragraph>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button
          type="button"
          onClick={onRequest}
          className="inline-flex items-center gap-3 rounded-sm bg-orange px-5 py-3 text-sm font-bold text-neutral-black transition-colors hover:bg-neutral-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-white"
        >
          Solicitar información <FiArrowUpRight aria-hidden="true" />
        </Button>
        <Link
          href="#malla-contabilidad"
          variant="plain"
          className="inline-flex items-center gap-2 py-3 text-sm text-neutral-white hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Explorar la malla <FiArrowDown aria-hidden="true" />
        </Link>
      </div>
      <AccountingHighlights items={points} />
    </div>
  );
}

export { AccountingHeroIntro };
