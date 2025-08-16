import { useState } from 'react'
import { WhyChooseUsFeature } from '../molecules/whyChooseUsFeature'
import { FaCalendarCheck, FaStar, FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa'
import './whyChooseUsSection.css'

/**
 * Sección "Por qué elegirnos" - Organismo
 * @param {Array} features - Array de características personalizado (opcional)
 * @param {string} className - Clases CSS adicionales
 */
const WhyChooseUsSection = ({ 
    features = null,
    className = '' 
}) => {
    const [error, setError] = useState(null)

    // Datos por defecto de las características con navegación
    const defaultFeatures = [
        {
            id: 'plan-estudios',
            icon: <FaCalendarCheck />,
            title: 'Plan de estudios',
            description: 'Acorde al mercado laboral',
            linkTo: '/majors', // → Página de carreras
            highlighted: false
        },
        {
            id: 'experiencia',
            icon: <FaStar />,
            title: 'Más de 18 años',
            description: 'De experiencia desarrollando profesionales',
            linkTo: '/about-us', // → Página nosotros
            highlighted: true // Destacado como en tu diseño
        },
        {
            id: 'clases-presenciales',
            icon: <FaChalkboardTeacher />,
            title: 'Clases 100% presenciales',
            description: 'Aprendizaje directo y personalizado',
            linkTo: '/academic-services', // → Servicios académicos
            highlighted: false
        },
        {
            id: 'egresados',
            icon: <FaGraduationCap />,
            title: '+de 10mil egresados',
            description: 'Profesionales exitosos en el mercado',
            linkTo: '/graduates', // → Página de egresados
            highlighted: false
        }
    ]

    // Usar características personalizadas o las por defecto
    const featuresData = features || defaultFeatures

    const sectionClassName = `
        why-choose-section 
        ${className}
    `.trim()

    if (error) {
        return (
            <section className={sectionClassName}>
                <div className="why-choose-section__container">
                    <div className="why-choose-section__error">
                        <h3>Error</h3>
                        <p>{error}</p>
                        <button 
                            onClick={() => setError(null)}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--anaranjado-fuerte)',
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
            <div className="why-choose-section__container">
                {/* Header */}
                <header className="why-choose-section__header">
                    <h2 className="why-choose-section__title">
                        <span className="why-choose-section__title--orange">¿POR QUÉ </span>
                        <span className="why-choose-section__title--blue">ELEGIRNOS?</span>
                    </h2>
                </header>
                
                {/* Contenido principal */}
                <div className="why-choose-section__content">
                        <div className="why-choose-section__features">
                            {featuresData.map((feature, index) => (
                                <WhyChooseUsFeature
                                    key={feature.id || index}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                    linkTo={feature.linkTo}
                                    highlighted={feature.highlighted}
                                    onClick={feature.onClick}
                                />
                            ))}
                        </div>
                </div>
            </div>
        </section>
    )
}

export { WhyChooseUsSection }