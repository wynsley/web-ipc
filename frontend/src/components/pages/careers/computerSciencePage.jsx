import { ComputerScienceHero } from "../../organisms/careers/computerScienceHero";
import { MyTemplate } from "../../templates/myTemplate";
import { careers } from "../../../data/careers";
import { computerScienceHero } from "../../../data/computerScienceHero";

const career = careers.find(({ href }) => href === "/career/computer-science");

function ComputerSciencePage() {
  return (
    <MyTemplate>
      <div className="pt-3.5 sm:pt-5.5 md:pt-0">
        <ComputerScienceHero title={career.title} content={computerScienceHero} />
      </div>
    </MyTemplate>
  );
}

export { ComputerSciencePage };
