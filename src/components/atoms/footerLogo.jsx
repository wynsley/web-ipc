import './footerLogo.css'

function FooterLogo({ src, alt, ClassName }) {
    return(
        <img src={src} alt={alt} className={ClassName} />
    )
};

export default FooterLogo;