import './aboutMajorRedSection.css'
import { AboutMajorHeading } from '../atoms/aboutMajorHeading'
import { AboutMajorPharagrap } from '../atoms/aboutMajorPharagrap'

const AboutMajorRedSection = () => {
    const Title= 'Nuestro Legado como Instituto'
    const Description ='Desde nuestros inicios, hemos contruido un camino marcado por logros, aprendisaje y crecimiento constante'

    return (
        <section id='uses' className='majorRed__container'>
            <div className='major__titles'>
                <AboutMajorHeading level={1}>{Title}</AboutMajorHeading>
                    <hr className='line'/>
                <AboutMajorPharagrap>{Description}</AboutMajorPharagrap>
            </div>
        </section>
    )
}

export {AboutMajorRedSection}