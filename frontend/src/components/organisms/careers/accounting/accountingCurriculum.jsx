import { AccountingCycleCard } from "@/components/molecules/careers/accounting/accountingCycleCard";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import { accountingCurriculum } from "@/data/careers/accounting/curriculum";

function AccountingCurriculum() {
  return (
    <section id="malla-contabilidad" aria-labelledby="accounting-curriculum" className="scroll-mt-28 bg-neutral-light px-5 py-16 sm:px-8 lg:px-12 lg:py-22">
      <div className="mx-auto max-w-7xl">
        <CareerSectionHeading id="accounting-curriculum" eyebrow="Tu recorrido académico" title="Malla curricular" description="3 años · 6 ciclos. Explora las asignaturas de cada etapa." descriptionClassName="mt-4" />
        <div className="mt-9 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accountingCurriculum.map((cycle, index) => (
            <AccountingCycleCard key={cycle.title} cycle={cycle} number={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { AccountingCurriculum };
