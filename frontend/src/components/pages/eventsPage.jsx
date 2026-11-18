import { EventNotices } from "../organisms/events/eventNotices";
import { useState } from "react";
import { MyTemplate } from "../templates/myTemplate";
import { HeroEvents } from "../organisms/events/heroEvents";
import { EventsShowcase } from "../organisms/events/eventsShowcase";
import { FeatureEvents } from "../organisms/events/featureEvents";
import { useModal } from "@/hooks/modal/useModal";
import { partitionEvents } from "@/helpers/eventLifecycle";
import { usePublishedEvents } from "@/hooks/events/usePublishedEvents";
import { EventsCalendarModal } from "../modals/eventsCalendarModal";
import { EventsGallery } from "../organisms/events/eventsGallery";
import { Button } from "../atoms/button";
import { Paragraph } from "../atoms/paragraph";

function EventsPage() {
  const { events, now, failed, retry } = usePublishedEvents();
  const { isOpen, openModal, closeModal } = useModal();
  const { active, past, exceptions } = partitionEvents(events, now);
  const featuredEvents = active.filter((event) => event.featured);
  const [calendarEventId, setCalendarEventId] = useState(null);
  function openCalendar(eventId) {
    setCalendarEventId(eventId);
    openModal();
  }
  return (
    <MyTemplate>
      <HeroEvents event={active[0]} onOpenCalendar={openCalendar} />
      <EventNotices
        events={[
          ...exceptions,
          ...active.filter((event) => event.scheduleNotice),
        ]}
      />
      {active.length ? (
        <EventsShowcase
          key={active.map((event) => event.id).join(",")}
          publishedEvents={active}
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
      {featuredEvents.length > 0 && (
        <FeatureEvents
          key={featuredEvents.map((event) => event.id).join(",")}
          events={featuredEvents}
        />
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
          events={[...active, ...past]}
          initialEventId={calendarEventId}
        />
      )}
    </MyTemplate>
  );
}

export { EventsPage };
