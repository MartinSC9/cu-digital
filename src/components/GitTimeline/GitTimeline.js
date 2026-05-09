import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GitTimeline.module.css';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

import viutiMain from '../../assets/projects/viuti/1.png';
import prikly1 from '../../assets/projects/prikly/1.png';
import standford1 from '../../assets/projects/gana con standford/standford1.webp';
import djdivito1 from '../../assets/projects/dj-divito/1.png';
import miarbol1 from '../../assets/projects/mi-arbol-en-el-mundo/1.png';
import triso1 from '../../assets/projects/triso/1.png';
import lolinails1 from '../../assets/projects/loli-nails/1.png';
import refugioandino1 from '../../assets/projects/refugio-andino/1.webp';
import laspiedras1 from '../../assets/projects/las-piedras/1.webp';
import ateliervalentina1 from '../../assets/projects/atelier-valentina/1.webp';
import roblemuebles1 from '../../assets/projects/roble-muebles/1.webp';
import fitnesscoach1 from '../../assets/projects/fitness-coach/1.webp';
import cursosonline1 from '../../assets/projects/cursos-online/1.webp';
import veterinaria1 from '../../assets/projects/veterinaria/1.webp';
import hquniversitario1 from '../../assets/projects/hq-universitario/1.webp';
import arcoestudio1 from '../../assets/projects/arco-estudio/1.webp';
import brewandco1 from '../../assets/projects/brew-and-co/1.webp';
import nomadetravel1 from '../../assets/projects/nomade-travel/1.webp';
import quicknotes1 from '../../assets/projects/quick-notes/1.png';
import mlscouting1 from '../../assets/projects/ml-scouting/1.png';
import eyas1 from '../../assets/projects/eyas/1.png';
import laboralforge1 from '../../assets/projects/laboral-forge/1.png';
import batterysense1 from '../../assets/projects/batterysense/1.png';
import hospitalmonitor1 from '../../assets/projects/hospital-monitor/1.png';
import theriapp2 from '../../assets/projects/theriapp/2.png';

export const projectImages = {
  viuti: { src: viutiMain, alt: 'Dashboard de Viutify' },
  standford: { src: standford1, alt: 'Pantalla de login de Standford' },
  prikly: { src: prikly1, alt: 'Vista general de Prikly' },
  djdivito: { src: djdivito1, alt: 'Landing Page de DJ DiVito' },
  miarbol: { src: miarbol1, alt: 'Landing page de Mi Árbol en el Mundo' },
  triso: { src: triso1, alt: 'Triso - Landing page' },
  lolinails: { src: lolinails1, alt: 'Loli Nails - Landing page' },
  refugioandino: { src: refugioandino1, alt: 'Refugio Andino - Cabañas Patagonia' },
  laspiedras: { src: laspiedras1, alt: 'Las Piedras - Cabañas Córdoba' },
  ateliervalentina: { src: ateliervalentina1, alt: 'Atelier Valentina - Diseño de Modas' },
  roblemuebles: { src: roblemuebles1, alt: 'Roble Muebles - Mueblería' },
  fitnesscoach: { src: fitnesscoach1, alt: 'FitPro - Personal Trainer' },
  cursosonline: { src: cursosonline1, alt: 'Aprende Digital - Cursos Online' },
  veterinaria: { src: veterinaria1, alt: 'PetVida - Clínica Veterinaria' },
  hquniversitario: { src: hquniversitario1, alt: 'HQ Universitario - Cursos de Ingreso' },
  arcoestudio: { src: arcoestudio1, alt: 'ARCO Estudio - Arquitectura' },
  brewandco: { src: brewandco1, alt: 'Brew & Co. - Cafetería Artesanal' },
  nomadetravel: { src: nomadetravel1, alt: 'Nómade Travel - Viajes de Aventura' },
  quicknotes: { src: quicknotes1, alt: 'Quick Notes - Desktop App' },
  mlscouting: { src: mlscouting1, alt: 'ML Scouting - Plataforma de Scouting Deportivo' },
  eyas: { src: eyas1, alt: 'EYAS Psicología - Landing Page' },
  theriapp: { src: theriapp2, alt: 'TheriApp - Preguntas del quiz' },
  laboralforge: { src: laboralforge1, alt: 'Laboral Forge - Consultoría de Empleabilidad' },
  batterysense: { src: batterysense1, alt: 'BatterySense - Monitoreo de Baterías Industriales' },
  hospitalmonitor: { src: hospitalmonitor1, alt: 'Hospital Monitor - Monitoreo de Salas Hospitalarias' },
};

