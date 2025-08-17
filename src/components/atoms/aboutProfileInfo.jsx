import './aboutProfileInfo.css'

const AboutProfileInfo = ({ post, experience, contact }) => {
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
        <h4>Contacto</h4>
        <p>{contact}</p>
      </div>
    </div>
  )
}

export { AboutProfileInfo }
