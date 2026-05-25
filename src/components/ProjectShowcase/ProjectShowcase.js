import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
import './ProjectShowcase.css';

// Only lightweight images (<200KB each, ~2.5MB total)
import img1 from '../../assets/projects/triso/1.png';
import img2 from '../../assets/projects/bookly/1.png';
import img3 from '../../assets/projects/prikly/1.png';
import img4 from '../../assets/projects/eyas/1.png';
import img5 from '../../assets/projects/viuti/1.png';
import img6 from '../../assets/projects/cursos-online/1.webp';
import img7 from '../../assets/projects/nomade-travel/1.webp';
import img8 from '../../assets/projects/fitness-coach/1.webp';
import img9 from '../../assets/projects/hq-universitario/1.webp';
import img10 from '../../assets/projects/yateatiendo/1.webp';
import img11 from '../../assets/projects/quick-notes/1.png';
import img12 from '../../assets/projects/audio-transcriber/1.png';
import img13 from '../../assets/projects/veterinaria/1.webp';
import img14 from '../../assets/projects/las-piedras/1.webp';
import img15 from '../../assets/projects/arco-estudio/1.webp';

const columns = [
  [img1, img2, img3],
  [img4, img5, img6],
  [img7, img8, img9],
  [img10, img11, img12],
  [img13, img14, img15],
  [img1, img7, img4],
  [img10, img13, img9],
];

export default function ProjectShowcase() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="project-showcase">
      <div className="project-showcase-marquee">
        {columns.map((col, i) => (
          <div
            key={i}
            className={`project-showcase-col ${i % 2 === 0 ? 'project-showcase-col--up' : 'project-showcase-col--down'}`}
          >
            <div className="project-showcase-track">
              {[...col, ...col].map((src, j) => (
                <div key={j} className="project-showcase-item">
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="project-showcase-fade project-showcase-fade--top" />
      <div className="project-showcase-fade project-showcase-fade--bottom" />
      <button
        className="project-showcase-btn"
        onClick={() => navigate('/projects')}
      >
        {t.projects.viewAllProjects} <FiArrowRight />
      </button>
    </div>
  );
}
