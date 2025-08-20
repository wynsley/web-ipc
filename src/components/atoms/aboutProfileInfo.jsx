import './aboutProfileInfo.css'

const AboutProfileInfo = ({ post, experience, phrase }) => {
  return (
    <div className='profile-info'>
      <div className='profile__post'>
        <h4>Cargo</h4>
        <p>{post}</p>
      </div>

      <div className='profile__experience'>
        <h4>Experiencia</h4>
        <p>{experience}</p>
      </div>

      <div className='profile__contact'>
        <h4>Frase</h4>
        <p>{phrase}</p>
      </div>
    </div>
  )
}

export { AboutProfileInfo }
