import { useState } from 'react'
import { EventCard } from '../molecules/eventCard'
import { EventNavigationButton } from '../atoms/eventNavigationButton'
import { FaChevronLeft, FaChevronRight, FaCalendarCheck} from 'react-icons/fa6'
import useCarousel from '../../hooks/useCarousel'
import './eventsSection.css'

// Datos de eventos organizados (fácil CRUD) con diferentes estados
const eventsData = [
    {
        id: 1,
        title: "Aniversario del Instituto",
        description: "Celebramos 18 años formando profesionales de excelencia. Una semana completa de actividades, ceremonias, concursos y reconocimientos a nuestra comunidad educativa.",
        date: "2025-06-02",
        time: "08:00 AM - 06:00 PM", 
        location: "Todo el Instituto",
        image: "/src/assets/img/infraestructura.png",
        status: "upcoming", // PRÓXIMO
        category: "institucional",
        featured: true
    },
    {
        id: 2,
        title: "Feria Tecnológica 2025",
        description: "Los estudiantes de Computación e Informática presentan sus proyectos innovadores. Una oportunidad única para conocer las últimas tendencias tecnológicas.",
        date: "2025-08-15",
        time: "08:00 AM - 06:00 PM",
        location: "Laboratorios de Computación",
        image: "/src/assets/img/seervicios4.jpg",
        status: "ongoing", // EN CURSO
        category: "academico"
    },
    {
        id: 3,
        title: "Ceremonia de Graduación",
        description: "Ceremonia de graduación para las promociones 2024. Un momento especial donde nuestros estudiantes reciben su título profesional.",
        date: "2025-12-20",
        time: "10:00 AM - 01:00 PM",
        location: "Auditorio Principal",
        image: "/src/assets/img/servivios2.jpg",
        status: "finished", // FINALIZADO
        category: "graduacion"
    },
    {
        id: 4,
        title: "Cursos de Inglés",
        description: "Iniciamos nuevos cursos de inglés para estudiantes y público en general. Diferentes niveles disponibles con certificación internacional.",
        date: "2025-02-01",
        time: "06:00 PM - 08:00 PM",
        location: "Aulas de Idiomas",
        image: "/src/assets/img/infraestructura.png",
        status: "upcoming", // PRÓXIMO
        category: "cursos"
    },
    {
        id: 5,
        title: "Festival Cultural",
        description: "Festival anual de arte, música y cultura donde nuestros estudiantes muestran sus talentos artísticos y celebramos la diversidad cultural.",
        date: "2025-09-10",
        time: "02:00 PM - 08:00 PM",
        location: "Patio Central",
        image: "/src/assets/img/seervicios4.jpg",
        status: "ongoing", // EN CURSO
        category: "cultural"
    }
]

/**
 * Sección de eventos
 * @param {string} title - Título de la sección
 * @param {string} subtitle - Subtítulo de la sección
 * @param {string} className - Clases CSS adicionales
 */
const EventsSection = ({ 
    title = "Eventos",
    subtitle = "Mantente informado sobre nuestros próximos eventos, ceremonias y actividades especiales del Instituto Privado Celendín.",
    className = '' 
}) => {
    const [isUserInteracting, setIsUserInteracting] = useState(false)

    // Usar el hook existente useCarousel
    const {
        currentItem: activeEvent,
        hasMultiple,
        goToNext,
        goToPrev,
        pause,
        play,
        isPlaying
    } = useCarousel(eventsData, 8000, true) // 8 segundos por evento

    const handleEventClick = (event) => {
        pause() 
        console.log('Evento seleccionado:', event)

        setTimeout(() => play(), 3000)
    }

    // Manejar controles de navegación
    const handleControlClick = (action) => {
        pause() 
        action()
        setTimeout(() => play(), 5000) // Reanudar después de 5 segundos
    }

    // Manejar hover/touch para pausar carrusel
    const handleMouseEnter = () => {
        if (!isUserInteracting) {
            setIsUserInteracting(true)
            pause()
        }
    }

    const handleMouseLeave = () => {
        if (isUserInteracting) {
            setIsUserInteracting(false)
            play()
        }
    }

    const handleTouchStart = () => {
        setIsUserInteracting(true)
        pause()
    }

    const handleTouchEnd = () => {
        // Esperar un poco antes de reanudar para que termine la interacción
        setTimeout(() => {
            setIsUserInteracting(false)
            play()
        }, 1000)
    }

    // Estado vacío
    if (!eventsData || eventsData.length === 0) {
        return (
            <section className={`events ${className}`}>
                <div className="events__container">
                    <div className="events__empty">
                        <FaCalendarCheck className="events__empty-icon" />
                        <h3 className="events__empty-title">No hay eventos disponibles</h3>
                        <p className="events__empty-message">
                            Pronto tendremos nuevos eventos para ti.
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    // Verificar si hay evento activo
    if (!activeEvent) {
        return null
    }

    return (
        <section className={`events ${className}`}>
            <div className="events__container">
                {/* Header */}
                <header className="events__header">
                    <h2 className="events__title">{title}</h2>
                    <p className="events__subtitle">{subtitle}</p>
                </header>

                {/* Carrusel */}
                <div 
                    className="events__carousel"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Indicador de estado */}
                    <div className={`events__status-indicator ${isPlaying && !isUserInteracting ? 'events__status-indicator--playing' : 'events__status-indicator--paused'}`} />
                    
                    {/* Área de información principal */}
                    <div className="events__info">
                        <EventCard
                            event={activeEvent}
                            onClick={() => handleEventClick(activeEvent)}
                            featured={activeEvent.featured}
                            className="events__active-card"
                        />
                    </div>

                    {/* Controles de navegación - solo mostrar si hay múltiples elementos */}
                    {hasMultiple && (
                        <div className="events__controls">
                            <EventNavigationButton
                                onClick={() => handleControlClick(goToPrev)}
                                direction="prev"
                            >
                                <FaChevronLeft />
                            </EventNavigationButton>
                            
                            <EventNavigationButton
                                onClick={() => handleControlClick(goToNext)}
                                direction="next"
                            >
                                <FaChevronRight />
                            </EventNavigationButton>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export { EventsSection }