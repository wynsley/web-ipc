import {
  PiBooks,
  PiBuildings,
  PiMicrophoneStage,
  PiFilmSlate,
  PiTranslate,
  PiBriefcase,
} from "react-icons/pi";

const translationWorkplaces = [
  {
    layout: "agencies",
    title: "Agencias de traducción",
    description:
      "Traducción, revisión y coordinación de contenidos para distintos públicos y sectores.",
    Icon: PiTranslate,
  },
  {
    layout: "business",
    title: "Empresas y organizaciones",
    description:
      "Comunicación multilingüe en equipos, proyectos y relaciones comerciales.",
    Icon: PiBuildings,
  },
  {
    layout: "events",
    title: "Encuentros y conferencias",
    description:
      "Interpretación para facilitar el intercambio entre personas que hablan diferentes idiomas.",
    Icon: PiMicrophoneStage,
  },
  {
    layout: "digital",
    title: "Contenidos digitales",
    description:
      "Localización de sitios web, aplicaciones y materiales audiovisuales.",
    Icon: PiFilmSlate,
  },
  {
    layout: "publishing",
    title: "Sector editorial",
    description:
      "Adaptación y revisión de publicaciones con atención a la voz del autor y sus lectores.",
    Icon: PiBooks,
  },
  {
    layout: "independent",
    title: "Proyectos independientes",
    description:
      "Servicios lingüísticos para clientes y equipos con necesidades de comunicación específicas.",
    Icon: PiBriefcase,
  },
];

export { translationWorkplaces };
