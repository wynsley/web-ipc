import { useState } from "react";
import { MyTemplate } from "../templates/myTemplate";
import { HeroEvents } from "../organisms/events/heroEvents";
import { EventsShowcase } from "../organisms/events/eventsShowcase";
import { getUpcomingEvent } from "@/data/events/evenst";

function EventsPage() {
  const [upcoming] = useState(() => getUpcomingEvent());

  return (
    <MyTemplate>
      <HeroEvents event={upcoming} />
      <EventsShowcase />
      {/* <ScheduleEvents /> */}
    </MyTemplate>
  );
}

export { EventsPage };