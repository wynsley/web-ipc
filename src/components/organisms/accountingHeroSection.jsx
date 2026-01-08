import './accountingHeroSection.css'
import { AccountingBadge } from '../atoms/accountingBadge'
import { AccountingTitle } from '../atoms/accountingTitle'
import { AccountingSubtitle } from '../atoms/accountingSubtitle'
import { AccountingFeaturesList } from '../molecules/accountingFeaturesList'
import { AccountingTechList } from '../molecules/accountingTechList'
import { AccountingDashboard } from '../molecules/accountingDashboard'
import { AccountingFloatingItem } from '../atoms/accountingFloatingItem'
import { FaGraduationCap, FaChartLine, FaBriefcase } from 'react-icons/fa'

function AccountingHeroSection() {
  // Datos de características destacadas
  const features = [
    {
      icon: <FaGraduationCap />,
      title: "6 Semestres",
      description: "Título técnico profesional"
    },
    {
      icon: <FaChartLine />,
      title: "100% Práctico",
      description: "Laboratorios especializados"
    },
    {
      icon: <FaBriefcase />,
      title: "90% Empleabilidad",
      description: "Inserción laboral inmediata"
    }
  ]

  // Lista de tecnologías/software
  const technologies = [
    "Excel Avanzado",
    "SAP", 
    "QuickBooks",
    "Power BI",
    "SQL Server",
    "SUNAT"
  ]

  // Elementos flotantes
  const floatingElements = [
    { text: "NIIF", position: "1", delay: 0 },
    { text: "ERP", position: "2", delay: 1 },
    { text: "CPA", position: "3", delay: 2 }
  ]

  return (
    <section className="accounting-hero">
      <div className="accounting-hero__container">
        <div className="accounting-hero__content">
          
          {/* Badge superior */}
          <div className="accounting-hero__badge-wrapper">
            <AccountingBadge text="Carrera con Alta Demanda Empresarial" />
          </div>

          {/* Título principal con highlight */}
          <AccountingTitle highlightText="Finanzas">
            Contabilidad y Finanzas
          </AccountingTitle>

          {/* Subtítulo descriptivo */}
          <AccountingSubtitle>
            Conviértete en un experto en gestión financiera y contable. 
            Domina las herramientas más importantes del mundo empresarial 
            y desarrolla habilidades para el análisis, control y toma de 
            decisiones financieras estratégicas.
          </AccountingSubtitle>

          {/* Características destacadas */}
          <AccountingFeaturesList features={features} />

          {/* Lista de tecnologías */}
          <AccountingTechList 
            label="Software que dominarás:"
            technologies={technologies}
          />

        </div>

        {/* Elemento visual lateral */}
        <div className="accounting-hero__visual">
          <AccountingDashboard />

          {/* Elementos flotantes decorativos */}
          <div className="accounting-hero__floating-elements">
            {floatingElements.map((element, index) => (
              <AccountingFloatingItem
                key={index}
                text={element.text}
                position={element.position}
                delay={element.delay}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export { AccountingHeroSection }