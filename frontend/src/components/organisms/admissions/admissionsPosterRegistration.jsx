import { PosterExamDate } from "../../molecules/admissions/posterExamDate";
import { PosterRegistrationPanel } from "../../molecules/admissions/posterRegistrationPanel";

function AdmissionsPosterRegistration({
  dateLabel,
  phone,
  address,
  onRegister,
}) {
  return (
    <div className="min-w-0">
      <PosterExamDate dateLabel={dateLabel} />
      <PosterRegistrationPanel
        phone={phone}
        address={address}
        onRegister={onRegister}
      />
    </div>
  );
}

export { AdmissionsPosterRegistration };
