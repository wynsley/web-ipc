import './servicesAdmission.css'
import { ContactForm } from './contacForm'
import ImgAdmision from '../../assets/img/admision.jpg'

const ServicesAdmission = () => {
    const Title= 'ADMISIÓN'
    return (
        <section className='section--Admision'>
            <h2 className='servicesTitle admision'>{Title}</h2>
            <div className='container__admisionS'>
                <img className='container__admision__img' src={ImgAdmision} alt="Imgagen admision" />
                <ContactForm/>
            </div>
        </section>
    )
}

export {ServicesAdmission}