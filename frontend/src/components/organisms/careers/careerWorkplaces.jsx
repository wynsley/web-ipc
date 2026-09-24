import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from "motion/react";
import { ScrollReveal } from "../../layouts/scrollReveal";
import { revealEase } from "../../animations/useRevealMotion";
import { useId, useState } from "react";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { Button } from "../../atoms/button";
import { WorkplaceTile } from "../../molecules/careers/workplaceTile";

function CareerWorkplaces({ workplaces }) {
  const [expanded, setExpanded] = useState(false);
  const galleryId = useId();
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="career-workplaces-title"
      className="bg-neutral-light px-4 py-12 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <Title
            id="career-workplaces-title"
            level="h2"
            text="Campo laboral"
            variant="institutional"
            weight="bold"
            className="font-hani"
          />
          <Paragraph
            text="Descubre dónde puedes desarrollar tu talento."
            size="compact"
            variant="danger"
            className="mt-2 font-poppins"
          />
        </ScrollReveal>
        <div id={galleryId} className="mt-6 sm:mt-8">
          <div className="workplace-gallery">
            {workplaces.slice(0, 4).map((workplace, index) => (
              <WorkplaceTile
                key={workplace.layout}
                {...workplace}
                delay={index * 0.08}
              />
            ))}
          </div>
          <AnimatePresence initial={false}>
            {expanded && (
              <Motion.div
                key="more-workplaces"
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  ease: revealEase,
                }}
              >
                <div className="workplace-gallery pt-3 md:pt-4">
                  {workplaces.slice(4).map((workplace, index) => (
                    <WorkplaceTile
                      key={workplace.layout}
                      {...workplace}
                      delay={index * 0.06}
                    />
                  ))}
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
        {workplaces.length > 4 && (
          <Button
            whileHover={reducedMotion ? undefined : { scale: 1.04 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            type="button"
            aria-expanded={expanded}
            aria-controls={galleryId}
            onClick={() => setExpanded((value) => !value)}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-tr-full rounded-bl-full bg-blue-dark px-7 py-3 font-poppins text-sm text-white transition-colors hover:bg-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-dark cursor-pointer"
            text={expanded ? "Ver menos" : "Ver más"}
          />
        )}
      </div>
    </section>
  );
}

export { CareerWorkplaces };
