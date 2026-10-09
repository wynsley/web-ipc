import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion as Motion } from "motion/react";
import { useCarousel } from "@/hooks/globals/useCarrusel";
import { LightboxTopBar } from "@/components/molecules/events/lightBoxTopBar";
import { LightboxCaption } from "@/components/molecules/events/LightBoxCaption";
import { IconButton } from "@/components/atoms/iconButton";
import { GrNext, GrPrevious } from "react-icons/gr";

const NAV_BUTTON =
  "absolute top-1/2 hidden -translate-y-1/2 bg-white/15 p-3 backdrop-blur hover:bg-white/30 sm:block";

function GalleryLightbox({ events, startIndex, onClose }) {
  const { current, next, goNext, goPrev, dragHandlers } = useCarousel({
    slides: events,
    initialIndex: startIndex,
    autoplay: false,
    transitionMs: 350,
    getSrc: (e) => e.image,
  });

  const position = next ?? current;
  const shown = events[position]; 
  const many = events.length > 1;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext(true);
      if (e.key === "ArrowLeft") goPrev();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [goNext, goPrev, onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galería de eventos"
      className="fixed inset-0 z-9999 flex flex-col bg-black/95"
    >
      <LightboxTopBar
        position={position + 1}
        total={events.length}
        onClose={onClose}
      />

      {/* Imagen (deslizable con el dedo o el mouse) */}
      <div
        {...dragHandlers}
        className="relative min-h-0 flex-1 touch-pan-y select-none"
      >
        <img
          src={events[current].image}
          alt={events[current].title}
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain"
        />
        {next !== null && (
          <Motion.img
            key={next}
            src={events[next].image}
            alt={events[next].title}
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full bg-black object-contain"
          />
        )}

        {many && (
          <>
            <IconButton
              label="Foto anterior"
              onClick={goPrev}
              className={`${NAV_BUTTON} left-3`}
            >
              <GrPrevious size={20}/>
            </IconButton>
            <IconButton
              label="Foto siguiente"
              onClick={() => goNext(true)}
              className={`${NAV_BUTTON} right-3`}
            >
              <GrNext size={20}/>
            </IconButton>
          </>
        )}
      </div>

      <LightboxCaption event={shown} />
    </div>,
    document.body
  );
}

export { GalleryLightbox };