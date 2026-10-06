import marketingImage from "@assets/images/careers/administration/MARKETING.webp";
import administracionImage from "@assets/images/careers/administration/ADMINISTRACION.webp";
import finanzasImage from "@assets/images/careers/administration/FINANZAS.webp";
import computacionImage from "@assets/images/careers/computerScience/COMPUTACION.webp";
import emprendimientoImage from "@assets/images/careers/administration/EMPRENDIMIENTO.webp";
import gestionTalentoHumanoImage from "@assets/images/careers/administration/GESTION_TALENTO_HUMANO.webp";
import logisticaImage from "@assets/images/careers/administration/LOGISTICA.webp";
import contabilidadImage from "@assets/images/careers/accounting/CONTABILIDAD.webp";

const administrationWorkplaces = [
  {
    title: "Gestión de empresas",
    image: administracionImage,
    layout: "enterprise",
  },
  {
    title: "Área comercial",
    image: marketingImage,
    layout: "commercial",
  },
  {
    title: "Administración financiera",
    image: finanzasImage,
    layout: "finance",
  },
  {
    title: "Recursos humanos",
    image: gestionTalentoHumanoImage,
    layout: "people",
  },
  {
    title: "Operaciones y logística",
    image: logisticaImage,
    layout: "operations",
  },
  {
    title: "Servicios administrativos",
    image: contabilidadImage,
    layout: "services",
  },
  {
    title: "Emprendimientos",
    image: emprendimientoImage,
    layout: "entrepreneurship",
  },
  {
    title: "Herramientas digitales de gestión",
    image: computacionImage,
    layout: "digital-management",
  },
];

export { administrationWorkplaces };
