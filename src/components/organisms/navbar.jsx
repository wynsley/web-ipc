import { HomeButton } from '../molecules/homeButton'
import { NavbarMenu } from '../molecules/navbarMenu'
import './navbar.css'

function Navbar() { 
  return(
    <nav>
      <HomeButton />
      <NavbarMenu />
    </nav>
  )
}

export { Navbar }
