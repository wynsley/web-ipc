import { Paragraph } from "../../atoms/paragraph";

function CareerHighlights({ highlights }) {
  return (
    <ul className="relative mx-auto -mt-12 grid w-[calc(100%-2rem)] max-w-3xl grid-cols-1 bg-neutral-black px-3 py-3 font-hani text-white sm:grid-cols-3 sm:px-0">
      {highlights.map(({ title, description }) => (
        <li
          key={title}
          className="flex flex-col justify-start gap-2 px-4 py-4 text-center border-white/70 not-last:border-b sm:py-1 sm:not-last:border-r sm:not-last:border-b-0"
        >
          <Paragraph
            size="base"
            variant="primary"
            weight="bold"
            align="center"
            text={title}
          />
          <Paragraph
            size="compact"
            variant="primary"
            align="center"
            className="leading-tight"
            text={description}
          />
        </li>
      ))}
    </ul>
  );
}

export { CareerHighlights };
