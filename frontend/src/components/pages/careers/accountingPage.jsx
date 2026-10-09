import { MyTemplate } from "../../templates/myTemplate";
import { AccountingHero } from "../../organisms/careers/accountingHero";
import { AccountingOverview } from "../../organisms/careers/accountingOverview";
import { AccountingValueProps } from "../../organisms/careers/accountingValueProps";
import { AccountingCareerFields } from "../../organisms/careers/accountingCareerFields";
import { AccountingLearning } from "../../organisms/careers/accountingLearning";
import { AccountingCurriculum } from "../../organisms/careers/accountingCurriculum";

function AccountingPage() {
  return (
    <MyTemplate>
      <AccountingHero />
      <AccountingOverview />
      <AccountingValueProps />
      <AccountingCareerFields />
      <AccountingLearning />
      <AccountingCurriculum />
    </MyTemplate>
  );
}

export { AccountingPage };