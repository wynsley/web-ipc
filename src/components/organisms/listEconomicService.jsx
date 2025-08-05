import React from 'react';
import { Card } from '../molecules/economicService';
import './listEconomicService.css';

const CardList = () => {
  const cards = [
    {
      title: 'Inscripción',
      mont: 'S/ 100 ',
      description: '¡Tu futuro empieza hoy! Inscríbete ahora y da el primer paso hacia una educación de calidad.',
      number: '01',
    },
    {
      title: 'Matrícula',
      mont: 'S/ 100',
      description: 'Matrícula abierta: Asegura tu vacante y forma parte de nuestra comunidad educativa.',
      number: '02',
    },
    {
      title: 'Mensualidad',
      mont: 'S/ 200',
      description: ' El monto que pagarás en nuestro Instituto está al alance de tu bolcillo. ¡Te esperamos!',
      number: '03',
    },
  ];

  return (
    <div className="cardlist__container">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          mont={card.mont}
          description={card.description}
          number={card.number}
        />
      ))}
    </div>
  );
};

export  {CardList}

