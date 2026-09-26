import { Hero } from "../organisms/alumni/alumniHero";
import { TitulationSection } from "../organisms/alumni/titulationSection";
import { MyTemplate } from "../templates/myTemplate";

function AlumniPage() {
  return (
    <MyTemplate>
      <Hero/>
      <TitulationSection/>
    </MyTemplate>
  )
}

export { AlumniPage }