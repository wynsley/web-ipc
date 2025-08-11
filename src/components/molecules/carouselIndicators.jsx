import "./carouselIndicators.css"

/**
 * Indicadores del carrusel (puntos) - Molécula
 * @param {number} total - Total de elementos
 * @param {number} activeIndex - Índice activo
 * @param {Function} onIndicatorClick - Función al hacer click en indicador
 * @param {string} className - Clases CSS adicionales
 */

const CarouselIndicators = ({
    total,
    activeIndex,
    onIndicatorClick,
    className = ""
}) =>   {
    return (
        <div className={`carousel-indicators ${className}`}>
            {Array.from ({ length: total }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onIndicatorClick(index)}
                    className={` carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                    aria-label={`Ir a elemento ${index + 1}`}
                >
                </button>
            ))}
        </div>
    )
}

export default CarouselIndicators