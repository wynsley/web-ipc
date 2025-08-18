import PropTypes from 'prop-types'
import { ProcessStepIcon } from './processStepIcon'
import './processStepIndicator.css'

/**
 * Indicador de progreso de pasos - Átomo
 * @param {Array} steps - Array de pasos con {id, label, isCompleted}
 * @param {number} activeStepIndex - Índice del paso activo
 * @param {Function} onStepClick - Función al hacer click en un paso
 * @param {string} className - Clases CSS adicionales
 */
const ProcessStepIndicator = ({
    steps = [],
    activeStepIndex = 0,
    onStepClick,
    className = ''
}) => {
    // Calcular el progreso basado en pasos completados
    const calculateProgress = () => {
        if (steps.length === 0) return 0
        
        const completedSteps = steps.filter(step => step.isCompleted).length
        const progressPercentage = (completedSteps / steps.length) * 100
        
        // Si hay un paso activo que no está completado, añadir progreso parcial
        if (activeStepIndex >= 0 && !steps[activeStepIndex]?.isCompleted) {
            const partialProgress = ((activeStepIndex + 0.5) / steps.length) * 100
            return Math.max(progressPercentage, partialProgress)
        }
        
        return progressPercentage
    }

    const handleStepClick = (stepIndex) => {
        if (onStepClick) {
            onStepClick(stepIndex, steps[stepIndex])
        }
    }

    if (!steps || steps.length === 0) {
        return null
    }

    const progressWidth = calculateProgress()

    return (
        <div className={`process-step-indicator ${className}`}>
            {/* Línea de fondo */}
            <div className="process-step-indicator__line" />
            
            {/* Línea de progreso */}
            <div 
                className="process-step-indicator__progress"
                style={{ width: `${progressWidth}%` }}
            />
            
            {/* Pasos */}
            <div className="process-step-indicator__steps">
                {steps.map((step, index) => {
                    const isActive = index === activeStepIndex
                    const isCompleted = step.isCompleted
                    
                    const stepClasses = [
                        'process-step-indicator__step',
                        isActive && 'process-step-indicator__step--active',
                        isCompleted && 'process-step-indicator__step--completed'
                    ].filter(Boolean).join(' ')

                    return (
                        <div
                            key={step.id || index}
                            className={stepClasses}
                            onClick={() => handleStepClick(index)}
                            role={onStepClick ? "button" : "presentation"}
                            tabIndex={onStepClick ? 0 : -1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handleStepClick(index)
                                }
                            }}
                        >
                            <ProcessStepIcon
                                stepNumber={index + 1}
                                isActive={isActive}
                                isCompleted={isCompleted}
                                onClick={onStepClick ? () => handleStepClick(index) : undefined}
                                ariaLabel={`${step.label} - Paso ${index + 1}`}
                            />
                            
                            <span className="process-step-indicator__step-label">
                                {step.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

ProcessStepIndicator.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string.isRequired,
            isCompleted: PropTypes.bool
        })
    ).isRequired,
    activeStepIndex: PropTypes.number,
    onStepClick: PropTypes.func,
    className: PropTypes.string
}

export { ProcessStepIndicator }