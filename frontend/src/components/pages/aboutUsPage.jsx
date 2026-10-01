import { MyTemplate } from "../templates/myTemplate";
import { AboutHero } from "../organisms/aboutUs/aboutUsHero";
import { DescriptionUs } from "../organisms/aboutUs/DescrtiptionUs";
import { MissionAndVission } from "../organisms/aboutUs/missionAndVission";

function AboutUsPage() {
  return (
    <MyTemplate>
      <AboutHero/>
      <DescriptionUs/>
      <MissionAndVission/>
    </MyTemplate>
  )
}

export { AboutUsPage }