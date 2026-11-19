import { ContactForm } from "@/components/molecules/shared/contactForm";

function AdmissionsContactForm() {
  return (
    <div className="min-w-0 self-start bg-blue-deep p-5 sm:p-6">
      <ContactForm showSteps />
    </div>
  );
}

export { AdmissionsContactForm };
