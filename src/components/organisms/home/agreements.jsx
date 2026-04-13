import { Title } from "../../atoms/titles"
import { ConvCard } from "../../molecules/home/convCard"
import {
  PiBuildings,
  PiStudent,
  PiChalkboardTeacher,
  PiUsersThree,
  PiMonitorPlay,
  PiLaptop
} from "react-icons/pi"

const cards = [
  {
    title: "UPN",
    desc: "Universidad Privada del Norte — formación profesional de calidad.",
    icon: <PiBuildings size={36} />,
  },
  {
    title: "Coronel Cortegana",
    desc: "Institución educativa con historia y compromiso académico.",
    icon: <PiStudent size={36} />,
  },
  {
    title: "Pedro Paula",
    desc: "Centro educativo enfocado en el desarrollo integral del estudiante.",
    icon: <PiChalkboardTeacher size={36} />,
  },
  {
    title: "AMM",
    desc: "Asociación comprometida con la excelencia y la innovación educativa.",
    icon: <PiUsersThree size={36} />,
  },
  {
    title: "IDAT",
    desc: "Instituto de diseño y tecnología con enfoque aplicado y práctico.",
    icon: <PiMonitorPlay size={36} />,
  },
  {
    title: "Cibertec",
    desc: "Instituto tecnológico líder en carreras técnicas y digitales.",
    icon: <PiLaptop size={36} />,
  },
]


function Agreements() {
  return (
    <section className=" mt-[3em] pt-[1em] md:pt-20 flex flex-col md:gap-10  
      
    ">
      <Title
        level="h2"
        text="CONVENIOS"
        align="center"
        weight="bold"
        variant="danger"
        className="font-hani"
      />

      <div className="relative overflow-hidden w-full py-8
        before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-linear-to-r before:from-white before:to-transparent before:z-10
        after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-linear-to-l after:from-white after:to-transparent after:z-10"
      >
        <div className="flex gap-5 w-max animate-scrollLeft hover:[animation-play-state:paused]">
          {[...cards, ...cards].map((card, i) => (
            <ConvCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Agreements }