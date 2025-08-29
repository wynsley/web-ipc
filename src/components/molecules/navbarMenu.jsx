import { NavbarLink } from '../atoms/navbarLink'
import './navbarMenu.css'
import { useLocation, useNavigate } from 'react-router-dom'

function NavbarMenu({ open = false, onClose = () => {} }) {
  const location = useLocation()
  const navigate = useNavigate()

  const menu = [
    { text: 'Carreras', href: '/majors' },
    { text: 'Egresados', href: '/graduates' },
    { text: 'Servicios Académicos', href: '/academic-services' },
    { text: 'Nosotros', href: '/about-us' },
    { text: 'Contacto', href: '/contact' },
    { text: 'Admisión', href: '/admission' }
  ]

  const handleClick = (href) => {
    navigate(href)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // 👈 scroll arriba
    onClose()
  }

  return (
    <ul className={`navbar__menu ${open ? "navbar__menu--open" : ""}`}>
      {menu.map((item) => {
        const isActive = location.pathname === item.href

        return (
          <li
            key={item.text}
            className={`navbar__item ${isActive ? "active" : ""}`}
            onClick={() => handleClick(item.href)}
          >
            <NavbarLink text={item.text} href={item.href} />
          </li>
        )
      })}
    </ul>
  )
}

export { NavbarMenu }
