import PropTypes from 'prop-types'
import { FaFilePdf, FaCheck, FaEye } from 'react-icons/fa'
import { DownloadButton } from '../atoms/downloadButton'
import './documentDownloadCard.css'

/**
 * Tarjeta de descarga de documento - Molécula
 * @param {string} title - Título del documento
 * @param {string} subtitle - Subtítulo/tipo de documento
 * @param {string} description - Descripción del documento
 * @param {Array} features - Array de características del documento
 * @param {string} downloadUrl - URL de descarga
 * @param {string} fileName - Nombre del archivo
 * @param {string} fileSize - Tamaño del archivo
 * @param {string} fileType - Tipo de archivo (PDF, DOC, etc.)
 * @param {Function} onPreview - Función para vista previa
 * @param {ReactNode} icon - Icono personalizado
 * @param {string} className - Clases CSS adicionales
 */
const DocumentDownloadCard = ({
    title,
    subtitle,
    description,
    features = [],
    downloadUrl,
    fileName,
    fileSize,
    fileType = 'PDF',
    onPreview,
    icon = <FaFilePdf />,
    className = ''
}) => {
    const handlePreview = () => {
        if (onPreview) {
            onPreview(downloadUrl, fileName)
        } else if (downloadUrl) {
            // Vista previa por defecto: abrir en nueva pestaña
            window.open(downloadUrl, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <div className={`document-download-card ${className}`}>
            <div className="document-download-card__header">
                <div className="document-download-card__icon">
                    {icon}
                </div>
                <div className="document-download-card__title-section">
                    <h3 className="document-download-card__title">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="document-download-card__subtitle">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            <div className="document-download-card__content">
                {description && (
                    <p className="document-download-card__description">
                        {description}
                    </p>
                )}

                {features && features.length > 0 && (
                    <ul className="document-download-card__features">
                        {features.map((feature, index) => (
                            <li key={index} className="document-download-card__feature">
                                <div className="document-download-card__feature-icon">
                                    <FaCheck />
                                </div>
                                <span className="document-download-card__feature-text">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="document-download-card__footer">
                <div className="document-download-card__info">
                    {fileSize && (
                        <span className="document-download-card__file-size">
                            {fileSize}
                        </span>
                    )}
                    <span className="document-download-card__file-type">
                        {fileType}
                    </span>
                </div>

                <div className="document-download-card__actions">
                    {(onPreview || downloadUrl) && (
                        <button
                            className="document-download-card__preview-button"
                            onClick={handlePreview}
                            aria-label={`Vista previa de ${title}`}
                        >
                            <FaEye />
                            Vista previa
                        </button>
                    )}

                    {downloadUrl && (
                        <DownloadButton
                            text="Descargar"
                            downloadUrl={downloadUrl}
                            fileName={fileName}
                            variant="primary"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

DocumentDownloadCard.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    downloadUrl: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.string,
    fileType: PropTypes.string,
    onPreview: PropTypes.func,
    icon: PropTypes.node,
    className: PropTypes.string
}

export { DocumentDownloadCard }