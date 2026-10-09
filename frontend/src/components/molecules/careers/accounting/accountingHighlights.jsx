import { Paragraph } from "@/components/atoms/paragraph";

function AccountingHighlights({ items }) {
  return (
    <ul className="mt-9 space-y-3 border-t border-neutral-white/20 pt-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 rounded-full bg-orange"
          />
          <Paragraph
            size="small"
            variant="primary"
            className="text-neutral-white/80"
          >
            {item}
          </Paragraph>
        </li>
      ))}
    </ul>
  );
}

export { AccountingHighlights };
