import { FiArrowLeft } from "react-icons/fi";
import { Badge } from "../atoms/badge";
import { Link } from "../atoms/links";
import { Paragraph } from "../atoms/paragraph";
import { Title } from "../atoms/titles";
import { AccountInvitations } from "../organisms/admin/accountInvitations";
import { AdmissionsPanel } from "../organisms/admissions/admissionsPanel";
import { EventsPanel } from "../organisms/events/eventsPanel";

export function AreaPage({ area }) {
  const { Icon, title, description, slug } = area;
  return (
    <section className="pt-5">
      <Link to="/" className="min-h-10">
        <FiArrowLeft aria-hidden="true" />
        Volver al escritorio
      </Link>
      <div className="mt-4 border-b border-line pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <Icon aria-hidden="true" className="text-xl text-blue-light" />
          <Title level="h2" text={title} />
          {area.pending && (
            <Badge
              variant="warning"
              text="Esta área está en preparación."
            />
          )}
        </div>
        <Paragraph text={description} className="mt-1.5 max-w-2xl" />
      </div>
      {slug === "cuentas" && <AccountInvitations />}
      {slug === "admision" && <AdmissionsPanel />}
      {slug === "eventos" && <EventsPanel />}
    </section>
  );
}
