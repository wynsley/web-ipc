import './carouselServicesDots.css'

const CarouselDot = ({ active, onClick }) => (
  <span className={`carousel-dot ${active ? 'active' : ''}`} onClick={onClick}></span>
);

export  {CarouselDot};