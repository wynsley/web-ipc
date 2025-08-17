import { AboutMajorBanner } from "../organisms/aboutMajorBanner";
import { AboutMajorRedSection } from "../organisms/aboutMajorRedSection";
import { AboutMajorCarruselLegacy } from "../organisms/aboutMajorCarruselLegacy";
import { AboutProfileCarousel } from "../organisms/aboutProfileTeachers";

const AboutMajors = () =>{

    return (
        <>
            <AboutMajorBanner/>
            <AboutProfileCarousel/>
            <AboutMajorRedSection/>
            <AboutMajorCarruselLegacy/>
        </>
    )
}

export {AboutMajors}