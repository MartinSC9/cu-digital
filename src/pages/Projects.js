import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { projectImages, getProjects } from '../components/GitTimeline/GitTimeline';
import styles from '../components/GitTimeline/GitTimeline.module.css';
import { FiGrid, FiList, FiSearch, FiX } from 'react-icons/fi';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';

const CATEGORIES = {
  featured: 'filterFeatured',
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
    try { return sessionStorage.getItem('projects-filter') || 'featured'; } catch { return 'featured'; }
  });
  const [cols, setCols] = useState(() => {
    try { return parseInt(sessionStorage.getItem('projects-cols'), 10) || 4; } catch { return 4; }
  });
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);

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

  const searchNorm = search.toLowerCase().trim();
  const filtered = projects.filter((p) => {
    if (searchNorm && !p.name.toLowerCase().includes(searchNorm)) return false;
    if (activeFilter === 'featured') return p.featured;
    if (activeFilter === 'all') return true;
    return Array.isArray(p.category)
      ? p.category.includes(activeFilter)
      : p.category === activeFilter;
  });

  const getCategoryCount = (key) => {
    if (key === 'featured') return projects.filter((p) => p.featured).length;
    if (key === 'all') return projects.length;
    return projects.filter((p) =>
      Array.isArray(p.category)
        ? p.category.includes(key)
        : p.category === key
    ).length;
  };

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

          {/* Toolbar: filters + search + grid toggle */}
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
                    {getCategoryCount(key)}
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                ref={searchRef}
                type="text"
                className={styles.searchInput}
                placeholder={t.projects.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className={styles.searchClear}
                  onClick={() => { setSearch(''); searchRef.current?.focus(); }}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
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

          <div className={styles.projectsGrid} style={{ '--grid-cols': cols }}>
            {filtered.map((project, i) => {
              const image = projectImages[project.key];
              const cardVideo = project.videos ? project.videos[0] : project.video;
              return (
                <div
                  key={project.key}
                  className={styles.gridCard}
                  style={{ '--card-index': i }}
                  onClick={() => goToProject(project.key)}
                >
                  <div className={styles.gridCardImage}>
                    {cardVideo ? (
                      <video
                        src={cardVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.gridCardSlide}
                      />
                    ) : (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={styles.gridCardSlide}
                      />
                    )}
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

          {filtered.length === 0 && (
            <p className={styles.noResults}>{t.projects.noResults}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
