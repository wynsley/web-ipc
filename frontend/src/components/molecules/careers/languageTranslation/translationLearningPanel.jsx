import { motion as Motion } from "motion/react";
import { useMediaQuery } from "@/hooks/globals/useMediaQuery";
import { Image } from "@/components/atoms/image";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { TranslationExample } from "./translationExample";

function TranslationLearningPanel({ topic, selected, panelId, tabId }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const transition = {
    duration: reducedMotion ? 0 : selected ? 0.42 : 0.2,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <Motion.div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      aria-hidden={!selected}
      inert={!selected}
      tabIndex={selected ? 0 : -1}
      initial={false}
      animate={{ opacity: selected ? 1 : 0 }}
      transition={transition}
      style={{
        zIndex: selected ? 1 : 0,
        pointerEvents: selected ? "auto" : "none",
      }}
      className={`col-start-1 row-start-1 grid bg-neutral-white focus-visible:outline-2 focus-visible:outline-blue-dark lg:grid-cols-[0.9fr_1.1fr]`}
    >
      <Motion.div
        initial={false}
        animate={{ scale: selected || reducedMotion ? 1 : 1.035 }}
        transition={transition}
        className="relative min-h-72 overflow-clip sm:min-h-96"
      >
        <Image
          src={topic.image}
          alt={topic.imageAlt}
          fill
          imageClassName="object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-blue-dark/90 via-transparent to-transparent"
        />
        <Paragraph
          as="span"
          aria-hidden="true"
          className="absolute bottom-6 left-6 font-hani text-6xl font-bold text-white sm:text-7xl"
        >
          {topic.word}
        </Paragraph>
      </Motion.div>
      <Motion.div
        initial={false}
        animate={{ y: selected || reducedMotion ? 0 : 12 }}
        transition={transition}
        className="p-6 sm:p-9 lg:p-10"
      >
        <Title
          level="h3"
          variant="institutional"
          weight="bold"
          className="font-hani"
          text={topic.title}
        />
        <Paragraph
          size="compact"
          className="mt-4 font-poppins leading-relaxed"
          text={topic.description}
        />
        <TranslationExample {...topic.example} />
      </Motion.div>
    </Motion.div>
  );
}

export { TranslationLearningPanel };
