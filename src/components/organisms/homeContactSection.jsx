import { ContactForm } from './contacForm'
import './homeContactSection.css'

/**
 * Sección de contacto para Homepage - Organismo
 * @param {string} title - Título principal
 * @param {string} subtitle - Subtítulo
 * @param {string} imageSrc - URL de la imagen
 * @param {string} imageAlt - Texto alternativo de la imagen
 * @param {string} imageBadgeText - Texto del badge en la imagen
 * @param {string} imageTitle - Título bajo la imagen
 * @param {string} imageDescription - Descripción bajo la imagen
 * @param {string} className - Clases CSS adicionales
 */
const HomeContactSection = ({
    title = "¡Contáctanos!",
    subtitle = "¿Tienes dudas sobre nuestras carreras? ¿Quieres más información? Estamos aquí para ayudarte a dar el primer paso hacia tu futuro profesional.",
    imageSrc = "/src/assets/img/infraestructura.png",
    imageAlt = "Estudiantes del Instituto Privado Celendín",
    imageBadgeText = "¡18 años!",
    imageTitle = "Formando Profesionales",
    imageDescription = "Más de 18 años de experiencia formando profesionales exitosos que destacan en el mercado laboral nacional e internacional.",
    className = ''
}) => {
    return (
        <section className={`home-contact ${className}`}>
            <div className="home-contact__container">
                {/* Decoraciones flotantes */}
                <div className="home-contact__decoration home-contact__decoration--1" />
                <div className="home-contact__decoration home-contact__decoration--2" />
                <div className="home-contact__decoration home-contact__decoration--3" />
                
                {/* Header */}
                <header className="home-contact__header">
                    <h2 className="home-contact__title">{title}</h2>
                    <p className="home-contact__subtitle">{subtitle}</p>
                </header>

                {/* Contenido principal */}
                <div className="home-contact__content">
                    {/* Área de imagen */}
                    <div className="home-contact__image-section">
                        <div className="home-contact__image-wrapper">
                            <div className="home-contact__image-badge">
                                {imageBadgeText}
                            </div>
                            <img 
                                src={imageSrc}
                                alt={imageAlt}
                                className="home-contact__image"
                                loading="lazy"
                            />
                        </div>
                        
                        <div className="home-contact__image-text">
                            <h3 className="home-contact__image-title">
                                {imageTitle}
                            </h3>
                            <p className="home-contact__image-description">
                                {imageDescription}
                            </p>
                        </div>
                    </div>

                    {/* Área del formulario */}
                    <div className="home-contact__form-section">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export { HomeContactSection }