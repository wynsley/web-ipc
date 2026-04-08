import { Location } from "../molecules/headerLocation";
import { Schedule } from "../molecules/headerSchedule";

function Header() {
  return (
    <header 
      className="hiden justify-between items-center 
        h-4 sm:h-6 md:h-8 pl-[1em] pr-5 lg:pl-[2em] lg:pr-7
        bg-[linear-gradient(to_right,#2073AA_0%,#2073AA_20%,#1A3983_100%)]
        md:flex flex
      ">
      <Location />
      <Schedule />
    </header>
  )
}

export { Header }