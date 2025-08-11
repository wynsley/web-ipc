import './admisionCardImage.css'
import React from 'react'

const AdmisionCardImage = ({src, alt}) => {

    return(
        <div className='container-image'>
            <img className='container-image__img' src={src} alt={alt} />
        </div>
    )
}

export {AdmisionCardImage}

