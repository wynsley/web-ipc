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
      aria-labelledby="footer-careers-title"
      className="min-w-0 text-center lg:self-start lg:pt-[1.2vw]"
    >
      <Title
        id="footer-careers-title"
        level="h2"
        variant="primary"
        align="center"
        text="CARRERAS:"
        className="mb-5 font-hani lg:mb-7 lg:text-[clamp(1.5rem,2vw,2.5rem)]!"
      />
      <ul className="space-y-2 font-poppins text-xl leading-snug sm:text-2xl lg:text-[clamp(1.1rem,1.65vw,2.1rem)]">
        {footerCareers.map((career) => (
          <li key={career.href}>
            <Link
              to={career.href}
              className="inline-block rounded-md border border-transparent px-2 py-0.5 transition-colors duration-150 hover:border-white/30 hover:bg-white/10 focus-visible:border-white/30 focus-visible:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
