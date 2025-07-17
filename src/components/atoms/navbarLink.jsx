import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

function NavbarLink ({ text, href }) {
  return (
    <Link to={href}>
      {text}
    </Link>
  )
}

Link.prototype = {
  text: PropTypes.string,
  href: PropTypes.string
}

export { NavbarLink }
