import { PiCheckCircle } from "react-icons/pi";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";

function BenefitCard({ title, description }) {
  return (
    <li className="flex h-full min-w-0 items-start gap-4 rounded-xl2 border border-orange bg-neutral-white p-5 sm:p-6">
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
    </li>
  );
}

export { BenefitCard };
