import { useId, useState } from "react";
import { Title } from "../../atoms/titles";
import { AcademicDocumentCard } from "../../molecules/careers/academicDocumentCard";
import { DocumentModal } from "../shared/documentModal";

function CareerDocuments({ documents, title = "Conoce tu formación" }) {
  const [activeDocument, setActiveDocument] = useState(null);
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="bg-neutral-light px-4 py-12 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <Title
          id={titleId}
          level="h2"
          variant="institutional"
          weight="bold"
          text={title}
          className="mb-6 font-hani sm:mb-8"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {documents.map((document) => (
            <AcademicDocumentCard
              key={document.id}
              document={document}
              onView={setActiveDocument}
            />
          ))}
        </div>
      </div>
      {activeDocument && (
        <DocumentModal
          key={activeDocument.id}
          document={activeDocument}
          onClose={() => setActiveDocument(null)}
        />
      )}
    </section>
  );
}

export { CareerDocuments };
