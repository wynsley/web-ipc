import { ModalMessage } from "@/components/modals/modalMessage";
import { useModal } from "@/hooks/modal/useModal";
import { MyTemplate } from "@/components/templates/myTemplate";
import { AccountingHero } from "@/components/organisms/careers/accounting/accountingHero";
import { AccountingOverview } from "@/components/organisms/careers/accounting/accountingOverview";
import { AccountingValueProps } from "@/components/organisms/careers/accounting/accountingValueProps";
import { AccountingCareerFields } from "@/components/organisms/careers/accounting/accountingCareerFields";
import { AccountingLearning } from "@/components/organisms/careers/accounting/accountingLearning";
import { AccountingCurriculum } from "@/components/organisms/careers/accounting/accountingCurriculum";

function AccountingPage() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <MyTemplate className="font-poppins">
      <AccountingHero onRequest={openModal} />
      <AccountingOverview />
      <AccountingValueProps />
      <AccountingLearning />
      <AccountingCurriculum />
      <AccountingCareerFields />
      {isOpen && <ModalMessage toggleModal={closeModal} />}
    </MyTemplate>
  );
}

export { AccountingPage };
