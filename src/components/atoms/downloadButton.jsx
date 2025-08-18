import { useState } from 'react'
import PropTypes from 'prop-types'
import { FaDownload, FaSpinner } from 'react-icons/fa'
import './downloadButton.css'

/**
 * Botón de descarga - Átomo
 * @param {string} text - Texto del botón
 * @param {string} downloadUrl - URL del archivo a descargar
 * @param {string} fileName - Nombre del archivo (opcional)
 * @param {Function} onClick - Función personalizada al hacer click
 * @param {string} variant - Variante del botón: 'primary' | 'secondary' | 'outline'
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {ReactNode} icon - Icono personalizado
 * @param {string} className - Clases CSS adicionales
 */
const DownloadButton = ({
    text = 'Descargar',
    downloadUrl,
    fileName,
    onClick,
    variant = 'primary',
    disabled = false,
    icon = <FaDownload />,
    className = ''
}) => {
    const [isDownloading, setIsDownloading] = useState(false)

    const buttonClasses = [
        'download-button',
        variant !== 'primary' && `download-button--${variant}`,
        isDownloading && 'download-button--downloading',
        className
    ].filter(Boolean).join(' ')

    const handleClick = async (e) => {
        if (disabled || isDownloading) return

        // Si hay función personalizada, ejecutarla
        if (onClick) {
            onClick(e)
            return
        }

        // Si no hay URL, no hacer nada
        if (!downloadUrl) {
            console.warn('DownloadButton: No downloadUrl provided')
            return
        }

        setIsDownloading(true)

        try {
            // Crear elemento temporal para descarga
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = fileName || 'documento.pdf'
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            
            // Agregar al DOM temporalmente
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Simular tiempo de descarga para mejor UX
            setTimeout(() => {
                setIsDownloading(false)
            }, 1500)

        } catch (error) {
            console.error('Error al descargar archivo:', error)
            setIsDownloading(false)
            
            // Fallback: abrir en nueva pestaña
            window.open(downloadUrl, '_blank', 'noopener,noreferrer')
        }
    }

    const getIcon = () => {
        if (isDownloading) {
            return <FaSpinner className="download-button__icon" />
        }
        return <span className="download-button__icon">{icon}</span>
    }

    const getText = () => {
        if (isDownloading) return 'Descargando...'
        return text
    }

    return (
        <button
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled || isDownloading}
            type="button"
            aria-label={`Descargar ${fileName || text}`}
        >
            {getIcon()}
            <span className="download-button__text">
                {getText()}
            </span>
        </button>
    )
}

DownloadButton.propTypes = {
    text: PropTypes.string,
    downloadUrl: PropTypes.string,
    fileName: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    className: PropTypes.string
}

export { DownloadButton }