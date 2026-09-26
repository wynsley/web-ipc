import { Title } from "../../atoms/titles"
import { Paragraph } from "../../atoms/paragraph"
import { Button } from "../../atoms/button"
import { ScrollReveal } from "../../layouts/scrollReveal"
import { FaCheck } from "react-icons/fa"
import { IoIosArrowRoundForward } from "react-icons/io"
import { careers } from "../../../data/careers"
import { services } from "../../../data/ServicesAcademic"

function HomeAdmissions({toggleModal}) {


  return (
    <section
      className="
        flex flex-col gap-8
        my-10 md:my-20 
        mx-auto w-[96%] md:w-[90%] md:max-w-7xl py-6
      "
    >
      <Title
        text="ADMISIÓN"
        level="h2"
        weight="bold"
        className="font-hani"
        align="left"
      />

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <ScrollReveal y={40} className="w-full md:w-1/2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">

            <div className="col-span-2 rounded-xl overflow-hidden aspect-17/10 group">
              <img
                src="/INFRAESTRUCTURA.webp"
                alt="Asesoría personalizada"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-1 group-hover:scale-[1.03]"
              />
            </div>

            <div className="col-span-2 flex gap-3 sm:gap-4">
              <div
                className="
                w-[35%] shrink-0 h-40 sm:h-48
                rounded-xl bg-blue/10 border border-blue/20
                flex flex-col items-center justify-center gap-1
                aspect-square p-3
                "
              >
                <div className="flex items-center justify-center w-12 h-12 size-7 
                  rounded-full bg-blue text-white"
                >
                  <FaCheck className="size-8" />
                </div>
                <Paragraph
                  text="Admisión"
                  weight="bold"
                  size="large"
                />
                <small className="text-[10px] sm:text-[13px] text-neutral-dark/60 text-center">
                  Vacantes abiertas 2026
                </small>
              </div>

              {/* Foto — ancha, ocupa el resto */}
              <div className="flex-1 h-40 sm:h-48 rounded-xl overflow-hidden aspect-square group">
                <img
                  src="/FINANZAS.webp"
                  alt="Estudiantes en clase"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-1 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── CONTENIDO ── */}
        <ScrollReveal
          delay={0.1} y={40}
          className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="size-2 rounded-full bg-blue h-1 w-15" />
            <Title
              level="h2"
              weight="extrabold"
              text="Solución integral para tu futuro profesional"
              className="font-hani leading-tight"
            />
          </div>

          <Paragraph
            size="medium"
            variant="secondary"
            text="Formamos profesionales técnicos con un enfoque práctico y humano, listos para insertarse rápido al mundo laboral con las competencias que las empresas realmente buscan."
          />

          <Button
            onClick={toggleModal}
            type="button"
            variant="primary"
            className="group flex items-center gap-4 justify-center"
          >
            ¡Inscríbete!
            <IoIosArrowRoundForward className="size-3 sm:size-6 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Cards de rating + skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-neutral-white p-4 shadow-md border border-blue/30">
              <Title
                text='Nuestras Servicios'
                level="h4"
                weight="bold"
                className="font-hani"
              />
              <ul className="flex flex-col gap-1">
                {
                  services.map((service, s) =>{
                    return (
                      <li
                        key={s}
                        className="text-sm md:text-md text-neutral-dark flex items-center justify-between"
                      >
                        <span>{service.text}:</span> <span className="text-[1em] md:text-[1.2em] text-blue font-poppins font-bold">S/{service.value}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <div className=" bg-neutral-white p-4 shadow-md border border-blue/30">
              <Title
                text='Nuestras Carreras'
                level="h4"
                weight="bold"
                className="font-hani"
              />
              <ul className="flex flex-col gap-1">
                {careers.map((item, i) => (
                  <li key={i} className="text-sm md:text-md text-neutral-dark/60">
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export { HomeAdmissions }