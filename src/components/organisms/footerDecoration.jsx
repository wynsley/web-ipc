import "./footerDecoration.css"

function FooterDecoration () {
    return(
        <div className="footer__decoration">
                {/* particulas decorativas*/}
                <div className="particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
                <div className="footer__decoration-text">
                    Instituto Privado Celendín
                </div>
        </div>
    )
}

export { FooterDecoration }