import { motion as Motion } from "motion/react";
import { useRevealMotion } from "../../animations/useRevealMotion";
import { PiCheckCircle } from "react-icons/pi";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";

function BenefitCard({ title, description, delay = 0 }) {
  const reveal = useRevealMotion({ delay, x: 24, y: 16 });
  return (
    <Motion.li {...reveal} className="flex h-full min-w-0 items-start gap-4 rounded-t-xl rounded-br-xl border border-orange bg-neutral-white p-5 sm:p-6">
      <PiCheckCircle
        aria-hidden="true"
        className="mt-1 size-6 shrink-0 text-orange"
      />
      <div className="min-w-0">
        <Title
          level="h3"
          size="compact"
          variant="institutional"
          weight="bold"
          text={title}
          className="font-hani leading-tight"
        />
        <Paragraph
          size="compact"
          text={description}
          className="mt-2 font-poppins leading-relaxed"
        />
      </div>
    </Motion.li>
  );
}

export { BenefitCard };
