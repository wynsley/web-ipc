import './aboutProfileImg.css'

const AboutProfileImg = ({img, alt}) => {

    return (
        <div className='cardMajor__img'>
            <img className='img__Profile' src={img} alt={alt} />
        </div>
    )
}

export {AboutProfileImg}