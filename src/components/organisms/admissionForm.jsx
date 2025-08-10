import './admissionForm.css'
import { ContactForm } from './contacForm'


const SectionForm = () =>{
    const Title1 = '¿Qué esperas?'
    const Title2 = '¡Regístrate yá!'


    return (
        <section className='sectionForm'>
            <div className='container__form'>
                <p className='register-title interogation'>{Title1}</p>
                <p className='register-title exclamation'>{Title2}</p>
                <img className='register__now' src="" alt="Register now" />
            </div>
            <ContactForm/>
        
        </section>
    )
}

export {SectionForm 

}