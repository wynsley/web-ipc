import { useEffect, useRef, useState } from "react";
import { useCarousel } from "../globals/useCarrusel";
import { useSlideDirection } from "./useSlidesDirection";

import { useMotionPreference } from "../globals/useMotionPreference";

function useEventsCarousel(publishedEvents) {
  const [manualPaused, setManualPaused] = useState(false);
  const reducedMotion = useMotionPreference();
  const events = publishedEvents;

  const carousel = useCarousel({
    slides: events,
    getSrc: (event) => event.image,
    autoplay: events.length > 1 && !manualPaused && !reducedMotion,
    autoplayDelay: 7000,
    transitionMs: 900,
  });

  const { current, next, userPaused, setUserPaused } = carousel;

  // Si hay transición en curso, mostramos el destino
  const index = next !== null ? next : current;
  const event = events[index];
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
    manualPaused,
    togglePause: () => setManualPaused((value) => !value),
    events, // los del carrusel (próximos)
    event,
    direction,
    hoverHandlers,
  };
}

export { useEventsCarousel };
