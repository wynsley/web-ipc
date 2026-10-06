import { translationImages } from "./images";

const referencePdf = "/documents/languageTranslation/traduccion-referencia.pdf";

const translationDocuments = [
  {
    id: "translation-plan",
    title: "Plan de estudios",
    description:
      "Explora una propuesta ilustrativa de capacidades y experiencias de aprendizaje en la página 1. No es un plan oficial.",
    image: translationImages.workshop,
    tone: "light",
    pdfUrl: referencePdf,
    isReference: true,
  },
  {
    id: "translation-curriculum",
    title: "Malla curricular",
    description:
      "Consulta una organización ficticia por etapas en la página 2. No representa ciclos, créditos ni asignaturas aprobadas.",
    image: translationImages.hero,
    tone: "dark",
    pdfUrl: referencePdf,
    isReference: true,
  },
];

export { translationDocuments };
