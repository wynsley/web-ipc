import React from 'react'
import './inputForm.css'

const Input =({label, type = 'text', name, value, onChange, placeholder}) =>(
    <div className='Container'>
        <label>{label}</label>
        <input className='input__container'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        />
    </div>
);

export {Input};