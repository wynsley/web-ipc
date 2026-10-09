import { Title } from "@/components/atoms/titles";
import { ScrollReveal } from "@/components/layouts/scrollReveal";
import { AccountingCapabilityItem } from "./accountingCapabilityItem";

function AccountingCapabilities({ items }) {
  return (
    <ScrollReveal className="rounded-sm bg-neutral-light p-6 sm:p-8">
      <Title
        level="h3"
        variant="institutional"
        weight="bold"
        className="font-hani"
      >
        Lo que podrás hacer
      </Title>
      <ul className="mt-6 space-y-6">
        {items.map((item) => (
          <AccountingCapabilityItem key={item.id} {...item} />
        ))}
      </ul>
    </ScrollReveal>
  );
}

export { AccountingCapabilities };
