import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

// Definición de temas - solo modo claro y oscuro
const themes = {
  light: {
    name: 'Claro',
    colors: {
      primary: '#1a6fb5',
      primaryDark: '#14527f',
      secondary: '#7c5ce0',
      secondaryDark: '#6344c4',
      accent: '#0d9668',
      accentDark: '#077a54',
      muted: '#64748b',
      mutedLight: '#f1f5f9',
      border: '#e2e8f0',
      background: '#ffffff',
      foreground: '#0f172a',
      sidebar: '#f8fafc',
      sidebarForeground: '#475569',
      backgroundRgb: '255, 255, 255',
      borderRgb: '226, 232, 240',
      // Variables para colores blancos atenuados - tema claro
      whiteSoft: 'rgba(255, 255, 255, 0.95)',
      whiteSoft90: 'rgba(255, 255, 255, 0.9)',
      whiteSoft80: 'rgba(255, 255, 255, 0.8)',
      whiteSoft70: 'rgba(255, 255, 255, 0.7)',
      whiteSoft50: 'rgba(255, 255, 255, 0.5)',
      whiteSoft30: 'rgba(255, 255, 255, 0.3)',
      whiteSoft20: 'rgba(255, 255, 255, 0.2)',
      whiteSoft10: 'rgba(255, 255, 255, 0.1)',
      whiteSoft05: 'rgba(255, 255, 255, 0.05)',
      // Variables para fondos suaves - tema claro
      backgroundSoft: '#f1f5f9',
      backgroundSofter: '#e2e8f0',
      backgroundMuted: '#cbd5e1',
      primaryGradient:
        'linear-gradient(135deg, #2a5f8a 0%, #e4d5c2 50%, #fafbfc 100%)',
      primaryGradientHover:
        'linear-gradient(135deg, #233650 0%, #d4c5b2 50%, #f5f6f7 100%)',
    },
  },
  dark: {
    name: 'Oscuro',
    colors: {
      primary: '#3a7bb5',
      primaryDark: '#2a5f8a',
      secondary: '#a78bfa',
      secondaryDark: '#8b5cf6',
      accent: '#10b981',
      accentDark: '#059669',
      muted: '#9ca3af',
      mutedLight: '#1f2937',
      border: '#374151',
      background: '#0e1a2b',
      foreground: '#e2e8f0',
      sidebar: '#182438',
      sidebarForeground: '#94a3b8',
      backgroundRgb: '14, 26, 43',
      borderRgb: '55, 65, 81',
      // Variables para colores blancos atenuados - tema oscuro (más suaves)
      whiteSoft: 'rgba(255, 255, 255, 0.8)',
      whiteSoft90: 'rgba(255, 255, 255, 0.75)',
      whiteSoft80: 'rgba(255, 255, 255, 0.65)',
      whiteSoft70: 'rgba(255, 255, 255, 0.55)',
      whiteSoft50: 'rgba(255, 255, 255, 0.35)',
      whiteSoft30: 'rgba(255, 255, 255, 0.2)',
      whiteSoft20: 'rgba(255, 255, 255, 0.12)',
      whiteSoft10: 'rgba(255, 255, 255, 0.06)',
      whiteSoft05: 'rgba(255, 255, 255, 0.02)',
      // Variables para fondos suaves - tema oscuro
      backgroundSoft: '#182438',
      backgroundSofter: '#233650',
      backgroundMuted: '#2e4a68',
      primaryGradient:
        'linear-gradient(135deg, #3a7bb5 0%, #e4d5c2 50%, #fafbfc 100%)',
      primaryGradientHover:
        'linear-gradient(135deg, #2a5f8a 0%, #d4c5b2 50%, #f5f6f7 100%)',
    },
  },
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  // Función para determinar el tema basado en la hora del día
  const getTimeBasedTheme = () => {
    try {
      const now = new Date();

      // Validar que la fecha sea válida
      if (isNaN(now.getTime())) {
        return 'dark'; // Fallback seguro
      }

      const hour = now.getHours();

      // Validar que la hora sea válida (0-23)
      if (hour < 0 || hour > 23) {
        return 'dark'; // Fallback seguro
      }

      // Día: 6 AM - 8 PM (6:00 - 20:00) = light
      // Noche: 8 PM - 6 AM (20:00 - 6:00) = dark
      return hour >= 6 && hour < 20 ? 'light' : 'dark';
    } catch (error) {
      return 'dark'; // Fallback seguro
    }
  };

  // Función segura para localStorage
  const safeLocalStorage = useCallback(
    () => ({
      getItem: (key) => {
        try {
          return localStorage.getItem(key);
        } catch (error) {
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          // Silenciar error de localStorage
        }
      },
    }),
    []
  );

  // Cargar tema al inicializar
  useEffect(() => {
    setCurrentTheme('light');
  }, []);

  // Aplicar tema al DOM
  useEffect(() => {
    try {
      // Validar que el tema existe
      const theme = themes[currentTheme];
      if (!theme) {
        setCurrentTheme('dark');
        return;
      }

      const colors = theme.colors;
      if (!colors) {
        setCurrentTheme('dark');
        return;
      }

      // Verificar que document existe (no en SSR)
      if (typeof document === 'undefined') {
        return;
      }

      // Aplicar variables CSS
      Object.entries(colors).forEach(([key, value]) => {
        try {
          document.documentElement.style.setProperty(`--${key}`, value);
        } catch (error) {
          // Silenciar error de variable CSS
        }
      });

      // Aplicar fondo del GeometricHero según el tema
      try {
        if (currentTheme === 'dark') {
          document.documentElement.style.setProperty(
            '--geometric-hero-bg',
            'linear-gradient(135deg, #0e1a2b 0%, #182438 25%, #233650 50%, #182438 75%, #0e1a2b 100%)'
          );
        } else {
          document.documentElement.style.setProperty(
            '--geometric-hero-bg',
            'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          );
        }
      } catch (error) {
        // Silenciar error de fondo
      }

      // Aplicar/remover clase dark-mode en el body
      try {
        if (currentTheme === 'dark') {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      } catch (error) {
        // Silenciar error de clase
      }

      // Guardar en localStorage de forma segura
      safeLocalStorage().setItem('portfolio-theme', currentTheme);
    } catch (error) {
      // Fallback: intentar con tema light
      if (currentTheme !== 'light') {
        setCurrentTheme('dark');
      }
    }
  }, [currentTheme, safeLocalStorage]);

  // Alternar entre modo claro y oscuro
  const toggleTheme = () => {
    try {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Validar que el nuevo tema existe
      if (!themes[newTheme]) {
        return;
      }

      setCurrentTheme(newTheme);

      // Marcar que el usuario eligió manualmente un tema
      safeLocalStorage().setItem('portfolio-theme-manual', 'true');
    } catch (error) {
      // Silenciar error al alternar tema
    }
  };

  // Obtener tema actual
  const getCurrentTheme = () => {
    try {
      return themes[currentTheme] || themes.dark; // Fallback a light
    } catch (error) {
      return themes.dark;
    }
  };

  // Función para resetear a detección automática
  const resetToAutoTheme = () => {
    try {
      const timeBasedTheme = getTimeBasedTheme();
      setCurrentTheme(timeBasedTheme);
      safeLocalStorage().setItem('portfolio-theme-manual', 'false');
    } catch (error) {
      // Silenciar error al resetear tema
    }
  };

  // Función para verificar si el usuario eligió manualmente
  const isManualTheme = () => {
    try {
      return safeLocalStorage().getItem('portfolio-theme-manual') === 'true';
    } catch (error) {
      return false; // Fallback: asumir que no es manual
    }
  };

  const value = {
    currentTheme,
    toggleTheme,
    getCurrentTheme,
    resetToAutoTheme,
    isManualTheme,
    getTimeBasedTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
