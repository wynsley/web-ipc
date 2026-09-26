import { useState, useEffect } from "react";

function useCardsPerView() {
  const getCount = () => {
    if (typeof window === "undefined") return 1.3;
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    if (width >= 640) return 2.3;
    return 1.3;
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