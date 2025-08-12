import "./carouselImage.css"

/**
 * Imagen del carrusel - Átomo
 * @param {string} src - URL de la imagen
 * @param {string} alt - Texto alternativo
 * @param {string} className - Clases CSS adicionales
 * @param {Function} onClick - Función al hacer click
 */

const CarouselImage = ({
    src,
    alt = "",
    className = "",
    onClick
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`carousel-image ${className}`}
            onClick={onClick}
            loading="lazy"
        />
    )
}

export default CarouselImage