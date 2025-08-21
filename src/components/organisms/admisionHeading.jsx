import './admisionHeading.css'
import { GiArchiveRegister, GiGraduateCap  } from "react-icons/gi";



function AdmisionHeading () {

    const Title= 'ADMISIONES'
    const Description = 'Tu camino hacia adelante se traza desafiando lo que crees que es importante para ti.'
    return (

        <section className='sectionAdmision'>
          
            <GiGraduateCap className='graduateIcon'/>
            
            <h2 className='heading-title'>
                {Title} 
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

export {AdmisionHeading}