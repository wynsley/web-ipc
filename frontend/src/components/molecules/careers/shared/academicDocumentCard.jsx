import { ScrollMotion } from "@/components/layouts/scrollMotion";
import { Image } from "@/components/atoms/image";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Button } from "@/components/atoms/button";
import { usePdfViewer } from "@/context/pdfViewer/usePdfViewer";

function AcademicDocumentCard({ document, delay = 0 }) {
  const { pdfUrl } = document;
  const available = Boolean(pdfUrl) && pdfUrl !== "#";
  const light = document.tone === "light";
  const { openPdf } = usePdfViewer();

  return (
    <ScrollMotion
      as="article"
      delay={delay}
      y={40}
      scale={0.97}
      className="relative isolate flex min-h-72 overflow-hidden rounded-r-xl p-6 sm:p-8 lg:min-h-80"
    >
      <Image src={document.image} fill />
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${light ? "bg-linear-to-r from-neutral-light via-neutral-light/90 to-neutral-light/30" : "bg-linear-to-r from-blue-dark via-blue-dark/85 to-blue-dark/25"}`}
      />
      <div className="relative flex max-w-sm flex-col items-start">
        <Title
          level="h3"
          size="compact"
          weight="bold"
          variant={light ? "institutional" : "primary"}
          text={document.title}
          className="font-hani"
        />
        <Paragraph
          size="compact"
          variant={light ? "danger" : "primary"}
          text={document.description}
          className="mt-3 mb-6 max-w-72 font-poppins leading-relaxed"
        />
        {document.isReference && (
          <Paragraph
            size="compact"
            variant={light ? "danger" : "primary"}
            className="mb-4 font-poppins"
            text="Documento de referencia"
          />
        )}
        {available ? (
          <Button
            type="button"
            text="Ver más"
            aria-label={`Ver más sobre ${document.title.toLowerCase()}`}
            aria-haspopup="dialog"
            onClick={() => openPdf(pdfUrl, document.title)}
            className={`mt-auto min-h-11 cursor-pointer rounded-tl-xl 
            rounded-br-xl px-6 py-3 font-poppins text-sm transition-colors 
            focus-visible:outline-2 focus-visible:outline-offset-4 
            ${
              light
                ? "bg-blue-dark text-white hover:bg-orange focus-visible:outline-blue-dark"
                : "bg-orange text-neutral-white hover:bg-neutral-light hover:text-blue-dark focus-visible:outline-white"
            }
          `}
          />
        ) : (
          <Paragraph
            size="compact"
            variant={light ? "danger" : "primary"}
            className="mt-auto border-t border-current/20 pt-4 font-poppins"
            text={document.status || "Documento pendiente de publicación"}
          />
        )}
      </div>
    </ScrollMotion>
  );
}

export { AcademicDocumentCard };
