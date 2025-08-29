import './admissionAdvertising.css'
import { AdvertisingButton } from '../atoms/admissionAdvertisingButton'
import { AdvertisingInfoCard } from '../molecules/admissionAdvertisingInfo'
import { AdvertisingCarousel } from '../organisms/admissionAdvertisingCarousel'

const AdmissionAdvertising = () =>{

    const Carerrs = ['Administración de Empresas', 'Contabilidad', 'Computación e Informática', 'Traducción de Idiomas']
    const Turnos =['Mañana', 'Tarde', 'Noche']

    const InfoItems =[
        'Tu Futuro Comienza Aquí',
        'Elige tu Camino Profesional',
        'Construye tu Carrera con Nosotros',
        'Formación para tu Éxito'
    ]

    const Images =[
        'https://www.shutterstock.com/image-vector/school-admission-social-media-post-600nw-2628032041.jpg',
        'https://st2.depositphotos.com/1218550/8133/v/450/depositphotos_81338696-stock-illustration-school-admission-people-isometric.jpg',
        'https://st4.depositphotos.com/14431644/21804/i/450/depositphotos_218046510-stock-illustration-word-writing-text-exams-business.jpg'
    ]

    return (
        <section className='Admission-template'>
            <div className='Admission__content-left'>
                <div className='dropdows'>
                    <AdvertisingButton text='Carreras Profesionales' options={Carerrs}/>
                    <AdvertisingButton text='Modalidades de Estudio' options={Turnos}/>
                </div>
                <AdvertisingInfoCard
                    title='¿Qué esperas?'
                    items={InfoItems}
                    inscriptionText='Inscripciones abiertas del 10 de Enero al 10 de Febrero'
                    examentext='Examen de admisión 12 de Febrero'
                />
            </div>
            <div className='admission_content-right'>
                <AdvertisingCarousel images={Images}/>
            </div>


        </section>
    )

}

export {AdmissionAdvertising}