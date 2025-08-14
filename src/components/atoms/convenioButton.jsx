import './convenioButton.css'

/**
 * Botón de convenio - Átomo
 * @param {Function} onClick - Función al hacer click
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {ReactNode} children - Contenido del botón
 * @param {string} className - Clases CSS adicionales
 */
const ConvenioButton = ({ 
    onClick, 
    disabled = false, 
    children, 
    className = '',
    ariaLabel = "Botón de convenio"
}) => {
    return (
        <button 
            className={`convenio__button ${className}`}
            onClick={onClick}
            disabled={disabled}
            type="button"
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}

export { ConvenioButton }