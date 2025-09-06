import './computingHeroSection.css'
import { ComputingBadge } from '../atoms/computingBadge'
import { ComputingTitle } from '../atoms/computingTitle'
import { ComputingSubtitle } from '../atoms/computingSubtitle'
import { ComputingFeaturesList } from '../molecules/computingFeaturesList'
import { ComputingTechList } from '../molecules/computingTechList'
import { ComputingCodeBlock } from '../molecules/computingCodeBlock'
import { ComputingFloatingItem } from '../atoms/computingFloatingItem'

function ComputingHeroSection() {
  // Datos de características destacadas
  const features = [
    {
      icon: "⚡",
      title: "6 Semestres",
      description: "Título técnico profesional"
    },
    {
      icon: "💻",
      title: "100% Práctico",
      description: "Laboratorios especializados"
    },
    {
      icon: "🚀",
      title: "95% Empleabilidad",
      description: "Inserción laboral inmediata"
    }
  ]

  // Lista de tecnologías
  const technologies = [
    "JavaScript",
    "Python", 
    "React",
    "Node.js",
    "SQL Server",
    "AWS Cloud"
  ]

  // Elementos flotantes
  const floatingElements = [
    { text: "HTML5", position: "1", delay: 0 },
    { text: "CSS3", position: "2", delay: 1 },
    { text: "DB", position: "3", delay: 2 }
  ]

  return (
    <section className="computing-hero">
      <div className="computing-hero__container">
        <div className="computing-hero__content">
          
          {/* Badge superior */}
          <div className="computing-hero__badge-wrapper">
            <ComputingBadge text="Carrera con Mayor Demanda Laboral" />
          </div>

          {/* Título principal con highlight */}
          <ComputingTitle highlightText="Informática">
            Computación e Informática
          </ComputingTitle>

          {/* Subtítulo descriptivo */}
          <ComputingSubtitle>
            Forma parte de la revolución digital. Conviértete en un profesional 
            altamente capacitado en desarrollo de software, administración de sistemas 
            y tecnologías emergentes que transforman el mundo.
          </ComputingSubtitle>

          {/* Características destacadas */}
          <ComputingFeaturesList features={features} />

          {/* Lista de tecnologías */}
          <ComputingTechList 
            label="Tecnologías que dominarás:"
            technologies={technologies}
          />

        </div>

        {/* Elemento visual lateral */}
        <div className="computing-hero__visual">
          <ComputingCodeBlock />

          {/* Elementos flotantes decorativos */}
          <div className="computing-hero__floating-elements">
            {floatingElements.map((element, index) => (
              <ComputingFloatingItem
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

export { ComputingHeroSection }