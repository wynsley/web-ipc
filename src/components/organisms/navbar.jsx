import { HomeButton } from '../molecules/homeButton'
import { NavbarMenu } from '../molecules/navbarMenu'
import { HamburgerButton } from '../atoms/hamburgerButton'
import './navbar.css'
import { useState } from 'react'

function Navbar() { 
  const [ open, setOpen] = useState(false)

  const hadleToggle = ()  => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false)

  return(
    <nav className='navbar'>
      <HomeButton />
      <HamburgerButton open= { open } toggle={hadleToggle} className="navbar__hamburger" />
      {open && <div className='navbar__overlay' onClick={handleClose}></div>}
      <NavbarMenu open={ open } onClose={ handleClose } />
    </nav>
  )
}

export { Navbar }
