import { useEffect, useRef } from "react";
import { useCarousel } from "../globals/useCarrusel";
import { useSlideDirection } from "./useSlidesDirection";
import { EVENTS } from "@/data/events/evenst";

function useEventsCarousel() {
  const carousel = useCarousel({
    slides: EVENTS,
    getSrc: (event) => event.image,
    autoplayDelay: 7000,
    transitionMs: 900,
  });

  const { current, next, userPaused, setUserPaused } = carousel;

  // Si hay transición en curso, mostramos el destino
  const index = next !== null ? next : current;
  const event = EVENTS[index];
  const direction = useSlideDirection(index, EVENTS.length);

  const hovering = useRef(false);

  // En táctil no hay "mouse leave": reanuda el autoplay tras 8 s
  useEffect(() => {
    if (!userPaused || hovering.current) return;
    const t = setTimeout(() => setUserPaused(false), 8000);
    return () => clearTimeout(t);
  }, [userPaused, index, setUserPaused]);

  const hoverHandlers = {
    onMouseEnter: () => {
      hovering.current = true;
      setUserPaused(true);
    },
    onMouseLeave: () => {
      hovering.current = false;
      setUserPaused(false);
    },
  };

  return { ...carousel, events: EVENTS, event, direction, hoverHandlers };
}

export { useEventsCarousel };