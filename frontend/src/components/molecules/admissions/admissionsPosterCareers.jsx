import { FiMonitor, FiGlobe, FiUsers } from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";
import { Title } from "@/components/atoms/titles";
import { careers } from "@/data/careers";

const posterCareers = [
  { href: "/career/accounting", icon: <FaCalculator /> },
  { href: "/career/administration", icon: <FiUsers /> },
  { href: "/career/computer-science", icon: <FiMonitor /> },
  { href: "/career/language-translation", icon: <FiGlobe /> },
].map(({ href, icon }) => ({
  title: careers.find((career) => career.href === href).title,
  icon,
}));

function AdmissionsPosterCareers() {
  return (
    <div className="min-w-0">
      <Title
        level="h4"
        variant="primary"
        weight="bold"
        align="center"
        className="bg-blue-deep px-[1cqw] py-[1cqw] leading-tight"
        style={{
          fontSize: "2.6cqw",
          clipPath:
            "polygon(0 8%, 6% 0, 20% 6%, 36% 0, 50% 5%, 66% 0, 80% 5%, 98% 0, 100% 22%, 97% 40%, 100% 65%, 98% 100%, 82% 93%, 66% 100%, 50% 94%, 35% 100%, 19% 94%, 0 100%, 2% 70%, 0 50%, 3% 28%)",
        }}
      >
        Carreras Disponibles:
      </Title>
      <ul className="mt-[3cqw] space-y-[3cqw]">
        {posterCareers.map(({ title, icon }) => (
          <li
            key={title}
            className="flex items-center gap-[2cqw] text-[2.5cqw] leading-tight"
          >
            <span
              aria-hidden="true"
              className="size-[4cqw] shrink-0 [&>svg]:size-full"
            >
              {icon}
            </span>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { AdmissionsPosterCareers };
