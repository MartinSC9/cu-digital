import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { FiArrowLeft } from 'react-icons/fi';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import MobileNavbar, { MobileNavToggle } from '../MobileNavbar';
import logoImg from '../../assets/logo-cu-icon.png';

const Header = () => {
  const { currentTheme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scroll when arriving at home (e.g. /#projects)
  useEffect(() => {
    if (isHome && location.hash) {
      const hash = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [isHome, location.hash]);

  // Detect active section on home page
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = ['home', 'services', 'projects', 'about', 'experience', 'skills-showcase', 'soft-skills', 'contact'];
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerHeight + 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const scrollToSection = useCallback((sectionId) => {
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        setActiveSection(sectionId);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  }, [isHome, navigate]);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} data-theme={currentTheme}>
        <div className="header-container">
          {isHome ? (
            <div
              className="logo"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
              }}
              style={{ cursor: 'pointer' }}
            >
              <img src={logoImg} alt="CU Digital" className="logo-icon" />
            </div>
          ) : (
            <button
              className="header-back-btn"
              onClick={() => {
                if (location.pathname === '/projects') {
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                } else {
                  navigate(-1);
                }
              }}
              type="button"
            >
              <FiArrowLeft />
            </button>
          )}
          <nav className="nav">
            <button onClick={() => scrollToSection('services')} className={`nav-link ${isHome && activeSection === 'services' ? 'nav-link-active' : ''}`} type="button">
              <span>{t.services.navLabel}</span>
            </button>
            <button onClick={() => scrollToSection('projects')} className={`nav-link ${isHome && activeSection === 'projects' ? 'nav-link-active' : ''}`} type="button">
              <span>{t.nav.projects}</span>
            </button>
            <button onClick={() => scrollToSection('about')} className={`nav-link ${isHome && activeSection === 'about' ? 'nav-link-active' : ''}`} type="button">
              <span>{t.nav.about}</span>
            </button>
            <button onClick={() => scrollToSection('experience')} className={`nav-link ${isHome && activeSection === 'experience' ? 'nav-link-active' : ''}`} type="button">
              <span>{t.nav.experience}</span>
            </button>
            <button onClick={() => scrollToSection('contact')} className={`nav-link ${isHome && activeSection === 'contact' ? 'nav-link-active' : ''}`} type="button">
              <span>{t.nav.contact}</span>
            </button>
          </nav>
          <div className="header-buttons">
            <LanguageToggle />
          </div>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            ariaLabel={isMobileMenuOpen ? t.aria.closeMenu : t.aria.openMenu}
            ariaExpanded={isMobileMenuOpen}
          />
        </div>
      </header>

      <MobileNavbar
        activeSection={isHome ? activeSection : ''}
        scrollToSection={scrollToSection}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
    </>
  );
};

export default Header;
