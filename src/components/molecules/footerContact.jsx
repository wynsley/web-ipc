import { FooterIconLink } from "../atoms/footerIconLink";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaFileSignature, FaLocationDot, FaPhone } from "react-icons/fa6";
import "./footerContact.css"

const redes = [
    {href:"#", icon: <FaFacebookF /> },
    {href:"#", icon: <FaInstagram /> },
    {href:"#", icon: <FaXTwitter /> },
    {href:"#", icon: <FaYoutube /> },
]

const contactos = [
    {href: "#", icon: <FaFileSignature />, texto: "Postula a IPC" },
    {href: "#", icon: <FaLocationDot />, texto: "Ubicación" },
    {href: "#", icon: <FaPhone />, texto: "Teléfono" },
]

function FooterRedesContacto () {
    return (
        <div className="footer__networks-contact">
            <div className="footer__networks">
                <ul className="footer__networks-list">
                    {redes.map((red, i) =>(
                        <li key={i}>
                            <a href="#" className="footer__networks-link">
                                {red.icon}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="footer__contact">
                <ul className="footer__contact-list">
                    {contactos.map((contacto, i) =>(
                        <li key={i} className="footer__list__icons">
                            <FooterIconLink href={contacto.href} className="footer__contact-link">
                                {contacto.icon} {contacto.texto}
                            </FooterIconLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FooterRedesContacto