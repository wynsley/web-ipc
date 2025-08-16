import React from "react";

const AboutBeginningIcon = ({ icon: Icon, color='#d4afafff' }) => {
    return (
    <div
      className="icon-circle"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {Icon && <Icon className="icon-circle__glyph" />}
    </div>
  );
};

export {AboutBeginningIcon}