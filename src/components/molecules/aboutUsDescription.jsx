import './aboutUsDescription.css'

const AboutUsDescription = () => {
    const Title= 'NOSOSTROS'
    const AboutDesc = '"En el Instituto Privado Celendín formamos líderes con visión, compromiso y excelencia. Con tecnología de vanguardia y un enfoque práctico, preparamos a nuestros estudiantes para destacar en el mundo profesional. Somos más que educación: somos el impulso hacia un futuro exitoso."'
    return (
        <div className='contain-aboutD'>
            <h1 className='about__title'>{Title}</h1>
            <p className='about__description'>{AboutDesc}</p>
        </div>
    )
}

export {AboutUsDescription}