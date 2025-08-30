import { ContactForm } from '../organisms/contacForm'
import { FaUserGraduate, FaCheckCircle, FaClock, FaComments } from 'react-icons/fa'
import Beca1 from '../../assets/img/beca1.png'
import './careerContactSection.css'

/**
 * @param {string} title - Título principal
 * @param {string} subtitle - Subtítulo
 * @param {string} imageSrc - URL de la imagen
 * @param {string} imageAlt - Texto alternativo de la imagen
 * @param {string} imageBadgeText - Texto del badge en la imagen
 * @param {string} imageTitle - Título bajo la imagen
 * @param {string} imageDescription - Descripción bajo la imagen
 * @param {Array} benefits - Array de beneficios personalizados
 * @param {string} className - Clases CSS adicionales
 */
const CareerContactSection = ({
    title = "¿Necesitas orientación?",
    subtitle = "Nuestros asesores académicos están listos para ayudarte a elegir la carrera perfecta según tus intereses y proyección profesional.",
    imageAlt = "Asesor académico del Instituto Privado Celendín",
    imageBadgeText = "Gratuito",
    imageTitle = "Asesoría Personalizada",
    imageDescription = "Recibe orientación vocacional de nuestros expertos en educación técnica superior.",
    benefits = null,
    className = ''
}) => {
    // Beneficios por defecto de la asesoría
    const defaultBenefits = [
        {
            icon: <FaUserGraduate />,
            text: "Orientación vocacional profesional"
        },
        {
            icon: <FaCheckCircle />,
            text: "Información detallada de carreras"
        },
        {
            icon: <FaClock />,
            text: "Horarios y modalidades flexibles"
        },
        {
            icon: <FaComments />,
            text: "Resolución de todas tus dudas"
        }
    ]

    const benefitsData = benefits || defaultBenefits

    return (
        <section className={`career-contact ${className}`}>
            <div className="career-contact__container">
                {/* Header */}
                <header className="career-contact__header">
                    <h2 className="career-contact__title">{title}</h2>
                    <p className="career-contact__subtitle">{subtitle}</p>
                </header>

                {/* Contenido principal */}
                <div className="career-contact__content">
                    {/* Área de imagen y beneficios */}
                    <div className="career-contact__image-section">
                        <div className="career-contact__image-wrapper">
                            <div className="career-contact__image-badge">
                                {imageBadgeText}
                            </div>
                            <img 
                                src={Beca1}
                                alt={imageAlt}
                                className="career-contact__image"
                                loading="lazy"
                            />
                        </div>
                        
                        <div className="career-contact__image-text">
                            <h3 className="career-contact__image-title">
                                {imageTitle}
                            </h3>
                            <p className="career-contact__image-description">
                                {imageDescription}
                            </p>
                        </div>

                        {/* Lista de beneficios */}
                        <div className="career-contact__benefits">
                            <h4 className="career-contact__benefits-title">
                                ¿Qué incluye nuestra asesoría?
                            </h4>
                            <ul className="career-contact__benefits-list">
                                {benefitsData.map((benefit, index) => (
                                    <li key={index} className="career-contact__benefit-item">
                                        <span className="career-contact__benefit-icon">
                                            {benefit.icon}
                                        </span>
                                        {benefit.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Área del formulario original */}
                    <div className="career-contact__form-section">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export { CareerContactSection }