import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";

function AccountingFeatureList({ title, items }) {
  return (
    <article className="border-l-4 border-orange bg-neutral-light p-6 sm:p-8">
      <Title
        level="h3"
        variant="institutional"
        weight="bold"
        className="font-hani"
      >
        {title}
      </Title>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-orange"
            />
            <Paragraph
              size="compact"
              className="leading-relaxed text-neutral-black/85"
            >
              {item}
            </Paragraph>
          </li>
        ))}
      </ul>
    </article>
  );
}

export { AccountingFeatureList };
