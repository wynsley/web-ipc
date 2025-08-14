import PropTypes from 'prop-types'
import { CareerCard } from '../atoms/careerCard'
import './careersGrid.css'

/**
 * Grilla de carreras - Molécula
 * @param {Array} careers - Array de carreras
 * @param {Function} onCareerClick - Función al hacer click en una carrera
 * @param {string} columns - Número de columnas ('two' | 'four' | 'auto')
 * @param {string} className - Clases CSS adicionales
 */
const CareersGrid = ({ 
    careers = [], 
    onCareerClick,
    columns = 'auto',
    className = '' 
}) => {
    const getGridClassName = () => {
        const baseClass = 'careers-grid'
        const columnClass = columns === 'two' ? 'careers-grid--two-columns' :
                          columns === 'four' ? 'careers-grid--four-columns' : ''
        
        return `${baseClass} ${columnClass} ${className}`.trim()
    }

    const handleCareerClick = (career) => {
        if (onCareerClick) {
            onCareerClick(career)
        }
    }

    if (!careers || careers.length === 0) {
        return (
            <div className="careers-grid__empty">
                <p>No hay carreras disponibles en este momento.</p>
            </div>
        )
    }

    return (
        <div className={getGridClassName()}>
            {careers.map((career, index) => (
                <CareerCard
                    key={career.id || index}
                    title={career.title}
                    description={career.description}
                    backgroundImage={career.backgroundImage}
                    onClick={() => handleCareerClick(career)}
                />
            ))}
        </div>
    )
}

CareersGrid.propTypes = {
    careers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            backgroundImage: PropTypes.string.isRequired
        })
    ).isRequired,
    onCareerClick: PropTypes.func,
    columns: PropTypes.oneOf(['two', 'four', 'auto']),
    className: PropTypes.string
}

export { CareersGrid }