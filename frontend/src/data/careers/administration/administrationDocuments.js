import administracionImage from "@assets/images/careers/administration/ADMINISTRACION.webp";
import contabilidadImage from "@assets/images/careers/accounting/CONTABILIDAD.webp";
// Documentos de referencia: reemplazar por las versiones oficiales cuando estén disponibles.
const administrationDocuments = [
  {
    id: "study-plan",
    title: "Plan de estudios",
    description:
      "Conoce las áreas de formación y descubre cómo desarrollar una visión integral de la empresa.",
    image: contabilidadImage,
    tone: "light",
    previewImage: "/documents/administracion-plan-estudios-preview.png",
    pdfUrl: "/pdfs/taller.pdf",
    fileName: "administracion-plan-estudios-referencia.pdf",
    isReference: true,
  },
  {
    id: "curriculum",
    title: "Malla curricular",
    description:
      "Explora las áreas de aprendizaje y empieza a imaginar tu recorrido profesional.",
    image: administracionImage,
    tone: "dark",
    previewImage: "/documents/administracion-malla-curricular-preview.png",
    pdfUrl: "/pdfs/proceso.pdf",
    fileName: "administracion-malla-curricular-referencia.pdf",
    isReference: true,
  },
];

export { administrationDocuments };
