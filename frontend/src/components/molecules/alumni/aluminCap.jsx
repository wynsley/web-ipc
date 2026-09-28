import { ScrollReveal } from "../../layouts/scrollReveal"

function AlumniCap() {
  return (
    <div
      className="
        absolute top-0 right-0
        -translate-y-24 sm:-translate-y-32 md:-translate-y-35
        w-40 sm:w-52 md:w-60
        pointer-events-none select-none
      "
    >
      <ScrollReveal y={50} className="relative flex justify-center">
        <div
          className="
            absolute bottom-2 left-1/2 -translate-x-1/2
            h-6 w-[70%] sm:h-8 sm:w-[75%]
            rounded-full bg-blue-deep/30
            blur-md
          "
          aria-hidden="true"
        />

        <img
          src="/CAP.webp"
          alt="Birrete institucional"
          className="relative w-full drop-shadow-lg"
        />
      </ScrollReveal>
    </div>
  )
}

export { AlumniCap }