export const getProjects = (t) => [
  {
    key: 'batterysense',
    name: 'BatterySense',
    category: 'webapp',
    tag: 'IoT',
    description: t.projects.batterysense.description,
    duration: t.projects.batterysense.duration,
  },
  {
    key: 'hospitalmonitor',
    name: 'Hospital Monitor',
    category: 'webapp',
    tag: 'IoT',
    description: t.projects.hospitalmonitor.description,
    duration: t.projects.hospitalmonitor.duration,
  },
  { key: 'prikly', name: 'Prikly', category: ['webapp', 'landing'], tag: 'SaaS', description: t.projects.prikly.description, duration: t.projects.prikly.duration },
  { key: 'miarbol', name: 'Mi Árbol en el Mundo', category: ['mobile', 'landing'], tag: 'Web + Mobile', description: t.projects.miarbol.description, duration: t.projects.miarbol.duration },
  { key: 'quicknotes', name: 'Quick Notes', category: 'desktop', tag: 'Desktop', description: t.projects.quicknotes.description, duration: t.projects.quicknotes.duration },
  { key: 'triso', name: 'Triso', category: 'landing', tag: 'Landing', description: t.projects.triso.description, duration: t.projects.triso.duration },
  { key: 'standford', name: 'Gana con Standford', category: ['webapp', 'landing'], tag: 'Web App', description: t.projects.standford.description, duration: t.projects.standford.duration },
  { key: 'djdivito', name: 'DJ DiVito', category: 'landing', tag: 'Landing', description: t.projects.djdivito.description, duration: t.projects.djdivito.duration },
  { key: 'viuti', name: 'Viutify', category: 'webapp', tag: 'SaaS', description: t.projects.viuti.description, duration: t.projects.viuti.duration },
  { key: 'lolinails', name: 'Loli Nails', category: 'landing', tag: 'Landing', description: t.projects.lolinails.description, duration: t.projects.lolinails.duration },
  { key: 'theriapp', name: 'TheriApp', category: 'mobile', tag: 'Mobile + IA', description: t.projects.theriapp.description, duration: t.projects.theriapp.duration },
  { key: 'refugioandino', name: 'Refugio Andino', category: 'landing', tag: 'Landing', description: t.projects.refugioandino.description, duration: t.projects.refugioandino.duration },
  { key: 'laspiedras', name: 'Cabañas Las Piedras', category: 'landing', tag: 'Landing', description: t.projects.laspiedras.description, duration: t.projects.laspiedras.duration },
  { key: 'ateliervalentina', name: 'Atelier Valentina', category: 'landing', tag: 'Landing', description: t.projects.ateliervalentina.description, duration: t.projects.ateliervalentina.duration },
  { key: 'roblemuebles', name: 'Roble Muebles', category: 'landing', tag: 'Landing', description: t.projects.roblemuebles.description, duration: t.projects.roblemuebles.duration },
  { key: 'fitnesscoach', name: 'FitPro', category: 'landing', tag: 'Landing', description: t.projects.fitnesscoach.description, duration: t.projects.fitnesscoach.duration },
  { key: 'cursosonline', name: 'Aprende Digital', category: 'landing', tag: 'Landing', description: t.projects.cursosonline.description, duration: t.projects.cursosonline.duration },
  { key: 'veterinaria', name: 'PetVida', category: 'landing', tag: 'Landing', description: t.projects.veterinaria.description, duration: t.projects.veterinaria.duration },
  { key: 'hquniversitario', name: 'HQ Universitario', category: 'landing', tag: 'Landing', description: t.projects.hquniversitario.description, duration: t.projects.hquniversitario.duration },
  { key: 'arcoestudio', name: 'ARCO Estudio', category: 'landing', tag: 'Landing', description: t.projects.arcoestudio.description, duration: t.projects.arcoestudio.duration },
  { key: 'brewandco', name: 'Brew & Co.', category: 'landing', tag: 'Landing', description: t.projects.brewandco.description, duration: t.projects.brewandco.duration },
  { key: 'nomadetravel', name: 'Nómade Travel', category: 'landing', tag: 'Landing', description: t.projects.nomadetravel.description, duration: t.projects.nomadetravel.duration },
  { key: 'mlscouting', name: 'ML Scouting', category: ['webapp', 'landing'], tag: 'Web App', description: t.projects.mlscouting.description, duration: t.projects.mlscouting.duration },
  { key: 'eyas', name: 'EYAS Psicología', category: 'landing', tag: 'Landing', description: t.projects.eyas.description, duration: t.projects.eyas.duration },
  { key: 'laboralforge', name: 'Laboral Forge', category: 'landing', tag: 'Landing', description: t.projects.laboralforge.description, duration: t.projects.laboralforge.duration },
];

const HOME_LIMIT = 4;

const GitTimeline = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const goToProject = (key) => {
    sessionStorage.setItem('scrollY', window.scrollY);
    navigate(`/project/${key}`);
  };

  const projects = getProjects(t);
  const visibleProjects = projects.slice(0, HOME_LIMIT);

  return (
    <div className={styles.wrapper}>
      {/* Grid */}
      <div className={styles.projectsGrid}>
        {visibleProjects.map((project) => {
          const image = projectImages[project.key];
          return (
            <div
              key={project.key}
              className={styles.gridCard}
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

      <button
        className={styles.toggleProjectsBtn}
        onClick={() => navigate('/projects')}
      >
        {t.projects.viewAllProjects} <FiArrowRight className={styles.toggleIcon} />
      </button>
    </div>
  );
};

export default GitTimeline;
