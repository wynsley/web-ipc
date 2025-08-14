import PropTypes from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'
import './careerCard.css'

/**
 * Tarjeta de carrera - Átomo
 * @param {string} title - Título de la carrera
 * @param {string} description - Descripción de la carrera
 * @param {string} backgroundImage - URL de la imagen de fondo
 * @param {Function} onClick - Función al hacer click
 * @param {string} className - Clases CSS adicionales
 */
const CareerCard = ({ 
    title, 
    description, 
    backgroundImage, 
    onClick,
    className = '' 
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
        }
    }

    return (
        <article 
            className={`career-card ${className}`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Ver más información sobre ${title}`}
        >
            <div className="career-card__icon">
                <FaExternalLinkAlt />
            </div>
            
            <div className="career-card__content">
                <h3 className="career-card__title">
                    {title}
                </h3>
                
                <p className="career-card__description">
                    {description}
                </p>
            </div>
        </article>
    )
}

CareerCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
}

export { CareerCard }