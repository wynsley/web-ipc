import './businessStudyPlan.css'
import { BusinessStudyGrid } from '../molecules/businessStudyGrid'

function BusinessStudyPlan() {
  // Plan de estudios de Administración de Empresas - 6 semestres
  const studyPlanData = [
    {
      semester: "I Semestre",
      courses: [
        "Introducción a la Administración",
        "Matemática Empresarial",
        "Inglés Empresarial I",
        "Comunicación Corporativa",
        "Metodología del Trabajo Universitario"
      ]
    },
    {
      semester: "II Semestre", 
      courses: [
        "Administración General",
        "Estadística Empresarial",
        "Inglés Empresarial II",
        "Contabilidad General",
        "Comportamiento Organizacional"
      ]
    },
    {
      semester: "III Semestre",
      courses: [
        "Gestión Financiera I",
        "Marketing Estratégico",
        "Gestión de Recursos Humanos I",
        "Derecho Empresarial",
        "Investigación de Mercados"
      ]
    },
    {
      semester: "IV Semestre",
      courses: [
        "Gestión Financiera II",
        "Marketing Digital",
        "Gestión de Recursos Humanos II", 
        "Gestión de Operaciones",
        "Emprendimiento y Plan de Negocios"
      ]
    },
    {
      semester: "V Semestre",
      courses: [
        "Gestión Estratégica",
        "Finanzas Corporativas",
        "Liderazgo y Negociación",
        "Gestión de Proyectos",
        "Comercio Internacional"
      ]
    },
    {
      semester: "VI Semestre",
      courses: [
        "Gerencia General",
        "Gestión de la Calidad",
        "Responsabilidad Social Empresarial",
        "Seminario de Tesis",
        "Práctica Profesional"
      ]
    }
  ]

  return (
    <section className="business-study-plan">
      <div className="business-study-plan__container">
        
        {/* Header de la sección */}
        <div className="business-study-plan__header">
          <h2 className="business-study-plan__title">
            Plan de <span className="business-study-plan__title--highlight">Estudios</span>
          </h2>
          <p className="business-study-plan__subtitle">
            Currícula actualizada diseñada para formar líderes empresariales integrales 
            con visión estratégica y competencias gerenciales del siglo XXI
          </p>
        </div>

        {/* Grid de semestres */}
        <BusinessStudyGrid semestersData={studyPlanData} />

        {/* Footer informativo */}
        <div className="business-study-plan__footer">
          <div className="business-study-plan__info">
            <div className="business-study-plan__info-item">
              <span className="business-study-plan__info-number">6</span>
              <span className="business-study-plan__info-label">Semestres</span>
            </div>
            <div className="business-study-plan__info-item">
              <span className="business-study-plan__info-number">30</span>
              <span className="business-study-plan__info-label">Asignaturas</span>
            </div>
            <div className="business-study-plan__info-item">
              <span className="business-study-plan__info-number">3</span>
              <span className="business-study-plan__info-label">Años</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export { BusinessStudyPlan }