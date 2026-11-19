import { EventNotices } from "../organisms/events/eventNotices";
import { useMemo, useState } from "react";
import { MyTemplate } from "../templates/myTemplate";
import { HeroEvents } from "../organisms/events/heroEvents";
import { EventsShowcase } from "../organisms/events/eventsShowcase";
import { FeatureEvents } from "../organisms/events/featureEvents";
import { useModal } from "@/hooks/modal/useModal";
import {
  partitionEvents,
  visibleEventNotices,
} from "@/helpers/eventLifecycle";
import { usePublishedEvents } from "@/hooks/events/usePublishedEvents";
import { EventsCalendarModal } from "../modals/eventsCalendarModal";
import { EventsGallery } from "../organisms/events/eventsGallery";
import { Button } from "../atoms/button";
import { Paragraph } from "../atoms/paragraph";

function EventsPage() {
  const { events, now, clockOffset, failed, retry } = usePublishedEvents();
  const { isOpen, openModal, closeModal } = useModal();
  const { active, past } = useMemo(
    () => partitionEvents(events, now),
    [events, now],
  );
  const featuredEvents = useMemo(
    () => active.filter((event) => event.featured),
    [active],
  );
  const noticeEvents = useMemo(
    () => visibleEventNotices(events, now),
    [events, now],
  );
  const calendarEvents = useMemo(() => [...active, ...past], [active, past]);
  const [calendarEventId, setCalendarEventId] = useState(null);
  function openCalendar(eventId) {
    setCalendarEventId(eventId);
    openModal();
  }
  return (
    <MyTemplate>
      <HeroEvents event={active[0]} onOpenCalendar={openCalendar} />
      {active.length ? (
        <EventsShowcase
          publishedEvents={active}
          now={now}
          clockOffset={clockOffset}
          onOpenCalendar={openCalendar}
        />
      ) : (
        <section
          aria-label="Agenda institucional"
          className="mx-auto max-w-6xl px-5 py-12"
        >
          <Paragraph
            role="status"
            text={
              failed
                ? "No se pudo cargar la agenda."
                : events
                  ? "No hay próximos eventos publicados."
                  : "Cargando agenda…"
            }
          />
          {failed && (
            <Button variant="ternary" text="Reintentar" onClick={retry} />
          )}
        </section>
      )}
      <EventNotices events={noticeEvents} />
      {featuredEvents.length > 0 && (
        <FeatureEvents events={featuredEvents} />
      )}
      {failed && events && (
        <Paragraph
          role="status"
          text="No se pudo actualizar la agenda. Se muestra la última información recibida."
        />
      )}
      <EventsGallery events={past} />
      {isOpen && events && (
        <EventsCalendarModal
          toggleModal={closeModal}
          events={calendarEvents}
          initialEventId={calendarEventId}
        />
      )}
    </MyTemplate>
  );
}

export { EventsPage };
