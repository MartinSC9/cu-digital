// Configuración centralizada para SEO
export const SEO_CONFIG = {
  siteName: 'CU Digital',
  siteUrl: 'https://www.cudigital.com.ar',
  siteLanguage: 'es-AR',
  siteLocale: 'es_AR',

  author: {
    name: 'CU Digital',
    fullName: 'CU Digital — Joaquín Urtasun & Martín Contrera',
    jobTitle: 'Estudio de Desarrollo Digital',
    description:
      'Estudio de desarrollo especializado en landing pages, apps web y apps móviles a medida. Llevamos tu idea a producción.',
    email: '',
    location: 'Argentina',
    website: 'https://www.cudigital.com.ar',
  },

  social: {
    github: '',
    linkedin: '',
  },

  defaultMeta: {
    title: 'CU Digital — Desarrollo a Medida',
    description:
      'Estudio de desarrollo especializado en landing pages, apps web y apps móviles a medida. Llevamos tu idea a producción.',
    keywords:
      'desarrollo web, landing page, app móvil, app web, diseño web, argentina, córdoba, desarrollo a medida, páginas web',
    image: '/android-chrome-512x512.png',
    type: 'website',
  },

  pages: {
    home: {
      title: 'CU Digital — Desarrollo a Medida',
      description:
        'Estudio de desarrollo especializado en landing pages, apps web y apps móviles a medida.',
      keywords:
        'desarrollo web, landing page, app móvil, desarrollo a medida, argentina',
    },
    projects: {
      title: 'Proyectos',
      description:
        'Proyectos desarrollados por CU Digital. Landing pages, aplicaciones web y soluciones a medida.',
      keywords:
        'proyectos, landing page, aplicaciones web, desarrollo, portfolio',
    },
    skills: {
      title: 'Tecnologías',
      description:
        'Tecnologías que usamos: React, Node.js, React Native, TypeScript y más.',
      keywords:
        'tecnologías, react, node.js, typescript, desarrollo web',
    },
    contact: {
      title: 'Contacto',
      description:
        'Contactá a CU Digital para tu próximo proyecto web, landing o app móvil.',
      keywords: 'contacto, desarrollo web, presupuesto, landing page',
    },
  },

  openGraph: {
    type: 'website',
    siteName: 'CU Digital',
    locale: 'es_AR',
  },

  twitter: {
    handle: '',
    site: '',
    cardType: 'summary_large_image',
  },

  robots: {
    index: true,
    follow: true,
    googleBot:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  },

  sitemap: {
    changefreq: 'weekly',
    priority: 1.0,
  },
};

export const buildUrl = (path = '') => {
  return `${SEO_CONFIG.siteUrl}${path}`;
};

export const buildPageTitle = (pageTitle = '') => {
  if (!pageTitle) return SEO_CONFIG.defaultMeta.title;
  return `${pageTitle} | CU Digital`;
};
