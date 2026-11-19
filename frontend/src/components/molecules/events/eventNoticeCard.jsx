import { FaBan, FaCalendarAlt, FaClock } from "react-icons/fa";
import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";
import { formatEventSchedule } from "@/data/events/evenst";

const STATUS_META = {
  cancelled: {
    label: "Evento cancelado",
    Icon: FaBan,
    stripe: "bg-red-600",
    pill: "border-red-200 bg-red-50 text-red-700",
    previousLabel: "Horario que deja de estar vigente",
  },
  postponed: {
    label: "Pospuesto · Fecha por confirmar",
    Icon: FaClock,
    stripe: "bg-orange",
    pill: "border-orange/35 bg-orange/12 text-orange",
    previousLabel: "Horario que deja de estar vigente",
  },
  scheduled: {
    label: "Horario actualizado",
    Icon: FaCalendarAlt,
    stripe: "bg-blue",
    pill: "border-blue/25 bg-blue/10 text-blue-dark",
    previousLabel: "Horario anterior",
  },
};

function EventNoticeCard({ event, compact = false }) {
  const status = STATUS_META[event.status] ? event.status : "scheduled";
  const meta = STATUS_META[status];
  const StatusIcon = meta.Icon;

  const previousSchedule = formatEventSchedule({
    date:
      status === "scheduled"
        ? (event.previousStartsAt ?? event.date)
        : event.date,
    endDate: status === "scheduled" ? event.previousEndsAt : event.endDate,
  });

  return (
    <article className="relative overflow-hidden rounded-lg border border-blue-dark/12 bg-white shadow-xs">
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1.5 ${meta.stripe}`}
      />
      <div className={compact ? "py-4 pr-4 pl-5 sm:px-6" : "p-4 pl-5 sm:p-5 sm:pl-6"}>
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-poppins text-xs font-semibold ${meta.pill}`}
          >
            <StatusIcon aria-hidden="true" className="h-3 w-3 shrink-0" />
            {meta.label}
          </span>
          <Title
            level="h3"
            text={event.title}
            weight="bold"
            className="font-hani text-lg leading-tight text-blue-deep sm:text-xl"
          />
        </div>

        <div className="mt-2.5 grid gap-1 font-poppins text-xs sm:text-sm">
          {status === "scheduled" && (
            <Paragraph
              size="small"
              variant="inherit"
              className="font-medium text-blue-dark tabular-nums"
              text={`Nuevo horario: ${formatEventSchedule(event)}`}
            />
          )}
          <Paragraph
            size="small"
            variant="inherit"
            className="text-neutral-500 tabular-nums"
          >
            <span>{meta.previousLabel}: </span>
            <span className="line-through">{previousSchedule}</span>
          </Paragraph>
        </div>

        {event.scheduleNotice && (
          <Paragraph
            size="small"
            variant="inherit"
            text={event.scheduleNotice}
            className={`mt-2.5 break-words border-t border-blue-dark/10 pt-2 text-neutral-700 ${
              compact ? "line-clamp-2" : ""
            }`}
          />
        )}
      </div>
    </article>
  );
}

export { EventNoticeCard };
