import CarouselImage from "../atoms/carouselImage"
import "./carouselSlide.css"

/**
 * Slide del carrusel que puede contener imagen, texto o componentes - Molécula
 * @param {string} type - Tipo de slide: 'image', 'text', 'component', 'mixed'
 * @param {string} src - URL de imagen (si type incluye imagen)
 * @param {string} alt - Texto alternativo de imagen
 * @param {string} title - Título del slide
 * @param {string} subtitle - Subtítulo del slide
 * @param {string} description - Descripción del slide
 * @param {ReactNode} component - Componente personalizado
 * @param {string} textPosition - Posición del texto: 'center', 'left', 'right', 'overlay'
 * @param {string} className - Clases CSS adicionales
 * @param {Object} actions - Botones de acción
 */

const CarouselSlide = ({
    type = 'image',
    src,
    alt,
    title,
    subtitle,
    description,
    component,
    textPosition = 'center',
    className = "",
    actions
}) => {
    const slideClass = `carousel-slide carousel-slide--${type} carousel-slide--text-${textPosition} ${className}`
    const renderContent = () => {
        switch (type) {
            case 'image':
                return <CarouselImage src={src}  alt={alt} />
            case 'text':
                return(
                    <div className="carousel-slide__text-content">
                        {title && <h2 className="carousel-slide__title">{title}</h2>}
                        {subtitle && <h3 className="carousel-slide__subtitle">{subtitle}</h3>}
                        {description && <p className="carousel-slide__description">{description}</p>}
                        {actions && <div className="carousel-slide__actions">{actions}</div>}
                    </div>
            )

            case 'component':
                return component
            
            case 'mixed':
                return (
                    <>
                        {src && <CarouselImage src={src} alt={alt} />}
                        <div className="carousel-slide__overlay">
                            {title && <h2 className="carousel-slide__title">{title}</h2>}
                            {subtitle && <h3 className="carousel-slide__subtitle">{subtitle}</h3>}
                            {description && <p className="carousel-slide__description">{description}</p>}
                            {actions && <div className="carousel-slide__actions">{actions}</div>}
                        </div>
                        {component && <div className="carousel-slide__component">{component}</div>}
                    </>
                )
            
            default:
                return src ? <CarouselImage src={src} alt={alt} /> : component
        }
    }
    return (
        <div className={slideClass}>
            {renderContent()}
        </div>
    )
}

export default CarouselSlide