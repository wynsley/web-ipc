import { ScrollPanel } from "../../layouts/scrollPanel";
import { ScrollAnimationContext } from "../../../context/scrollAnimationContext";
import { ComputerScienceHero } from "../../organisms/careers/computerScienceHero";
import { ComputerScienceJourney } from "../../organisms/careers/computerScienceJourney";
import { CareerLearning } from "../../organisms/careers/careerLearning";
import { CareerWorkplaces } from "../../organisms/careers/careerWorkplaces";
import { CareerBenefits } from "../../organisms/careers/careerBenefits";
import { CareerDocuments } from "../../organisms/careers/careerDocuments";
import { MyTemplate } from "../../templates/myTemplate";
import { careers } from "../../../data/careers";
import { computerScienceHero } from "../../../data/computerScienceHero";
import {
  computerScienceLearning,
  computerScienceWorkplaces,
  computerScienceBenefits,
  computerScienceDocuments,
  computerScienceJourney,
  computerScienceContent,
} from "../../../data/computerScienceSections";

const career = careers.find(({ href }) => href === "/career/computer-science");

function ComputerSciencePage() {
  return (
    <ScrollAnimationContext.Provider value="linked">
      <MyTemplate className="overflow-x-clip">
        <div className="pt-3.5 sm:pt-5.5 md:pt-0">
          <ComputerScienceHero
            title={career.title}
            content={computerScienceHero}
          />
        </div>
        <CareerLearning
          topics={computerScienceLearning}
          {...computerScienceContent.learning}
          digital
          cinematic
        />
        <ComputerScienceJourney
          steps={computerScienceJourney}
          heading={computerScienceContent.journey}
          image={computerScienceHero.background}
        />
        <ScrollPanel>
          <CareerWorkplaces workplaces={computerScienceWorkplaces} digital />
        </ScrollPanel>
        <ScrollPanel tone="bg-blue-dark">
          <CareerBenefits
            benefits={computerScienceBenefits}
            image={computerScienceHero.background}
            {...computerScienceContent.benefits}
          />
        </ScrollPanel>
        <ScrollPanel>
          <CareerDocuments
            documents={computerScienceDocuments}
            {...computerScienceContent.documents}
          />
        </ScrollPanel>
      </MyTemplate>
    </ScrollAnimationContext.Provider>
  );
}
export { ComputerSciencePage };
