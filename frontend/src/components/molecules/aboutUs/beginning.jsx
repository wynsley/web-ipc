import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";

function Beginning({ item, isLast }) {
  const Icon = item.icon;
  return (
    <li
      key={item.number}
      className="relative flex flex-col items-center text-center"
    >
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue text-white">
        <Icon className="h-8 w-8" aria-hidden="true" />

        <span className="absolute -right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-blue-deep font-hani text-xs font-bold text-white ring-4 ring-white">
          {item.number}
        </span>
      </div>

      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute top-10 hidden h-0.5 bg-blue rounded-full lg:left-[calc(50%+3.75rem)] lg:block lg:w-[calc(100%-5.5rem)]"
        />
      )}
      <div className="mt-6 max-w-xs flex flex-col items-center">
        <Title
          text={item.title}
          level="h4"
          weight="bold"
          className="font-hani"
        />
        <Paragraph
          text={item.text}
          variant="secondary"
          size="small"
          className="mt-2 font-poppins"
          align="center"
        />
      </div>
    </li>
  );
}

export { Beginning };