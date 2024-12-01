// Tooltip.js
import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ children, content, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && content && (
        <div className={`tooltip-box ${position}`}>{content}</div>
      )}
    </div>
  );
};

export default Tooltip;
