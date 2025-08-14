import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CareersGrid } from '../molecules/careersGrid'
import './careersSection.css'

// Importar las imágenes (ajusta las rutas según tu estructura)
import ComputacionImg from '../../assets/img/circuitos.jpg'
import AdministracionImg from '../../assets/img/Administracion.jpg'
import ContabilidadImg from '../../assets/img/contabilidad.jpg'
import TraduccionImg from '../../assets/img/traduccion.jpeg'

/**
 * Sección de carreras - Organismo
 * @param {string} title - Título de la sección
 * @param {string} subtitle - Subtítulo de la sección
 * @param {string} columns - Número de columnas para el grid
 * @param {boolean} showHeader - Mostrar o no el header
 * @param {string} className - Clases CSS adicionales
 */
const CareersSection = ({ 
    title = "Carreras de Estudios",
    subtitle = "Descubre nuestras carreras técnicas diseñadas para formar profesionales competitivos y preparados para los desafíos del futuro.",
    columns = 'four',
    showHeader = true,
    className = '' 
}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Datos de las carreras
    const careers = [
        {
            id: 'computacion-informatica',
            title: 'Computación e Informática',
            description: 'Formate como profesional en el mundo de la tecnología. Aprende programación, desarrollo de sistemas, redes y administración de bases de datos con herramientas modernas y metodologías actuales.',
            backgroundImage: ComputacionImg
        },
        {
            id: 'administracion-empresas',
            title: 'Administración de Empresas',
            description: 'Desarrolla habilidades gerenciales y empresariales. Aprende sobre gestión de recursos humanos, marketing, finanzas y liderazgo para dirigir organizaciones exitosas.',
            backgroundImage: AdministracionImg
        },
        {
            id: 'contabilidad',
            title: 'Contabilidad',
            description: 'Conviértete en un experto en el manejo financiero y contable. Domina las normas contables, tributación, auditoría y análisis financiero para empresas de todos los tamaños.',
            backgroundImage: ContabilidadImg
        },
        {
            id: 'traduccion-idiomas',
            title: 'Traducción de Idiomas',
            description: 'Domina múltiples idiomas y conviértete en un puente de comunicación global. Especialízate en traducción técnica, literaria y comercial con certificación internacional.',
            backgroundImage: TraduccionImg
        }
    ]

    const handleCareerClick = async (career) => {
        try {
            setIsLoading(true)
            setError(null)
            
            // Simular un pequeño delay para mejor UX
            await new Promise(resolve => setTimeout(resolve, 200))
            
            // Navegar a la página de carreras
            navigate('/majors', { 
                state: { 
                    selectedCareer: career.id,
                    fromSection: 'careers-section'
                } 
            })
        } catch (err) {
            setError('Error al navegar a la carrera seleccionada')
            console.error('Error navegando a carrera:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const sectionClassName = `
        careers-section 
        ${isLoading ? 'careers-section--loading' : ''} 
        ${className}
    `.trim()

    if (error) {
        return (
            <section className={sectionClassName}>
                <div className="careers-section__container">
                    <div className="careers-section__error">
                        <h3>Error</h3>
                        <p>{error}</p>
                        <button 
                            onClick={() => setError(null)}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--anaranjado, #ff6600)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.25rem',
                                cursor: 'pointer'
                            }}
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
            <div className="careers-section__container">
                {showHeader && (
                    <header className="careers-section__header">
                        <h2 className="careers-section__title">
                            {title}
                        </h2>
                        <p className="careers-section__subtitle">
                            {subtitle}
                        </p>
                    </header>
                )}
                
                <div className="careers-section__content">
                    {isLoading ? (
                        <div className="careers-section__loading">
                            <p>Cargando carreras...</p>
                        </div>
                    ) : (
                        <div className="careers-section__grid">
                            <CareersGrid
                                careers={careers}
                                onCareerClick={handleCareerClick}
                                columns={columns}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export { CareersSection }