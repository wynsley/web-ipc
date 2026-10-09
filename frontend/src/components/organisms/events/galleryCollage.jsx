import { GalleryCard } from "@/components/molecules/events/galeryCard";
import { ASPECTS, chunk, COLUMNS, GROUP_SIZE } from "../../../../utils/galeryLayout";
import { ScrollReveal } from "@/components/layouts/scrollReveal";


function GalleryCollage({ events, onOpen }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {chunk(events, GROUP_SIZE).map((group, g) => (
        <div
          key={g}
          className="grid grid-cols-2 items-center gap-3 sm:gap-4 lg:flex lg:gap-4"
        >
          {COLUMNS.map((slots, c) => (
            <div
              key={c}
              className="contents lg:flex lg:flex-1 lg:flex-col lg:gap-4"
            >
              {slots.map((slot) => {
                const event = group[slot];
                if (!event) return null;
                return (
                  <ScrollReveal key={event.id} delay={slot * 0.25} y={50} duration = {0.9}>
                    <GalleryCard
                      event={event}
                      aspect={ASPECTS[slot]}
                      onOpen={() => onOpen(g * GROUP_SIZE + slot)}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export { GalleryCollage };