import { Hero } from "../organisms/alumni/alumniHero";
import { FeaturedGraduatesSection } from "../organisms/alumni/featuredGratuatesSection";
import { TitulationSection } from "../organisms/alumni/titulationSection";
import { MyTemplate } from "../templates/myTemplate";

function AlumniPage() {
  return (
    <MyTemplate>
      <Hero/>
      <TitulationSection/>
      <FeaturedGraduatesSection/>
    </MyTemplate>
  )
}

export { AlumniPage }