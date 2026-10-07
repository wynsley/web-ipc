import { useState } from "react";
import { MyTemplate } from "../templates/myTemplate";
import { HeroEvents } from "../organisms/events/heroEvents";
import { EventsShowcase } from "../organisms/events/eventsShowcase";
import { FeatureEvents } from "../organisms/events/featureEvents";
import { useModal } from "@/hooks/modal/useModal";
import { EVENTS, getUpcomingEvent } from "@/data/events/evenst";
import { EventsCalendarModal } from "../modals/eventsCalendarModal";

function EventsPage() {
  const [upcoming] = useState(() => getUpcomingEvent());

  // Un solo modal para toda la página: lo abren el hero y el carrusel.
  const { isOpen, openModal, closeModal } = useModal();

  // Evento que aparece seleccionado al abrir (el del hero o el del carrusel).
  const [calendarEventId, setCalendarEventId] = useState(null);

  const openCalendar = (eventId) => {
    setCalendarEventId(eventId);
    openModal();
  };

  return (
    <MyTemplate>
      <HeroEvents event={upcoming} onOpenCalendar={openCalendar} />
      <EventsShowcase onOpenCalendar={openCalendar} />
      <FeatureEvents />

      {/* Se monta solo al abrir, así cada vez empieza desde el evento elegido */}
      {isOpen && (
        <EventsCalendarModal
          toggleModal={closeModal}
          events={EVENTS}
          initialEventId={calendarEventId}
        />
      )}
    </MyTemplate>
  );
}

export { EventsPage };