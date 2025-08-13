import './contactSchedulesAt.css'
import { FaLocationDot, } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";

const CardSch = [
    {
        icon: <IoMdTime/>,
        title : 'Ateción al público',
        text:'Lunes - Viernes 6:00am - 11:00pm'
    },
    {
        icon: <FaLocationDot/>,
        title : 'Ubicación',
        text:'Jr. Dos de Mayo 1390, Celendín-Cajamarca'
    },
] 



const ContactSchedulesAt =() =>{
    const Title= 'Horarios de atención'
    return (

        <section className='section-sch'>
            <h2 className='section__title'>{Title}</h2>
            <div>
                {
                    CardSch.map((card, indx) =>{
                       return (
                        
                        <div key={indx} className='sch_list'>
                            <span className='sch__list__icon'>
                                {card.icon}
                            </span> 
                            <div className='container-sch'>
                                <h3>
                                    {card.title}
                                </h3>
                                <p>
                                    {card.text}
                                </p>
                            </div>
                                
                          
                        </div>
                       )
                    })
                }
            </div>
        </section>
    )
}

export {ContactSchedulesAt}