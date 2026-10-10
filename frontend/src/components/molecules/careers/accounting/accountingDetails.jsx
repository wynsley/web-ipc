import { Paragraph } from "@/components/atoms/paragraph";

function AccountingDetails({ items }) {
  return (
    <dl className="mt-7 grid gap-4 rounded-sm bg-neutral-light p-5 sm:grid-cols-3">
      {items.map(({ label, value }) => (
        <div key={label} className="min-w-0">
          <dt>
            <Paragraph
              size="small"
              weight="bold"
              className="font-hani text-blue-dark"
            >
              {label}
            </Paragraph>
          </dt>
          <dd>
            <Paragraph
              size="small"
              className="mt-1 leading-relaxed text-neutral-black"
            >
              {value}
            </Paragraph>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { AccountingDetails };
