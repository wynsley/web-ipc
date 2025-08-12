import './contactSectionForm.css'
import { ContactSection } from '../molecules/contactSetion'
import { ContactForm } from "../organisms/contacForm"

const SectionForm =()=> {
    return(
        <section className='sectionc'>   
            <div className='sectionC__container'>
                <ContactSection className='contact-s'/>
            </div>
            <div className='form-cont'>
            <ContactForm />
            </div>
            
        </section>
    )
}

export {SectionForm}