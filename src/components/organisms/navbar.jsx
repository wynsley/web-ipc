import { NavbarMenu } from "../molecules/desktopMenu";
import { Logo } from "../molecules/logo";
import { Button } from "../atoms/button";
import { NavbarCurve } from "../molecules/navbarCurve";

function Navbar() {
  return (
    <nav
      className="
        w-full fixed flex items-center justify-between h-[3em] md:h-[4em]
        bg-[linear-gradient(to_right,#2073AA_0%,#2073AA_20%,#1A3983_100%)]
        md:bg-none md:bg-neutral-white mt-3.5 sm:mt-5.5 md:mt-8
        px-4 md:px-8 lg:px-10 md:pr-[4em]  lg:pr-[9em] xl:pr-[13em]
        shadow shadow-[#CF6803] z-1000 
      "
    >
      <Logo />
      <NavbarMenu/>
      <NavbarCurve/>
      <Button 
        type="button"
        text="¡Inscríbete aquí!"
        variant="primary"
      />
      {/*Boton móvil */}
      <div className="md:hidden absolute bottom-1 left-0 w-full flex justify-center">
        <Button 
          type="button"
          text="¡Inscríbete aquí!"
          className="
            bg-[#e08433] py-1 px-3 md:px-6 text-[0.6rem] sm:text-[.9em] md:text-[1em]
            font-bold text-white 
            shadow-[0_4px_8px_rgba(224,132,51,0.5)]
            hover:bg-[#c97420] 
            hover:shadow-[0_6px_16px_rgba(224,132,51,0.6)] 
            hover:scale-105
            transition-all duration-200 cursor-pointer
          "
        />
      </div>
    </nav>
  );
}

export { Navbar };