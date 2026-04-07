import { Location } from "../molecules/headerLocation";
import { Schedule } from "../molecules/headerSchedule";

function Header() {
  return (
    <header 
      className="flex justify-between items-center 
        h-8 pl-[2em] pr-7
        bg-[linear-gradient(to_right,#2073AA_0%,#2073AA_20%,#1A3983_100%)]
      ">
      <Location />
      <Schedule />
    </header>
  )
}

export { Header }