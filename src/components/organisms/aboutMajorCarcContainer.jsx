import './aboutMajorCarcContainer.css'
import { AboutMajorCard } from '../molecules/aboutMajorCard'

const AboutMajorCarcContainer= () =>{
    const MajorCards = [
        {
            title: 'Migel Aliaga',
            text :'Maestro de Computación'
        },
        {
            title: 'Emily Cabos',
            text :'Investigación'
        },
        {
            title: 'Rosa Diaz',
            text :'Comunicación'
        },
        {
            title: 'Ulises ',
            text :'Administracción'
        },
    ]


    return (
        <section id='about' className='majorCard__container'>
            {
                MajorCards.map((w, j) =>{
                    return(
                        <AboutMajorCard key={j} title={w.title} text={w.text} />
                    )
                })
            }
        </section>
    )  
}

export {AboutMajorCarcContainer}