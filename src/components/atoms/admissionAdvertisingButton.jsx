// src/components/atoms/admissionAdvertisingButton.jsx
import './admissionAdvertisingButton.css';
import React, { useState, useRef, useEffect } from "react";

const AdvertisingButton = ({ text, options, src, onClick, variant = "primary" }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (options) {
      setOpen((prev) => !prev);
    } else if (onClick) {
      onClick();
    }
  };

  // 🔹 Cerrar dropdown si clicas fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="Adbtn-wrapper" ref={dropdownRef}>
      <button
        className={`Adbtn ${variant}`}
        onClick={toggleDropdown}
        src={src}
      >
        {text}
        {options && (
          <span className={`arrow ${open ? "open" : ""}`}>▼</span>
        )}
      </button>

      {options && (
        <ul className={`Adbtn-dropdown ${open ? "open" : ""}`}>
          {options.map((opt, idx) => (
            <li
              key={idx}
              onClick={() => {
                setOpen(false);
                if (onClick) onClick(opt);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { AdvertisingButton };
