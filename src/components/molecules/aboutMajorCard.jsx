import './aboutMajorCard.css'
import { AboutMajorCImg } from '../atoms/aboutMajorCImg'
import { AboutMajorHeading } from '../atoms/aboutMajorHeading'
import { AboutMajorPharagrap } from '../atoms/aboutMajorPharagrap'

const AboutMajorCard =({title, text}) =>{
     return (
        <div className='majorus-card'>
            <AboutMajorCImg/>
            <AboutMajorHeading level={1}> {title}</AboutMajorHeading>
            <AboutMajorPharagrap>{text}</AboutMajorPharagrap>
        </div>
     )
}

export {AboutMajorCard}