import './convenioNavigationButton.css'

/**
 * Botón de navegación del carrusel de convenios - Átomo
 * @param {Function} onClick - Función al hacer click
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {string} direction - Dirección: 'prev' o 'next'
 * @param {ReactNode} children - Contenido del botón
 * @param {string} className - Clases CSS adicionales
 */
const ConvenioNavigationButton = ({ 
    onClick, 
    disabled = false, 
    direction = 'next',
    children,
    className = ''
}) => {
    const ariaLabel = direction === 'prev' ? 'Convenio anterior' : 'Siguiente convenio'
    
    return (
        <button 
            className={`convenio__nav-button convenio__nav-button--${direction} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type="button"
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}

export { ConvenioNavigationButton }