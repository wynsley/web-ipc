import { FiBarChart2, FiCheckSquare, FiTrendingUp } from "react-icons/fi";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";

const capabilityIcons = {
  analysis: FiBarChart2,
  standards: FiCheckSquare,
  decisions: FiTrendingUp,
};

function AccountingCapabilityItem({ id, title, description }) {
  const Icon = capabilityIcons[id];

  return (
    <li className="flex items-start gap-4">
      {Icon && (
        <Icon
          aria-hidden="true"
          className="mt-1 size-5 shrink-0 text-blue-dark/70"
        />
      )}
      <div className="min-w-0">
        <Title
          level="h4"
          variant="institutional"
          weight="bold"
          className="font-hani leading-tight"
        >
          {title}
        </Title>
        <Paragraph
          size="small"
          className="mt-2 leading-relaxed text-neutral-black/80"
        >
          {description}
        </Paragraph>
      </div>
    </li>
  );
}

export { AccountingCapabilityItem };
