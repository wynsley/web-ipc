import React, { useState } from 'react';
import './aboutProfileStats.css';

const AboutProfileStats = ({ stats }) => {
  const [openStates, setOpenStates] = useState(
    stats.map(() => false)
  );

  const toggleItem = (index) => {
    setOpenStates(prev =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className='profile-stats'>
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
