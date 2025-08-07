import './ourPlatform.css'
import ImgQ10 from '../../assets/img/Q10.png'
import { Link } from 'react-router-dom'

function OurPlatform (){
    const Description = 'Nuestra plataforma para estudiantes y docentes'
    return (
        <section className='sectionQ10'>
            <p className='description'>{Description}</p>
            <div className='container'>
                <Link to={'https://site2.q10.com/login?ReturnUrl=%2F&aplentId=14592cc7-5820-4c56-a61c-35fdc90579ed'} className="link">
                    <img className='container__img' src={ImgQ10} alt="Imagen plataforma" />
                </Link>
                
            </div>
        </section>
    )
}

export {OurPlatform}