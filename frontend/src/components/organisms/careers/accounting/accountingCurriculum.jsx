import { AccountingCurriculumYear } from "@/components/molecules/careers/accounting/accountingCurriculumYear";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import { accountingCurriculumYears } from "@/data/careers/accounting/curriculum";
import { useMediaQuery } from "@/hooks/globals/useMediaQuery";

function AccountingCurriculum() {
  const expanded = useMediaQuery("(min-width: 1024px)");
  return (
    <section
      id="malla-contabilidad"
      aria-labelledby="accounting-curriculum"
      className="scroll-mt-28 bg-neutral-light px-5 py-16 sm:px-8 lg:px-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl">
        <CareerSectionHeading
          id="accounting-curriculum"
          eyebrow="Tu recorrido académico"
          title="Malla curricular"
          description="3 años | 6 ciclos. Explora las asignaturas de cada etapa."
          descriptionClassName="mt-4"
        />
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-3">
          {accountingCurriculumYears.map((year) => (
            <AccountingCurriculumYear
              key={year.number}
              year={year}
              expanded={expanded}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { AccountingCurriculum };
