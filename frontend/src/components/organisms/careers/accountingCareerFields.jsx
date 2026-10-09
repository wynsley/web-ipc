import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";

const fieldRoles = [
  "Empresas de servicios financieros y bancos.",
  "Entidades públicas y privadas del sector empresarial.",
  "Organizaciones de comercio, industria y servicios.",
  "Empresas de auditoría y consultoría.",
  "Micro, pequeñas y medianas empresas.",
  "Instituciones educativas y organizaciones sin fines de lucro.",
  "Departamentos de finanzas, administración y control interno.",
  "Emprendimientos y negocios en crecimiento.",
];

const jobTitles = [
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
];

function FeatureList({ title, items }) {
  return (
    <div>
      <Paragraph size="base" weight="bold" className="mb-3 font-hani uppercase text-neutral-black">
        {title}
      </Paragraph>
      <ul className="space-y-2 pl-5 text-neutral-black/90">
        {items.map((item) => (
          <li key={item} className="list-disc marker:text-neutral-black/80 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AccountingCareerFields() {
  return (
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
          <FeatureList title="Podrás desempeñarte en:" items={fieldRoles} />
          <FeatureList title="Podrás trabajar como:" items={jobTitles} />
        </div>
      </div>
    </section>
  );
}

export { AccountingCareerFields };
