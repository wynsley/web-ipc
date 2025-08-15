import './eventNavigationButton.css'

/**
 * Botón de navegación para el carrusel de eventos - Átomo
 * @param {Function} onClick - Función al hacer click
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {string} direction - Dirección: 'prev' o 'next'
 * @param {ReactNode} children - Contenido del botón (íconos)
 * @param {string} className - Clases CSS adicionales
 */
const EventNavigationButton = ({ 
    onClick, 
    disabled = false, 
    direction = 'next',
    children,
    className = ''
}) => {
    const ariaLabel = direction === 'prev' ? 'Evento anterior' : 'Siguiente evento'
    
    return (
        <button 
            className={`event__nav-button event__nav-button--${direction} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type="button"
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}

export { EventNavigationButton }