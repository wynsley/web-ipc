import { MyTemplate } from "../../templates/myTemplate";
import { CareerHero } from "../../organisms/careers/careerHero";
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
    </MyTemplate>
  );
}

export { AdministrationPage };
