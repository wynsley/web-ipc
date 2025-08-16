import './aboutMajorBanner.css'
import { AboutMajorHeading } from '../atoms/aboutMajorHeading'
import { AboutMajorPharagrap } from '../atoms/aboutMajorPharagrap'

const AboutMajorBanner = () =>{

    const Title='Plana Institucional'
    const Subtitle ='“Equipo institucional comprometido con la formación integral y la excelencia educativa.”'
    return (
        <section className='major-banner'>
            <AboutMajorHeading level={1}>{Title}</AboutMajorHeading>
            <AboutMajorPharagrap>{Subtitle}</AboutMajorPharagrap>
        </section>
    )

}

export {AboutMajorBanner}