import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import './navbarLink.css'

function NavbarLink ({ text, href }) {
  return (
    <Link to={href} className="link">
      {text}
    </Link>
  )
}

Link.prototype = {
  text: PropTypes.string,
  href: PropTypes.string
}

export { NavbarLink }
