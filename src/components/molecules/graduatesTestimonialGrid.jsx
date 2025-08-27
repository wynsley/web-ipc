/**
 * Componente: GraduatesTestimonialGrid (Molécula)
 * 
 * Propósito:
 * - Layout responsivo para mostrar múltiples testimonios de egresados
 * - Maneja diferentes configuraciones de columnas
 * - Estados de carga y vacío
 * 
 * Uso:
 * - Sección principal de testimonios de egresados
 * - Puede usarse en homepage o página dedicada de egresados
 * 
 * Props:
 * @param {Array} graduates - Array de datos de egresados
 * @param {string} columns - Configuración de columnas: 'auto', 'two', 'three', 'four'
 * @param {Function} onGraduateClick - Callback al hacer click en un testimonio
 * @param {boolean} loading - Estado de carga
 * @param {string} className - Clases CSS adicionales
 */

import PropTypes from 'prop-types'
import { FaGraduationCap } from 'react-icons/fa'
import { GraduateTestimonialCard } from '../atoms/graduateTestimonialCard'
import './graduatesTestimonialGrid.css'

const GraduatesTestimonialGrid = ({
    graduates = [],
    columns = 'auto',
    onGraduateClick,
    loading = false,
    className = ''
}) => {
    // Función para determinar la clase CSS de columnas
    const getGridClassName = () => {
        const baseClass = 'graduates-testimonial-grid'
        const columnClass = columns === 'two' ? 'graduates-testimonial-grid--two-columns' :
                            columns === 'three' ? 'graduates-testimonial-grid--three-columns' :
                            columns === 'four' ? 'graduates-testimonial-grid--four-columns' : ''
        
        return [
            baseClass,
            columnClass,
            loading && 'graduates-testimonial-grid--loading',
            className
        ].filter(Boolean).join(' ')
    }

    // Manejar click en testimonio
    const handleGraduateClick = (graduate) => {
        if (typeof onGraduateClick === 'function') {
            onGraduateClick(graduate)
        } else {
            // Acción por defecto: log para debugging
            console.log('Testimonio seleccionado:', graduate)
        }
    }

    // Determinar si un egresado debe ser destacado
    const isGraduateFeatured = (graduate, index) => {
        // Lógica para destacar: primer elemento, o si tiene flag específico
        return graduate.featured || index === 0
    }

    // Renderizar estado de carga
    if (loading) {
        return (
            <div className={getGridClassName()}>
                <div className="graduates-testimonial-grid__loading">
                    <p>Cargando testimonios de egresados...</p>
                </div>
            </div>
        )
    }

    // Renderizar estado vacío
    if (!graduates || graduates.length === 0) {
        return (
            <div className={getGridClassName()}>
                <div className="graduates-testimonial-grid__empty">
                    <FaGraduationCap className="graduates-testimonial-grid__empty-icon" />
                    <h3 className="graduates-testimonial-grid__empty-title">
                        No hay testimonios disponibles
                    </h3>
                    <p className="graduates-testimonial-grid__empty-message">
                        Pronto tendremos testimonios inspiradores de nuestros egresados exitosos.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <section 
            className={getGridClassName()}
            role="region"
            aria-label="Testimonios de egresados del Instituto Privado Celendín"
        >
            {graduates.map((graduate, index) => (
                <GraduateTestimonialCard
                    key={graduate.id || `graduate-${index}`}
                    graduate={graduate}
                    featured={isGraduateFeatured(graduate, index)}
                    onClick={() => handleGraduateClick(graduate)}
                />
            ))}
        </section>
    )
}

// Definición de PropTypes para validación
GraduatesTestimonialGrid.propTypes = {
    graduates: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string.isRequired,
            career: PropTypes.string.isRequired,
            graduationYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            image: PropTypes.string,
            testimonial: PropTypes.string.isRequired,
            currentPosition: PropTypes.string,
            company: PropTypes.string,
            featured: PropTypes.bool
        })
    ),
    columns: PropTypes.oneOf(['auto', 'two', 'three', 'four']),
    onGraduateClick: PropTypes.func,
    loading: PropTypes.bool,
    className: PropTypes.string
}

// Valores por defecto
GraduatesTestimonialGrid.defaultProps = {
    graduates: [],
    columns: 'auto',
    onGraduateClick: null,
    loading: false,
    className: ''
}

export { GraduatesTestimonialGrid }