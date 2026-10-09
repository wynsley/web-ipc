import { FiChevronDown } from "react-icons/fi";
import { Paragraph } from "@/components/atoms/paragraph";

function AccountingCycleCard({ cycle, number }) {
  return (
    <details open className="group border border-blue-dark/15 bg-neutral-white">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 text-blue-dark marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark [&::-webkit-details-marker]:hidden">
        <Paragraph
          as="span"
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center bg-blue-dark font-hani text-xl font-bold text-neutral-white"
        >
          0{number}
        </Paragraph>
        <Paragraph as="span" className="font-hani text-xl font-bold">
          {cycle.title}
        </Paragraph>
        <FiChevronDown
          aria-hidden="true"
          className="ml-auto shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <ul className="mx-5 space-y-3 border-t border-orange/60 py-5">
        {cycle.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 size-1 shrink-0 rounded-full bg-orange"
            />
            <Paragraph
              as="span"
              className="text-sm leading-relaxed text-neutral-black/85"
            >
              {item}
            </Paragraph>
          </li>
        ))}
      </ul>
    </details>
  );
}

export { AccountingCycleCard };
