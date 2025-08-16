import React from "react";
import { AboutBeginningIcon } from "../atoms/aboutUsBeginningIcon";

const AboutCardBeginning = ({ icon, color, title, description }) => {
    return (
    <div className="step-card" role="group" aria-label={title}>
      <AboutBeginningIcon icon={icon} color={color} />
      <h3 className="step-title">{title}</h3>
      <p className="step-desc">{description}</p>
    </div>
  );
};

export {AboutCardBeginning}