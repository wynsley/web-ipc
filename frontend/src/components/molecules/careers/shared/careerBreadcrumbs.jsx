import { Link } from "react-router-dom";
import { Paragraph } from "@/components/atoms/paragraph";

function CareerBreadcrumbs({ title, className = "" }) {
  return (
    <nav
      aria-label="Ruta de navegación"
      className={`font-poppins text-sm text-white sm:text-base ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <li>
          <Link
            to="/"
            className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Paragraph as="span" aria-current="page" text={title} />
        </li>
      </ol>
    </nav>
  );
}

export { CareerBreadcrumbs };
