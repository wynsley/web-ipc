import { CtaButton } from '../atoms/ctaButton'
import { ImageGalleryCarousel } from '../molecules/imageGalleryCarousel'
import './ctaSection.css'

// Imágenes para la galería (fácil de modificar)
const galleryImages = [
    {
        src: "/src/assets/img/infraestructura.png",
        alt: "Estudiantes del Instituto Privado Celendín"
    },
    {
        src: "/src/assets/img/seervicios4.jpg", 
        alt: "Graduación de estudiantes"
    },
    {
        src: "/src/assets/img/servivios2.jpg",
        alt: "Laboratorio de computación"
    },
    {
        src: "/src/assets/img/infraestructura.png",
        alt: "Actividades académicas"
    },
    {
        src: "/src/assets/img/seervicios4.jpg",
        alt: "Vida estudiantil"
    }
]

/**
 * Sección CTA (Call to Action) - Organismo
 * @param {string} title - Título principal
 * @param {string} description - Descripción
 * @param {string} primaryButtonText - Texto del botón principal
 * @param {string} primaryButtonLink - Enlace del botón principal
 * @param {Array} images - Array de imágenes para la galería
 * @param {string} className - Clases CSS adicionales
 */
const CtaSection = ({
    title = "Tú también puedes alcanzar tus sueños",
    description = "En el Instituto Privado Celendín, formamos profesionales altamente capacitados para enfrentar los desafíos del mundo laboral. ¡Únete a nosotros y construye tu futuro!",
    primaryButtonText = "Conoce Nuestras Carreras",
    primaryButtonLink = "/majors",
    images = galleryImages,
    className = ''
}) => {
    return (
        <section className={`cta-section ${className}`}>
            <div className="cta-section__container">
                {/* Decoraciones flotantes */}
                <div className="cta-section__decoration" />
                <div className="cta-section__decoration cta-section__decoration--secondary" />
                
                <div className="cta-section__content">
                    {/* Galería de imágenes */}
                    <div className="cta-section__gallery">
                        <div className="cta-section__gallery-wrapper">
                            <ImageGalleryCarousel
                                images={images}
                                interval={4000}
                                autoPlay={true}
                                pauseOnHover={true}
                                showIndicators={true}
                                showProgress={true}
                            />
                        </div>
                    </div>

                    {/* Contenido de texto */}
                    <div className="cta-section__text">
                        <h2 className="cta-section__title">
                            {title}
                        </h2>
                        
                        <p className="cta-section__description">
                            {description}
                        </p>

                        <div className="cta-section__actions">
                            <CtaButton
                                to={primaryButtonLink}
                                variant="primary"
                                pulse={true}
                            >
                                {primaryButtonText}
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { CtaSection }