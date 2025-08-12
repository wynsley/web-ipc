import './admisionCardSifts.css'
import { AdmisionCardImage } from '../atoms/admisionCardImage'
import { AdmisionCardText } from '../atoms/admisionCardText'


const AdmisionCardSifts = ({src, alt, title, time}) => {

    return (
        
        <div className='cardSifts'>
            <div className='cardSinfts__content'>
                <div className='cardSifts__image-wrapper'>
                <AdmisionCardImage src={src} alt={alt}/>
                </div>
                <AdmisionCardText title={title} time={time}/>
            </div>
            
        </div>  
    )
}

export {AdmisionCardSifts}