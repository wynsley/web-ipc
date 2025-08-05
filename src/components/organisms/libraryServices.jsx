import React from 'react'
import './libraryServices.css'
import { ButtonServices } from '../atoms/buttonServices'
import ImgLibrary from '../../assets/img/biblioteca.jpg'



function LibraryService (){
const Title = 'SERVICIOS DE BIBLIOTECA'

    return (
        <section className='section'>
            <h2 className='servicesTitle library'>{Title}</h2>
            <div className='img__container'>
                <img className='img__library' src={ImgLibrary} alt="Biblioteca virtual" />
            </div>
            <ButtonServices/>
        </section>
    )
}

export {LibraryService}