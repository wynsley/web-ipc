import './businessHeroSection.css'
import { BusinessBadge } from '../atoms/businessBadge'
import { BusinessTitle } from '../atoms/businessTitle'
import { BusinessSubtitle } from '../atoms/businessSubtitle'
import { BusinessFeaturesList } from '../molecules/businessFeaturesList'
import { BusinessToolList } from '../molecules/businessToolList'
import { BusinessDashboard } from '../molecules/businessDashboard'
import { BusinessFloatingItem } from '../atoms/businessFloatingItem'

function BusinessHeroSection() {
  // Datos de características destacadas
  const features = [
    {
      icon: "👑",
      title: "6 Semestres",
      description: "Título profesional en administración"
    },
    {
      icon: "🎯",
      title: "100% Estratégico",
      description: "Enfoque en liderazgo empresarial"
    },
    {
      icon: "📈",
      title: "95% Empleabilidad",
      description: "Inserción inmediata en empresas"
    }
  ]

  // Lista de herramientas empresariales
  const tools = [
    "Excel Avanzado",
    "Power BI", 
    "SAP",
    "CRM",
    "ERP",
    "Tableau"
  ]

  // Elementos flotantes empresariales
  const floatingElements = [
    { text: "MBA", position: "1", delay: 0 },
    { text: "CEO", position: "2", delay: 1 },
    { text: "ROI", position: "3", delay: 2 }
  ]

  return (
    <section className="business-hero">
      <div className="business-hero__container">
        <div className="business-hero__content">
          
          {/* Badge superior */}
          <div className="business-hero__badge-wrapper">
            <BusinessBadge text="Carrera con Mayor Proyección Empresarial" />
          </div>

          {/* Título principal con highlight */}
          <BusinessTitle highlightText="Empresas">
            Administración de Empresas
          </BusinessTitle>

          {/* Subtítulo descriptivo */}
          <BusinessSubtitle>
            Lidera el futuro empresarial. Conviértete en un profesional integral 
            capaz de dirigir organizaciones, tomar decisiones estratégicas y 
            generar valor en un entorno de negocios dinámico y competitivo.
          </BusinessSubtitle>

          {/* Características destacadas */}
          <BusinessFeaturesList features={features} />

          {/* Lista de herramientas */}
          <BusinessToolList 
            label="Herramientas que dominarás:"
            tools={tools}
          />

        </div>

        {/* Elemento visual lateral */}
        <div className="business-hero__visual">
          <BusinessDashboard />

          {/* Elementos flotantes decorativos */}
          <div className="business-hero__floating-elements">
            {floatingElements.map((element, index) => (
              <BusinessFloatingItem
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

export { BusinessHeroSection }