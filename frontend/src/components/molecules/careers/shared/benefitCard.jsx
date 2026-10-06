import { ScrollMotion } from "@/components/layouts/scrollMotion";
import { PiCheckCircle } from "react-icons/pi";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";

function BenefitCard({ title, description, delay = 0 }) {
  return (
    <ScrollMotion
      as="li"
      delay={delay}
      x={24}
      y={16}
      className="flex h-full min-w-0 items-start gap-4 rounded-t-xl rounded-br-xl border border-orange bg-neutral-white p-5 sm:p-6"
    >
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
    </ScrollMotion>
  );
}

export { BenefitCard };
