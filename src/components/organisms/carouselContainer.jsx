import UseCarousel from "../../hooks/useCarousel"
import CarouselIndicators from "../molecules/carouselIndicators" 
import "./carouselContainer.css"

/**
 * Contenedor principal del carrusel - Organismo
 * @param {Array} items - Array de elementos del carrusel
 * @param {number} interval - Intervalo para autoplay (default: 5000ms)
 * @param {boolean} autoPlay - Activar autoplay (default: true)
 * @param {boolean} showIndicators - Mostrar puntos indicadores (default: true)
 * @param {boolean} pauseOnHover - Pausar al hacer hover (default: true)
 * @param {string} className - Clases CSS adicionales
 * @param {Object} children - Componentes hijos (prev, next buttons)
 * @param {Function} renderItem - Función para renderizar cada item
 */

const CarouselContainer = ({
    items = [],
    interval = 5000,
    autoPlay = true,
    showIndicators = true,
    pauseOnHover = true,
    className = "",
    children,
    renderItem
}) => {
    const {
        activeIndex,
        currentItem, 
        goToNext,
        goToPrev,
        goToSlide,
        pause,
        play,
        hasMultiple
    } = UseCarousel(items, interval, autoPlay)

    const handleMouseEnter = () => { 
        if (pauseOnHover && autoPlay) pause()
    }

    const handleMouseLeave = () => {
        if (pauseOnHover && autoPlay) play()
    }

    // Si no hay items no renderiza
    if (!items.length) return null 

    return(
        <div
            className={`carousel-container ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* El contenido principal */}
            <div className="carousel-content">
                {renderItem ?
                    renderItem(currentItem, activeIndex) : 
                    <div className="carousel-item">{currentItem}</div>
                }
            </div>

            {/* Botones de navegación */}
            {hasMultiple && children && (
                <div className="carousel-controls">
                    {children.prev && children.prev(goToPrev)}
                    {children.next && children.next(goToNext)}
                </div>
            )}

            {/* Indicadores */}
            {showIndicators && hasMultiple && (
                <CarouselIndicators 
                    total={items.length}
                    activeIndex={activeIndex}
                    onIndicatorClick={goToSlide}
                />
            )}
        </div>
    )
}

export default CarouselContainer