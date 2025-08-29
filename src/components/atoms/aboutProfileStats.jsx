import React, { useState, useEffect, useRef } from 'react';
import './aboutProfileStats.css';

const AboutProfileStats = ({ stats, closeTrigger }) => {
  const [openStates, setOpenStates] = useState(stats.map(() => false));
  const containerRef = useRef(null);

  // 👉 cerrar todos los desplegados
  const closeAll = () => setOpenStates(stats.map(() => false));

  // 👉 toggle individual
  const toggleItem = (index) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : false))
    );
  };

  // 👉 cerrar si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeAll();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 👉 cerrar si el carrusel avanza (cuando cambie closeTrigger)
  useEffect(() => {
    if (closeTrigger) {
      closeAll();
    }
  }, [closeTrigger]);

  return (
    <div className='profile-stats' ref={containerRef}>
      {stats.map((item, idx) => (
        <div key={idx} className='stat-item'>
          <button
            className={`stats__profile stats__profileColor-${idx}`}
            onClick={() => toggleItem(idx)}
          >
            {openStates[idx] ? `- ${item.label}` : `+ ${item.label}`}
          </button>
          <div
            className={`stats__list-wrapper ${
              openStates[idx] ? 'open' : ''
            }`}
          >
            <ul className='stats__list'>
              {item.value.split(',').map((val, i) => (
                <li key={i}>{val.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export { AboutProfileStats };
