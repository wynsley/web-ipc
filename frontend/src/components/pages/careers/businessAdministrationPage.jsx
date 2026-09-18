import { MyTemplate } from "../../templates/myTemplate";
import { CareerHero } from "../../organisms/careers/careerHero";
import { CareerLearning } from "../../organisms/careers/careerLearning";
import { administrationLearning } from "../../../data/administrationLearning";
import { careers } from "../../../data/careers";

const administration = careers.find(({ href }) => href === "/career/administration");

function AdministrationPage() {
  return (
    <MyTemplate>
      <div className="pt-4 sm:pt-6 md:pt-0">
        <CareerHero
          title={administration.title}
          image={administration.img}
          description={administration.hero.description}
          highlights={administration.hero.highlights}
        />
      </div>
      <CareerLearning topics={administrationLearning} />
    </MyTemplate>
  );
}

export { AdministrationPage };
