import { AccountingCareerGroup } from "@/components/molecules/careers/accounting/accountingCareerGroup";
import { AccountingInformationCta } from "@/components/molecules/careers/accounting/accountingInformationCta";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import {
  careerSectors,
  careerFunctions,
} from "@/data/careers/accounting/fields";

function AccountingCareerFields({ onRequest }) {
  return (
    <section
      aria-labelledby="accounting-fields"
      className="bg-blue-dark px-5 py-16 sm:px-8 lg:px-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl">
        <CareerSectionHeading
          inverse
          id="accounting-fields"
          eyebrow="Proyección profesional"
          title="Un campo de acción amplio"
          description="Explora los sectores y funciones vinculados a la Contabilidad."
          descriptionClassName="mt-4 max-w-2xl"
        />
        <div className="mt-10 grid gap-10 xl:grid-cols-2">
          <AccountingCareerGroup
            id="accounting-sectors"
            title="Dónde puedes trabajar"
            groups={careerSectors}
          />
          <AccountingCareerGroup
            id="accounting-functions"
            title="Qué funciones puedes desempeñar"
            groups={careerFunctions}
          />
        </div>
        <AccountingInformationCta onRequest={onRequest} />
      </div>
    </section>
  );
}

export { AccountingCareerFields };
