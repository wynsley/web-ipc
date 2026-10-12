import learningSupportImage from "@assets/images/careers/computerScience/learning-support.webp";
import studyPlanImage from "@assets/images/careers/computerScience/computing-study-plan.webp";
import curriculumImage from "@assets/images/careers/computerScience/computing-curriculum.webp";
import learningNetworksImage from "@assets/images/careers/computerScience/learning-networks.webp";
import learningProgrammingImage from "@assets/images/careers/computerScience/learning-programming.webp";
import learningSecurityImage from "@assets/images/careers/computerScience/learning-security.webp";
import learningDatabaseImage from "@assets/images/careers/computerScience/learning-database.webp";
import learningWebImage from "@assets/images/careers/computerScience/learning-web.webp";
import {
  FiCode,
  FiDatabase,
  FiWifi,
  FiTool,
  FiLayers,
  FiShield,
  FiMonitor,
  FiBriefcase,
} from "react-icons/fi";

const computerScienceLearning = [
  {
    title: "Programación",
    image: learningProgrammingImage,
    imageAlt: "Programador trabajando con un editor de código en su portátil",
    description:
      "Convierte un problema en instrucciones claras. Explora lógica, algoritmos y desarrollo de aplicaciones.",
    Icon: FiCode,
  },
  {
    title: "Bases de datos",
    image: learningDatabaseImage,
    imageAlt:
      "Estación de trabajo con tablas y relaciones de una base de datos",
    description:
      "Organiza información, relaciona datos y comprende cómo consultarlos de forma útil y segura.",
    Icon: FiDatabase,
  },
  {
    title: "Redes y conectividad",
    image: learningNetworksImage,
    imageAlt: "Panel de red con cables Ethernet conectados a un switch",
    description:
      "Comprende cómo se comunican los equipos y cómo configurar conexiones y servicios de red.",
    Icon: FiWifi,
  },
  {
    title: "Soporte técnico",
    image: learningSupportImage,
    imageAlt: "Manos de un técnico realizando mantenimiento a una computadora",
    description:
      "Diagnostica fallas y explora el mantenimiento de equipos, sistemas y herramientas informáticas.",
    Icon: FiTool,
  },
  {
    title: "Desarrollo web",
    image: learningWebImage,
    imageAlt: "Sitio web de biblioteca en un portátil y un teléfono",
    description:
      "Relaciona interfaces, datos y funcionalidad para construir experiencias digitales.",
    Icon: FiLayers,
  },
  {
    title: "Seguridad digital",
    image: learningSecurityImage,
    imageAlt:
      "Analista revisando registros de seguridad en su estación de trabajo",
    description:
      "Reconoce riesgos y buenas prácticas para proteger equipos, cuentas e información.",
    Icon: FiShield,
  },
];

const computerScienceWorkplaces = [
  {
    layout: "software",
    title: "Desarrollo de software",
    description:
      "Equipos que crean y mantienen aplicaciones para resolver necesidades de usuarios y organizaciones.",
    Icon: FiCode,
  },
  {
    layout: "support",
    title: "Soporte y servicios TI",
    description:
      "Áreas que ayudan a las personas a utilizar sus equipos y resuelven incidencias tecnológicas.",
    Icon: FiTool,
  },
  {
    layout: "networks",
    title: "Redes e infraestructura",
    description:
      "Entornos donde se administran conexiones, equipos y servicios informáticos.",
    Icon: FiWifi,
  },
  {
    layout: "data",
    title: "Gestión de información",
    description:
      "Organizaciones que necesitan ordenar, consultar y mantener sus datos.",
    Icon: FiDatabase,
  },
  {
    layout: "web",
    title: "Servicios digitales",
    description:
      "Proyectos de sitios web, plataformas y herramientas para negocios y comunidades.",
    Icon: FiMonitor,
  },
  {
    layout: "independent",
    title: "Proyectos independientes",
    description:
      "Servicios de desarrollo y asistencia tecnológica según tu experiencia y especialización.",
    Icon: FiBriefcase,
  },
];

const computerScienceBenefits = [
  {
    title: "Ideas que se vuelven proyectos",
    description:
      "Conecta la creatividad con la lógica para plantear soluciones a problemas cotidianos.",
  },
  {
    title: "Una mirada integral",
    description:
      "Relaciona software, equipos, redes y datos para comprender un sistema completo.",
  },
  {
    title: "Aprendizaje continuo",
    description:
      "Cultiva la curiosidad y la capacidad de adaptarte a herramientas y tecnologías que evolucionan.",
  },
  {
    title: "Colaboración y comunicación",
    description:
      "Aprende a explicar soluciones, documentar procesos y trabajar con personas de distintas áreas.",
  },
];

const computerScienceDocuments = [
  {
    id: "computing-study-plan",
    image: studyPlanImage,
    title: "Plan de estudios",
    description:
      "Explora un plan de estudios ficticio, creado como referencia visual para Computación e Informática.",
    tone: "light",
    pdfUrl: "/computation-informatic/computacion-referencia.pdf",
    isReference: true,
  },
  {
    id: "computing-curriculum",
    image: curriculumImage,
    title: "Malla curricular",
    description:
      "Revisa una malla de ejemplo en la segunda página del documento de referencia.",
    tone: "dark",
    pdfUrl: "/computation-informatic/computacion-referencia.pdf",
    isReference: true,
  },
];

const computerScienceJourney = [
  {
    title: "Entiende el problema",
    image: learningProgrammingImage,
    imageAlt: "Programador revisando código y apuntes junto a su portátil",
    description:
      "En una biblioteca, averigua cómo se registran los préstamos y qué dificulta encontrar un libro disponible. Define qué necesita resolver el sistema.",
  },
  {
    title: "Construye y conecta",
    image: learningWebImage,
    imageAlt: "Interfaz de un catálogo de biblioteca en computadora y móvil",
    description:
      "Diseña una pantalla para consultar libros y registrar préstamos. Conecta la interfaz con los datos de ejemplares y usuarios.",
  },
  {
    title: "Prueba y mejora",
    image: learningSecurityImage,
    imageAlt:
      "Analista revisando registros y controles de un sistema informático",
    description:
      "Prueba préstamos, devoluciones y datos incorrectos. Recoge comentarios, corrige errores y documenta cómo utilizar la solución.",
  },
];

const computerScienceContent = {
  learning: {
    label: "Áreas de aprendizaje de Computación e Informática",
    eyebrow: "01 / Explora la tecnología",
    description:
      "Explora las áreas que conectan la lógica con la creatividad. Una introducción orientativa a la especialidad; consulta el plan oficial para conocer los cursos.",
  },
  journey: {
    title: "De una idea a una solución.",
    eyebrow: "Piensa · Construye · Mejora",
    description:
      "Un ejemplo ilustrativo: crear un sistema de préstamos para una biblioteca. Así se conecta cada etapa del trabajo.",
  },
  benefits: {
    imageAlt:
      "Laboratorio de computación con estaciones de trabajo y luz natural",
    eyebrow: "03 / Más allá del código",
    title: "Habilidades que abren posibilidades",
    description:
      "El valor de explorar Computación está también en cómo piensas, colaboras y resuelves problemas.",
  },
  documents: {
    title: "Conoce tu formación en Computación",
  },
};

export {
  computerScienceLearning,
  computerScienceWorkplaces,
  computerScienceBenefits,
  computerScienceDocuments,
  computerScienceJourney,
  computerScienceContent,
};
