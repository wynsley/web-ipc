import './contactPage.css'
import { GuestTemplate } from "../templates/guestTemplate"
import { SectionForm } from "../organisms/contactSectionForm"
import { ContactSchedulesAt } from '../organisms/contactSchedulesAt'
function ContactPage(){
  return (
    <section className='mainContact'>
        <SectionForm/>
        <ContactSchedulesAt/>
    </section>
    
  )
}

export { ContactPage }