import { MyTemplate } from "../templates/myTemplate";
import { AboutHero } from "../organisms/aboutUs/aboutUsHero";
import { DescriptionUs } from "../organisms/aboutUs/DescrtiptionUs";
import { MissionAndVission } from "../organisms/aboutUs/missionAndVission";
import { OurBeginning } from "../organisms/aboutUs/ourBeginning";
import { OurValues } from "../organisms/aboutUs/ourValues";
import { OurTeam } from "../organisms/aboutUs/ourTeam";

function AboutUsPage() {
  return (
    <MyTemplate>
      <AboutHero/>
      <DescriptionUs/>
      <MissionAndVission/>
      <OurValues/>
      <OurTeam/>
      <OurBeginning/>
    </MyTemplate>
  )
}

export { AboutUsPage }