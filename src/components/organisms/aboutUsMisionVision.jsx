import { IoIosArrowForward } from "react-icons/io";
import './aboutUsMisionVision.css'
import { AboutUsDescription } from '../molecules/aboutUsDescription'

const MisionVision =[
    {
        title :'Misión',
        text : 'Formar profesionales técnicos altamente capacitados mediante una educación de calidad, con tecnología moderna y un enfoque práctico que responda a las necesidades del mercado laboral, promoviendo valores éticos, responsabilidad social y pensamiento crítico. Nuestro compromiso es acompañar el desarrollo personal y profesional de cada estudiante, impulsando su potencial para que logren un impacto positivo y duradero en su comunidad.'
    },
    {
        title :'Visión',
        text : 'Ser el instituto líder en formación técnica en la región, reconocido por la excelencia académica, la innovación educativa y el compromiso con el desarrollo profesional de nuestros estudiantes. Aspiramos a impulsar una comunidad inclusiva y dinámica que fomente la creatividad y la mejora continua, convirtiéndonos en un referente nacional por la calidad de nuestros programas y el éxito de nuestros egresados.'
    },
    {
        title :'Propuesta de Valor',
        text : '“Formamos profesionales técnicos competentes en solo 3 años, con acceso a tecnología de vanguardia, enseñanza práctica y un enfoque 100% orientado a la empleabilidad, respaldados por 18 años de experiencia.”'
    }

]


const AboutUsMisionVision= () =>{
    const Title = 'Misión y Visión';
    
    return (
      <section className="section-aboutUsmv">
        <AboutUsDescription />
        <div className="about__container-mv">
          <div className="container__title">
            <h2 className="title--mivi">
              {Title} 
                <span>
                    <IoIosArrowForward />
                </span>
            </h2>
          </div>
          <div className="containaer__conte">
            {MisionVision.map((i, index) => {
              return (
                <li key={index} className="item__miVi">
                  <span className="item__titleM">{i.title}</span>
                  <span className="item__concept">{i.text}</span>
                </li>
              );
            })}
          </div>
        </div>
      </section>
    );
}

export {AboutUsMisionVision}