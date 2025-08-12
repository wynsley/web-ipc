import { NavbarLink } from '../atoms/navbarLink'
import './navbarMenu.css'

function NavbarMenu({ open = false, onClose = () => {} }) {
  const menu = [
    {
      text: 'Carreras',
      href: '/majors'
    },
    {
      text: 'Egresados',
      href: '/graduates'
    },
    {
      text: 'Servicios Académicos',
      href: '/academic-services'
    },
    {
      text: 'Nosotros',
      href: '/about-us'
    },
    {
      text: 'Contacto',
      href: '/contact'
    },
    {
      text: 'Admisión',
      href: '/admission'
    }
  ]

  return(
    <ul className={`navbar__menu ${ open ? "navbar__menu--open" : ""}`}>
        {
          menu.map(
            (item) => {
              return(
                <li key={item.text} className='navbar__item'>
                  <NavbarLink text={item.text} href={item.href}  onClick={onClose} />
                </li>
              )
            }
          )
        }
      </ul>
  )
}

export { NavbarMenu }
