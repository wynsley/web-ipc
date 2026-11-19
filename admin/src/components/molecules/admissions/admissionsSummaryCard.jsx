import { Badge } from "../../atoms/badge";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";

export function AdmissionsSummaryCard({ title, detail, badge }) {
  return (
    <article className="rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Title level="h3" text={title} />
        <Badge text={badge} />
      </div>
      <Paragraph size="sm" text={detail} />
    </article>
  );
}
