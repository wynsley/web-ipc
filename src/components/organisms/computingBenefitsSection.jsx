import "./computingBenefitsSection.css";
import { BenefitCard } from "../molecules/benefitCard";

function ComputingBenefitsSection() {
  // Datos de beneficios de la carrera
  const benefits = [
    {
      id: 1,
      icon: "💼",
      title: "Alta Demanda Laboral",
      description:
        "Los profesionales en computación están entre los más solicitados. El 89% de nuestros egresados consigue empleo en menos de 3 meses.",
      highlighted: false,
    },
    {
      id: 2,
      icon: "💰",
      title: "Salarios Competitivos",
      description:
        "Inicia con sueldos desde S/2,500 y alcanza hasta S/8,000 con experiencia. Una inversión que se recupera rápidamente.",
      highlighted: true,
    },
    {
      id: 3,
      icon: "🚀",
      title: "Innovación Constante",
      description:
        "Trabajarás con las últimas tecnologías: Inteligencia Artificial, Cloud Computing, Blockchain y desarrollo móvil de vanguardia.",
      highlighted: false,
    },
    {
      id: 4,
      icon: "🌐",
      title: "Trabajo Remoto",
      description:
        "Flexibilidad laboral total. Trabaja desde casa, en oficinas modernas o como freelancer para clientes internacionales.",
      highlighted: false,
    },
  ];

  return (
    <section className="computing-benefits">
      <div className="computing-benefits__container">
        {/* Header de la sección */}
        <div className="computing-benefits__header">
          <h2 className="computing-benefits__title">
            ¿Por Qué Estudiar
            <span className="computing-benefits__title--highlight">
              {" "}
              Computación e Informática?
            </span>
          </h2>
          <p className="computing-benefits__subtitle">
            Descubre las ventajas de una carrera con futuro asegurado en el
            mundo digital
          </p>
        </div>

        {/* Grid de beneficios */}
        <div className="computing-benefits__grid">
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              highlighted={benefit.highlighted}
            />
          ))}
        </div>

        {/* Estadísticas adicionales */}
        <div className="computing-benefits__stats">
          <div className="computing-benefits__stat">
            <span className="computing-benefits__stat-number">89%</span>
            <span className="computing-benefits__stat-label">
              Empleabilidad
            </span>
          </div>
          <div className="computing-benefits__stat">
            <span className="computing-benefits__stat-number">S/5,200</span>
            <span className="computing-benefits__stat-label">
              Salario Promedio
            </span>
          </div>
          <div className="computing-benefits__stat">
            <span className="computing-benefits__stat-number">15+</span>
            <span className="computing-benefits__stat-label">Tecnologías</span>
          </div>
          <div className="computing-benefits__stat">
            <span className="computing-benefits__stat-number">100%</span>
            <span className="computing-benefits__stat-label">
              Práctica Real
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ComputingBenefitsSection };
