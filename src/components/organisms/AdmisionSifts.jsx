import './AdmisionSifts.css'
import { AdmisionCardSifts } from '../molecules/admisionCardSifts'

import Img1 from '../../assets/img/beca2.png'

const AdmisionSifts = () => {

    const Horarios=[
        {
            src:Img1,
            alt:'Turno Mañana',
            title:'Mañana',
            time: '7:00am 11:50am'
        },

        {
            src:Img1,
            alt:'Turno Tarde',
            title:'Tarde',
            time: '1:00pm 5:50pm'
        },

        {
            src:Img1,
            alt:'Turno Noche',
            title:'Noche',
            time: '6:00pm 10:50pm'
        }
    ];

    const Title = 'MODALIDAD DE ESTUDIO'

    return (

        <section className='section-sifts'>
            <h2 className="titleAdmision mode">{Title}</h2>
            <div className='admisionSifts'>
                {Horarios.map((item, index) =>(
                <AdmisionCardSifts key={index} {...item}/>
            ))}
            </div>
            
        </section>
    )
}

export {AdmisionSifts}