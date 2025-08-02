import { FooterTitle } from "../atoms/footerTitle";
import "./footerSchedule.css"

const horarios = [
    "Lunes a Viernes",
    
]

const hora = [
    "7:30 AM - 10:50 PM", 
]

function FooterSchedule () {
    return (
        <div className="footer__schedule">
            <FooterTitle className="footer__title footer__title--schedule">
                Horario:
            </FooterTitle>
            <ul className="footer__list footer__list--schedule">
                {horarios.map(( h, i ) =>(
                    <li className="footer__item footer__item--schelude" key={ i }>
                        <a href="#" className="footer__link" title={ hora }>{ h }</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FooterSchedule