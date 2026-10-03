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

function CareerWorkplaces({ workplaces, digital = false }) {
  const [expanded, setExpanded] = useState(false);
  const galleryId = useId();
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="career-workplaces-title"
      className={`bg-neutral-light px-4 sm:px-8 lg:px-12 ${digital ? "py-16 sm:py-24" : "py-12 sm:py-16"}`}
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          {digital && (
            <span className="mb-4 block font-poppins text-xs tracking-[0.2em] text-blue-dark uppercase">
              02 / Tu próximo escenario
            </span>
          )}
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
          <div
            className={
              digital ? "grid gap-4 md:grid-cols-2" : "workplace-gallery"
            }
          >
            {workplaces.slice(0, 4).map((workplace, index) => (
              <WorkplaceTile
                key={workplace.layout}
                {...workplace}
                digital={digital}
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
                <div
                  className={
                    digital
                      ? "grid gap-4 pt-4 md:grid-cols-2"
                      : "workplace-gallery pt-3 md:pt-4"
                  }
                >
                  {workplaces.slice(4).map((workplace, index) => (
                    <WorkplaceTile
                      key={workplace.layout}
                      {...workplace}
                      digital={digital}
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
