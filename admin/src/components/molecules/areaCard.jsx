import { FiArrowUpRight } from "react-icons/fi";
import { Badge } from "../atoms/badge";
import { Link } from "../atoms/links";
import { Paragraph } from "../atoms/paragraph";
import { Title } from "../atoms/titles";

export function AreaCard({ path, Icon, title, description, pending }) {
  return (
    <article className="group rounded-xl border border-line bg-card shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-blue-light/45 hover:bg-soft/60">
      <Link
        to={path}
        variant="card"
        className="flex h-full flex-col justify-between p-6"
      >
        <div>
          <div className="flex items-center justify-between gap-3">
            <Icon aria-hidden="true" className="text-xl text-blue-light" />
            {pending ? (
              <Badge variant="neutral" text="En preparación" />
            ) : (
              <FiArrowUpRight
                aria-hidden="true"
                className="text-lg text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-light"
              />
            )}
          </div>
          <Title level="h3" text={title} className="mt-4 mb-1.5" />
          <Paragraph size="sm" text={description} />
        </div>
      </Link>
    </article>
  );
}
