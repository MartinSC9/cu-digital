import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FiGlobe } from 'react-icons/fi';
import styles from './LanguageToggle.module.css';

const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage, t } = useLanguage();

  return (
    <button
      className={`${styles.languageToggle} ${currentLanguage === 'en' ? styles.en : styles.es}`}
      onClick={toggleLanguage}
      aria-label={t.aria.switchLanguage}
      title={t.aria.switchLanguage}
    >
      <div className={styles.toggleTrack}>
        <FiGlobe className={styles.globeIcon} />
        <span className={`${styles.langLabel} ${styles.labelEs}`}>ES</span>
        <span className={`${styles.langLabel} ${styles.labelEn}`}>EN</span>
        <div className={styles.toggleSlider} />
      </div>
    </button>
  );
};

export default LanguageToggle;
