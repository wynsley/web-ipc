import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";

function AccountingLearningCard({
  title,
  description,
  Icon,
  duplicate = false,
}) {
  return (
    <article
      tabIndex={duplicate ? -1 : 0}
      className="h-full rounded-2xl border border-blue-dark/10 bg-neutral-white p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-dark sm:p-8"
    >
      <div
        aria-hidden="true"
        className="mb-8 flex items-center justify-between border-b border-blue-dark/10 pb-5"
      >
        <span className="flex size-12 items-center justify-center text-blue-dark">
          {Icon && <Icon className="size-6" />}
        </span>
        
      </div>
      <Title
        level="h3"
        size="compact"
        variant="institutional"
        weight="bold"
        className="font-hani"
        text={title}
      />
      <Paragraph
        size="compact"
        className="mt-4 leading-relaxed text-neutral-black/85"
      >
        {description}
      </Paragraph>
    </article>
  );
}

export { AccountingLearningCard };
