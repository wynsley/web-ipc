import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";

function AccountingValueProps() {
  return (
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
  );
}

export { AccountingValueProps };
