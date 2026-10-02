import { Beginning } from "@/components/molecules/aboutUs/beginning";

function OurBeginning() {
  return (
    <section className="w-full bg-white px-6 py-16 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Columna izquierda */}
        <div className="max-w-md ">
          <h2 className="font-hani text-5xl font-light leading-tight text-neutral-800 md:text-6xl">
            Nuestro <span className="font-semibold text-blue-deep">inicio</span>

          </h2>

          <p className="mt-8 font-poppins text-sm leading-relaxed text-neutral-600">
            Desde sus inicios, el Instituto Privado Celendín se ha caracterizado por su
            compromiso con la formación integral de sus estudiantes y con las necesidades
            educativas y laborales de la región.
          </p>

          <button
            type="button"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-blue-deep px-5 py-3 font-poppins text-xs font-medium text-white transition hover:bg-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            Conoce más sobre nosotros
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Columna derecha */}
        <div className="relative rounded-sm bg-slate-100 p-8 md:p-5">

          <Beginning/>
        </div>
      </div>
    </section>
  );
}

export {OurBeginning}