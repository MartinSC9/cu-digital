import React from 'react';
import './MobileNavbar.css';

const MobileNavToggle = ({ isOpen, onClick, ariaLabel, ariaExpanded }) => {
  return (
    <button
      className={`mobile-nav-toggle ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      <div className="hamburger">
        <span className="line line-1"></span>
        <span className="line line-2"></span>
        <span className="line line-3"></span>
      </div>
    </button>
  );
};

export default MobileNavToggle;
