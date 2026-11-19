import { useState, useEffect, useCallback, useRef } from "react";

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
  const [withTransition, setWithTransition] = useState(true);

  const dragStartX = useRef(null);
  const autoplayRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const preloadedRef = useRef(new Set());

  const safeCurrent = isMultiCard
    ? total > 0
      ? Math.min(current, total)
      : 0
    : total > 0
      ? Math.min(current, total - 1)
      : 0;

  const safeNext =
    !isMultiCard && next !== null && next < total ? next : null;
  const safeSliding = sliding && safeNext !== null;

  useEffect(() => {
    return () => {
      clearTimeout(transitionTimerRef.current);
      clearInterval(autoplayRef.current);
    };
  }, []);

  /* Cancelar transición pendiente si la lista se redujo por debajo del destino */
  useEffect(() => {
    if (total === 0 || (!isMultiCard && next !== null && next >= total)) {
      clearTimeout(transitionTimerRef.current);
    }
  }, [total, next, isMultiCard]);

  /* Preload: solo solicita cada URL única una vez, sin repetir por re-renders */
  const srcsKey = slides
    .map((slide) => getSrc(slide))
    .filter(Boolean)
    .join("\0");

  useEffect(() => {
    if (!srcsKey) return;
    for (const src of srcsKey.split("\0")) {
      if (preloadedRef.current.has(src)) continue;
      preloadedRef.current.add(src);
      const img = new Image();
      img.src = src;
    }
  }, [srcsKey]);

  const goTo = useCallback(
    (index, byUser = false) => {
      if (total <= 1) return;

      if (isMultiCard) {
        if (byUser) setUserPaused(true);
        setWithTransition(true);
        setCurrent(index);
        return;
      }

      if (safeSliding) return;
      const target = ((index % total) + total) % total;
      if (target === safeCurrent) return;

      if (byUser) setUserPaused(true);

      clearTimeout(transitionTimerRef.current);
      setNext(target);
      setSliding(true);

      transitionTimerRef.current = setTimeout(() => {
        setCurrent(target);
        setNext(null);
        setSliding(false);
      }, transitionMs);
    },
    [safeSliding, safeCurrent, total, transitionMs, isMultiCard],
  );

  /* Siguiente */
  const goNext = useCallback(
    (byUser = false) => {
      if (total <= 1) return;

      if (isMultiCard) {
        if (byUser) setUserPaused(true);
        setWithTransition(true);
        setCurrent(Math.min(safeCurrent + 1, total));
        return;
      }

      goTo((safeCurrent + 1) % total, byUser);
    },
    [isMultiCard, safeCurrent, total, goTo],
  );

  /* Anterior */
  const goPrev = useCallback(() => {
    if (total <= 1) return;

    if (isMultiCard) {
      setUserPaused(true);

      if (safeCurrent === 0) {
        setWithTransition(false);
        setCurrent(total);

        afterPaint(() => {
          setWithTransition(true);
          setCurrent(total - 1);
        });
        return;
      }

      setWithTransition(true);
      setCurrent(Math.max(0, safeCurrent - 1));
      return;
    }

    goTo((safeCurrent - 1 + total) % total, true);
  }, [isMultiCard, safeCurrent, total, goTo]);

  /* Autoplay */
  useEffect(() => {
    if (!autoplay || userPaused || total <= 1) return;

    autoplayRef.current = setInterval(() => {
      goNext(false);
    }, autoplayDelay);

    return () => clearInterval(autoplayRef.current);
  }, [autoplay, userPaused, total, goNext, autoplayDelay]);

  /*
   * Al llegar a la zona clonada, esperamos a que termine la animación
   * y volvemos al índice real SIN transición (salto invisible).
   */
  useEffect(() => {
    if (!isMultiCard || total === 0) return;
    if (safeCurrent < total) return;

    const timeout = setTimeout(() => {
      setWithTransition(false);
      setCurrent(safeCurrent - total);
      afterPaint(() => setWithTransition(true));
    }, transitionMs);

    return () => clearTimeout(timeout);
  }, [safeCurrent, total, transitionMs, isMultiCard]);

  /* Drag / Swipe */
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

  /* Cálculos para múltiples cards */
  const cardWidthExpr = isMultiCard
    ? `(100% - ${gapRem * (cardsPerView - 1)}rem) / ${cardsPerView}`
    : "100%";

  const translateX = isMultiCard
    ? `calc(-1 * (${cardWidthExpr} + ${gapRem}rem) * ${safeCurrent})`
    : null;

  /* Dot activo */
  const activeDot =
    total > 0 ? (isMultiCard ? safeCurrent % total : safeCurrent) : 0;

  return {
    extendedSlides,
    current: safeCurrent,
    next: safeNext,
    sliding: safeSliding,
    userPaused,
    goTo,
    goNext,
    goPrev,
    dragHandlers,
    cardWidthExpr,
    translateX,
    activeDot,
    withTransition,
    setUserPaused,
  };
}

export { useCarousel };
