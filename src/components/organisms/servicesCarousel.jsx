import React, { useState, useEffect,useRef } from 'react';

import { CarouselItem } from '../molecules/becasCarouselItem';
import { CarouselButton } from '../atoms/carouselServicesButton';
import { CarouselDot } from '../atoms/carouselServicesDots';
import './servicesCarousel.css';
import Img1 from "../../assets/img/infraestructura.png"
import Img2 from "../../assets/img/seervicios4.jpg"
import Img3 from "../../assets/img/servivios2.jpg"      



const originalSlides = [
  {
    image: Img1,
    title: 'Becas por Exelencia Académica',
  },
  {
    image: Img2,
    title: 'Becas por Exoneración',
  },
  {
    image: Img3,
    title: 'Becas por convenio',
  },
  {
    image: Img2,
    title: 'Beca por Hermanos',
  },
  {
    image: Img1,
    title: 'Becas por Orfandad',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  const updateCarousel = (newIndex) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const total = originalSlides.length;
    const adjustedIndex = (newIndex + total) % total;
    setCurrentIndex(adjustedIndex);

    setTimeout(() => {
      isAnimating.current = false;
    }, 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      updateCarousel(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateCarousel(currentIndex + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="carousel-container">
      <CarouselButton direction="left" onClick={() => updateCarousel(currentIndex - 1)} />

      <div className="carousel-viewport">
        <div className="carousel-track">
          {originalSlides.map((slide, index) => {
            const offset = (index - currentIndex + originalSlides.length) % originalSlides.length;

            let className = 'carousel-item-wrapper';
            if (offset === 0) className += ' center';
            else if (offset === 1) className += ' right-1';
            else if (offset === 2) className += ' right-2';
            else if (offset === originalSlides.length - 1) className += ' left-1';
            else if (offset === originalSlides.length - 2) className += ' left-2';
            else className += ' hidden';

            return (
              <div
                key={index}
                className={className}
                onClick={() => updateCarousel(index)}
              >
                <CarouselItem image={slide.image} />
              </div>
            );
          })}
        </div>
      </div>

      <CarouselButton direction="right" onClick={() => updateCarousel(currentIndex + 1)} />

      <div className="carousel-dots">
        {originalSlides.map((_, i) => (
          <CarouselDot key={i} active={i === currentIndex} onClick={() => updateCarousel(i)} />
        ))}
      </div>

      <div className="carousel-title">
        <h3>{originalSlides[currentIndex].title}</h3>
      </div>
    </div>
  );
};

export  {Carousel};