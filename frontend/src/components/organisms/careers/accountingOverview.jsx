import { Image } from "../../atoms/image";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";

const careerDetails = [
  { label: "Carrera", value: "Contabilidad" },
  { label: "Duración", value: "3 años" },
  { label: "Grado obtenido", value: "Técnico en Contabilidad" },
  { label: "Modalidad", value: "Presencial" },
];

function CareerDetails() {
  return (
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
  );
}

function AccountingOverview() {
  return (
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

          <CareerDetails />
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
  );
}

export { AccountingOverview };
