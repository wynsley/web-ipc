import { useState } from 'react'
import './homeInstituteSection.css'
import { ExpandToggleButton } from '../atoms/expandToggleButton'
import InfraestructuraImg from '../../assets/img/InfraestructuraIPC.jpg'

const HomeInstituteSection = () => {
    const [isTextExpanded, setIsTextExpanded] = useState(false)

    const handleTextToggle = () => {
        setIsTextExpanded(prev => !prev)
    }

    const mainText = "Somos una institución educativa comprometida con la excelencia académica y la formación integral de nuestros estudiantes. Con más de 18 años de experiencia, ofrecemos carreras técnicas de alta calidad que preparan a los profesionales del futuro."

    const expandedText = "Nuestras modernas instalaciones, docentes especializados y metodología innovadora nos posicionan como líderes en educación técnica superior. Formamos profesionales competitivos que contribuyen al desarrollo de nuestra región y país."

    return (
        <section className="home__institute__section">
            <div className="home__institute__container">
                <div className="home__institute__content">
                    <div className="home__institute__text__area">
                        <p className="home__institute__main__text">
                            {mainText}
                        </p>
                        <div className={`home__institute__expandable-text ${isTextExpanded ? 'home__institute__text-visible' : 'home__institute__text-hidden'}`}
                                style={{
                                maxHeight: isTextExpanded ? '500px' : '0',
                                opacity: isTextExpanded ? 1 : 0
                            }}
                        >
                            <p className="home__institute__additional-text">
                                {expandedText}
                            </p>
                        </div>
                        <ExpandToggleButton 
                            isExpanded={isTextExpanded}
                            onClick={handleTextToggle}
                        />
                    </div>
                    <div className="home__institute__image__wrapper">
                        <img 
                            src={InfraestructuraImg} 
                            alt="Infraestructura del Instituto Privado Celendín"
                            className="home__institute__main-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export { HomeInstituteSection }