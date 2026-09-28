import { useState, useEffect, useCallback, useRef } from "react";

function preloadImages(slides, getSrc) {
  slides.forEach((slide) => {
    const src = getSrc(slide);

    if (!src) return;

    const img = new Image();
    img.src = src;
  });
}

function useCarousel({
  slides,

  autoplayDelay = 5000,
  transitionMs = 700,
  dragThreshold = 50,

  getSrc = (slide) => slide.src,

  autoplay = true,

  // Para carruseles de múltiples cards
  cardsPerView = 1,
  gapRem = 1.25,
}) {
  const total = slides.length;

  const isMultiCard = cardsPerView > 1;

  /*
   * En carruseles de varias cards agregamos las primeras cards
   * al final para crear el loop infinito.
   */
  const duplicateCount = isMultiCard
    ? Math.ceil(cardsPerView)
    : 0;

  const extendedSlides = isMultiCard
    ? [
        ...slides,
        ...slides.slice(0, duplicateCount),
      ]
    : slides;

  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [sliding, setSliding] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const dragStartX = useRef(null);
  const autoplayRef = useRef(null);

  /*
   * Preload
   */
  useEffect(() => {
    preloadImages(slides, getSrc);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Ir a una posición específica
   */
  const goTo = useCallback(
    (index, byUser = false) => {
      if (sliding) return;

      if (isMultiCard) {
        setCurrent(index);
        return;
      }

      if (index === current) return;

      if (byUser) {
        setUserPaused(true);
      }

      setNext(index);
      setSliding(true);

      setTimeout(() => {
        setCurrent(index);
        setNext(null);
        setSliding(false);
      }, transitionMs);
    },
    [
      sliding,
      current,
      transitionMs,
      isMultiCard,
    ]
  );

  /*
   * Siguiente
   */
  const goNext = useCallback(
    (byUser = false) => {
      if (isMultiCard) {
        setCurrent((prev) => prev + 1);

        if (byUser) {
          setUserPaused(true);
        }

        return;
      }

      goTo(
        (current + 1) % total,
        byUser
      );
    },
    [
      isMultiCard,
      current,
      total,
      goTo,
    ]
  );

  /*
   * Anterior
   */
  const goPrev = useCallback(() => {
    if (isMultiCard) {
      setCurrent((prev) =>
        prev === 0
          ? total - 1
          : prev - 1
      );

      setUserPaused(true);

      return;
    }

    goTo(
      (current - 1 + total) % total,
      true
    );
  }, [
    isMultiCard,
    current,
    total,
    goTo,
  ]);

  /*
   * Autoplay
   */
  useEffect(() => {
    if (!autoplay || userPaused) return;

    autoplayRef.current = setInterval(() => {
      goNext(false);
    }, autoplayDelay);

    return () =>
      clearInterval(autoplayRef.current);
  }, [
    autoplay,
    userPaused,
    goNext,
    autoplayDelay,
  ]);

  /*
   * Cuando llegamos a la zona duplicada,
   * volvemos al índice real sin animación.
   */
  useEffect(() => {
    if (!isMultiCard) return;

    if (current !== total) return;

    const timeout = setTimeout(() => {
      setCurrent(0);
    }, transitionMs);

    return () => clearTimeout(timeout);
  }, [
    current,
    total,
    transitionMs,
    isMultiCard,
  ]);

  /*
   * Drag / Swipe
   */
  const onDragStart = (clientX) => {
    dragStartX.current = clientX;
  };

  const onDragEnd = (clientX) => {
    if (dragStartX.current === null) return;

    const delta =
      clientX - dragStartX.current;

    if (
      Math.abs(delta) >= dragThreshold
    ) {
      if (delta < 0) {
        goNext(true);
      } else {
        goPrev();
      }
    }

    dragStartX.current = null;
  };

  const onDragCancel = () => {
    dragStartX.current = null;
  };

  const dragHandlers = {
    onMouseDown: (e) =>
      onDragStart(e.clientX),

    onMouseUp: (e) =>
      onDragEnd(e.clientX),

    onMouseLeave: onDragCancel,

    onTouchStart: (e) =>
      onDragStart(
        e.touches[0].clientX
      ),

    onTouchEnd: (e) =>
      onDragEnd(
        e.changedTouches[0].clientX
      ),

    onTouchCancel: onDragCancel,

    onDragStart: (e) =>
      e.preventDefault(),
  };

  /*
   * Cálculos para múltiples cards
   */
  const cardWidthExpr = isMultiCard
    ? `(100% - ${
        gapRem * (cardsPerView - 1)
      }rem) / ${cardsPerView}`
    : "100%";

  const translateX = isMultiCard
    ? `calc(-1 * (${cardWidthExpr} + ${gapRem}rem) * ${current})`
    : null;

  /*
   * Dot activo
   */
  const activeDot = isMultiCard
    ? current % total
    : current;

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

    // Autoplay
    setUserPaused,
  };
}

export { useCarousel };