import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiArrowLeft } from 'react-icons/fi';
import { FaEnvelope } from 'react-icons/fa';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle/LanguageToggle';
import AnimatedSection from '../components/AnimatedSection';
import styles from './Services.module.css';

export default function Services() {
  const { t } = useLanguage();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper} data-theme={currentTheme}>

      {/* Sticky header */}
      <header className={styles.stickyHeader}>
        <div className={styles.stickyHeaderInner}>
          <button className={styles.backBtn} onClick={() => {
            const origin = sessionStorage.getItem('process-origin') || 'services';
            sessionStorage.removeItem('process-origin');
            navigate(`/?scrollTo=${origin}`);
          }}>
            <FiArrowLeft />
            <span>{t.services.back}</span>
          </button>
          <div style={{ flex: 1 }} />
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className={styles.content}>
        {/* Process timeline */}
        <AnimatedSection animation="fade-in-up" delay={0}>
          <section className={styles.processSection}>
            <h2 className={styles.processTitle}>{t.services.processTitle}</h2>
            <div className={styles.timeline}>
              {t.services.steps.map((step, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineNumber}>{step.number}</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>{step.title}</h3>
                    <p className={styles.timelineDesc}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Final CTA */}
        <AnimatedSection animation="fade-in-up" delay={0.2}>
          <section className={styles.ctaSection}>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/?scrollTo=contact')}
            >
              <FaEnvelope className="btn-icon" />
              {t.services.finalCta}
            </button>
          </section>
        </AnimatedSection>
      </main>
    </div>
  );
}
