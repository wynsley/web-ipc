import './homeInstituteSection.css'
import InfraestructuraImg from '../../assets/img/InfraestructuraIPC.jpg'
import React from 'react'

const HomeInstituteSection = () => {

    const mainText = (
        <>
            Somos una institución educativa comprometida con la excelencia académica y la formación integral de nuestros estudiantes. Con más de 18 años de experiencia, ofrecemos carreras técnicas de alta calidad que preparan a los profesionales del futuro. 
            <br />
            <br />
            Nuestras modernas instalaciones, docentes especializados y metodología innovadora nos posicionan como líderes en educación técnica superior. Formamos profesionales competitivos que contribuyen al desarrollo de nuestra región y país.
        </>
    )

    return (
        <section className="home__institute__section">
            <div className="home__institute__container">
                <div className="home__institute__content">
                    <div className="home__institute__text__area">
                        <p className="home__institute__main__text">
                            {mainText}
                        </p>
                        <div className= "home__institute__expandable-text">
                        </div>
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