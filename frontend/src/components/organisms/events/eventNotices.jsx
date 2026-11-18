import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { formatEventSchedule } from "@/data/events/evenst";
export function EventNotices({ events }) {
  if (!events.length) return null;
  return (
    <section
      aria-label="Avisos de eventos"
      className="mx-auto w-full max-w-6xl px-5 py-10"
    >
      <Title level="h2" text="Cambios en la agenda" />
      <ul className="mt-5 grid gap-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="break-words border-l-4 border-orange bg-blue-dark/5 p-5"
          >
            <Title level="h3" text={event.title} />
            <Paragraph
              className="font-bold"
              text={
                event.status === "postponed"
                  ? "Pospuesto · Fecha por confirmar"
                  : event.status === "cancelled"
                    ? "Evento cancelado"
                    : "Horario actualizado"
              }
            />
            {event.status === "scheduled" && (
              <Paragraph
                text={"Nuevo horario: " + formatEventSchedule(event)}
              />
            )}
            <Paragraph text={event.scheduleNotice} />
            <Paragraph
              size="small"
              text={
                (event.status === "scheduled"
                  ? "Horario anterior: "
                  : "Horario que deja de estar vigente: ") +
                formatEventSchedule({
                  date:
                    event.status === "scheduled"
                      ? (event.previousStartsAt ?? event.date)
                      : event.date,
                  endDate:
                    event.status === "scheduled"
                      ? event.previousEndsAt
                      : event.endDate,
                })
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
