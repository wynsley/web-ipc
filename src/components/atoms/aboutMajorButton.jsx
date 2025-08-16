import './aboutMajorButton.css'

const AboutMajorButton = ({text, url}) =>{

    return(
        <a 
            className='major-btn' 
            href={url}
            target='_black'
            rel='noopener noreferrer'
        > 
            {text}
        </a>
    )
}

export {AboutMajorButton}