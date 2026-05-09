import React from 'react';
import { useInViewReveal } from '../../hooks/useInViewReveal';
import { useLanguage } from '../../contexts/LanguageContext';
import heroBg5 from '../../assets/videos/hero-bg-5.mp4';

const STAGGER_MS = 95;

function RevealWord({ children, index, visible }) {
  return (
    <span
      className={`manifesto__word${visible ? ' manifesto__word--visible' : ''}`}
      style={{ transitionDelay: visible ? `${index * STAGGER_MS}ms` : '0ms' }}
    >
      {children}
    </span>
  );
}

export default function Manifesto() {
  const [ref, visible] = useInViewReveal({ threshold: 0.25 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className={`manifesto${visible ? ' manifesto--revealed' : ''}`}>
      <video className="section-video-bg" autoPlay muted loop playsInline aria-hidden="true" src={heroBg5} />

      <div className="manifesto__container">
        <div className="manifesto__kicker-row" aria-hidden="true">
          <span className="manifesto__kicker-line" />
          <span className="manifesto__kicker">{t.manifesto.kicker}</span>
          <span className="manifesto__kicker-line" />
        </div>

        <h2 className="manifesto__statement">
          <RevealWord index={0} visible={visible}>{t.manifesto.words[0]}</RevealWord>{' '}
          <RevealWord index={1} visible={visible}>{t.manifesto.words[1]}</RevealWord>{' '}
          <span className={`manifesto__highlight${visible ? ' manifesto__highlight--visible' : ''}`}>
            <RevealWord index={2} visible={visible}>{t.manifesto.words[2]}</RevealWord>{' '}
            <RevealWord index={3} visible={visible}>{t.manifesto.words[3]}</RevealWord>
          </span>
          <RevealWord index={4} visible={visible}>.</RevealWord>
        </h2>

        <p className="manifesto__tagline">
          {t.manifesto.tagline.before}<strong>{t.manifesto.tagline.bold}</strong>{t.manifesto.tagline.after}
        </p>
      </div>
    </section>
  );
}
