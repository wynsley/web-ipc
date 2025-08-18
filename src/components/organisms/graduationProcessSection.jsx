import { useState } from 'react'
import PropTypes from 'prop-types'
import { ProcessStepCard } from '../molecules/processStepCard'
import { DocumentDownloadCard } from '../molecules/documentDownloadCard'
import { ProcessStepIndicator } from '../atoms/processStepIndicator'
import { DownloadButton } from '../atoms/downloadButton'
import { FaCalendarAlt, FaFileAlt } from 'react-icons/fa'
import './graduationProcessSection.css'

/**
 * Sección del proceso de titulación - Organismo
 * @param {string} title - Título de la sección
 * @param {string} subtitle - Subtítulo de la sección
 * @param {Array} processSteps - Array de pasos del proceso
 * @param {Array} documents - Array de documentos disponibles
 * @param {string} className - Clases CSS adicionales
 */
const GraduationProcessSection = ({
    title = "Proceso de Titulación",
    subtitle = "Conoce los pasos y requisitos para obtener tu título profesional en el Instituto Privado Celendín",
    processSteps = null,
    documents = null,
    className = ''
}) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0)
    const [error, setError] = useState(null)

    // Datos por defecto de los pasos del proceso
    const defaultProcessSteps = [
        {
            id: 'requisitos',
            title: 'Requisitos Previos',
            description: 'Documentos y requisitos necesarios para iniciar el proceso de titulación.',
            steps: [
                'Haber culminado todas las asignaturas',
                'No tener deudas pendientes',
                'Certificados completos'
            ],
            status: 'active',
            expandedContent: 'Es importante verificar que todos los documentos estén en orden antes de proceder. Los certificados deben estar legalizados y las deudas académicas completamente saldadas.',
            downloadInfo: {
                url: '/documents/requisitos-titulacion.pdf',
                fileName: 'requisitos-titulacion.pdf'
            }
        },
        {
            id: 'cronograma',
            title: 'Cronograma',
            description: 'Fechas importantes y plazos del proceso de titulación.',
            steps: [
                'Inscripción del proyecto',
                'Entrega del Proyecto',
                'Sustentación del proyecto',
                'Aula 1: Modalidad'
            ],
            status: 'pending',
            expandedContent: 'El cronograma debe seguirse estrictamente. Las fechas de sustentación se programan según disponibilidad del jurado y cumplimiento de requisitos previos.',
            downloadInfo: {
                url: '/documents/cronograma-titulacion.pdf',
                fileName: 'cronograma-titulacion-2025.pdf'
            }
        }
    ]

    // Datos por defecto de documentos
    const defaultDocuments = [
        {
            id: 'guia-titulacion',
            title: 'Guía del Proceso',
            subtitle: 'Guía completa de titulación',
            description: 'Documento detallado que explica paso a paso todo el proceso de titulación, requisitos y procedimientos.',
            features: [
                'Proceso completo paso a paso',
                'Formatos y plantillas incluidas',
                'Ejemplos prácticos',
                'Cronograma actualizado'
            ],
            downloadUrl: '/documents/guia-proceso-titulacion.pdf',
            fileName: 'guia-proceso-titulacion.pdf',
            fileSize: '2.5 MB',
            fileType: 'PDF',
            icon: <FaFileAlt />
        },
        {
            id: 'cronograma-2025',
            title: 'Cronograma 2025',
            subtitle: 'Fechas y plazos oficiales',
            description: 'Cronograma oficial con todas las fechas importantes del proceso de titulación para el año 2025.',
            features: [
                'Fechas de inscripción',
                'Plazos de entrega',
                'Fechas de sustentación',
                'Feriados y fechas especiales'
            ],
            downloadUrl: '/documents/cronograma-titulacion-2025.pdf',
            fileName: 'cronograma-titulacion-2025.pdf',
            fileSize: '1.8 MB',
            fileType: 'PDF',
            icon: <FaCalendarAlt />
        }
    ]

    // Usar datos personalizados
    const stepsData = processSteps || defaultProcessSteps
    const documentsData = documents || defaultDocuments

    // Preparar datos para el indicador de progreso
    const progressSteps = stepsData.map((step) => ({
        id: step.id,
        label: step.title,
        isCompleted: step.status === 'completed'
    }))

    const handleStepClick = (stepIndex, step) => {
        setActiveStepIndex(stepIndex)
        console.log('Paso seleccionado:', step)
    }

    const handleDocumentPreview = (url, fileName) => {
        console.log('Vista previa de:', fileName)
        // Abrir en nueva pestaña por defecto
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const sectionClassName = `graduation-process ${className}`.trim()

    if (error) {
        return (
            <section className={sectionClassName}>
                <div className="graduation-process__container">
                    <div className="graduation-process__error">
                        <h3 className="graduation-process__error-title">Error</h3>
                        <p>{error}</p>
                        <button 
                            className="graduation-process__error-button"
                            onClick={() => setError(null)}
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className={sectionClassName}>
            <div className="graduation-process__container">
                {/* Header */}
                <header className="graduation-process__header">
                    <h2 className="graduation-process__title">{title}</h2>
                    <p className="graduation-process__subtitle">{subtitle}</p>
                </header>

                {/* Indicador de progreso */}
                <div className="graduation-process__progress">
                    <ProcessStepIndicator
                        steps={progressSteps}
                        activeStepIndex={activeStepIndex}
                        onStepClick={(stepIndex) => setActiveStepIndex(stepIndex)}
                    />
                </div>

                {/* Contenido principal */}
                <div className="graduation-process__content">
                    {/* Pasos del proceso */}
                    <div className="graduation-process__steps">
                        <h3 className="graduation-process__steps-title">
                            Pasos del Proceso
                        </h3>
                        
                        {stepsData.map((step, index) => (
                            <ProcessStepCard
                                key={step.id}
                                stepNumber={index + 1}
                                title={step.title}
                                description={step.description}
                                steps={step.steps}
                                status={step.status}
                                expandedContent={step.expandedContent}
                                downloadInfo={step.downloadInfo}
                                onClick={() => handleStepClick(index, step)}
                            />
                        ))}
                    </div>

                    {/* Documentos */}
                    <div className="graduation-process__documents">
                        <h3 className="graduation-process__documents-title">
                            Documentos de Descarga
                        </h3>
                        
                        {documentsData.map((document) => (
                            <DocumentDownloadCard
                                key={document.id}
                                title={document.title}
                                subtitle={document.subtitle}
                                description={document.description}
                                features={document.features}
                                downloadUrl={document.downloadUrl}
                                fileName={document.fileName}
                                fileSize={document.fileSize}
                                fileType={document.fileType}
                                icon={document.icon}
                                onPreview={handleDocumentPreview}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="graduation-process__cta">
                    <h3 className="graduation-process__cta-title">
                        ¿Necesitas más información?
                    </h3>
                    <p className="graduation-process__cta-text">
                        Nuestro equipo académico está disponible para resolver todas tus dudas sobre el proceso de titulación.
                    </p>
                    <div className="graduation-process__cta-buttons">
                        <DownloadButton
                            text="Contactar Coordinación"
                            onClick={() => console.log('Contactar coordinación')}
                            variant="secondary"
                        />
                        <DownloadButton
                            text="Descargar Todos los Documentos"
                            downloadUrl="/documents/paquete-titulacion-completo.zip"
                            fileName="documentos-titulacion-completos.zip"
                            variant="primary"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

GraduationProcessSection.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    processSteps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            steps: PropTypes.arrayOf(PropTypes.string),
            status: PropTypes.oneOf(['pending', 'active', 'completed']),
            expandedContent: PropTypes.string,
            downloadInfo: PropTypes.shape({
                url: PropTypes.string.isRequired,
                fileName: PropTypes.string
            })
        })
    ),
    documents: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subtitle: PropTypes.string,
            description: PropTypes.string,
            features: PropTypes.arrayOf(PropTypes.string),
            downloadUrl: PropTypes.string.isRequired,
            fileName: PropTypes.string,
            fileSize: PropTypes.string,
            fileType: PropTypes.string,
            icon: PropTypes.node
        })
    ),
    className: PropTypes.string
}

export { GraduationProcessSection }