import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import './navbarLink.css'

function NavbarLink ({ text, href, onClick }) {
  return (
    <Link to={href} className="link" onClick={onClick}>
      {text}
    </Link>
  )
}

Link.prototype = {
  text: PropTypes.string,
  href: PropTypes.string
}

export { NavbarLink }
