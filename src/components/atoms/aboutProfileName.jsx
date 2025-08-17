import './aboutProfileName.css'

const AboutProfileName = ({name, speciality})  =>{

    return (
        <div className='profile-name'>
            <h3 className='name__teachers'>{name}</h3>
            <p className='name__speciality'>{speciality}</p>
        </div>
    )
}

export  {AboutProfileName}