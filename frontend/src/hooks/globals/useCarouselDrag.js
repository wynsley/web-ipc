import { useEffect } from "react";

function useCarouselDrag(viewportRef, enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    const viewport = viewportRef.current;
    let drag = null;
    let suppressClick = false;

    const start = (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      const track = viewport.firstElementChild;
      suppressClick = false;
      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        scroll: viewport.scrollLeft,
        animation: track.getAnimations().find((item) => item.animationName === "scrollLeft"),
        width: track.firstElementChild.getBoundingClientRect().width,
        moved: false,
      };
      if (event.pointerType === "mouse") event.preventDefault();
    };

    const move = (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const delta = event.clientX - drag.x;
      if (!drag.moved) {
        if (Math.abs(delta) < 6 || Math.abs(delta) < Math.abs(event.clientY - drag.y)) return;
        drag.moved = true;
        suppressClick = true;
        // Pausa la animación existente; no crea otro temporizador ni otro bucle.
        viewport.dataset.dragging = "true";
        if (viewport.contains(document.activeElement)) document.activeElement.blur();
        drag.time = drag.animation ? drag.animation.currentTime : 0;
        viewport.setPointerCapture(event.pointerId);
      }
      if (drag.animation && drag.width > 0) {
        const duration = drag.animation.effect.getTiming().duration;
        const time = drag.time - delta / drag.width * duration;
        drag.animation.currentTime = ((time % duration) + duration) % duration;
      } else {
        viewport.scrollLeft = drag.scroll - delta;
      }
    };

    const end = (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      drag = null;
      delete viewport.dataset.dragging;
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    };
    const leave = (event) => {
      if (drag && !drag.moved) end(event);
    };
    const click = (event) => {
      if (!suppressClick || event.detail === 0) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };
    const preventImageDrag = (event) => event.preventDefault();
    const listeners = [
      ["pointerdown", start], ["pointermove", move], ["pointerup", end],
      ["pointercancel", end], ["lostpointercapture", end], ["pointerleave", leave],
      ["click", click], ["dragstart", preventImageDrag],
    ];
    listeners.forEach(([name, handler]) => viewport.addEventListener(name, handler, true));
    return () => {
      listeners.forEach(([name, handler]) => viewport.removeEventListener(name, handler, true));
      if (drag && viewport.hasPointerCapture(drag.id)) viewport.releasePointerCapture(drag.id);
      delete viewport.dataset.dragging;
    };
  }, [viewportRef, enabled]);
}

export { useCarouselDrag };
