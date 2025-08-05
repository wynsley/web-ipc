import React from 'react';
import './selectCareerForm.css';

const SelectCareer = ({ label, name, value, onChange, options }) => (
  <div className="select-container">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      <option value="">Seleccione una carrera</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export  {SelectCareer};