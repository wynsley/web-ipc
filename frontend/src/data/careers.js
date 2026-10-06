import administracionImage from "@assets/images/careers/administration/ADMINISTRACION.webp";
import computacionImage from "@assets/images/careers/computerScience/COMPUTACION.webp";
import contabilidadImage from "@assets/images/careers/accounting/CONTABILIDAD.webp";
import translationInterpreterImage from "@assets/images/careers/languageTranslation/translation-interpreter.webp";
// data/careers
const careers = [
  {
    title: "Administración de Empresas",
    href: "/career/administration",
    img: administracionImage,
    hero: {
      description: "Lidera el futuro empresarial. Conviértete en un profesional integral capaz de dirigir organizaciones, tomar decisiones estratégicas y generar valor en un entorno de negocios dinámico y competitivo.",
      highlights: [
        {
          title: "3 Años",
          description: "Título profesional en administración de empresas",
        },
        {
          title: "100% presencial",
          description: "Te garantizamos una formación práctica, directa y de alta calidad.",
        },
        {
          title: "Alta Empleabilidad",
          description: "Inserción inmediata en empresas",
        },
      ],
    },
  },
  {
    title: "Contabilidad",
    href: "/career/accounting",
    img: contabilidadImage,
  },
  {
    title: "Computación e Informática",
    href: "/career/computer-science",
    img: computacionImage,
  },
  {
    title: "Traducción de Idiomas",
    href: "/career/language-translation",
    img: translationInterpreterImage,
  },
];

export { careers };
