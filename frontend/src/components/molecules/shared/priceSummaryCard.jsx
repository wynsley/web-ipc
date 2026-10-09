import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { twMerge } from "tailwind-merge";

function PriceSummaryCard({
  title,
  items,
  footer,
  currency = "S/",
  className = "",
}) {
  return (
    <div className={twMerge("bg-black px-5 py-3 font-hani sm:px-8", className)}>
      <div className="grid items-center gap-5 lg:grid-cols-4 lg:gap-0">
        <Title
          level="h2"
          size="compact"
          variant="secondary"
          weight="bold"
          align="center"
          className="px-3 leading-snug"
        >
          {title}
        </Title>
        <dl className="grid min-w-0 auto-cols-fr grid-flow-col divide-x-2 divide-neutral-white/80 lg:col-span-3 lg:border-l-2 lg:border-neutral-white/80">
          {items.map(({ text, value }) => (
            <div
              key={text}
              className="flex min-w-0 flex-col-reverse items-center gap-2 px-1 py-3 sm:gap-3 sm:px-4"
            >
              <dt className="text-center text-sm text-neutral-white sm:text-xl lg:text-2xl">
                {text.trim()}
              </dt>
              <dd className="whitespace-nowrap text-center text-[1.75rem] font-bold leading-none text-orange xs:text-3xl sm:text-5xl lg:text-6xl">
                {value} {currency}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {footer && (
        <Paragraph
          size="comfortable"
          variant="inherit"
          weight="bold"
          align="center"
          className="mt-1 border-t-2 border-neutral-white/80 pt-3 leading-snug text-orange"
        >
          {footer}
        </Paragraph>
      )}
    </div>
  );
}

export { PriceSummaryCard };
