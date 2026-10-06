import { MyTemplate } from "../../templates/myTemplate";

import { Image } from "../../atoms/image";

import { Button } from "../../atoms/button";

import { Paragraph } from "../../atoms/paragraph";

import { Title } from "../../atoms/titles";

import { useCardsPerView } from "../../../hooks/globals/useCardPowerView";

import { useCarousel } from "../../../hooks/globals/useCarrusel";
const points = [

  "Análisis financiero y toma de decisiones estratégicas",

  "Tributación, impuestos y cumplimiento normativo",

  "Control interno y optimización de procesos contables",

];

const careerDetails = [

  { label: "Carrera", value: "Contabilidad" },

  { label: "Duración", value: "3 años" },

  { label: "Grado obtenido", value: "Técnico en Contabilidad" },

  { label: "Modalidad", value: "Presencial" },

];

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

function AccountingPage() {

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

    <MyTemplate>

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

            <span className="inline-flex items-center rounded-md border border-orange/70 bg-orange px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-soft sm:text-sm">

              Nueva

            </span>

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

            <div className="mt-8 flex flex-wrap gap-3">

              {points.map((item) => (

                <span

                  key={item}

                  className="rounded-full border border-white/35 bg-white/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm"

                >

                  {item}

                </span>

              ))}

            </div>

          </div>

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

              <li className="flex gap-3">

                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />

                <Paragraph size="base" className="text-slate-700">

                  Desarrollas habilidades clave para analizar información financiera y

                  apoyar la toma de decisiones estratégicas.

                </Paragraph>

              </li>

              <li className="flex gap-3">

                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />

                <Paragraph size="base" className="text-slate-700">

                  Aprendes a aplicar normas contables, tributarias y de control en

                  entornos reales y dinámicos.

                </Paragraph>

              </li>

              <li className="flex gap-3">

                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />

                <Paragraph size="base" className="text-slate-700">

                  Te preparas para trabajar en empresas, emprendimientos y áreas

                  financieras con proyección profesional.

                </Paragraph>

              </li>

            </ul>

            <Button

              type="button"

              className="mt-7 w-full rounded-md border border-blue-dark bg-blue-dark px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-blue"

            >

              Solicitar información

            </Button>

          </div>

        </div>

      </section>

      <section className="bg-neutral-white px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-start lg:gap-16">

          <div>

            <Title

              level="h2"

              size="compact"

              variant="default"

              weight="extrabold"

              className="max-w-2xl font-hani uppercase leading-tight"

            >

              Estudia Contabilidad y fortalece la gestión financiera de las organizaciones

            </Title>

            <Paragraph

              size="base"

              className="mt-4 max-w-2xl leading-relaxed text-neutral-black"

            >

              Desarrolla competencias para registrar, analizar e interpretar información

              financiera con rigor metodológico, contribuyendo a la toma de decisiones

              estratégicas en organizaciones de diversos sectores.

            </Paragraph>

            <dl className="mt-6 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">

              {careerDetails.map(({ label, value }) => (

                <div key={label}>

                  <dt>

                    <Paragraph

                      size="small"

                      weight="bold"

                      className="font-hani uppercase text-neutral-black"

                    >

                      {label}:

                    </Paragraph>

                  </dt>

                  <dd>

                    <Paragraph size="base" className="text-neutral-black">

                      {value}

                    </Paragraph>

                  </dd>

                </div>

              ))}

            </dl>

          </div>

          <div>

            <Title

              level="h3"

              size="compact"

              variant="default"

              weight="extrabold"

              align="center"

              className="mx-auto mb-4 max-w-xl font-hani uppercase leading-tight"

            >

              ¿Por qué estudiar Contabilidad?

            </Title>

            <div className="relative mx-auto aspect-video max-w-xl overflow-hidden">

              <Image

                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85"

                alt="Profesional de contabilidad analizando documentos financieros y calculadora"

                fill

                imageClassName="brightness-125 contrast-105"

                fallbackClassName="bg-blue-dark"

              />

            </div>

          </div>

        </div>

      </section>

      <section className="bg-[#f3f3f3] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

        <div className="mx-auto max-w-7xl">

          <Title

            level="h3"

            size="compact"

            variant="default"

            weight="extrabold"

            className="max-w-[980px] font-hani uppercase leading-[0.95] tracking-[-0.04em] text-neutral-black"

          >

            ¿Por qué estudiar Contabilidad en el IPC?

          </Title>

          <div className="mt-8 grid gap-8 md:grid-cols-2">

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-black text-[10px] font-black text-white">

                  ✓

                </span>

                <div>

                  <Paragraph size="base" weight="bold" className="mb-1 font-hani uppercase text-neutral-black">

                    Formación alineada a estándares internacionales

                  </Paragraph>

                  <Paragraph size="base" className="text-neutral-black/80">

                    La carrera de Contabilidad en el IPC te prepara para comprender,

                    registrar e interpretar la información financiera con criterios de

                    calidad, precisión y actualización profesional.

                  </Paragraph>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-black text-[10px] font-black text-white">

                  ✓

                </span>

                <div>

                  <Paragraph size="base" weight="bold" className="mb-1 font-hani uppercase text-neutral-black">

                    Certificaciones progresivas

                  </Paragraph>

                  <Paragraph size="base" className="text-neutral-black/80">

                    A lo largo de la carrera fortaleces competencias en áreas clave

                    como tributación, análisis financiero, control contable y gestión

                    de procesos empresariales.

                  </Paragraph>

                </div>

              </div>

            </div>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-black text-[10px] font-black text-white">

                  ✓

                </span>

                <div>

                  <Paragraph size="base" weight="bold" className="mb-1 font-hani uppercase text-neutral-black">

                    Infraestructura y laboratorios de primer nivel

                  </Paragraph>

                  <Paragraph size="base" className="text-neutral-black/80">

                    Dispones de espacios y herramientas para practicar situaciones

                    reales de trabajo contable, análisis y control financiero con un

                    enfoque aplicado a la industria.

                  </Paragraph>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-black text-[10px] font-black text-white">

                  ✓

                </span>

                <div>

                  <Paragraph size="base" weight="bold" className="mb-1 font-hani uppercase text-neutral-black">

                    Credenciales especializadas

                  </Paragraph>

                  <Paragraph size="base" className="text-neutral-black/80">

                    Te preparas para desempeñarte en sectores financieros, empresas,

                    emprendimientos y organizaciones que requieren decisiones basadas

                    en información contable clara y confiable.

                  </Paragraph>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-neutral-light px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.5fr] md:items-start">

          <Title

            level="h3"

            size="compact"

            variant="default"

            weight="extrabold"

            className="font-hani uppercase leading-[0.9] tracking-[-0.04em] text-neutral-black"

          >

            Campo profesional

          </Title>

          <div className="space-y-8">

            <div>

              <Paragraph

                size="base"

                weight="bold"

                className="mb-3 font-hani uppercase text-neutral-black"

              >

                Podrás desempeñarte en:

              </Paragraph>

              <ul className="space-y-2 pl-5 text-neutral-black/90">

                {[

                  "Empresas de servicios financieros y bancos.",

                  "Entidades públicas y privadas del sector empresarial.",

                  "Organizaciones de comercio, industria y servicios.",

                  "Empresas de auditoría y consultoría.",

                  "Micro, pequeñas y medianas empresas.",

                  "Instituciones educativas y organizaciones sin fines de lucro.",

                  "Departamentos de finanzas, administración y control interno.",

                  "Emprendimientos y negocios en crecimiento.",

                ].map((item) => (

                  <li key={item} className="list-disc marker:text-neutral-black/80 leading-relaxed">

                    {item}

                  </li>

                ))}

              </ul>

            </div>

            <div>

              <Paragraph

                size="base"

                weight="bold"

                className="mb-3 font-hani uppercase text-neutral-black"

              >

                Podrás trabajar como:

              </Paragraph>

              <ul className="space-y-2 pl-5 text-neutral-black/90">

                {[

                  "Contador(a) general.",

                  "Analista contable.",

                  "Especialista en impuestos y tributación.",

                  "Asistente de finanzas y administración.",

                  "Auxiliar de auditoría.",

                  "Encargado(a) de control interno.",

                  "Gestor(a) financiero.",

                  "Analista de costos y presupuesto.",

                  "Técnico(a) en contabilidad.",

                  "Consultor(a) contable y fiscal.",

                ].map((item) => (

                  <li key={item} className="list-disc marker:text-neutral-black/80 leading-relaxed">

                    {item}

                  </li>

                ))}

              </ul>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-neutral-light px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

        <div className="mx-auto max-w-6xl">

          <Title

            level="h3"

            size="compact"

            variant="default"

            weight="extrabold"

            className="font-hani uppercase leading-[0.95] tracking-[-0.04em] text-neutral-black"

          >

            ¿Qué aprenderás durante la carrera?

          </Title>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {[

              "Desarrollarás competencias para registrar, analizar e interpretar información financiera con precisión y rigor profesional.",

              "Aprenderás a aplicar normas contables, tributarias y de control para apoyar la toma de decisiones en las organizaciones.",

              "Entrenarás en ejercicios y casos reales de contabilidad, costos, impuestos y gestión financiera para fortalecer tu criterio profesional.",

              "Fortalecerás tus habilidades con herramientas y metodologías de análisis financiero, presupuestos y control interno para el entorno empresarial.",

            ].map((item) => (

              <div key={item} className="flex gap-3">

                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f5bf4f] text-sm font-black text-neutral-black shadow-sm">

                  ✓

                </span>

                <Paragraph size="base" className="max-w-[250px] leading-relaxed text-neutral-black">

                  {item}

                </Paragraph>

              </div>

            ))}

          </div>

        </div>

      </section>

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

                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${isActive

                        ? "border-[#f5bf4f] bg-[#f5bf4f] text-neutral-black shadow-[0_0_0_4px_rgba(245,191,79,0.18)]"

                        : "border-neutral-black/40 bg-transparent text-neutral-black hover:border-neutral-black"}`}

                  >

                    {index + 1}

                  </button>

                );

              })}

            </div>

          </div>

        </div>

      </section>

    </MyTemplate>

  );

}

export { AccountingPage };