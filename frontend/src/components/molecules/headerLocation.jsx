import { MdLocationPin } from "react-icons/md";

function Location() {
  return (
    <a 
      href="#"
      className="flex items-center gap-1 md:gap-2 justify-center md:justify-start"
    >
      {/* Icono */}
      <MdLocationPin 
        className="
          text-red-500 
          text-base md:text-lg lg:text-xl
          hover:scale-110 transition duration-200
        "
      />

      {/* Texto */}
      <span 
        className="
          text-white 
          text-[0.4rem] sm:text-[0.6rem] md:text-[.7em] lg:text-[.8em]
          
          hover:text-[#DAB08B] 
          transition duration-200 
          hover:underline

          text-center md:text-left
        "
      >
        Jr. Dos de Mayo 1390 Celendín-Cajamarca
      </span>
    </a>
  );
}

export { Location };