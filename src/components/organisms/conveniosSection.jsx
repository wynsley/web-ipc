import useCarousel from '../../hooks/useCarousel'
import { ConvenioCard } from '../molecules/convenioCard'
import { ConvenioControls } from '../molecules/convenioControls'
import './conveniosSection.css'

/**
 * Sección de Convenios IPC - Organismo
 * @param {string} title - Título de la sección
 * @param {string} className - Clases CSS adicionales
 */
const ConveniosSection = ({ 
    title = "Convenios IPC",
    className = ''
}) => {
    // Datos de los convenios (extraídos del HTML original)
    const convenios = [
        {
            id: 'mpc',
            title: "MPC - Manuel de Pierola Castro",
            description: "Convenio educacional con descuentos especiales para estudiantes y familias del colegio.",
            link: "https://ejemplo1.com"
        },
        {
            id: 'upn',
            title: "UPN - Universidad Privada del Norte",
            description: "Acceso preferencial a programas universitarios y becas de estudio para nuestros estudiantes.",
            link: "https://ejemplo2.com"
        },
        {
            id: 'cc',
            title: "CC - Coronel Cortegana",
            description: "Descuentos exclusivos en tiendas y servicios del centro comercial para toda la familia.",
            link: "https://ejemplo3.com"
        },
        {
            id: 'ppag',
            title: "PPAG - Pedro Paula Augusto Gil",
            description: "Programa de apoyo y acompañamiento para el desarrollo profesional y personal.",
            link: "https://ejemplo4.com"
        },
        {
            id: 'instituto-tecnologico',
            title: "EESPP - Arístides Merino Merino",
            description: "Convenio con el Instituto Pedagógico para formación técnica y profesional de alta calidad.",
            link: "https://ejemplo5.com"
        }
    ]

    // Usar el hook existente useCarousel
    const {
        currentItem: activeConvenio,
        hasMultiple,
        goToNext,
        goToPrev,
        pause,
        play
    } = useCarousel(convenios, 6000, true) // Autoplay cada 6 segundos

    const handleMoreInfo = (convenio) => {
        // Pausar autoplay cuando el usuario interactúa
        pause()
        // En un caso real, aquí se navegaría a la página del convenio o se abriría un modal
        window.open(convenio.link, '_blank', 'noopener,noreferrer')
        // Reanudar autoplay después de un tiempo
        setTimeout(() => play(), 3000)
    }

    const handleControlClick = (action) => {
        pause() // Pausar cuando el usuario usa controles
        action() // Ejecutar la acción
        setTimeout(() => play(), 5000) // Reanudar después de 5 segundos
    }

    // Verificar si hay convenio activo
    if (!activeConvenio) {
        return null
    }

    return (
        <section className={`convenios ${className}`}>
            <div className="convenios__container">
                <header className="convenios__header">
                    <h2 className="convenios__title">{title}</h2>
                </header>

                <div className="convenios__carousel">
                    {/* Área de información principal */}
                    <div className="convenios__info">
                        <ConvenioCard
                            title={activeConvenio.title}
                            description={activeConvenio.description}
                            isActive={true}
                            onButtonClick={() => handleMoreInfo(activeConvenio)}
                        />
                    </div>

                    {/* Controles de navegación - solo mostrar si hay múltiples elementos */}
                    {hasMultiple && (
                        <ConvenioControls
                            onPrev={() => handleControlClick(goToPrev)}
                            onNext={() => handleControlClick(goToNext)}
                            canGoPrev={hasMultiple}
                            canGoNext={hasMultiple}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export { ConveniosSection }