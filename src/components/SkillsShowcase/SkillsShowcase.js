import React from 'react';
import {
  FaReact,
  FaNode,
  FaDatabase,
  FaRobot,
  FaCogs,
  FaAws,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDotnet,
  SiNestjs,
  SiMysql,
  SiVercel,
  SiCloudinary,
  SiGithubactions,
  SiRender,
} from 'react-icons/si';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './SkillsShowcase.module.css';

const row1 = [
  { name: 'React', icon: <FaReact size={28} /> },
  { name: 'React Native', icon: <FaReact size={28} /> },
  { name: 'Next.js', icon: <SiNextdotjs size={28} /> },
  { name: 'TypeScript', icon: <SiTypescript size={28} /> },
  { name: 'Tailwind', icon: <SiTailwindcss size={28} /> },
  { name: 'Node.js', icon: <FaNode size={28} /> },
];

const row2 = [
  { name: 'NestJS', icon: <SiNestjs size={28} /> },
  { name: 'C#/.NET', icon: <SiDotnet size={28} /> },
  { name: 'MySQL', icon: <SiMysql size={28} /> },
  { name: 'SQL Server', icon: <FaDatabase size={28} /> },
  { name: 'AWS', icon: <FaAws size={28} /> },
  { name: 'Vercel', icon: <SiVercel size={28} /> },
];

const row3 = [
  { name: 'Cloudinary', icon: <SiCloudinary size={28} /> },
  { name: 'Render', icon: <SiRender size={28} /> },
  { name: 'CI/CD', icon: <FaCogs size={28} /> },
  { name: 'GitHub Actions', icon: <SiGithubactions size={28} /> },
  { name: 'Claude Code', icon: <FaRobot size={28} /> },
  { name: 'Gemini', icon: <FaRobot size={28} /> },
];

const renderRow = (techs, direction) => {
  const items = [...techs, ...techs, ...techs, ...techs];
  const trackClass = direction === 'left' ? styles.marqueeTrackLeft : styles.marqueeTrackRight;
  return (
    <div className={styles.marqueeRow}>
      <div className={trackClass}>
        {items.map((tech, i) => (
          <div key={`${tech.name}-${i}`} className={styles.marqueeItem}>
            <span className={styles.techIcon}>{tech.icon}</span>
            <span className={styles.techName}>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsShowcase = () => {
  const { t } = useLanguage();

  return (
    <section id="skills-showcase" className={styles.skillsShowcase}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.skills.title}</h2>
        </div>

        <div className={styles.marqueeWrapper}>
          {renderRow(row1, 'left')}
          {renderRow(row2, 'right')}
          {renderRow(row3, 'left')}
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
