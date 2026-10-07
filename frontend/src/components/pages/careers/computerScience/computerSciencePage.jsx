import { ComputerScienceHero } from "@/components/organisms/careers/computerScience/computerScienceHero";
import { ComputerScienceJourney } from "@/components/organisms/careers/computerScience/computerScienceJourney";
import { CareerLearning } from "@/components/organisms/careers/shared/careerLearning";
import { CareerWorkplaces } from "@/components/organisms/careers/shared/careerWorkplaces";
import { CareerBenefits } from "@/components/organisms/careers/shared/careerBenefits";
import { CareerDocuments } from "@/components/organisms/careers/shared/careerDocuments";
import { MyTemplate } from "@/components/templates/myTemplate";
import { careers } from "@/data/careers";
import { computerScienceHero } from "@/data/careers/computerScience/computerScienceHero";
import {
  computerScienceLearning,
  computerScienceWorkplaces,
  computerScienceBenefits,
  computerScienceDocuments,
  computerScienceJourney,
  computerScienceContent,
} from "@/data/careers/computerScience/computerScienceSections";

const career = careers.find(({ href }) => href === "/career/computer-science");

function ComputerSciencePage() {
  return (
    <MyTemplate className="computer-science-page overflow-x-clip">
      <div className="pt-3.5 sm:pt-5.5 md:pt-0">
        <ComputerScienceHero title={career.title} content={computerScienceHero} />
      </div>
      <CareerLearning
        topics={computerScienceLearning}
        {...computerScienceContent.learning}
        digital
        presentation="static"
        emphasizeCenter={false}
      />
      <ComputerScienceJourney
        steps={computerScienceJourney}
        heading={computerScienceContent.journey}
      />
      <CareerWorkplaces workplaces={computerScienceWorkplaces} digital />
      <CareerBenefits
        benefits={computerScienceBenefits}
        image={computerScienceHero.background}
        {...computerScienceContent.benefits}
      />
      <CareerDocuments
        documents={computerScienceDocuments}
        {...computerScienceContent.documents}
      />
    </MyTemplate>
  );
}
export { ComputerSciencePage };
