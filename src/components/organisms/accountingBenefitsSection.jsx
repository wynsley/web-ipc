import "./accountingBenefitsSection.css";
import { AccountingBenefitCard } from "../molecules/accountingBenefitCard";
import { FaBriefcase, FaMoneyBillWave, FaIndustry, FaBuilding } from 'react-icons/fa';

function AccountingBenefitsSection() {
  // Datos de beneficios de la carrera
  const benefits = [
    {
      id: 1,
      icon: <FaBriefcase />,
      title: "Estabilidad Laboral",
      description:
        "Toda empresa, sin importar su tamaño, necesita profesionales contables. El 92% de nuestros egresados encuentra trabajo en menos de 2 meses.",
      highlighted: false,
    },
    {
      id: 2,
      icon: <FaMoneyBillWave />,
      title: "Salarios Competitivos",
      description:
        "Inicia con sueldos desde S/2,200 y alcanza hasta S/7,000 con experiencia. Una carrera con crecimiento económico constante.",
      highlighted: true,
    },
    {
      id: 3,
      icon: <FaIndustry />,
      title: "Diversidad de Sectores",
      description:
        "Trabaja en cualquier industria: manufactura, servicios, retail, tecnología. Las habilidades contables son universales.",
      highlighted: false,
    },
    {
      id: 4,
      icon: <FaBuilding />,
      title: "Independencia Profesional",
      description:
        "Abre tu propio estudio contable o consultora financiera. Conviértete en empresario de servicios profesionales.",
      highlighted: false,
    },
  ];

  return (
    <section className="accounting-benefits">
      <div className="accounting-benefits__container">
        {/* Header de la sección */}
        <div className="accounting-benefits__header">
          <h2 className="accounting-benefits__title">
            ¿Por Qué Estudiar
            <span className="accounting-benefits__title--highlight">
              {" "}
              Contabilidad y Finanzas?
            </span>
          </h2>
          <p className="accounting-benefits__subtitle">
            Descubre las ventajas de una carrera esencial en el mundo empresarial
            con proyección y estabilidad garantizada
          </p>
        </div>

        {/* Grid de beneficios */}
        <div className="accounting-benefits__grid">
          {benefits.map((benefit) => (
            <AccountingBenefitCard
              key={benefit.id}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              highlighted={benefit.highlighted}
            />
          ))}
        </div>

        {/* Estadísticas adicionales */}
        <div className="accounting-benefits__stats">
          <div className="accounting-benefits__stat">
            <span className="accounting-benefits__stat-number">92%</span>
            <span className="accounting-benefits__stat-label">
              Empleabilidad
            </span>
          </div>
          <div className="accounting-benefits__stat">
            <span className="accounting-benefits__stat-number">S/4,200</span>
            <span className="accounting-benefits__stat-label">
              Salario Promedio
            </span>
          </div>
          <div className="accounting-benefits__stat">
            <span className="accounting-benefits__stat-number">10+</span>
            <span className="accounting-benefits__stat-label">Software ERP</span>
          </div>
          <div className="accounting-benefits__stat">
            <span className="accounting-benefits__stat-number">100%</span>
            <span className="accounting-benefits__stat-label">
              Práctica Real
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { AccountingBenefitsSection };