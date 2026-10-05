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

// Propuesta editorial orientativa; confirmar contra el plan oficial antes de publicar.
const computerScienceLearning = [
  {
    title: "Programación",
    image: "/computation-informatic/learning-programming.webp",
    imageAlt: "Ilustración de un portátil y paneles de código",
    description:
      "Convierte un problema en instrucciones claras. Explora lógica, algoritmos y desarrollo de aplicaciones.",
    Icon: FiCode,
  },
  {
    title: "Bases de datos",
    image: "/computation-informatic/learning-database.webp",
    imageAlt: "Ilustración de bases de datos conectadas",
    description:
      "Organiza información, relaciona datos y comprende cómo consultarlos de forma útil y segura.",
    Icon: FiDatabase,
  },
  {
    title: "Redes y conectividad",
    image: "/computation-informatic/learning-networks.webp",
    imageAlt: "Ilustración de un equipo de red y conexiones",
    description:
      "Comprende cómo se comunican los equipos y cómo configurar conexiones y servicios de red.",
    Icon: FiWifi,
  },
  {
    title: "Soporte técnico",
    image: "/computation-informatic/learning-support.webp",
    imageAlt: "Ilustración de componentes y herramientas de mantenimiento",
    description:
      "Diagnostica fallas y explora el mantenimiento de equipos, sistemas y herramientas informáticas.",
    Icon: FiTool,
  },
  {
    title: "Desarrollo web",
    image: "/computation-informatic/learning-web.webp",
    imageAlt: "Ilustración de interfaces web en pantalla y móvil",
    description:
      "Relaciona interfaces, datos y funcionalidad para construir experiencias digitales.",
    Icon: FiLayers,
  },
  {
    title: "Seguridad digital",
    image: "/computation-informatic/learning-security.webp",
    imageAlt: "Ilustración de un escudo y un candado sobre circuitos",
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
    title: "Plan de estudios",
    description:
      "Explora un plan de estudios ficticio, creado como referencia visual para Computación e Informática.",
    tone: "light",
    pdfUrl: "/computation-informatic/computacion-referencia.pdf",
    isReference: true,
  },
  {
    id: "computing-curriculum",
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
    image: "/computation-informatic/learning-programming.webp",
    imageAlt: "Ilustración de código y algoritmos en un portátil",
    description:
      "Observa una necesidad, escucha a las personas y define qué debería mejorar. Una buena solución comienza con una pregunta clara.",
  },
  {
    title: "Construye y conecta",
    image: "/computation-informatic/learning-web.webp",
    imageAlt: "Ilustración de interfaces digitales conectadas",
    description:
      "Combina interfaces, lógica y datos. Divide la idea en pequeñas partes y convierte cada avance en algo que puedas probar.",
  },
  {
    title: "Prueba y mejora",
    image: "/computation-informatic/learning-security.webp",
    imageAlt: "Ilustración de protección de un sistema digital",
    description:
      "Comprueba lo que funciona, encuentra errores y documenta lo aprendido. Mejorar también es parte de crear.",
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
    wordmark: "IMAGINA. CREA.",
  },
  benefits: {
    imageAlt: "Ilustración de un entorno de trabajo tecnológico",
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
