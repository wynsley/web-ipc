import { ImArrowRight } from "react-icons/im";

function OurPlatform () {
  const paragraph = 'Nuestra plataforma para estudiantes y docentes'
  return(
    <div className="flex flex-col  justify-around items-center gap-4 pt-6">
      <span className=" text-[.9em] md:text-[1em] xl:text-[1.2em] font-hani font-bold">
        {paragraph}
      </span>
      <div className="flex flex-col items-center gap-5">
        <span><ImArrowRight className="text-orange text-[2em] sm:text-4xl animate-float rotate-90 " /></span>
        <a href="https://site2.q10.com/login?ReturnUrl=%2F&aplentId=14592cc7-5820-4c56-a61c-35fdc90579ed" 
          target="black"
          >
          <img 
            src="/LOGO_Q10.webp" 
            alt="Logo Q10"  
            className="w-[5em] sm:w-[5em] rounded-full shadow-strong hover:scale-105 duration-300 animate-pulse"
          />
        </a>
      </div>
    </div>
  )
}

export {OurPlatform}