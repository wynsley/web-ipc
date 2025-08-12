import {FaPhone ,FaRegEnvelope ,FaLocationDot , FaFacebookF, FaInstagram , FaWhatsapp  } from "react-icons/fa6";
import './contactSetion.css'
import { Link } from "react-router-dom"


const Title = 'CONTÁCTANOS'

const ContactSection = () => {
    const  Contct = [
    {   
        href:'#', 
        icon: <FaPhone/>,
        text: '999 999 999'
    },
    {    
        href:'#',
        icon: <FaRegEnvelope/>, 
        text: 'ipc@gmail.com'
    },
    {
        href:'#', 
        icon: <FaLocationDot/>, 
        text:'Jr. Dos de Mayo 1390-Celendín'
    },
]

const Social = [
    {
        href:'#', 
        icons:<FaFacebookF/> } , 
    {
        href:'#', 
        icons:<FaInstagram/>} , 
    {
        href:'#', 
        icons:<FaWhatsapp/>} , 
]
    return (
        <div className="container__contS">
            <h2 className="contact__title">
                {Title}
            </h2>
            <ul className="cont-menu">
                {
                    Contct.map((cont, idx) => {
                        return (
                        <li key ={idx} className="cont__item"> 
                            <Link  href={cont.href}/>
                            <span className="cont__item__list" >
                                <span className="iconsc"> {cont.icon}</span>
                                <span> {cont.text}</span>
                            </span>
                            <Link/>
                        </li>
                   ) 
                })
                }
            </ul>
            <ul className="cont__social">
                {
                    Social.map((i, index) =>{
                        return (
                        <li key={index} className="social__item">
                            <div className="container__animation">
                                <Link href={i.href} className="link  contLi" >
                                    {i.icons}
                                </Link>
                            </div>
                            
                        </li>
                        )
                    })
                }
            </ul>
           
        </div>
    )
}

export {ContactSection}

