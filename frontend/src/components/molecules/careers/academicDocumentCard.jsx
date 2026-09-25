import { motion as Motion, useReducedMotion } from "motion/react";
import { useRevealMotion } from "../../animations/useRevealMotion";
import { Image } from "../../atoms/image";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { Button } from "../../atoms/button";

function AcademicDocumentCard({ document, onView, delay = 0 }) {
  const reveal = useRevealMotion({ delay, y: 40, scale: 0.97 });
  const reducedMotion = useReducedMotion();
  const light = document.tone === "light";

  return (
    <Motion.article {...reveal} className="relative isolate flex min-h-72 overflow-hidden rounded-r-xl p-6 sm:p-8 lg:min-h-80">
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
        <Button
          whileHover={reducedMotion ? undefined : { scale: 1.04 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          type="button"
          text="Ver más"
          aria-label={`Ver más sobre ${document.title.toLowerCase()}`}
          aria-haspopup="dialog"
          onClick={() => onView(document)}
          className={`mt-auto min-h-11 cursor-pointer rounded-tl-xl 
            rounded-br-xl px-6 py-3 font-poppins text-sm transition-colors 
            focus-visible:outline-2 focus-visible:outline-offset-4 
            ${light ? "bg-blue-dark text-white hover:bg-orange focus-visible:outline-blue-dark" 
              : "bg-orange text-neutral-white hover:bg-neutral-light hover:text-blue-dark focus-visible:outline-white"}
          `}
        />
      </div>
    </Motion.article>
  );
}

export { AcademicDocumentCard };
