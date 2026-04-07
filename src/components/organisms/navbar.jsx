import { NavbarMenu } from "../molecules/desktopMenu";
import { Logo } from "../molecules/logo";
import { Button } from "../atoms/button";

function Navbar() {
  return (
    <nav className="flex flex-row pl-[4em] pr-[2em] h-[4em] justify-between items-center bg-[#FBFCFC] shadow shadow-[#CF6803]">
      <Logo />
      <div className="flex gap-20">
        <NavbarMenu />
        <Button 
          type='button'
          text='¡Inscríbete aquí!'
        />
      </div>
    </nav>
  )
}

export {Navbar}