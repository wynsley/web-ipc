import { Link } from "react-router-dom";
import { Title } from "../../atoms/titles";
import { careers } from "../../../data/careers";

function FooterCareers() {
  const footerCareers = [...careers].sort(
    (a, b) =>
      Number(b.href === "/career/accounting") -
      Number(a.href === "/career/accounting"),
  );

  return (
    <nav
      className="flex flex-col items-center sm:items-start justify-start min-w-0 lg:self-start lg:pt-[1.2vw]"
    >
      <Title
        level="h3"
        size="compact"
        align="center"
        text="CARRERAS:"
        className="mb-5 text-gray-400 font-hani lg:mb-7 text-center md:text-left"
      />
      <ul className="space-y-2 font-poppins flex flex-col items-center sm:items-start w-full">
        {footerCareers.map((career) => (
          <li key={career.href} className="w-full text-center sm:text-left">
            <Link
              to={career.href}
              className="inline-block w-full text-gray-400 md:w-auto
              border border-transparent px-2 py-0.5 transition-colors 
              duration-150 hover:border-white/30 focus-visible:outline-2
              focus-visible:outline-white"
            >
              {career.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { FooterCareers };