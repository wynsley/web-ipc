import { FiChevronDown } from "react-icons/fi";
import { Paragraph } from "@/components/atoms/paragraph";

function AccountingCycleCard({ cycle, number, expanded = true }) {
  return (
    <details
      open={expanded}
      className="group relative border border-blue-dark/15 bg-neutral-white before:pointer-events-none before:absolute before:right-0 before:top-0 before:size-4 before:bg-neutral-light before:[clip-path:polygon(0_0,100%_0,100%_100%)]"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 text-blue-dark marker:content-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-dark [&::-webkit-details-marker]:hidden">
        <Paragraph
          as="span"
          size="xlarge"
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center bg-blue-dark/5 font-hani font-bold text-blue-dark"
        >
          0{number}
        </Paragraph>
        <span className="min-w-0">
          <Paragraph
            as="span"
            size="comfortable"
            className="block font-hani font-bold"
          >
            {cycle.title}
          </Paragraph>
          <Paragraph
            as="span"
            className="mt-1 block font-poppins text-xs text-neutral-black/65"
          >
            {cycle.items.length} asignaturas
          </Paragraph>
        </span>
        <FiChevronDown
          aria-hidden="true"
          className="ml-auto shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <ul className="mx-5 divide-y divide-blue-dark/5 border-t border-blue-dark/15 pb-3">
        {cycle.items.map((item) => (
          <li key={item} className="py-3">
            <Paragraph
              as="span"
              size="compact"
              className="font-poppins leading-relaxed text-neutral-black/85"
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
