import React, { useCallback } from 'react';
import { useInViewReveal } from '../../hooks/useInViewReveal';
import { useScrollScale } from '../../hooks/useScrollScale';
import { useLanguage } from '../../contexts/LanguageContext';
import manifestoBg from '../../assets/manifesto-bg.jpg';

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
  const [revealRef, visible] = useInViewReveal({ threshold: 0.25 });
  const [scaleRef, scale] = useScrollScale(1.15);
  const { t } = useLanguage();

  // Combine both refs
  const combinedRef = useCallback((node) => {
    revealRef.current = node;
    scaleRef.current = node;
  }, [revealRef, scaleRef]);

  return (
    <section ref={combinedRef} className={`manifesto${visible ? ' manifesto--revealed' : ''}`}>
      <img
        className="section-video-bg"
        src={manifestoBg}
        alt=""
        aria-hidden="true"
        style={{ transform: `scale(${scale})`, transition: 'transform 0.1s linear' }}
      />

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
