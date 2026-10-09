import { PiPlus } from "react-icons/pi";
import { Paragraph } from "@/components/atoms/paragraph";

function CareerWorkplaceDetails({
  title,
  description,
  number,
  initiallyOpen = false,
}) {
  return (
    <details
      className="group border-b border-blue-dark/20 first:border-t"
      open={initiallyOpen || undefined}
    >
      <summary className="flex min-h-18 cursor-pointer list-none items-center gap-4 py-5 text-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-dark [&::-webkit-details-marker]:hidden">
        <Paragraph
          as="span"
          aria-hidden="true"
          className="font-hani text-lg text-blue"
        >
          {number}
        </Paragraph>
        <Paragraph as="span" className="font-hani text-xl font-bold">
          {title}
        </Paragraph>
        <PiPlus
          aria-hidden="true"
          className="ml-auto size-5 shrink-0 transition-transform group-open:rotate-45 motion-reduce:transition-none"
        />
      </summary>
      <Paragraph
        size="compact"
        className="pb-6 pl-9 pr-5 font-poppins leading-relaxed"
        text={description}
      />
    </details>
  );
}

export { CareerWorkplaceDetails };
