import PropTypes from 'prop-types'
import { FaCheck } from 'react-icons/fa'
import './processStepIcon.css'

/**
 * Icono de paso del proceso - Átomo
 * @param {number} stepNumber - Número del paso (1, 2, 3, etc.)
 * @param {boolean} isActive - Si el paso está activo
 * @param {boolean} isCompleted - Si el paso está completado
 * @param {Function} onClick - Función al hacer click
 * @param {string} className - Clases CSS adicionales
 * @param {string} ariaLabel - Etiqueta ARIA para accesibilidad
 */
const ProcessStepIcon = ({
    stepNumber,
    isActive = false,
    isCompleted = false,
    onClick,
    className = '',
    ariaLabel
}) => {
    const iconClasses = [
        'process-step-icon',
        isActive && 'process-step-icon--active',
        isCompleted && 'process-step-icon--completed',
        className
    ].filter(Boolean).join(' ')

    const handleClick = () => {
        if (onClick) {
            onClick(stepNumber)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
        }
    }

    const getAriaLabel = () => {
        if (ariaLabel) return ariaLabel
        
        if (isCompleted) return `Paso ${stepNumber} completado`
        if (isActive) return `Paso ${stepNumber} activo`
        return `Paso ${stepNumber}`
    }

    return (
        <div
            className={iconClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : -1}
            role={onClick ? "button" : "presentation"}
            aria-label={getAriaLabel()}
        >
            {isCompleted ? (
                <FaCheck className="process-step-icon__check" />
            ) : (
                <span className="process-step-icon__number">
                    {stepNumber}
                </span>
            )}
        </div>
    )
}

ProcessStepIcon.propTypes = {
    stepNumber: PropTypes.number.isRequired,
    isActive: PropTypes.bool,
    isCompleted: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    ariaLabel: PropTypes.string
}

export { ProcessStepIcon }