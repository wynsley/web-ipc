import { Paragraph } from "@/components/atoms/paragraph";

function AccountingDetails({ items }) {
  return (
    <dl className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
      {items.map(({ label, value }) => (
        <div key={label} className="border-t border-blue-dark/15 py-4">
          <dt>
            <Paragraph
              size="small"
              weight="bold"
              className="font-hani uppercase tracking-wide text-blue-dark"
            >
              {label}
            </Paragraph>
          </dt>
          <dd>
            <Paragraph size="base" className="text-neutral-black">
              {value}
            </Paragraph>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { AccountingDetails };
