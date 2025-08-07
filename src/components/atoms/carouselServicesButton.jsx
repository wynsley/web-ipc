import React from 'react';
import './carouselServicesButton.css';

const CarouselButton = ({ direction, onClick }) => {
  return (
    <button
      className={`nav-arrow ${direction}`}
      onClick={onClick}
      aria-label={`Go ${direction}`}
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  );
};
export {CarouselButton}