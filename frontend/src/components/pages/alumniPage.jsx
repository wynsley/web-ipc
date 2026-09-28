import { Hero } from "../organisms/alumni/alumniHero";
import { FeaturedGraduatesSection } from "../organisms/alumni/featuredGratuatesSection";
import { StatisticsGradautes } from "../organisms/alumni/statisticsGraduates";
import { TitulationSection } from "../organisms/alumni/titulationSection";
import { MyTemplate } from "../templates/myTemplate";

function AlumniPage() {
  return (
    <MyTemplate>
      <Hero/>
      <TitulationSection/>
      <FeaturedGraduatesSection/>
      <StatisticsGradautes/>
    </MyTemplate>
  )
}

export { AlumniPage }