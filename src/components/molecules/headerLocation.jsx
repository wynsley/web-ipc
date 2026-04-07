import { MdLocationPin } from "react-icons/md";

function Location() {
  return (
    <a 
      href="#"
      className="flex gap-2 justify-center">
      <MdLocationPin fontSize={'1.2em'} color="red" className="hover:scale-110 transition duration-200"/>
      <span 
      className="text-white text-[.8em]
      hover:text-[#DAB08B] transition duration-200 hover:underline
      "
      >Jr. Dos de Mayo 1390 Celendín-Cajamarca</span>
    </a>
  )
}

export { Location }