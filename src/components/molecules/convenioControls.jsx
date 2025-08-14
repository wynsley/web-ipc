import { ConvenioNavigationButton } from '../atoms/convenioNavigationButton'
import './convenioControls.css'

/**
 * Controles de navegación del carrusel de convenios - Molécula
 * @param {Function} onPrev - Función para ir al anterior
 * @param {Function} onNext - Función para ir al siguiente
 * @param {boolean} canGoPrev - Si se puede ir al anterior
 * @param {boolean} canGoNext - Si se puede ir al siguiente
 * @param {string} className - Clases CSS adicionales
 */
const ConvenioControls = ({ 
    onPrev, 
    onNext, 
    canGoPrev = true, 
    canGoNext = true,
    className = ''
}) => {
    return (
        <div className={`convenio__controls ${className}`}>
            <ConvenioNavigationButton
                onClick={onPrev}
                disabled={!canGoPrev}
                direction="prev"
            >
                ← Anterior
            </ConvenioNavigationButton>
            
            <ConvenioNavigationButton
                onClick={onNext}
                disabled={!canGoNext}
                direction="next"
            >
                Siguiente →
            </ConvenioNavigationButton>
        </div>
    )
}

export { ConvenioControls }