import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { projectImages, getProjects } from '../components/GitTimeline/GitTimeline';
import styles from '../components/GitTimeline/GitTimeline.module.css';
import { FiGrid, FiList } from 'react-icons/fi';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';

const CATEGORIES = {
  all: 'filterAll',
  landing: 'filterLanding',
  webapp: 'filterWebApp',
  mobile: 'filterMobile',
  desktop: 'filterDesktop',
};

const GRID_OPTIONS = [
  { cols: 4, icon: FiGrid },
  { cols: 1, icon: FiList },
];

export default function Projects() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState(() => {
    try { return sessionStorage.getItem('projects-filter') || 'all'; } catch { return 'all'; }
  });
  const [cols, setCols] = useState(() => {
    try { return parseInt(sessionStorage.getItem('projects-cols'), 10) || 4; } catch { return 4; }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('projects-filter', activeFilter);
      sessionStorage.setItem('projects-cols', String(cols));
    } catch { /* noop */ }
  }, [activeFilter, cols]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToProject = (key) => {
    sessionStorage.setItem('scrollY', window.scrollY);
    navigate(`/project/${key}`);
  };

  const projects = getProjects(t);
  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => Array.isArray(p.category) ? p.category.includes(activeFilter) : p.category === activeFilter);

  return (
    <>
      <SEO title={t.projects.title} />
      <div className="projects-page">
        <div className="projects-page-container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <button onClick={() => navigate('/')} className="breadcrumb-link">
              {t.nav.home}
            </button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{t.nav.projects}</span>
          </nav>

          {/* Toolbar: filters + grid toggle */}
          <div className={styles.toolbar}>
            <div className={styles.filters}>
              {Object.entries(CATEGORIES).map(([key, labelKey]) => (
                <button
                  key={key}
                  className={`${styles.filterBtn} ${activeFilter === key ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveFilter(key)}
                >
                  {t.projects[labelKey]}
                  <span className={styles.filterCount}>
                    {key === 'all' ? projects.length : projects.filter(p => Array.isArray(p.category) ? p.category.includes(key) : p.category === key).length}
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.gridToggle}>
              {GRID_OPTIONS.map(({ cols: c, icon: Icon }) => (
                <button
                  key={c}
                  className={`${styles.gridToggleBtn} ${cols === c ? styles.gridToggleBtnActive : ''}`}
                  onClick={() => setCols(c)}
                  aria-label={`${c} columns`}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <div
            className={styles.projectsGrid}
            style={{ '--grid-cols': cols }}
          >
            {filtered.map((project, i) => {
              const image = projectImages[project.key];
              return (
                <div
                  key={project.key}
                  className={styles.gridCard}
                  style={{ '--card-index': i }}
                  onClick={() => goToProject(project.key)}
                >
                  <div className={styles.gridCardImage}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={styles.gridCardSlide}
                    />
                    <span className={styles.gridCardTag}>{project.tag}</span>
                  </div>
                  <div className={styles.gridCardBody}>
                    <div className={styles.gridCardMeta}>
                      <h3 className={styles.gridCardTitle}>{project.name}</h3>
                      <span className={styles.gridCardDuration}>{project.duration}</span>
                    </div>
                    <p className={styles.gridCardDesc}>{project.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
