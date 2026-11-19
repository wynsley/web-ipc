import { Link } from "react-router-dom"
import { Image } from "@/components/atoms/image"

function CareerCard({ career }) {
  return (
    <Link
      to={career.href}
      className="group relative overflow-hidden aspect-3/4 rounded-lg
      bg-blue-dark block w-full shrink-0
        shadow-[0_20px_30px_rgba(0,0,0,0.5)]
      "
    >
      <Image
        fill
        src={career.img}
        alt={career.title}
        imageClassName="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/*Degradado de la targeta */}
      <div className="absolute inset-0 
        bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0)_100%)] 
        opacity-100 group-hover:opacity-80 transition duration-300" 
        />
      
      {/*Nombre de las carreras */}
      <div className="absolute bottom-5 left-0 right-0 
        flex items-center justify-center 
      ">
        <span className="text-white font-bold text-[1em] sm:text-[1.1em] md:text-[1.2em] text-center leading-tight font-hani">
          {career.title}
        </span>
      </div>
    </Link>
  )
}

export { CareerCard }