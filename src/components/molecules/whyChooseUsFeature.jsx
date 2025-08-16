import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './whyChooseUsFeature.css'

/**
 * Característica de "Por qué elegirnos" - Molécula
 * @param {ReactNode} icon - Icono de la característica
 * @param {string} title - Título de la característica
 * @param {string} description - Descripción de la característica
 * @param {string} linkTo - Ruta de navegación
 * @param {boolean} highlighted - Si la característica está destacada
 * @param {string} className - Clases CSS adicionales
 * @param {Function} onClick - Función opcional al hacer click
 */
const WhyChooseUsFeature = ({ 
    icon, 
    title, 
    description, 
    linkTo,
    highlighted = false,
    className = '',
    onClick
}) => {
    const featureClasses = [
        'why-choose__feature',
        highlighted && 'why-choose__feature--highlighted',
        linkTo && 'why-choose__feature--clickable',
        className
    ].filter(Boolean).join(' ')

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

    const content = (
        <>
            <div className="why-choose__feature-icon">
                {icon}
            </div>
            
            <h3 className="why-choose__feature-title">
                {title}
            </h3>
            
            <p className="why-choose__feature-description">
                {description}
            </p>
        </>
    )

    // Si tiene linkTo, renderizar como Link
    if (linkTo) {
        return (
            <Link 
                to={linkTo}
                className={featureClasses}
                onClick={handleClick}
                aria-label={`Ver más sobre ${title}`}
            >
                {content}
            </Link>
        )
    }

    // Si no tiene linkTo pero tiene onClick, renderizar como button
    if (onClick) {
        return (
            <button 
                className={featureClasses}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                aria-label={`Ver más sobre ${title}`}
                type="button"
            >
                {content}
            </button>
        )
    }

    // Si no tiene navegación, renderizar como div normal
    return (
        <div className={featureClasses}>
            {content}
        </div>
    )
}

WhyChooseUsFeature.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    linkTo: PropTypes.string,
    highlighted: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
}

export { WhyChooseUsFeature }