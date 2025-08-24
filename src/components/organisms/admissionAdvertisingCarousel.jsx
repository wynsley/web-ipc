// src/components/organisms/AdvertisingCarousel.jsx
import "./admissionAdvertisingCarousel.css";
import React, { useState, useEffect, useRef } from "react";
import { AdvertisingButton } from "../atoms/admissionAdvertisingButton";

const AdvertisingCarousel = ({ images, interval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startAutoPlay = () => {
    stopAutoPlay(); // limpiar antes de iniciar uno nuevo
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const NexImages = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const PrevImages = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [interval, images.length]);

  return (
    <div className="adver-carousel">
      <div
        onMouseEnter={stopAutoPlay} // Detiene el autoplay al poner el mouse
        onMouseLeave={startAutoPlay} // Lo reanuda al quitar el mouse
        className="adve-container__img"
      >
        <img
          src={images[current]}
          alt="Admisions"
          className="adverCarousel__img"
        />
      </div>
      <div className="adver__button">
        <AdvertisingButton
          text="Admisiones anteriores"
          variant="secondary"
          onClick={PrevImages}
        />
        <AdvertisingButton
          text="Próximas admisiones"
          variant="secondary"
          onClick={NexImages}
        />
      </div>
    </div>
  );
};

export { AdvertisingCarousel };
