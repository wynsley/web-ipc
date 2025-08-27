/**
 * Componente: GraduateTestimonialCard (Átomo)
 * 
 * Propósito:
 * - Muestra información y testimonio de un egresado exitoso
 * - Incluye foto, datos básicos y experiencia profesional
 * - Diseño moderno con efectos hover y responsive
 * 
 * Uso:
 * - Parte de una grilla o carrusel de testimonios
 * - Información estática de egresados destacados
 * 
 * Props:
 * @param {Object} graduate - Datos del egresado
 * @param {boolean} featured - Si es un egresado destacado
 * @param {Function} onClick - Callback al hacer click
 * @param {string} className - Clases CSS adicionales
 */

import PropTypes from 'prop-types'
import './graduateTestimonialCard.css'

const GraduateTestimonialCard = ({
    graduate,
    featured = false,
    onClick,
    className = ''
}) => {
    // Validación temprana de datos
    if (!graduate) {
        console.warn('GraduateTestimonialCard: graduate prop is required')
        return null
    }

    const {
        id,
        name = '',
        career = '',
        graduationYear,
        image,
        testimonial = ''
    } = graduate

    // Validaciones básicas
    if (!name || !career || !testimonial) {
        console.warn('GraduateTestimonialCard: name, career and testimonial are required fields')
        return null
    }

    // Función para manejar click
    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick(graduate)
        }
    }

    // Función para truncar texto largo
    const truncateText = (text, maxLength = 120) => {
        if (!text || text.length <= maxLength) return text
        return text.substring(0, maxLength).trim() + '...'
    }

    // Manejar error de imagen
    const handleImageError = (e) => {
        console.warn('GraduateTestimonialCard: Failed to load image:', image)
        // Imagen de respaldo por defecto
        e.target.src = 'https://via.placeholder.com/80x80/0b56ad/ffffff?text=IPC'
        e.target.alt = 'Egresado IPC'
    }

    // Generar clases CSS dinámicas
    const cardClasses = [
        'graduate-testimonial-card',
        featured && 'graduate-testimonial-card--featured',
        className
    ].filter(Boolean).join(' ')

    return (
        <article 
            className={cardClasses}
            onClick={handleClick}
            tabIndex={onClick ? 0 : -1}
            role={onClick ? "button" : "article"}
            aria-label={`Testimonio de ${name}, egresado de ${career}`}
            data-graduate-id={id}
        >
            {/* Header con imagen y datos básicos */}
            <header className="graduate-testimonial-card__header">
                <img 
                    src={image || 'https://via.placeholder.com/80x80/0b56ad/ffffff?text=IPC'} 
                    alt={`Foto de ${name}`}
                    className="graduate-testimonial-card__image"
                    loading="lazy"
                    onError={handleImageError}
                />
                
                <div className="graduate-testimonial-card__info">
                    <h3 className="graduate-testimonial-card__name" title={name}>
                        {name}
                    </h3>
                    <p className="graduate-testimonial-card__career">
                        {career}
                    </p>
                    {graduationYear && (
                        <p className="graduate-testimonial-card__graduation-year">
                            Promoción {graduationYear}
                        </p>
                    )}
                </div>
            </header>

            {/* Contenido principal del testimonio */}
            <div className="graduate-testimonial-card__content">
                <blockquote 
                    className="graduate-testimonial-card__testimonial"
                    title={testimonial}
                >
                    {truncateText(testimonial)}
                </blockquote>
            </div>

            {/* Footer con badge de status */}
            <footer className="graduate-testimonial-card__footer">
                <span className="graduate-testimonial-card__badge">
                    {featured ? 'Destacado' : 'Egresado'}
                </span>
            </footer>
        </article>
    )
}

// Definición de PropTypes para validación
GraduateTestimonialCard.propTypes = {
    graduate: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string.isRequired,
        career: PropTypes.string.isRequired,
        graduationYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image: PropTypes.string,
        testimonial: PropTypes.string.isRequired,
        currentPosition: PropTypes.string,
        company: PropTypes.string
    }).isRequired,
    featured: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string
}

// Valores por defecto
GraduateTestimonialCard.defaultProps = {
    featured: false,
    onClick: null,
    className: ''
}

export { GraduateTestimonialCard }