import { useState } from "react";
import { CareersGrid } from "../molecules/careersGrid";
import "./careersSection.css";

// Importar las imágenes (ajusta las rutas según tu estructura)
import ComputacionImg from "../../assets/img/circuitos.jpg";
import AdministracionImg from "../../assets/img/Administracion.jpg";
import ContabilidadImg from "../../assets/img/contabilidad.jpg";
import TraduccionImg from "../../assets/img/traduccion.jpeg";

/**
 * Sección de carreras - Organismo
 * @param {string} title - Título de la sección
 * @param {string} subtitle - Subtítulo de la sección
 * @param {string} columns - Número de columnas para el grid
 * @param {boolean} showHeader - Mostrar o no el header
 * @param {string} className - Clases CSS adicionales
 */
const CareersSection = ({
  title = "Carreras de Estudios",
  subtitle = "Descubre nuestras carreras técnicas diseñadas para formar profesionales competitivos y preparados para los desafíos del futuro.",
  columns = "four",
  showHeader = true,
  className = "",
}) => {
  const [error, setError] = useState(null);

  // Datos de las carreras
  const careers = [
    {
      id: "administracion-empresas",
      title: "Administración de Empresas",
      description:
        "Desarrolla habilidades gerenciales y empresariales. Aprende sobre gestión de recursos humanos, marketing, finanzas y liderazgo para dirigir organizaciones exitosas.",
      backgroundImage: AdministracionImg,
      href: "/majors/bussiness-administration",
    },
    {
      id: "contabilidad",
      title: "Contabilidad",
      description:
        "Conviértete en un experto en el manejo financiero y contable. Domina las normas contables, tributación, auditoría y análisis financiero para empresas de todos los tamaños.",
      backgroundImage: ContabilidadImg,
      href: "/majors/accounting",
    },
    {
      id: "computacion-informatica",
      title: "Computación e Informática",
      description:
        "Formate como profesional en el mundo de la tecnología. Aprende programación, desarrollo de sistemas, redes y administración de bases de datos con herramientas modernas y metodologías actuales.",
      backgroundImage: ComputacionImg,
      href: "/majors/computing-it",
    },
    {
      id: "traduccion-idiomas",
      title: "Traducción de Idiomas",
      description:
        "Domina múltiples idiomas y conviértete en un puente de comunicación global. Especialízate en traducción técnica, literaria y comercial con certificación internacional.",
      backgroundImage: TraduccionImg,
      href: "/majors/language-translation",
    },
  ];

  const sectionClassName = `
        careers-section 
        ${className}
    `.trim();

  if (error) {
    return (
      <section className={sectionClassName}>
        <div className="careers-section__container">
          <div className="careers-section__error">
            <h3>Error</h3>
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "var(--anaranjado, #ff6600)",
                color: "white",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClassName}>
      <div className="careers-section__container">
        {showHeader && (
          <header className="careers-section__header">
            <h2 className="careers-section__title">{title}</h2>
            <p className="careers-section__subtitle">{subtitle}</p>
          </header>
        )}

        <div className="careers-section__content">
          {
            <div className="careers-section__grid">
              <CareersGrid careers={careers} columns={columns} />
            </div>
          }
        </div>
      </div>
    </section>
  );
};

export { CareersSection };
