import React from "react";
import { AboutBeginningIcon } from "../atoms/aboutUsBeginningIcon";
import { AboutBeginningTitle } from "../atoms/aboutUsBeginningTitle";
import { AboutBeginningParagraph } from "../atoms/aboutUsBeginningParag";

const AboutCardBeginning = ({ icon, title, paragraph }) => {
  return (
    <div className="card-principio">
      <AboutBeginningIcon>{icon}</AboutBeginningIcon>
      <AboutBeginningTitle text={title} />
      <AboutBeginningParagraph text={paragraph} />
    </div>
  );
};

export {AboutCardBeginning}