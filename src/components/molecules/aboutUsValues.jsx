import './aboutUsValues.css'
import React from 'react'

const ValueCard = (
    {
    icon: Icon,
    title, 
    description,
    color }) =>{
    return (
        <div className='value-card'
        
        style={{ boxShadow: `0 8px 25px ${color.includes("linear-gradient") ? "rgba(0,0,0,0.2)" : color}`,}}>
            
            <div className='value-card__icon ' style={{background: color}}>
                {Icon && <Icon size={30} color= '#fff'/>}
            </div>
            <h3 className='value__title'>{title}</h3>
            <p className='value__description'>{description}</p>
        </div>
    )   
}

export {ValueCard}