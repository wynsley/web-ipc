import { useState } from 'react'
import PropTypes from 'prop-types'
import { FaChevronDown, FaCircle } from 'react-icons/fa'
import { ProcessStepIcon } from '../atoms/processStepIcon'
import { DownloadButton } from '../atoms/downloadButton'
import './processStepCard.css'

/**
 * Tarjeta de paso del proceso - Molécula
 * @param {number} stepNumber - Número del paso
 * @param {string} title - Título del paso
 * @param {string} description - Descripción del paso
 * @param {Array} steps - Array de sub-pasos
 * @param {string} status - Estado: 'pending' | 'active' | 'completed'
 * @param {string} expandedContent - Contenido expandible
 * @param {Object} downloadInfo - Info de descarga {url, fileName}
 * @param {Function} onClick - Función al hacer click en la tarjeta
 * @param {string} className - Clases CSS adicionales
 */
const ProcessStepCard = ({
    stepNumber,
    title,
    description,
    steps = [],
    status = 'pending',
    expandedContent,
    downloadInfo,
    onClick,
    className = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const cardClasses = [
        'process-step-card',
        `process-step-card--${status}`,
        className
    ].filter(Boolean).join(' ')

    const handleCardClick = () => {
        if (onClick) {
            onClick(stepNumber, status)
        }
    }

    const handleExpandClick = (e) => {
        e.stopPropagation()
        setIsExpanded(!isExpanded)
    }

    const getStatusText = () => {
        const statusMap = {
            'pending': 'Pendiente',
            'active': 'En Proceso',
            'completed': 'Completado'
        }
        return statusMap[status] || 'Pendiente'
    }

    const isActive = status === 'active'
    const isCompleted = status === 'completed'

    return (
        <div 
            className={cardClasses}
            onClick={handleCardClick}
            role={onClick ? "button" : "article"}
            tabIndex={onClick ? 0 : -1}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onClick) {
                    e.preventDefault()
                    handleCardClick()
                }
            }}
        >
            <div className="process-step-card__header">
                <ProcessStepIcon
                    stepNumber={stepNumber}
                    isActive={isActive}
                    isCompleted={isCompleted}
                />
                <h3 className="process-step-card__title">
                    {title}
                </h3>
            </div>

            <div className="process-step-card__content">
                {description && (
                    <p className="process-step-card__description">
                        {description}
                    </p>
                )}

                {steps && steps.length > 0 && (
                    <ul className="process-step-card__steps-list">
                        {steps.map((step, index) => (
                            <li key={index} className="process-step-card__step-item">
                                <FaCircle className="process-step-card__step-icon" />
                                <span className="process-step-card__step-text">
                                    {step}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

                {expandedContent && (
                    <div className={`
                        process-step-card__expanded-content 
                        ${isExpanded ? 'process-step-card__expanded-content--visible' : ''}
                    `}>
                        <div className="process-step-card__expanded-text">
                            {expandedContent}
                        </div>
                    </div>
                )}
            </div>

            <div className="process-step-card__footer">
                <div className="process-step-card__status-section">
                    <span className={`process-step-card__status process-step-card__status--${status}`}>
                        {getStatusText()}
                    </span>
                </div>

                <div className="process-step-card__action">
                    {expandedContent && (
                        <button
                            className={`
                                process-step-card__expand-button 
                                ${isExpanded ? 'process-step-card__expand-button--expanded' : ''}
                            `}
                            onClick={handleExpandClick}
                            aria-label={isExpanded ? 'Ver menos' : 'Ver más'}
                        >
                            Detalles
                            <FaChevronDown className="process-step-card__expand-icon" />
                        </button>
                    )}

                    {downloadInfo && (
                        <DownloadButton
                            text="Descargar"
                            downloadUrl={downloadInfo.url}
                            fileName={downloadInfo.fileName}
                            variant="secondary"
                            className="process-step-card__download"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

ProcessStepCard.propTypes = {
    stepNumber: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    steps: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.oneOf(['pending', 'active', 'completed']),
    expandedContent: PropTypes.string,
    downloadInfo: PropTypes.shape({
        url: PropTypes.string.isRequired,
        fileName: PropTypes.string
    }),
    onClick: PropTypes.func,
    className: PropTypes.string
}

export { ProcessStepCard }