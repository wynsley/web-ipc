import { FaClipboardCheck, FaRoute, FaCalendarDays } from "react-icons/fa6";

export const TITULATION_STEPS = [
  {
    icon: FaClipboardCheck,
    title: "Requisitos",
    description:
      "Conoce los documentos y condiciones necesarias para iniciar tu proceso de titulación sin contratiempos.",
    linkText: "Ver requisitos",
    href: "/titulacion/requisitos",
    variant: "white",
  },
  {
    icon: FaRoute,
    title: "Guía del proceso",
    description:
      "Sigue paso a paso el procedimiento oficial, acompañado en todo momento por nuestro equipo académico especializado.",
    linkText: "Ver guía",
    href: "/titulacion/guia",
    variant: "blue-deep",
    raised: true,
  },
  {
    icon: FaCalendarDays,
    title: "Cronogramas",
    description:
      "Consulta las fechas, plazos y cronogramas vigentes para cada etapa del proceso de titulación.",
    linkText: "Ver cronograma",
    href: "/titulacion/cronograma",
    variant: "blue-dark",
  },
];