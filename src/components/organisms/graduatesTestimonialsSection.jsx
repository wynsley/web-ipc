/**
 * Componente: GraduatesTestimonialsSection (Organismo)
 * 
 * Propósito:
 * - Sección completa que muestra testimonios de egresados exitosos
 * - Incluye header, estadísticas, grid de testimonios y CTA
 * - Componente principal para mostrar el éxito de los egresados
 * 
 * Uso:
 * - Página principal de egresados
 * - Sección en homepage para mostrar éxito del instituto
 * - Landing pages de admisión
 * 
 * Props:
 * @param {string} title - Título de la sección
 * @param {string} subtitle - Subtítulo descriptivo
 * @param {Array} graduates - Array de datos de egresados
 * @param {Array} stats - Estadísticas de egresados (opcional)
 * @param {Object} cta - Configuración del call to action
 * @param {string} columns - Configuración de columnas del grid
 * @param {string} className - Clases CSS adicionales
 */

import { useState } from 'react'
import PropTypes from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { GraduatesTestimonialGrid } from '../molecules/graduatesTestimonialGrid'
import './graduatesTestimonialsSection.css'

const GraduatesTestimonialsSection = ({
    title = "Nuestros Egresados Exitosos",
    subtitle = "Conoce las historias inspiradoras de nuestros egresados que destacan en el mundo laboral gracias a su formación integral en el Instituto Privado Celendín.",
    graduates = null,
    stats = null,
    cta = null,
    columns = 'three',
    className = ''
}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Datos por defecto de egresados
    const defaultGraduates = [
        {
            id: 1,
            name: "María González",
            career: "Computación e Informática",
            graduationYear: "2020",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            testimonial: "Gracias al Instituto, hoy trabajo como desarrolladora web. La enseñanza práctica fue clave para mi éxito profesional.",
            currentPosition: "Desarrolladora Full Stack",
            company: "TechSolutions",
            featured: true
        },
        {
            id: 2,
            name: "Carlos Mendoza",
            career: "Administración de Empresas",
            graduationYear: "2019",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            testimonial: "La formación integral que recibí me permitió emprender mi propio negocio. Los docentes siempre estuvieron dispuestos a ayudar.",
            currentPosition: "CEO",
            company: "Mendoza Consulting",
            featured: false
        },
        {
            id: 3,
            name: "Ana Rodríguez",
            career: "Contabilidad",
            graduationYear: "2021",
            image: "https://randomuser.me/api/portraits/women/26.jpg",
            testimonial: "El instituto me dio las herramientas necesarias para destacar en mi área. Hoy soy contadora en una empresa multinacional.",
            currentPosition: "Contadora Senior",
            company: "Global Corp",
            featured: false
        },
        {
            id: 4,
            name: "Roberto Silva",
            career: "Traducción de Idiomas",
            graduationYear: "2022",
            image: "https://randomuser.me/api/portraits/men/41.jpg",
            testimonial: "La metodología de enseñanza de idiomas es excelente. Ahora trabajo como intérprete para empresas internacionales.",
            currentPosition: "Intérprete Profesional",
            company: "Language Solutions",
            featured: false
        },
        {
            id: 5,
            name: "Lucía Torres",
            career: "Administración de Empresas",
            graduationYear: "2018",
            image: "https://randomuser.me/api/portraits/women/37.jpg",
            testimonial: "El instituto no solo me formó profesionalmente, sino que también desarrolló mi liderazgo. Hoy dirijo un equipo de 20 personas.",
            currentPosition: "Gerente Regional",
            company: "Retail Max",
            featured: false
        },
        {
            id: 6,
            name: "Diego Vásquez",
            career: "Computación e Informática", 
            graduationYear: "2020",
            image: "https://randomuser.me/api/portraits/men/28.jpg",
            testimonial: "Los proyectos prácticos que realizamos fueron fundamentales. Ahora desarrollo aplicaciones móviles para startups.",
            currentPosition: "Mobile Developer",
            company: "AppInnovate",
            featured: false
        }
    ]

    // Estadísticas por defecto
    const defaultStats = [
        { number: "10,000+", label: "Egresados exitosos" },
        { number: "95%", label: "Empleabilidad" },
        { number: "18", label: "Años de experiencia" },
        { number: "4", label: "Carreras profesionales" }
    ]

    // CTA por defecto
    const defaultCta = {
        title: "¿Quieres ser el próximo egresado exitoso?",
        text: "Únete a nuestra comunidad de profesionales exitosos. Descubre nuestras carreras y comienza tu camino hacia el éxito.",
        buttonText: "Conoce nuestras carreras",
        buttonLink: "/majors"
    }

    // Usar datos personalizados o por defecto
    const graduatesData = graduates || defaultGraduates
    const statsData = stats || defaultStats  
    const ctaData = cta || defaultCta

    // Manejar click en testimonio
    const handleGraduateClick = (graduate) => {
        console.log('Egresado seleccionado:', graduate)
        // Aquí podrías abrir un modal, navegar a perfil, etc.
    }

    // Manejar click en CTA
    const handleCtaClick = () => {
        if (ctaData.buttonLink) {
            window.location.href = ctaData.buttonLink
        }
    }

    // Manejar retry en caso de error
    const handleRetry = () => {
        setError(null)
        setLoading(true)
        
        // Simular recarga de datos
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const sectionClassName = `graduates-testimonials-section ${className}`.trim()

    // Renderizar estado de error
    if (error) {
        return (
            <section className={sectionClassName}>
                <div className="graduates-testimonials-section__container">
                    <div className="graduates-testimonials-section__error">
                        <h3 className="graduates-testimonials-section__error-title">
                            Error al cargar testimonios
                        </h3>
                        <p>{error}</p>
                        <button 
                            className="graduates-testimonials-section__error-button"
                            onClick={handleRetry}
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
            <div className="graduates-testimonials-section__container">
                {/* Header de la sección */}
                <header className="graduates-testimonials-section__header">
                    <h2 className="graduates-testimonials-section__title">
                        {title}
                    </h2>
                    <p className="graduates-testimonials-section__subtitle">
                        {subtitle}
                    </p>
                </header>

                {/* Contenido principal */}
                <div className="graduates-testimonials-section__content">
                    {/* Grid de testimonios */}
                    <div className="graduates-testimonials-section__grid">
                        <GraduatesTestimonialGrid
                            graduates={graduatesData}
                            columns={columns}
                            onGraduateClick={handleGraduateClick}
                            loading={loading}
                        />
                    </div>

                    {/* Estadísticas */}
                    {statsData && statsData.length > 0 && (
                        <div className="graduates-testimonials-section__stats">
                            {statsData.map((stat, index) => (
                                <div key={index} className="graduates-testimonials-section__stat">
                                    <span className="graduates-testimonials-section__stat-number">
                                        {stat.number}
                                    </span>
                                    <p className="graduates-testimonials-section__stat-label">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Call to Action */}
                    {ctaData && (
                        <div className="graduates-testimonials-section__cta">
                            <h3 className="graduates-testimonials-section__cta-title">
                                {ctaData.title}
                            </h3>
                            <p className="graduates-testimonials-section__cta-text">
                                {ctaData.text}
                            </p>
                            <button 
                                className="graduates-testimonials-section__cta-button"
                                onClick={handleCtaClick}
                            >
                                <span>{ctaData.buttonText}</span>
                                <FaExternalLinkAlt />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

// Definición de PropTypes
GraduatesTestimonialsSection.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    graduates: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            career: PropTypes.string.isRequired,
            graduationYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            image: PropTypes.string,
            testimonial: PropTypes.string.isRequired,
            currentPosition: PropTypes.string,
            company: PropTypes.string,
            featured: PropTypes.bool
        })
    ),
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    cta: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        buttonText: PropTypes.string.isRequired,
        buttonLink: PropTypes.string
    }),
    columns: PropTypes.oneOf(['auto', 'two', 'three', 'four']),
    className: PropTypes.string
}

export { GraduatesTestimonialsSection }