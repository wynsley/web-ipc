import { useEffect, useRef, useState } from "react";
import { useCarousel } from "../globals/useCarrusel";
import { useSlideDirection } from "./useSlidesDirection";
import { useMotionPreference } from "../globals/useMotionPreference";

const getEventImage = (event) => event.image;

function useEventsCarousel(publishedEvents) {
  const [manualPaused, setManualPaused] = useState(false);
  const reducedMotion = useMotionPreference();
  const events = publishedEvents;

  const carousel = useCarousel({
    slides: events,
    getSrc: getEventImage,
    autoplay: events.length > 1 && !manualPaused && !reducedMotion,
    autoplayDelay: 7000,
    transitionMs: 650,
  });

  const { current, next, userPaused, setUserPaused } = carousel;

  // Si hay transición en curso, mostramos el destino siempre dentro de rango
  const rawIndex = next !== null ? next : current;
  const index =
    events.length > 0 ? Math.min(rawIndex, events.length - 1) : 0;
  const event = events[index] ?? events[0];
  const direction = useSlideDirection(index, events.length);

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

  return {
    ...carousel,
    current: index,
    manualPaused,
    togglePause: () => setManualPaused((value) => !value),
    events,
    event,
    direction,
    hoverHandlers,
  };
}

export { useEventsCarousel };
