import { careers } from "@/data/careers"
import { Link } from "react-router-dom"

function ModalStudentLifeCareer () {
  return(
    <div className="bg-blue-deep text-white z-100">
      <ul className="flex flex-col">
        {
        careers.map((career , i) => {
          return (
            <Link
              to={career.href}
              className="px-3 py-2 transition-all duration-300 hover:bg-orange/40"
            >
              {career.title}
            </Link>
          )
        })
      }
      </ul>
    </div>
  )
}

export {ModalStudentLifeCareer}