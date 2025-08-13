import './contactPage.css'
import { GuestTemplate } from "../templates/guestTemplate"
import { SectionForm } from "../organisms/contactSectionForm"
import { ContactSchedulesAt } from '../organisms/contactSchedulesAt'
import { ContactGoogleMap } from '../organisms/contactGoogleMaps'

function ContactPage(){
  return (
    <section className='mainContact'>
        <SectionForm/>
        <ContactSchedulesAt/>
        <ContactGoogleMap/>
    </section>
    
  )
}

export { ContactPage }