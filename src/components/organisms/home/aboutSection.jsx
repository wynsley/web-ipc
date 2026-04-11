import { ImageStack } from "../../molecules/home/imageStack"
import { AboutContent } from "../../molecules/home/aboutContent"
import { Title } from "../../atoms/titles"

function AboutSection({ images = [] }) {
  const [imgTop, imgBottom] = images
  const title = `TU TAMBIÉN PUEDES ALCANZAR TUS SUEÑOS`

  return (
    <section className="
      w-full max-w-[88vw] mx-auto h-auto
      px-6 sm:px-10 lg:px-16
      py-16 md:py-[18vh]
      grid
      grid-cols-1
      md:grid-cols-2
      md:grid-rows-[auto_1fr]
      gap-x-12 lg:gap-x-25
      gap-y-8 md:gap-y-0
    ">

      {/* ── TÍTULO ─────────────────────────────────────────
          Mobile/tablet : fila 1, ocupa ambas columnas
          Desktop       : fila 1, columna 2
      ──────────────────────────────────────────────────── */}
      <div className="
        col-span-1
        md:col-start-2 md:row-start-1
        flex flex-col gap-4
        md:pt-2
      ">
        <div className="w-20 h-0.75 bg-blue-dark rounded-full" />

        <Title 
          text={title}
          level="h2"
          weight="bold"
          className="
            font-hani font-bold
            text-3xl sm:text-4xl lg:text-5xl
          text-gray-900
        "/>

      </div>

      {/* ── IMÁGENES ───────────────────────────────────────
          Mobile/tablet : fila 2, ocupa ambas columnas → grid interno 2 cols
          Desktop       : filas 1+2, columna 1          → stack con overlap
      ──────────────────────────────────────────────────── */}
      <div className="
        col-span-1
        md:col-start-1 md:row-start-1 md:row-span-2
        md:self-stretch
      ">
        <ImageStack imgTop={imgTop} imgBottom={imgBottom} />
      </div>

      {/* ── TEXTO / CTA*/}
      <AboutContent/>

    </section>
  )
}

export { AboutSection }