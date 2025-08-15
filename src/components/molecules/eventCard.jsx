import PropTypes from 'prop-types'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import './eventCard.css'

/**
 * Tarjeta de evento - Molécula
 * @param {Object} event - Datos del evento
 * @param {Function} onClick - Función al hacer click
 * @param {boolean} featured - Si el evento es destacado
 * @param {string} className - Clases CSS adicionales
 */
const EventCard = ({ 
    event,
    onClick,
    featured = false,
    className = '' 
}) => {
    // Validación temprana del evento
    if (!event) {
        console.warn('EventCard: event prop is required')
        return null
    }

    const {
        id,
        title = '',
        description = '',
        date,
        time,
        location,
        image,
        status = 'upcoming',
        category
    } = event

    // Validaciones básicas
    if (!title || !image) {
        console.warn('EventCard: title and image are required fields')
        return null
    }

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) return ''
        
        try {
            const date = new Date(dateString)
            
            // Verificar si la fecha es válida
            if (isNaN(date.getTime())) {
                console.warn('EventCard: Invalid date format:', dateString)
                return ''
            }
            
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short'
            }).toUpperCase()
        } catch (error) {
            console.warn('EventCard: Error formatting date:', error)
            return ''
        }
    }

    // Función para obtener el texto del estado
    const getStatusText = (status) => {
        const statusMap = {
            'upcoming': 'Próximo',
            'ongoing': 'En curso',
            'finished': 'Finalizado'
        }
        return statusMap[status] || 'Próximo'
    }

    // Función para truncar texto largo
    const truncateText = (text, maxLength = 150) => {
        if (!text || text.length <= maxLength) return text
        return text.substring(0, maxLength).trim() + '...'
    }

    // Manejar click con validación
    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick(event)
        }
    }

    // Manejar errores de imagen
    const handleImageError = (e) => {
        console.warn('EventCard: Failed to load image:', image)
        e.target.src = '/src/assets/img/placeholder-event.jpg' // puede ir una imagen de respaldo, por si la principal falla
        e.target.alt = 'Imagen no disponible'
    }

    // Generar clase CSS dinámica - super chido
    const cardClasses = [
        'event__card',
        featured && 'event__card--featured',
        status && `event__card--${status}`,
        className
    ].filter(Boolean).join(' ')

    return (
        <article 
            className={cardClasses}
            onClick={handleClick}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalles del evento: ${title}`}
            data-event-id={id}
            data-event-category={category}
        >
            {/* Imagen del evento */}
            <div className="event__card__image-wrapper">
                <img 
                    src={image} 
                    alt={`Imagen del evento: ${title}`}
                    className="event__card__image"
                    loading="lazy"
                    onError={handleImageError}
                />
                {date && (
                    <div className="event__card__date-badge">
                        {formatDate(date)}
                    </div>
                )}
            </div>

            {/* Contenido principal */}
            <div className="event__card__content">
                <h3 className="event__card__title" title={title}>
                    {title}
                </h3>

                <p className="event__card__description" title={description}>
                    {truncateText(description)}
                </p>

                {/* Detalles del evento */}
                <div className="event__card__details">
                    {time && (
                        <div className="event__card__detail">
                            <FaClock 
                                className="event__card__detail-icon" 
                                aria-hidden="true"
                            />
                            <span className="event__card__detail-text">
                                {time}
                            </span>
                        </div>
                    )}
                    
                    {location && (
                        <div className="event__card__detail">
                            <FaMapMarkerAlt 
                                className="event__card__detail-icon"
                                aria-hidden="true"
                            />
                            <span className="event__card__detail-text" title={location}>
                                {location}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer de la tarjeta */}
            <div className="event__card__footer">
                <span 
                    className={`event__card__status event__card__status--${status}`}
                    aria-label={`Estado del evento: ${getStatusText(status)}`}
                >
                    {getStatusText(status)}
                </span>
                
                <span 
                    className="event__card__cta"
                    aria-hidden="true"
                >
                    Ver más →
                </span>
            </div>
        </article>
    )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        date: PropTypes.string,
        time: PropTypes.string,
        location: PropTypes.string,
        image: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['upcoming', 'ongoing', 'finished']),
        category: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func,
    featured: PropTypes.bool,
    className: PropTypes.string
}

EventCard.defaultProps = {
    onClick: null,
    featured: false,
    className: ''
}

export { EventCard }