import { FooterTitle } from "../atoms/footerTitle";
import "./footerCareers.css"

const carreras =[
    "Computacón e Informática",
    "Administración de Empresas",
    "Contabilidad",
    "Traducción de Idiomas",    
]

function FooterCarreras () {
    return (
        <div className="footer__careers">
                <FooterTitle className="footer__title">Carreras:</FooterTitle>
                <ul className="footer__list">
                    {carreras.map((carreras, i) =>(
                        <li className="footer__item" key={i}>
                            <a href="#" className="footer__link footer__link--careers">{carreras}</a>
                        </li>
                    ))}
                </ul>
        </div>
    )
};

export default FooterCarreras