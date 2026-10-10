import { AdmissionsExamContent } from "@/components/molecules/admissions/admissionsExamContent";
import { AdmissionsExamCard } from "@/components/molecules/admissions/admissionsExamCard";
import { admissionExam } from "@/data/admissions/exam";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function AdmissionsExam({ onRegister }) {
  return (
    <section
      aria-labelledby="admissions-exam-title"
      className="bg-blue-dark py-14 sm:py-18 lg:py-20"
    >
      <div className="mx-auto grid w-[92%] max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal y={28} duration={0.6} className="min-w-0">
          <AdmissionsExamContent
            content={admissionExam}
            onRequest={onRegister}
          />
        </ScrollReveal>
        <ScrollReveal y={28} delay={0.12} duration={0.6} className="min-w-0">
          <AdmissionsExamCard content={admissionExam} onRegister={onRegister} />
        </ScrollReveal>
      </div>
    </section>
  );
}

export { AdmissionsExam };
