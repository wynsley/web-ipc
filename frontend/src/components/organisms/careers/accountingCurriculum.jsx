import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { useCardsPerView } from "../../../hooks/globals/useCardPowerView";
import { useCarousel } from "../../../hooks/globals/useCarrusel";

const accountingCurriculum = [
  {
    title: "PRIMER CICLO",
    items: [
      "Fundamentos de la Contabilidad",
      "Matemática Básica",
      "Introducción a la Administración",
      "Tecnologías de la Información",
      "Comunicación y Redacción",
      "Ética y Responsabilidad Social",
    ],
  },
  {
    title: "SEGUNDO CICLO",
    items: [
      "Contabilidad de Servicios",
      "Estadística Aplicada",
      "Microeconomía",
      "Legislación Comercial",
      "Informática Aplicada",
      "Herramientas de Office",
    ],
  },
  {
    title: "TERCER CICLO",
    items: [
      "Contabilidad Comercial",
      "Costos y Presupuestos",
      "Impuestos I",
      "Análisis Financiero",
      "Mercadeo y Ventas",
      "Fundamentos de Auditoría",
    ],
  },
  {
    title: "CUARTO CICLO",
    items: [
      "Contabilidad de Sociedades",
      "Impuestos II",
      "Finanzas Corporativas",
      "Tributación Empresarial",
      "Control Interno",
      "Gestión de Proyectos",
    ],
  },
  {
    title: "QUINTO CICLO",
    items: [
      "Auditoría Financiera",
      "Contabilidad Gerencial",
      "Presupuestos y Proyección",
      "Riesgos y Seguros",
      "Planeación Financiera",
      "Investigación Aplicada",
    ],
  },
  {
    title: "SEXTO CICLO",
    items: [
      "Seminario de Tesis",
      "Práctica Profesional",
      "Normas Internacionales",
      "Gestión Estratégica",
      "Análisis de Decisiones",
      "Especialización Contable",
    ],
  },
];

function AccountingCurriculum() {
  const cardsPerView = Math.min(useCardsPerView(), 3);

  const {
    extendedSlides,
    activeDot,
    cardWidthExpr,
    translateX,
    goTo,
    setUserPaused,
  } = useCarousel({
    slides: accountingCurriculum,
    cardsPerView,
    gapRem: 1.25,
    autoplay: true,
    autoplayDelay: 2600,
  });

  return (
    <section className="bg-neutral-light px-4 pb-16 pt-4 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <Title
          level="h3"
          size="compact"
          variant="default"
          weight="extrabold"
          className="font-hani uppercase leading-[0.95] tracking-[-0.04em] text-neutral-black"
        >
          Malla curricular de la carrera de Contabilidad
        </Title>

        <Paragraph size="base" className="mt-2 text-neutral-black/80">
          3 años · 6 ciclos
        </Paragraph>

        <div
          className="mt-8"
          onMouseEnter={() => setUserPaused(true)}
          onMouseLeave={() => setUserPaused(false)}
        >
          <div className="overflow-hidden px-1 py-4">
            <div
              className="flex"
              style={{
                gap: "1.25rem",
                transform: `translateX(${translateX})`,
                transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {extendedSlides.map((cycle, index) => (
                <div
                  key={`${cycle.title}-${index}`}
                  className="shrink-0"
                  style={{ width: `calc(${cardWidthExpr})` }}
                >
                  <article className="h-full min-h-[300px] border border-neutral-black/10 bg-white shadow-sm">
                    <div className="bg-[#f5bf4f] px-4 py-3 text-left">
                      <span className="font-hani text-base font-black uppercase tracking-[0.07em] text-neutral-black">
                        {cycle.title}
                      </span>
                    </div>

                    <ul className="space-y-2 px-4 py-4 text-sm leading-relaxed text-neutral-black/90">
                      {cycle.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-neutral-black">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {[0, 1, 2].map((index) => {
              const isActive = index === activeDot;

              return (
                <button
                  key={`nav-${index}`}
                  type="button"
                  aria-label={`Ir al bloque ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "border-[#f5bf4f] bg-[#f5bf4f] text-neutral-black shadow-[0_0_0_4px_rgba(245,191,79,0.18)]"
                      : "border-neutral-black/40 bg-transparent text-neutral-black hover:border-neutral-black"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { AccountingCurriculum };
