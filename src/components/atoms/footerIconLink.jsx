import './footerIconLink.css'

function FooterIconLink({ href, children }) {
    return (
        <a href={href} className="footer__link" target='_blank' rel='noopener noreferrer'>
            {children}
        </a>
    )
}

export { FooterIconLink }