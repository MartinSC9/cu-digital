import React, { useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './MobileNavbar.css';

const MobileNavbar = ({
  activeSection,
  scrollToSection,
  isOpen,
  setIsOpen,
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const handleSectionClick = useCallback(
    (sectionId) => {
      if (sectionId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        scrollToSection(sectionId);
      }

      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    },
    [scrollToSection, setIsOpen]
  );

  const navItems = [
    { id: 'services', label: t.services.navLabel },
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <div className="mobile-navbar" data-theme="light">
      <div
        className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`mobile-nav-menu ${isOpen ? 'open' : ''}`}
        data-theme="light"
      >
        <div className="mobile-nav-header">
          <button
            className="mobile-nav-close"
            onClick={() => setIsOpen(false)}
            aria-label={t.aria.closeMenu}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-nav-links">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                style={{
                  animationDelay: `${index * 0.07}s`,
                }}
              >
                <span className="mobile-nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mobile-nav-footer">
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
