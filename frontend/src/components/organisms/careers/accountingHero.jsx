import { Button } from "../../atoms/button";
import { Image } from "../../atoms/image";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";

const points = [
  "Análisis financiero y toma de decisiones estratégicas",
  "Tributación, impuestos y cumplimiento normativo",
  "Control interno y optimización de procesos contables",
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-orange/70 bg-orange px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-soft sm:text-sm">
      {children}
    </span>
  );
}

function HighlightPills({ items }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/35 bg-white/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function WhyStudyPanel() {
  return (
    <div className="w-full max-w-[520px] justify-self-center rounded-[18px] border border-blue-light/40 bg-white/95 p-5 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-7">
      <div className="mb-5 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-dark text-3xl font-bold text-white shadow-md">
          ₡
        </div>
      </div>

      <Title
        level="h2"
        size="compact"
        variant="institutional"
        weight="extrabold"
        align="center"
        className="uppercase tracking-[0.08em]"
      >
        ¿Por qué estudiar Contabilidad?
      </Title>

      <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
        {[
          "Desarrollas habilidades clave para analizar información financiera y apoyar la toma de decisiones estratégicas.",
          "Aprendes a aplicar normas contables, tributarias y de control en entornos reales y dinámicos.",
          "Te preparas para trabajar en empresas, emprendimientos y áreas financieras con proyección profesional.",
        ].map((reason) => (
          <li key={reason} className="flex gap-3">
            <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
            <Paragraph size="base" className="text-slate-700">
              {reason}
            </Paragraph>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        className="mt-7 w-full rounded-md border border-blue-dark bg-blue-dark px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-blue"
      >
        Solicitar información
      </Button>
    </div>
  );
}

function AccountingHero() {
  return (
    <section className="relative overflow-hidden bg-blue-dark text-white">
      <div className="absolute inset-0">
        <Image
          src="/business_admin/CONTABILIDAD.webp"
          alt=""
          fill
          fallbackClassName="bg-blue-dark"
          overlayClassName="bg-linear-to-r from-neutral-black/80 via-neutral-black/55 to-blue-dark/35"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-12 lg:py-16">
        <div className="max-w-xl">
          <Badge>Nueva</Badge>

          <Title
            level="h1"
            size="hero"
            variant="primary"
            weight="extrabold"
            className="mt-5 uppercase leading-[0.95]"
          >
            Carrera de
            <span className="mt-2 block text-5xl sm:text-6xl lg:text-7xl">
              Contabilidad
            </span>
          </Title>

          <Paragraph
            size="comfortable"
            variant="primary"
            className="mt-6 max-w-lg leading-relaxed text-white/90"
          >
            Forma profesionales capaces de registrar, interpretar y comunicar la
            información financiera con rigor técnico y visión estratégica para
            fortalecer la gestión y el crecimiento de las organizaciones.
          </Paragraph>

          <HighlightPills items={points} />
        </div>

        <WhyStudyPanel />
      </div>
    </section>
  );
}

export { AccountingHero };
