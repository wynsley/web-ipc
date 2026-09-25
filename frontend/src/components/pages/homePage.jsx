import { MyTemplate } from "../templates/myTemplate";
import { HomeBanner } from "../organisms/home/banner";
import { AboutSection } from "../organisms/home/aboutSection";
import { CareersSection } from "../organisms/home/homeCareers";
import { Agreements } from "../organisms/home/agreements";
import { HomeAdmissions } from "../organisms/home/homeAdmissions";
import { SocialFloatings } from "../molecules/shared/SocialsFloatings";
import { BannerCalled } from "../molecules/home/bannerCalled";
import { useModal } from "../../hooks/modal/useModal";
import { ModalMessage } from "../modals/modalMessage";

function HomePage() {

  const {isOpen, toggleModal} = useModal()

  return (
    <MyTemplate>
      <HomeBanner
        toggleModal = {toggleModal}
      />
      <BannerCalled />
      <AboutSection/>
      <CareersSection/>
      <Agreements/>
      <HomeAdmissions
        toggleModal = {toggleModal}
      />
      <SocialFloatings/>

      {
        isOpen && (
          <ModalMessage
            toggleModal={toggleModal}
          />
        )
      }
    </MyTemplate>
    )
}

export {HomePage}