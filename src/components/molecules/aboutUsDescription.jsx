import './aboutUsDescription.css'

const AboutUsDescription = () => {
    const Title= 'NOSOSTROS'
    const AboutDesc = 'Con una formación técnica de primer nivel y un enfoque que combina teoría, práctica e innovación, nuestro Instituto se ha consolidado como un referente en educación superior técnica. Reconocido por sus premios en innovación educativa, cuenta con una infraestructura moderna y equipada con las mejores tecnologías, asegurando un aprendizaje de calidad. Sus valores de responsabilidad, innovación y compromiso marcan la diferencia en la preparación de sus estudiantes. Todo esto respaldado por 18 años de experiencia al servicio de la educación.'
    return (
        <div className='contain-aboutD'>
            <h1 className='about__title'>{Title}</h1>
            <p className='about__description'>{AboutDesc}</p>
        </div>
    )
}

export {AboutUsDescription}