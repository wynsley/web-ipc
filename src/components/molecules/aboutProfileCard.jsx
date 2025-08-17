// AboutProfileCard.jsx
import './aboutProfileCard.css'
import { AboutProfileImg } from '../atoms/AboutProfileImg'
import { AboutProfileInfo } from '../atoms/AboutProfileInfo'
import { AboutProfileName } from '../atoms/AboutProfileName'
import { AboutProfileStats } from '../atoms/AboutProfileStats'

const AboutProfileCard = ({ name, speciality,experience, img, stats, post, contact }) => {
  return (
    <div className='profile-card'>
      <div className='profileT-card__left'>
        <AboutProfileImg img={img} alt={name} />
        <AboutProfileStats stats={stats} />
      </div>

      <div className='profileT-card__right'>
        <AboutProfileName name={name} speciality={speciality} />
        <div className='profileT-divider'></div>
        <AboutProfileInfo post={post} experience={experience} contact={contact} />
      </div>
    </div>
  )
}

export { AboutProfileCard }
