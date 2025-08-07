import { HomeButton } from '../molecules/homeButton'
import { NavbarMenu } from '../molecules/navbarMenu'
import './navbar.css'

function Navbar() { 
  return(
    <nav className='navbar'>
      <HomeButton />
      <NavbarMenu />
    </nav>
  )
}

export { Navbar }
