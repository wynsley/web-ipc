import { useState, useEffect, useCallback, useRef } from "react";

function preloadImages(slides, getSrc) {
  slides.forEach((slide) => {
    const src = getSrc(slide);
    if (!src) return;
    const img = new Image();
    img.src = src;
  });
}

// Espera 2 frames para asegurar que el navegador pintó el "salto" sin animación
const afterPaint = (fn) =>
  requestAnimationFrame(() => requestAnimationFrame(fn));

function useCarousel({
  slides,
  autoplayDelay = 3000,
  transitionMs = 700,
  dragThreshold = 50,
  getSrc = (slide) => slide.src,
  autoplay = true,
  initialIndex = 0, 
  // Para carruseles de múltiples cards
  cardsPerView = 1,
  gapRem = 1.25,
}) {
  const total = slides.length;
  const isMultiCard = cardsPerView > 1;

  /*
   * En multi-card duplicamos las primeras cards al final.
   * Cuando llegamos a esa zona clonada (que se ve IGUAL que el inicio)
   */
  const duplicateCount = isMultiCard ? Math.ceil(cardsPerView) : 0;

  const extendedSlides = isMultiCard
    ? [...slides, ...slides.slice(0, duplicateCount)]
    : slides;

  const [current, setCurrent] = useState(initialIndex);
  const [next, setNext] = useState(null);
  const [sliding, setSliding] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // NUEVO: permite apagar la transición CSS durante el salto invisible
  const [withTransition, setWithTransition] = useState(true);

  const dragStartX = useRef(null);
  const autoplayRef = useRef(null);

  /* Preload*/
  useEffect(() => {
    preloadImages(slides, getSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const goTo = useCallback(
    (index, byUser = false) => {
      if (isMultiCard) {
        if (byUser) setUserPaused(true);
        setWithTransition(true);
        setCurrent(index);
        return;
      }

      if (sliding) return;
      if (index === current) return;

      if (byUser) setUserPaused(true);

      setNext(index);
      setSliding(true);

      setTimeout(() => {
        setCurrent(index);
        setNext(null);
        setSliding(false);
      }, transitionMs);
    },
    [sliding, current, transitionMs, isMultiCard]
  );

  /*Siguiente*/
  const goNext = useCallback(
    (byUser = false) => {
      if (isMultiCard) {
        if (byUser) setUserPaused(true);
        setWithTransition(true);
        // clamp: nunca pasamos de la zona clonada (evita espacio en blanco)
        setCurrent((prev) => Math.min(prev + 1, total));
        return;
      }

      goTo((current + 1) % total, byUser);
    },
    [isMultiCard, current, total, goTo]
  );

  /*Anterior*/
  const goPrev = useCallback(() => {
    if (isMultiCard) {
      setUserPaused(true);

      // Estamos en el inicio: saltamos (sin animar) a la zona clonada,
      // que se ve idéntica, y desde ahí retrocedemos con animación.
      if (current === 0) {
        setWithTransition(false);
        setCurrent(total);

        afterPaint(() => {
          setWithTransition(true);
          setCurrent(total - 1);
        });
        return;
      }

      setWithTransition(true);
      setCurrent((prev) => prev - 1);
      return;
    }

    goTo((current - 1 + total) % total, true);
  }, [isMultiCard, current, total, goTo]);

  /*Autoplay*/
  useEffect(() => {
    if (!autoplay || userPaused) return;

    autoplayRef.current = setInterval(() => {
      goNext(false);
    }, autoplayDelay);

    return () => clearInterval(autoplayRef.current);
  }, [autoplay, userPaused, goNext, autoplayDelay]);

  /*
   * Al llegar a la zona clonada, esperamos a que termine la animación
   * y volvemos al índice real SIN transición (salto invisible).
   */
  useEffect(() => {
    if (!isMultiCard) return;
    if (current < total) return;

    const timeout = setTimeout(() => {
      setWithTransition(false);
      setCurrent(current - total);
      afterPaint(() => setWithTransition(true));
    }, transitionMs);

    return () => clearTimeout(timeout);
  }, [current, total, transitionMs, isMultiCard]);

  /*Drag / Swipe*/
  const onDragStart = (clientX) => {
    dragStartX.current = clientX;
  };

  const onDragEnd = (clientX) => {
    if (dragStartX.current === null) return;

    const delta = clientX - dragStartX.current;

    if (Math.abs(delta) >= dragThreshold) {
      if (delta < 0) goNext(true);
      else goPrev();
    }

    dragStartX.current = null;
  };

  const onDragCancel = () => {
    dragStartX.current = null;
  };

  const dragHandlers = {
    onMouseDown: (e) => onDragStart(e.clientX),
    onMouseUp: (e) => onDragEnd(e.clientX),
    onMouseLeave: onDragCancel,
    onTouchStart: (e) => onDragStart(e.touches[0].clientX),
    onTouchEnd: (e) => onDragEnd(e.changedTouches[0].clientX),
    onTouchCancel: onDragCancel,
    onDragStart: (e) => e.preventDefault(),
  };

  /*Cálculos para múltiples cards*/
  const cardWidthExpr = isMultiCard
    ? `(100% - ${gapRem * (cardsPerView - 1)}rem) / ${cardsPerView}`
    : "100%";

  const translateX = isMultiCard
    ? `calc(-1 * (${cardWidthExpr} + ${gapRem}rem) * ${current})`
    : null;

  /*Dot activo*/
  const activeDot = isMultiCard ? current % total : current;

  return {
    // Data
    extendedSlides,
    // Estado
    current,
    next,
    sliding,
    userPaused,
    // Navegación
    goTo,
    goNext,
    goPrev,
    // Drag
    dragHandlers,
    // Multi-card
    cardWidthExpr,
    translateX,
    activeDot,
    withTransition, 
    // Autoplay
    setUserPaused,
  };
}

export { useCarousel };