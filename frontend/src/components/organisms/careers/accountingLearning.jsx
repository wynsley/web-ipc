import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";

const learningTopics = [
  "Desarrollarás competencias para registrar, analizar e interpretar información financiera con precisión y rigor profesional.",
  "Aprenderás a aplicar normas contables, tributarias y de control para apoyar la toma de decisiones en las organizaciones.",
  "Entrenarás en ejercicios y casos reales de contabilidad, costos, impuestos y gestión financiera para fortalecer tu criterio profesional.",
  "Fortalecerás tus habilidades con herramientas y metodologías de análisis financiero, presupuestos y control interno para el entorno empresarial.",
];

function AccountingLearning() {
  return (
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
          {learningTopics.map((item) => (
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
  );
}

export { AccountingLearning };
