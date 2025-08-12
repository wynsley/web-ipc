import React from 'react';
import './economicServices.css'

const Card = ({ title,mont, description, number }) => {
  return (
    <div className="card__wrapper">
      <div className="card">
        <div className="card__body">
          <div className="card__icon"></div>
          <h3 className="cad__title">{title}</h3>
          <p className='card__mont'>{mont}</p>
          <p className="card__paragraph">{description}</p>
        </div>
        <div className="card__ribbon">
          <label className="card__ribbon-label">{number}</label>
        </div>
      </div>
    </div>
  );
};

export  {Card};
