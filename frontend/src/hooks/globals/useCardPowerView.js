import { useState, useEffect } from "react";

// Debe calzar con tus breakpoints reales de Tailwind (sm: 640px, md: 768px, lg: 1024px)
function useCardsPerView() {
  const getCount = () => {
    if (typeof window === "undefined") return 2;
    const width = window.innerWidth;
    if (width >= 640 && width < 1024) return 3; // sm hasta antes de lg
    return 2; // < sm, o >= lg (desktop usa el grid de 4 fijo, no este carrusel)
  };

  const [cardsPerView, setCardsPerView] = useState(getCount);

  useEffect(() => {
    const onResize = () => setCardsPerView(getCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return cardsPerView;
}

export { useCardsPerView };