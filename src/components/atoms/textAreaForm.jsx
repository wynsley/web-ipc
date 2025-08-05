import React from 'react';
import './textAreaForm.css';

const TextArea = ({ label, name, value, onChange, placeholder }) => (
  <div className="Text--container">
    <label>{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

export {TextArea};