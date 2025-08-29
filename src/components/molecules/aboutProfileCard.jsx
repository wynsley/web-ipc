// AboutProfileCard.jsx
import './aboutProfileCard.css'
import { AboutProfileImg } from '../atoms/AboutProfileImg'
import { AboutProfileInfo } from '../atoms/AboutProfileInfo'
import { AboutProfileName } from '../atoms/AboutProfileName'
import { AboutProfileStats } from '../atoms/AboutProfileStats'

const AboutProfileCard = ({ name, speciality,experience, img, stats, post, phrase }) => {
  return (
    <div className='profile-card'>
      <div className='profileT-card__up'>
        <AboutProfileImg img={img} alt={name} />
        <AboutProfileName name={name} speciality={speciality} />
      </div>

      <div className='profileT-card__down'> 
        <div className='profileT-divider'></div>
        <AboutProfileStats stats={stats} />
        <AboutProfileInfo post={post} experience={experience} phrase={phrase} />
      </div>
    </div>
  )
}

export { AboutProfileCard }
