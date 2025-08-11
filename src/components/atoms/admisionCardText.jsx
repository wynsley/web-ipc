import './admisionCardText.css'

const AdmisionCardText = ({title, time}) => {

    return (
        <div className='container-card-text'>
            <h3 className='card__title'>{title}</h3>
            <p className='card__time'>{time}</p>
        </div>
    )
}

export {AdmisionCardText}