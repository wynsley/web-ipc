import { ConvenioButton } from '../atoms/convenioButton'
import './convenioCard.css'

/**
 * Tarjeta de convenio - Molécula
 * @param {string} title - Título del convenio
 * @param {string} description - Descripción del convenio
 * @param {boolean} isActive - Si la tarjeta está activa
 * @param {Function} onButtonClick - Función al hacer click en el botón
 * @param {string} className - Clases CSS adicionales
 */
const ConvenioCard = ({ 
    title, 
    description, 
    isActive = false, 
    onButtonClick,
    className = '' 
}) => {
    return (
        <article 
            className={`convenio__card ${isActive ? 'convenio__card--active' : ''} ${className}`}
            role="article"
            aria-label={`Convenio con ${title}`}
        >
            <div className="convenio__card-content">
                <h3 className="convenio__card-title">{title}</h3>
                <p className="convenio__card-description">{description}</p>
                <ConvenioButton 
                    onClick={onButtonClick}
                    className="convenio__card-button"
                    ariaLabel={`Más información sobre ${title}`}
                >
                    Más información
                </ConvenioButton>
            </div>
        </article>
    )
}

export { ConvenioCard }