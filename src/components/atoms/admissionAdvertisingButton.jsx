// src/components/atoms/admissionAdvertisingButton.jsx
import './admissionAdvertisingButton.css';
import React, { useState, useRef, useEffect } from "react";

const AdvertisingButton = ({ text, options, href, onClick, variant = "primary" }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    if (options) {
      e.preventDefault(); // evita que el enlace navegue si es dropdown
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
      <a
        className={`Adbtn ${variant}`}
        onClick={toggleDropdown}
        href={href}   // ✅ usamos href en vez de src
      >
        {text}
        {options && (
          <span className={`arrow ${open ? "open" : ""}`}>▼</span>
        )}
      </a>

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
