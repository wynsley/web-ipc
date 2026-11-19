import { Link } from "react-router-dom";
import { MyTemplate } from "../templates/myTemplate";
import { Title } from "../atoms/titles";
import { Paragraph } from "../atoms/paragraph";

function NotFoundPage() {
  return (
    <MyTemplate>
      <section className="mx-auto flex min-h-[60vh] w-[92%] max-w-3xl flex-col items-center justify-center py-20 text-center">
        <span className="font-hani text-6xl font-bold text-orange sm:text-7xl">
          404
        </span>
        <Title
          level="h1"
          text="Página no encontrada"
          variant="institutional"
          weight="bold"
          align="center"
          className="mt-3 font-hani"
        />
        <Paragraph
          text="La dirección que ingresaste no existe o cambió de ubicación. Puedes volver al inicio o revisar nuestra agenda institucional."
          variant="secondary"
          align="center"
          className="mt-4 max-w-xl font-poppins"
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-blue-dark px-6 py-2.5 font-poppins text-sm font-semibold text-white transition-colors hover:bg-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark"
          >
            Ir al inicio
          </Link>
          <Link
            to="/events"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-blue-dark px-6 py-2.5 font-poppins text-sm font-semibold text-blue-dark transition-colors hover:bg-blue-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark"
          >
            Ver eventos
          </Link>
        </div>
      </section>
    </MyTemplate>
  );
}

export { NotFoundPage };
