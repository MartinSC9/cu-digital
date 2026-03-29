import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../config/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
};

const safeLocalStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silenciar error
    }
  },
};

const detectBrowserLanguage = () => {
  try {
    const lang = navigator.language || navigator.userLanguage || 'es';
    return lang.startsWith('en') ? 'en' : 'es';
  } catch {
    return 'es';
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = safeLocalStorage.getItem('portfolio-language');
    if (saved && translations[saved]) return saved;
    return detectBrowserLanguage();
  });

  // Persistir en localStorage
  useEffect(() => {
    safeLocalStorage.setItem('portfolio-language', currentLanguage);
    // Actualizar lang del documento
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage === 'es' ? 'es-AR' : 'en-US';
    }
  }, [currentLanguage]);

  const toggleLanguage = useCallback(() => {
    setCurrentLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const t = translations[currentLanguage] || translations.es;

  const value = {
    currentLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};
