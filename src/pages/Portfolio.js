import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

import SkillsShowcase from '../components/SkillsShowcase';
import GitTimeline from '../components/GitTimeline';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';

import {
  FaWhatsapp,
  FaGlobe,
  FaLaptopCode,
  FaMobileAlt,
  FaDesktop,
  FaChevronDown,
  FaShieldAlt,
  FaClock,
  FaSyncAlt,
  FaRocket,
  FaRobot,
  FaMicrochip,
  FaUserTie,
} from 'react-icons/fa';
import avatarImage from '../assets/logo-cu.svg';
import heroBg1 from '../assets/videos/hero-bg-1.mp4';
import heroBg2 from '../assets/videos/hero-bg-2.mp4';

const heroVideos = [heroBg2, heroBg1];

// Las imágenes de proyectos se importan en GitTimeline.js donde se utilizan

export default function Portfolio() {
  const { currentTheme } = useTheme();
  const { t } = useLanguage();
  const [expandedService, setExpandedService] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideo]);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const WHATSAPP_NUMBER = '5492804195492';
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.contact.defaultMessage)}`;

  // Restaurar posición de scroll al volver de un detalle de proyecto
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get('scrollTo');
    if (scrollTo) {
      // Limpiar el query param
      window.history.replaceState({}, '', '/');
      requestAnimationFrame(() => {
        const el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }
    const savedY = sessionStorage.getItem('scrollY');
    if (savedY) {
      sessionStorage.removeItem('scrollY');
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedY, 10));
      });
    }
  }, []);

  return (
    <>
      <SEO
        title="Portfolio"
        description={t.seo.description}
        keywords={t.seo.keywords}
      />
      <div className="portfolio" data-theme={currentTheme}>

        {/* Hero Section */}
          <section className="hero" style={{ position: 'relative' }}>
          <video
            ref={videoRef}
            className="hero-video-bg"
            autoPlay
            muted
            playsInline
            aria-hidden="true"
            src={heroVideos[currentVideo]}
            onEnded={() => {
              const next = (currentVideo + 1) % heroVideos.length;
              setCurrentVideo(next);
            }}
          />
          <div className="section-bg-overlay"></div>
            <div className="hero-container">
              <div className="hero-content hero-content--with-avatar">
                <div className="hero-center">
                  <h1 className="hero-title">
                    {t.hero.title}
                    <span className="hero-subtitle">
                      {t.hero.subtitle}
                    </span>
                  </h1>
                  {t.hero.description && (
                    <p className="hero-description">
                      {t.hero.description}
                    </p>
                  )}
                  <div className="hero-buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => scrollToSection('services')}
                    >
                      {t.hero.cta}
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => scrollToSection('projects')}
                    >
                      {t.hero.ctaSecondary}
                    </button>
                  </div>
                </div>
                <div className="hero-avatar">
                  <img src={avatarImage} alt="CU Digital" className="hero-avatar-img" />
                </div>
              </div>
            </div>
          </section>

        {/* Services Section */}
          <section id="services" className="services-section">
            <div className="services-container">
              <div className="services-header">
                <h2 className="section-title section-title-center">
                  {t.services.sectionTitle}
                </h2>

              </div>
              <div className="services-cards">
                {[
                  { icon: FaGlobe, ...t.services.landing, includes: t.services.landingIncludes, highlight: true, filterCategory: 'landing' },
                  { icon: FaLaptopCode, ...t.services.webapp, includes: t.services.webappIncludes, filterCategory: 'webapp' },
                  { icon: FaMobileAlt, ...t.services.mobile, includes: t.services.mobileIncludes, filterCategory: 'mobile' },
                  { icon: FaDesktop, ...t.services.desktop, includes: t.services.desktopIncludes, filterCategory: 'desktop' },
                  { icon: FaRocket, ...t.services.upgrade, includes: t.services.upgradeIncludes },
                  { icon: FaRobot, ...t.services.automation, includes: t.services.automationIncludes },
                  { icon: FaMicrochip, ...t.services.iot, includes: t.services.iotIncludes },
                  { icon: FaUserTie, ...t.services.consulting, includes: t.services.consultingIncludes },
                ].map((service, i) => {
                  const Icon = service.icon;
                  const isExpanded = expandedService === i;
                  return (
                    <div key={i} className={`service-card${isExpanded ? ' service-card--expanded' : ''}${service.highlight ? ' service-card--highlight' : ''}`}>
                      {service.badge && (
                        <span className="service-card-badge">{service.badge}</span>
                      )}
                      <div className="service-card-header" onClick={() => setExpandedService(isExpanded ? null : i)}>
                        <div className="service-card-icon">
                          <Icon />
                        </div>
                        <div className="service-card-header-text">
                          <h3 className="service-card-title">{service.title}</h3>
                          {service.price && (
                            <span className="service-card-price">{service.price}</span>
                          )}
                        </div>
                        <FaChevronDown className={`service-card-chevron${isExpanded ? ' service-card-chevron--open' : ''}`} />
                      </div>
                      <div className="service-card-body">
                        <p className="service-card-desc">{service.description}</p>
                        <ul className="service-card-includes">
                          {service.includes.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="services-cta">
                <button
                  className="btn btn-primary btn-pulse"
                  onClick={() => scrollToSection('contact')}
                >
                  {t.services.contactCta}
                </button>
              </div>
            </div>
          </section>

        {/* Process Section */}
          <section id="process" className="process-section">
            <div className="process-container">
              <div className="process-header">
                <h2 className="section-title section-title-center">
                  {t.process.title}
                </h2>
                <p className="process-subtitle">{t.process.subtitle}</p>
              </div>
              <div className="process-steps">
                {t.services.steps.map((step, i) => (
                  <div key={i} className="process-step">
                    <div className="process-step-number">{step.number}</div>
                    <div className="process-step-content">
                      <h3 className="process-step-title">{step.title}</h3>
                      <p className="process-step-desc">{step.description}</p>
                    </div>
                    {i < t.services.steps.length - 1 && (
                      <div className="process-step-connector"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="process-cta">
                <button
                  className="btn btn-primary"
                  onClick={() => scrollToSection('contact')}
                >
                  {t.process.cta}
                </button>
              </div>
            </div>
          </section>

        {/* Projects Section */}
            <section id="projects" className="projects">
              <div className="projects-container">
                <div className="projects-header">
                  <h2 className="section-title section-title-center">
                    {t.projects.title}
                  </h2>
                  <p className="projects-subtitle">{t.projects.subtitle}</p>
                </div>
                <GitTimeline />
              </div>
            </section>

        {/* About Section */}
          <section id="about" className="about">
            <div className="about-container">
              <div className="about-content">
                <div className="about-text" style={{ maxWidth: '100%' }}>
                  <h2 className="section-title">
                    {t.about.title}
                  </h2>
                  <div className="about-description">
                    {t.about.description.map((paragraph, index) => (
                      <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                  </div>
                  <div className="about-info">
                    <div className="info-item">
                      <svg
                        className="info-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {t.about.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Experience Section */}
          <section id="experience" className="experience">
            <div className="experience-container">
              <div className="experience-header">
                <h2 className="section-title section-title-center">
                  {t.experience.title}
                </h2>
              </div>
              <div className="experience-cards">
                <div className="experience-card">
                  <div className="timeline-header">
                    <h3 className="timeline-title">
                      {t.experience.freelance.title}
                    </h3>
                    <span className="timeline-period">
                      {t.experience.freelance.period}
                    </span>
                  </div>
                  <div className="timeline-company">
                    {t.experience.freelance.company}
                  </div>
                  <ul className="timeline-list">
                    {t.experience.freelance.description.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

        {/* Skills Showcase Section */}
          <SkillsShowcase />

        {/* FAQ Section */}
          <section id="faq" className="faq-section">
            <div className="faq-container">
              <div className="faq-header">
                <h2 className="section-title section-title-center">
                  {t.faq.title}
                </h2>
              </div>
              <div className="faq-list">
                {t.faq.items.map((item, i) => {
                  const isOpen = expandedFaq === i;
                  return (
                    <div key={i} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                      <button
                        className="faq-question"
                        onClick={() => setExpandedFaq(isOpen ? null : i)}
                      >
                        <span>{item.question}</span>
                        <FaChevronDown className={`faq-chevron${isOpen ? ' faq-chevron--open' : ''}`} />
                      </button>
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        {/* Guarantee Section */}
          <section className="guarantee-section">
            <div className="guarantee-container">
              <h2 className="section-title section-title-center">{t.guarantee.title}</h2>
              <div className="guarantee-grid">
                {t.guarantee.items.map((item, i) => {
                  const icons = { shield: FaShieldAlt, clock: FaClock, refresh: FaSyncAlt };
                  const Icon = icons[item.icon];
                  return (
                    <div key={i} className="guarantee-item">
                      <div className="guarantee-icon"><Icon /></div>
                      <p className="guarantee-text">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        {/* Contact Section */}
          <section id="contact" className="contact">
            <div className="contact-container">
              <div className="contact-header">
                <h2 className="section-title section-title-center">
                  {t.contact.title}
                </h2>
                <p className="contact-subtitle">{t.contact.subtitle}</p>
              </div>
              <div className="contact-body contact-body--centered">
                <div className="contact-form-wrapper" style={{ textAlign: 'center' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-submit"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      padding: '1rem 2.5rem',
                    }}
                  >
                    <FaWhatsapp style={{ fontSize: '1.4rem' }} />
                    {t.contact.send}
                  </a>
                </div>
              </div>
            </div>
          </section>

        <Footer />



      </div>
    </>
  );
}
