import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiExternalLink } from 'react-icons/fi';
import ImageGalleryModal from '../components/ImageGalleryModal';
import styles from './ProjectDetail.module.css';
import Footer from '../components/Footer/Footer';

import viutiMain from '../assets/projects/viuti/1.png';
import prikly1 from '../assets/projects/prikly/1.png';
import prikly3 from '../assets/projects/prikly/3.png';
import prikly4 from '../assets/projects/prikly/4.png';
import prikly12 from '../assets/projects/prikly/12.png';
import prikly15 from '../assets/projects/prikly/15.png';
import prikly17 from '../assets/projects/prikly/17.png';
import standford1 from '../assets/projects/gana con standford/standford1.webp';
import standford2 from '../assets/projects/gana con standford/standford2.webp';
import standford6 from '../assets/projects/gana con standford/standford6.webp';
import djdivito1 from '../assets/projects/dj-divito/1.png';
import djdivito2 from '../assets/projects/dj-divito/2.png';
import miarbol1 from '../assets/projects/mi-arbol-en-el-mundo/1.png';
import miarbol2 from '../assets/projects/mi-arbol-en-el-mundo/2.png';
import miarbol3 from '../assets/projects/mi-arbol-en-el-mundo/3.png';
import triso1 from '../assets/projects/triso/1.png';
import lolinails1 from '../assets/projects/loli-nails/1.png';
import lolinails2 from '../assets/projects/loli-nails/2.png';
import refugioandino1 from '../assets/projects/refugio-andino/1.webp';
import laspiedras1 from '../assets/projects/las-piedras/1.webp';
import ateliervalentina1 from '../assets/projects/atelier-valentina/1.webp';
import roblemuebles1 from '../assets/projects/roble-muebles/1.webp';
import fitnesscoach1 from '../assets/projects/fitness-coach/1.webp';
import cursosonline1 from '../assets/projects/cursos-online/1.webp';
import veterinaria1 from '../assets/projects/veterinaria/1.webp';
import hquniversitario1 from '../assets/projects/hq-universitario/1.webp';
import arcoestudio1 from '../assets/projects/arco-estudio/1.webp';
import brewandco1 from '../assets/projects/brew-and-co/1.webp';
import nomadetravel1 from '../assets/projects/nomade-travel/1.webp';
import quicknotes1 from '../assets/projects/quick-notes/1.png';
import mlscouting1 from '../assets/projects/ml-scouting/1.png';
import eyas1 from '../assets/projects/eyas/1.png';
import theriapp2 from '../assets/projects/theriapp/2.png';
import laboralforge1 from '../assets/projects/laboral-forge/1.png';
import elyfitness1 from '../assets/projects/elyfitness/1.png';
import elyfitness2 from '../assets/projects/elyfitness/2.png';
import batterysense1 from '../assets/projects/batterysense/1.png';
import hospitalmonitor1 from '../assets/projects/hospital-monitor/1.png';

