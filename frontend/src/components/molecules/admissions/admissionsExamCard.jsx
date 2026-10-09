import { AdmissionsPosterHeader } from "./admissionsPosterHeader";
import { AdmissionsPosterRegistration } from "../../organisms/admissions/admissionsPosterRegistration";
import { AdmissionsPosterCareers } from "./admissionsPosterCareers";

function AdmissionsExamCard({ content, onRegister }) {
  return (
    <article
      aria-label="Convocatoria de admisión"
      className="mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-neutral-white font-poppins text-blue-deep shadow-soft @container"
    >
      <AdmissionsPosterHeader
        image={content.image}
        imageAlt={content.imageAlt}
      />
      <div className="grid grid-cols-[58fr_42fr] gap-[2cqw] px-[2.5cqw] pb-[1.5cqw]">
        <AdmissionsPosterRegistration
          dateLabel={content.dateLabel}
          phone={content.phone}
          address={content.address}
          onRegister={onRegister}
        />
        <AdmissionsPosterCareers />
      </div>
    </article>
  );
}

export { AdmissionsExamCard };
