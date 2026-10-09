import { MyTemplate } from "../templates/myTemplate";
import { AdmissionsHero } from "../organisms/admissions/admissionsHero";
import { AdmissionsExam } from "../organisms/admissions/admissionsExam";
import { ModalMessage } from "../modals/modalMessage";
import { useModal } from "../../hooks/modal/useModal";

function AdmissionPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <MyTemplate>
      <AdmissionsHero onRegister={openModal} />
      <AdmissionsExam onRegister={openModal} />
      {isOpen && <ModalMessage toggleModal={closeModal} />}
    </MyTemplate>
  );
}

export { AdmissionPage };