const projectsData = {
  batterysense: {
    name: 'BatterySense',
    images: [batterysense1],
    links: () => [],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  hospitalmonitor: {
    name: 'Hospital Monitor',
    images: [hospitalmonitor1],
    links: () => [],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  prikly: {
    name: 'Prikly',
    images: [prikly1, prikly3, prikly4, prikly12, prikly15, prikly17],
    links: (t) => [
      { url: 'https://app.prikly.io/', label: t.projects.viewApp },
      { url: 'https://www.prikly.io/', label: t.projects.viewLanding },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedModules, items: modal.modules },
      { type: 'techGrid', title: t.projects.modals.technicalArchitecture, items: modal.tech },
    ],
  },
  standford: {
    name: 'Gana con Standford',
    images: [standford1, standford2, standford6],
    links: (t) => [
      { url: 'https://gana-con-standford-demo.vercel.app/', label: t.projects.viewApp },
      { url: 'https://gana-con-standford-landing-demo.vercel.app/', label: t.projects.viewLanding },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  viuti: {
    name: 'Viutify',
    images: [viutiMain],
    links: (t) => [
      { url: 'https://app.viuti.io/', label: t.projects.viewApp },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainTasks, items: modal.tasks },
      { type: 'techGrid', title: t.projects.modals.technologies, items: modal.tech },
    ],
  },
  miarbol: {
    name: 'Mi Árbol en el Mundo',
    images: [miarbol1, miarbol2, miarbol3],
    links: (t) => [
      { url: 'https://app.miarbolenelmundo.com/feed', label: t.projects.viewApp },
      { url: 'https://miarbolenelmundo.com', label: t.projects.viewLanding },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologies, items: modal.tech },
    ],
  },
  djdivito: {
    name: 'DJ DiVito',
    images: [djdivito1, djdivito2],
    links: (t) => [
      { url: 'https://landing-v1-sc.vercel.app/', label: t.projects.viewLanding },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  triso: {
    name: 'Triso',
    images: [triso1],
    links: () => [
      { url: 'https://triso-landing.vercel.app/', label: 'final' },
      { url: 'https://triso-landing-v11.vercel.app/', label: 'v11' },
      { url: 'https://triso-landing-v10.vercel.app/', label: 'v10' },
      { url: 'https://triso-landing-v9.vercel.app/', label: 'v9' },
      { url: 'https://triso-landing-v8.vercel.app/', label: 'v8' },
      { url: 'https://triso-landing-v7.vercel.app/', label: 'v7' },
      { url: 'https://triso-landing-v6.vercel.app/', label: 'v6' },
      { url: 'https://triso-landing-v5.vercel.app/', label: 'v5' },
      { url: 'https://triso-landing-v4.vercel.app/', label: 'v4' },
      { url: 'https://triso-landing-v3.vercel.app/', label: 'v3' },
      { url: 'https://triso-landing-v2.vercel.app/', label: 'v2' },
      { url: 'https://triso-landing-v1.vercel.app/', label: 'v1' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  theriapp: {
    name: 'TheriApp',
    images: [theriapp2],
    links: (t) => [
      { url: 'https://theriapp.vercel.app/', label: t.projects.viewApp },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  lolinails: {
    name: 'Loli Nails',
    images: [lolinails1, lolinails2],
    links: (t) => [
      { url: 'https://loli-nails.vercel.app/galeria', label: t.projects.viewLanding },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  quicknotes: {
    name: 'Quick Notes',
    images: [quicknotes1],
    links: (t) => [
      { url: 'https://martinsc9.github.io/landings-portfolio/quick-notes/', label: t.projects.viewLanding },
      { url: 'https://github.com/MartinSC9/QuickNotes', label: 'GitHub' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  refugioandino: {
    name: 'Refugio Andino',
    images: [refugioandino1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/refugio-andino/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  laspiedras: {
    name: 'Cabañas Las Piedras',
    images: [laspiedras1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/las-piedras/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  ateliervalentina: {
    name: 'Atelier Valentina',
    images: [ateliervalentina1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/moda-atelier/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  roblemuebles: {
    name: 'Roble Muebles',
    images: [roblemuebles1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/muebles-roble/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  fitnesscoach: {
    name: 'FitPro',
    images: [fitnesscoach1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/fitness-coach/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  cursosonline: {
    name: 'Aprende Digital',
    images: [cursosonline1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/cursos-online/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  veterinaria: {
    name: 'PetVida',
    images: [veterinaria1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/veterinaria/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  hquniversitario: {
    name: 'HQ Universitario',
    images: [hquniversitario1],
    links: () => [
      { url: 'https://landing-hq-universitario.vercel.app/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  arcoestudio: {
    name: 'ARCO Estudio',
    images: [arcoestudio1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/arco-estudio/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  brewandco: {
    name: 'Brew & Co.',
    images: [brewandco1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/brew-and-co/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  nomadetravel: {
    name: 'Nómade Travel',
    images: [nomadetravel1],
    links: () => [
      { url: 'https://martinsc9.github.io/landings-portfolio/nomade-travel/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  mlscouting: {
    name: 'ML Scouting',
    images: [mlscouting1],
    links: (t) => [
      { url: 'https://ml-scouting-prototype.vercel.app/login', label: t.projects.viewApp },
      { url: 'https://ml-scouting-prototype.vercel.app/', label: t.projects.viewLanding },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  eyas: {
    name: 'EYAS Psicología',
    images: [eyas1],
    links: () => [
      { url: 'https://eyaspsicologia-prototype.vercel.app/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  laboralforge: {
    name: 'Laboral Forge',
    images: [laboralforge1],
    links: () => [
      { url: 'https://laboralforge.com/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.implementedSections, items: modal.sections },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
  elyfitness: {
    name: 'Ely Fitness',
    images: [elyfitness1, elyfitness2],
    links: () => [
      { url: 'https://elyfitness-prototype.vercel.app/', label: 'Landing' },
    ],
    sections: (t, modal) => [
      { type: 'text', title: t.projects.modals.projectDescription, content: modal.description },
      { type: 'list', title: t.projects.modals.mainFeatures, items: modal.features },
      { type: 'techGrid', title: t.projects.modals.technologiesUsed, items: modal.tech },
    ],
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentTheme } = useTheme();

  const [showImageGallery, setShowImageGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = projectsData[id];

  useEffect(() => {
    if (!project) {
      navigate('/', { replace: true });
    }
  }, [project, navigate]);

  if (!project) return null;

  const modal = t.projects.modals[id];
  const sections = project.sections(t, modal);
  const links = project.links(t);

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setShowImageGallery(true);
  };

  const renderSection = (section, i) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={i} className={styles.section}>
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        );
      case 'list':
        return (
          <div key={i} className={styles.section}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        );
      case 'techGrid':
        return (
          <div key={i} className={styles.section}>
            <h3>{section.title}</h3>
            <div className={styles.techGrid}>
              {Object.values(section.items).map((item, j) => (
                <div key={j} className={styles.techItem}>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageWrapper} data-theme={currentTheme}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-link">
            {t.nav.home}
          </button>
          <span className="breadcrumb-sep">/</span>
          <button onClick={() => navigate('/projects')} className="breadcrumb-link">
            {t.nav.projects}
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{project.name}</span>
        </nav>

        {/* Hero: galería + info */}
        <div className={styles.heroRow}>
          {/* Galería */}
          <div className={styles.galleryCol}>
            <div className={styles.galleryMain} onClick={() => openGallery(currentImageIndex)}>
              <img src={project.images[currentImageIndex]} alt={`${project.name} - principal`} />
            </div>
            {project.images.length > 1 && (
              <div className={styles.galleryThumbs}>
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.galleryThumb} ${i === currentImageIndex ? styles.galleryThumbActive : ''}`}
                    onClick={() => setCurrentImageIndex(i)}
                  >
                    <img src={img} alt={`${project.name} - ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.infoCol}>
            <h1 className={styles.title}>{project.name}</h1>
            <span className={styles.period}>{t.projects[id].period}</span>
            {modal.role && <p className={styles.roleText}>{modal.role}</p>}
            <div className={styles.infoLinks}>
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewLiveBtn}
                >
                  <FiExternalLink />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className={styles.content}>
          {sections.map(renderSection)}
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={showImageGallery}
        onClose={() => setShowImageGallery(false)}
        images={project.images}
        projectName={project.name}
        currentIndex={currentImageIndex}
      />

      <Footer />
    </div>
  );
};

export default ProjectDetail;
