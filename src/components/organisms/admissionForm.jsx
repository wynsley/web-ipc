import './admissionForm.css'
import { ContactForm } from './contacForm'
import imgRegister from '../../assets/img/imgRegistro.png'


const SectionForm = () =>{
    const Title1 = '¿Qué esperas?'
    const Title2 = '¡Regístrate yá!'


    return (
        <section className='sectionForm ' id='admisionForm'>
            <div className='container__form'>
                <div className='titlesR'>
                    <p className='register-title interrogation'>{Title1}</p>
                    <p className='register-title exclamation'>{Title2}</p>
                </div>
                <img className='img__register-now' src={imgRegister} alt="Register now" />
            </div>
            <ContactForm/>
        
        </section>
    )
}

export {SectionForm 

}