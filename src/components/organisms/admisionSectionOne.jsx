import './admisionSectionOne.css'
import { GiArchiveRegister, GiGraduateCap  } from "react-icons/gi";



function AdmisionSectionOne () {

    const Title= 'ADMISIÓN'
    let Anio = '2025'
    const Description = 'Tu camino hacia adelante se traza desafiando lo que crees que es importante para ti.'
    return (

        <section className='sectionAdmision'>
          
            <GiGraduateCap className='graduateIcon'/>
            
            <h2 className='title1'>
                {Title} <span>{Anio}</span>
            </h2>
            <div className='admision__Container'>
                <GiArchiveRegister  className='libraryicon'/>    
                <p>
                {Description}
                </p>
                <GiArchiveRegister className='libraryicon'/>
            </div>
            
        </section>
    )
}

export {AdmisionSectionOne}