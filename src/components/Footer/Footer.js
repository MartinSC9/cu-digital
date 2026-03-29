import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { portfolioInfo } from '../../config/portfolioInfo';

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToOrNavigate = (id) => {
    if (id === 'projects-page') {
      navigate('/projects');
      return;
    }

    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Columna izquierda: Info */}
          <div className="footer-main">
            <div className="footer-logo">{portfolioInfo.developer.name}</div>
            <div className="footer-description">
              {portfolioInfo.developer.title} — {portfolioInfo.developer.specialization}
            </div>
          </div>

          {/* Columna central: Enlaces rápidos */}
          <div className="footer-quick-links">
            <div className="footer-column-title">{t.footer.quickLinks}</div>
            {[
              { label: t.nav.home, id: 'hero' },
              { label: t.nav.about, id: 'about' },
              { label: t.nav.projects, id: 'projects-page' },
              { label: t.footer.faq, id: 'faq' },
            ].map(({ label, id }) => (
              <button
                key={id}
                className="footer-link-btn"
                onClick={() => scrollToOrNavigate(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Columna derecha: Contacto */}
          <div className="footer-contact-col">
            <div className="footer-column-title">{t.footer.contact}</div>
            <button
              className="footer-link-btn"
              onClick={() => scrollToOrNavigate('contact')}
            >
              {t.nav.contact}
            </button>
            <span className="footer-location">{t.footer.location}</span>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="footer-bottom">
          <span className="update-text">
            {t.footer.lastUpdate}: {portfolioInfo.lastUpdate.full}PM
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
