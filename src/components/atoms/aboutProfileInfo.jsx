import './aboutProfileInfo.css'

const AboutProfileInfo = ({ post, experience }) => {
  return (
    <div className='profile-info'>
      <div className='profile__post '>
        <h4>Cargo</h4>
        <p>{post}</p>
      </div>

      <div className='profile__experience '>
        <h4>Experiencia</h4>
        <p>{experience}</p>
      </div>

      <div className='profile__ipc '>
        <h4>Instituto Privado Celendín</h4>
      </div>
    </div>
  )
}

export { AboutProfileInfo }
