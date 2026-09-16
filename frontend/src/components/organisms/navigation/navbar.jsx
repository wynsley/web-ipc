import { NavbarMenu } from "../../molecules/navigation/desktopMenu";
import { Logo } from "../../molecules/navigation/logo";
import { NavbarCurve } from "../../molecules/navigation/navbarCurve";

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
    </nav>
  );
}

export { Navbar };