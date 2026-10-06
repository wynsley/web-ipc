import { MyTemplate } from "@/components/templates/myTemplate";
import { AdministrationHero } from "@/components/organisms/careers/administration/administrationHero";
import { CareerLearning } from "@/components/organisms/careers/shared/careerLearning";
import { administrationLearning } from "@/data/careers/administration/administrationLearning";
import { CareerWorkplaces } from "@/components/organisms/careers/shared/careerWorkplaces";
import { administrationWorkplaces } from "@/data/careers/administration/administrationWorkplaces";
import { CareerBenefits } from "@/components/organisms/careers/shared/careerBenefits";
import { administrationBenefits } from "@/data/careers/administration/administrationBenefits";
import { CareerDocuments } from "@/components/organisms/careers/shared/careerDocuments";
import { administrationDocuments } from "@/data/careers/administration/administrationDocuments";
import { careers } from "@/data/careers";

const administration = careers.find(
  ({ href }) => href === "/career/administration",
);

function AdministrationPage() {
  return (
    <MyTemplate>
      <div className="pt-4 sm:pt-6 md:pt-0">
        <AdministrationHero
          title={administration.title}
          image={administration.img}
          description={administration.hero.description}
          highlights={administration.hero.highlights}
        />
      </div>
      <CareerLearning
        topics={administrationLearning}
        label="Áreas de aprendizaje de Administración de Empresas"
      />

      <CareerWorkplaces workplaces={administrationWorkplaces} />

      <CareerBenefits
        benefits={administrationBenefits}
        imageAlt="Presentación de gestión empresarial en un entorno de trabajo"
        image={administration.img}
      />
      <CareerDocuments
        documents={administrationDocuments}
        title="Conoce tu formación en Administración"
      />
    </MyTemplate>
  );
}

export { AdministrationPage };
