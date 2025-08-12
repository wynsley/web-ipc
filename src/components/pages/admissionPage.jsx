
import './admisionPage.css'
import { AdmisionSectionOne } from "../organisms/admisionSectionOne"
import { InfraestructuraIPC } from "../organisms/admisionSectionIPC"
import { AdmissionRequirements } from "../organisms/admisionRequirements"
import { SectionForm } from "../organisms/admissionForm"
import { AdmisionSifts } from "../organisms/AdmisionSifts"






function AdmissionPage(){
  return (
        <>
        <section className="section__carousel">
           
        </section>
        <AdmisionSectionOne/>
        <InfraestructuraIPC/>
        <h2 className="titleAdmision careers">Explora las carreras disponibles que tenemos para ti</h2>
        <AdmissionRequirements/>
        <AdmisionSifts/>
        <SectionForm/>
      </>


                        
    
  )
}

export { AdmissionPage }