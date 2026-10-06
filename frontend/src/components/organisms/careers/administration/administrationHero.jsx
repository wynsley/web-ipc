import { CareerBreadcrumbs } from "@/components/molecules/careers/shared/careerBreadcrumbs";
import { motion as Motion, useReducedMotion } from "motion/react";
import { revealEase } from "@/components/animations/useRevealMotion";
import { Image } from "@/components/atoms/image";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { AdministrationHighlights } from "@/components/molecules/careers/administration/administrationHighlights";

function AdministrationHero({ title, image, description, highlights }) {
  const reducedMotion = useReducedMotion();
  return (
    <section
      aria-labelledby="career-title"
      className="bg-neutral-white pb-12 sm:pb-16"
    >
      <div className="relative isolate overflow-hidden min-h-88 md:min-h-96 lg:min-h-104">
        <Motion.div
          className="absolute inset-0"
          initial={reducedMotion ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.6, ease: revealEase }}
        >
          <Image
            src={image}
            fill
            fallbackClassName="bg-linear-to-br from-blue-dark to-blue"
            overlayClassName="bg-linear-to-r from-neutral-black/80 via-neutral-black/50 to-neutral-black/25"
            loading="eager"
            fetchPriority="high"
          />
        </Motion.div>
        <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-20 sm:px-10 sm:pt-12 lg:px-16 lg:pt-16">
          <CareerBreadcrumbs title={title} className="mb-8" />
          <Title
            initial={reducedMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.85,
              ease: revealEase,
            }}
            id="career-title"
            level="h1"
            size="hero"
            variant="primary"
            weight="bold"
            className="font-poppins leading-tight"
            text={title}
          />
          <Motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              delay: reducedMotion ? 0 : 0.18,
              ease: revealEase,
            }}
          >
            <Paragraph
              size="base"
              variant="primary"
              className="mt-8 max-w-116 font-poppins leading-relaxed"
              text={description}
            />
          </Motion.div>
        </div>
      </div>
      <AdministrationHighlights highlights={highlights} />
    </section>
  );
}

export { AdministrationHero };
