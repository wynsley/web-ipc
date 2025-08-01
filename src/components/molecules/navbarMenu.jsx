import { NavbarLink } from '../atoms/navbarLink'
import './navbarMenu.css'

function NavbarMenu(){
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
    <ul className='navbar__menu'>
        {
          menu.map(
            (item) => {
              return(
                <li key={item.text} className='navbar__item'>
                  <NavbarLink text={item.text} href={item.href} />
                </li>
              )
            }
          )
        }
      </ul>
  )
}

export { NavbarMenu }
