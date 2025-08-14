import { Link } from 'react-router-dom'
import './ctaButton.css'

/**
 * Botón CTA (Call to Action) - Átomo
 * @param {string} children - Texto del botón
 * @param {string} to - Ruta de navegación (Link interno)
 * @param {string} href - URL externa
 * @param {Function} onClick - Función al hacer click
 * @param {string} variant - Variante del botón: 'primary' | 'secondary'
 * @param {boolean} pulse - Activar animación de pulso
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} disabled - Si el botón está deshabilitado
 */
const CtaButton = ({ 
    children,
    to,
    onClick,
    variant = 'primary',
    pulse = false,
    className = '',
    disabled = false,
    ...props
}) => {
    const buttonClasses = [
        'cta__button',
        variant === 'secondary' && 'cta__button--secondary',
        pulse && 'cta__button--pulse',
        className
    ].filter(Boolean).join(' ')

    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault()
            return
        }
        if (onClick) {
            onClick(e)
        }
    }

    //(React Router)
    if (to && !disabled) {
        return (
            <Link 
                to={to} 
                className={buttonClasses}
                onClick={handleClick}
                {...props}
            >
                {children}
            </Link>
        )
    }

}

export { CtaButton }