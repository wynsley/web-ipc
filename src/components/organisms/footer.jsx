import FooterLogos from "../molecules/footerLogos.jsx";
import FooterCarreras from "../molecules/footerCareers.jsx";
import FooterSchedule from "../molecules/footerSchedule.jsx";
import FooterRedesContacto from "../molecules/footerContact.jsx";
import  "./footer.css"

function Footer(){
    return (

        <footer className="footer">
            <section className="footer__content">
                <div className="footer__information">
                    <div className="footer__content-bottom">
                        <FooterLogos />
                        <FooterCarreras />
                        <FooterSchedule />
                        <FooterRedesContacto />
                    </div>
                </div>
                <hr className="footer__line" />
                <div className="footer__copyright">
                    <div className="footer__copyright--text">
                        <small className="footer__copyright--small">
                            &copy; 2025 Instituto Privado Celendín | Todos los derechos reservados.
                        </small>
                    </div>
                    <div className="footer__developers">
                        <small className="footer__developers--small">
                            Desarrollado por:
                            <a href="https://despliegueportafolio.vercel.app/" className="footer__developers-link footer__developers-link--1" target="_blank"> Yerson Fustamante  </a>
                            <a href="https://wynsley.neocities.org/MyPortfolio/" className="footer__developers-link footer__developers-link--2" target="_blank">  Wynsley Durán </a>
                        </small>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export { Footer }