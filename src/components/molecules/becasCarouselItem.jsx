import './becasCarouselItem.css'

const CarouselItem = ({ image }) => {
  return (
    <div className="carousel-item">
      <img className='img' src={image} alt="carousel" />
    </div>
  );
};
export {CarouselItem}