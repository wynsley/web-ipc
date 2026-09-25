import { useEffect, useRef } from "react";
import { useCarouselDrag } from "../../../hooks/globals/useCarouselDrag";

function ContinuousCarousel({
  items,
  renderItem,
  emphasizeCenter = false,
  draggable = false,
  label,
  className = "",
}) {
  const viewportRef = useRef(null);
  useCarouselDrag(viewportRef, draggable);

  useEffect(() => {
    if (!emphasizeCenter) return undefined;

    const viewport = viewportRef.current;
    const slots = Array.from(viewport.querySelectorAll("[data-carousel-slot]"));
    let frame;
    let visible = false;

    const updateScale = () => {
      const bounds = viewport.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      const scales = slots.map((slot) => {
        const rect = slot.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - center);
        return 1 - 0.26 * Math.min(distance / (bounds.width / 2), 1);
      });
      slots.forEach((slot, index) => {
        slot.style.setProperty("--card-scale", scales[index]);
      });
      if (visible) frame = requestAnimationFrame(updateScale);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) updateScale();
    });
    observer.observe(viewport);
    return () => {
      visible = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [emphasizeCenter, items]);

  return (
    <div
      ref={viewportRef}
      data-draggable={draggable || undefined}
      role="region"
      aria-label={label}
      className={`continuous-carousel ${emphasizeCenter ? "continuous-carousel--center" : ""} ${className}`}
    >
      <div className="continuous-carousel__track animate-scrollLeft">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="continuous-carousel__group"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {items.map((item) => (
              <div
                key={item.title}
                data-carousel-slot
                className="continuous-carousel__slot"
              >
                <div className="continuous-carousel__card">
                  {renderItem(item, copy === 1)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export { ContinuousCarousel };