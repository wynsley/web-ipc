import { useState } from 'react'
import { FaWhatsapp, FaFacebookMessenger, FaMinus, FaPlus } from 'react-icons/fa'
import './floatingContactIcons.css'

/**
 * Iconos flotantes de contacto - Organismo
 * @param {string} whatsappNumber - Número de WhatsApp (formato: +51999999999)
 * @param {string} whatsappMessage - Mensaje predeterminado para WhatsApp
 * @param {string} messengerUrl - URL del perfil de Messenger
 * @param {boolean} showNotifications - Mostrar indicadores de notificación
 * @param {boolean} allowMinimize - Permitir minimizar los iconos
 * @param {string} className - Clases CSS adicionales
 */
const FloatingContactIcons = ({
    whatsappNumber = "+51999999999",
    whatsappMessage = "¡Hola! Me interesa obtener más información sobre las carreras del Instituto Privado Celendín.",
    messengerUrl = "https://m.me/institutoprivadocelendin",
    showNotifications = true,
    allowMinimize = true,
    className = ''
}) => {
    const [isMinimized, setIsMinimized] = useState(false)

    // Formatear número de WhatsApp
    const formatWhatsAppNumber = (number) => {
        return number.replace(/\D/g, '') // Remover caracteres no numéricos
    }

    // Generar URL de WhatsApp
    const getWhatsAppUrl = () => {
        const formattedNumber = formatWhatsAppNumber(whatsappNumber)
        const encodedMessage = encodeURIComponent(whatsappMessage)
        return `https://wa.me/${formattedNumber}?text=${encodedMessage}`
    }

    // Manejar click en WhatsApp
    const handleWhatsAppClick = () => {
        window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer')
    }

    // Manejar click en Messenger
    const handleMessengerClick = () => {
        window.open(messengerUrl, '_blank', 'noopener,noreferrer')
    }

    // Toggle minimizar
    const handleToggleMinimize = () => {
        setIsMinimized(!isMinimized)
    }

    const containerClasses = [
        'floating-contact',
        isMinimized && 'floating-contact--minimized',
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={containerClasses}>
            {/* Botón de toggle para minimizar */}
            {allowMinimize && (
                <button 
                    className="floating-contact__toggle"
                    onClick={handleToggleMinimize}
                    aria-label={isMinimized ? 'Expandir iconos de contacto' : 'Minimizar iconos de contacto'}
                    title={isMinimized ? 'Expandir' : 'Minimizar'}
                >
                    {isMinimized ? <FaPlus /> : <FaMinus />}
                </button>
            )}

            {/* WhatsApp */}
            <a
                href={getWhatsAppUrl()}
                className="floating-contact__item floating-contact__item--whatsapp"
                onClick={(e) => {
                    e.preventDefault()
                    handleWhatsAppClick()
                }}
                aria-label="Contactar por WhatsApp"
                title="Enviar mensaje por WhatsApp"
            >
                <FaWhatsapp />
                
                {/* Tooltip */}
                <div className="floating-contact__tooltip">
                    Escríbenos por WhatsApp
                </div>
                
                {/* Indicador de notificación */}
                {showNotifications && (
                    <div className="floating-contact__notification">
                        1
                    </div>
                )}
            </a>

            {/* Messenger */}
            <a
                href={messengerUrl}
                className="floating-contact__item floating-contact__item--messenger"
                onClick={(e) => {
                    e.preventDefault()
                    handleMessengerClick()
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por Messenger"
                title="Enviar mensaje por Messenger"
            >
                <FaFacebookMessenger />
                
                {/* Tooltip */}
                <div className="floating-contact__tooltip">
                    Escríbenos por Messenger
                </div>
                
                {/* Indicador de notificación */}
                {showNotifications && (
                    <div className="floating-contact__notification">
                        2
                    </div>
                )}
            </a>
        </div>
    )
}

export { FloatingContactIcons }