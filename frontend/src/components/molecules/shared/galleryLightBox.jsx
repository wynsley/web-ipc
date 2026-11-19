import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Image } from "@/components/atoms/image";
import { useDialogFocus } from "@/hooks/modal/useDialogFocus";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useCarousel } from "@/hooks/globals/useCarrusel";
import { IconButton } from "@/components/atoms/iconButton";
import { GalleryCaption } from "@/components/molecules/shared/galleryCaption";
import { LightboxTopBar } from "../events/lightBoxTopBar";

const NAV_BUTTON =
  "absolute top-1/2 -translate-y-1/2 bg-white/15 p-3 backdrop-blur hover:bg-white/30";

function GalleryLightbox({
  items,
  startIndex,
  onClose,
  label = "Galería de imágenes",
}) {
  const dialogRef = useDialogFocus();
  const { current, next, goNext, goPrev, dragHandlers } = useCarousel({
    slides: items,
    initialIndex: startIndex,
    autoplay: false,
    transitionMs: 350,
    getSrc: (item) => item.image,
  });

  const position = next ?? current;
  const shown = items[position];
  const many = items.length > 1;

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
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-9999 grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-blue-dark"
    >
      <LightboxTopBar
        position={position + 1}
        total={items.length}
        onClose={onClose}
      />

      <div
        {...dragHandlers}
        className="relative min-h-0 min-w-0 touch-pan-y select-none"
      >
        <Image
          fill
          src={shown.image}
          alt={shown.alt ?? shown.title ?? ""}
          draggable={false}
          loading="eager"
          imageClassName="object-contain"
        />

        {many && (
          <>
            <IconButton
              label="Foto anterior"
              onClick={goPrev}
              className={`${NAV_BUTTON} left-3`}
            >
              <GrPrevious size={20} />
            </IconButton>
            <IconButton
              label="Foto siguiente"
              onClick={() => goNext(true)}
              className={`${NAV_BUTTON} right-3`}
            >
              <GrNext size={20} />
            </IconButton>
          </>
        )}
      </div>

      <GalleryCaption item={shown} />
    </div>,
    document.body,
  );
}

export { GalleryLightbox };
