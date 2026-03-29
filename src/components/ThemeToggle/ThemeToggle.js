import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const ariaLabel = currentTheme === 'dark' ? t.aria.switchToLight : t.aria.switchToDark;

  return (
    <button
      className={`${styles['theme-toggle']} ${currentTheme === 'dark' ? styles['dark'] : styles['light']}`}
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <div className={styles['toggle-track']}>
        <div className={styles['toggle-slider']}>
          {/* Icono de Sol - visible cuando estás en modo oscuro (para cambiar a claro) */}
          <svg
            className={`${styles['theme-icon']} ${styles['sun-icon']}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>

          {/* Icono de Luna - visible cuando estás en modo claro (para cambiar a oscuro) */}
          <svg
            className={`${styles['theme-icon']} ${styles['moon-icon']}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
