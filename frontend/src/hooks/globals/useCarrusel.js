import { useState, useEffect, useCallback, useRef } from "react";

function preloadImages(slides, getSrc) {
  slides.forEach((slide) => {
    const img = new Image();
    img.src = getSrc(slide);
  });
}

function useCarousel({
  slides,
  autoplayDelay = 5000,
  transitionMs = 700,
  dragThreshold = 50,
  getSrc = (slide) => slide.src, // por si tus slides no usan la key "src"
  autoplay = true,
}) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [sliding, setSliding] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(null);

  useEffect(() => {
    preloadImages(slides, getSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback(
    (index, byUser = false) => {
      if (sliding || index === current) return;
      if (byUser) setUserPaused(true);
      setNext(index);
      setSliding(true);
      setTimeout(() => {
        setCurrent(index);
        setNext(null);
        setSliding(false);
      }, transitionMs);
    },
    [sliding, current, transitionMs]
  );

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, true);
  }, [current, goTo, slides.length]);

  const goNext = useCallback(
    (byUser = false) => {
      goTo((current + 1) % slides.length, byUser);
    },
    [current, goTo, slides.length]
  );

  // ── Autoplay ──
  useEffect(() => {
    if (!autoplay || userPaused) return;
    const id = setInterval(() => goNext(false), autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, userPaused, goNext, autoplayDelay]);

  // ── Drag / Swipe ──
  const onDragStart = (clientX) => {
    dragStartX.current = clientX;
    setIsDragging(true);
  };

  const onDragEnd = (clientX) => {
    if (dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) >= dragThreshold) {
      if (delta < 0) goNext(true);
      else goPrev();
    }
    dragStartX.current = null;
    setIsDragging(false);
  };

  const onDragCancel = () => {
    dragStartX.current = null;
    setIsDragging(false);
  };

  // Handlers listos para spreadear en el <section>
  const dragHandlers = {
    onMouseDown: (e) => onDragStart(e.clientX),
    onMouseUp: (e) => onDragEnd(e.clientX),
    onMouseLeave: onDragCancel,
    onTouchStart: (e) => onDragStart(e.touches[0].clientX),
    onTouchEnd: (e) => onDragEnd(e.changedTouches[0].clientX),
    onTouchCancel: onDragCancel,
    onDragStart: (e) => e.preventDefault(),
  };

  return {
    current,
    next,
    sliding,
    isDragging,
    goTo,
    goNext,
    goPrev,
    dragHandlers,
  };
}

export { useCarousel };