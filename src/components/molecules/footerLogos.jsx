import FooterLogo from "../atoms/footerLogo.jsx";
import LogoIPC from "../../assets/img/LogoIPC.png";
import LogoQ10 from "../../assets/img/Q10.png";
import "./footerLogos.css";

function FooterLogos() {
    return (
        <div className="footer__logos">
            <FooterLogo src={LogoIPC} alt="Logo IPC" ClassName="footer__logo" />
            <a href="https://site2.q10.com/login?ReturnUrl=%2F" target="_blanck" className="footer__logo__link">
                <FooterLogo src={LogoQ10} alt="Logo Q10" ClassName="footer__logo footer__logo--q10" />
            </a>
            <p className="footer__text">Plataforma Q10</p>
        </div>
    )
}

export default FooterLogos;