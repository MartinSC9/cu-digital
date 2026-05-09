import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { chatData } from '../../config/chatData';
import { FaLinkedinIn, FaPaintBrush, FaServer, FaCloud, FaRobot } from 'react-icons/fa';
import { FiMessageCircle, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import avatarImg1 from '../../assets/logo-cu-icon.png';
import avatarImg2 from '../../assets/logo-cu-icon.png';
import styles from './ChatWidget.module.css';

const STORAGE_KEY = 'chat-widget-state';

const getStoredState = () => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveState = (state) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* ignore */ }
};

const ChatWidget = () => {
  const { currentLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const stored = getStoredState();

  const tabIcons = {
    techFrontend: <FaPaintBrush />,
    techBackend: <FaServer />,
    techDevops: <FaCloud />,
    techIA: <FaRobot />,
  };

  const [isOpen, setIsOpen] = useState(stored?.isOpen || false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(stored?.activeQuestion || null);
  const [activeTab, setActiveTab] = useState(stored?.activeTab || null);
  const [seenQuestions, setSeenQuestions] = useState(() => new Set(stored?.seenQuestions || []));
  const [isTyping, setIsTyping] = useState(false);
  const [botResponse, setBotResponse] = useState(null);
  const [subOptions, setSubOptions] = useState(null);
  const [isTabLoading, setIsTabLoading] = useState(false);

  const [showTooltip, setShowTooltip] = useState(true);
  const responseRef = useRef(null);
  const sidebarRef = useRef(null);
  const initializedRef = useRef(false);
  const scrollHintShown = useRef(false);

  const data = chatData[currentLanguage] || chatData.es;
  const chatTexts = t.chat || {};

  // Auto-hide tooltip after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Restore response from stored state on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (stored?.activeTab) {
      const parentCat = data.categories[stored.activeQuestion];
      if (parentCat?.subOptions) setSubOptions(parentCat.subOptions);
      const tabCat = data.categories[stored.activeTab];
      if (tabCat) setBotResponse({ html: tabCat.response });
    } else if (stored?.activeQuestion) {
      const cat = data.categories[stored.activeQuestion];
      if (cat) {
        if (cat.subOptions) {
          setSubOptions(cat.subOptions);
        } else {
          setBotResponse({ html: cat.response });
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Block body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Scroll hint on mobile: first time opening
  useEffect(() => {
    if (!isOpen || scrollHintShown.current || window.innerWidth > 640) return;
    scrollHintShown.current = true;
    const el = sidebarRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.scrollTo({ left: 80, behavior: 'smooth' });
      setTimeout(() => el.scrollTo({ left: 0, behavior: 'smooth' }), 900);
    }, 500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Close chat on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      setIsClosing(false);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist state
  useEffect(() => {
    saveState({ isOpen, activeQuestion, activeTab, seenQuestions: [...seenQuestions] });
  }, [isOpen, activeQuestion, activeTab, seenQuestions]);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = 0;
    }
  }, [botResponse]);

  useEffect(() => {
    setActiveQuestion(null);
    setActiveTab(null);
    setBotResponse(null);
    setSubOptions(null);
  }, [currentLanguage]);

  const unseenCount = data.quickQuestions.length - seenQuestions.size;

  const handleQuestion = useCallback((questionId) => {
    const cat = data.categories[questionId];
    if (!cat || questionId === activeQuestion) return;

    setSeenQuestions(prev => new Set(prev).add(questionId));
    setActiveQuestion(questionId);
    setActiveTab(null);
    setBotResponse(null);
    setSubOptions(null);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (cat.subOptions) {
        setSubOptions(cat.subOptions);
        const firstTabId = cat.subOptions[0].id;
        const firstTab = data.categories[firstTabId];
        setActiveTab(firstTabId);
        setBotResponse(firstTab ? { html: firstTab.response } : null);
      } else {
        setBotResponse({ html: cat.response });
      }
    }, 600);
  }, [data, activeQuestion]);

  const handleTab = useCallback((tabId) => {
    if (tabId === activeTab) return;
    const cat = data.categories[tabId];
    if (!cat) return;

    setActiveTab(tabId);
    setBotResponse(null);
    setIsTabLoading(true);

    setTimeout(() => {
      setIsTabLoading(false);
      setBotResponse({ html: cat.response });
    }, 400);
  }, [data, activeTab]);



  const minimizeChat = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  }, []);

  const closeChat = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setActiveQuestion(null);
      setActiveTab(null);
      setBotResponse(null);
      setSubOptions(null);
      saveState({ isOpen: false, activeQuestion: null, activeTab: null, seenQuestions: [...seenQuestions] });
    }, 250);
  }, [seenQuestions]);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleGoToContact = useCallback(() => {
    minimizeChat();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigate, location.pathname, minimizeChat]);

  return (
    <>
      {isOpen && (
        <>
        <div className={`${styles.overlay} ${location.pathname !== '/' ? styles.overlayTransparent : ''}`} onClick={minimizeChat} />
        <div
          className={`${styles.panel} ${isClosing ? styles.panelClosing : ''}`}
          role="dialog"
          aria-label={chatTexts.title}
        >
          <div className={styles.header}>
            <span className={styles.headerTitle}>
              💬 {chatTexts.title || 'Chat'}
            </span>
            <button
              className={styles.closeBtn}
              onClick={closeChat}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className={styles.body}>
            <div className={styles.sidebar} ref={sidebarRef}>
              {data.quickQuestions.map((q) => (
                <button
                  key={q.id}
                  className={`${styles.sidebarBtn} ${activeQuestion === q.id ? styles.sidebarBtnActive : ''}`}
                  onClick={() => handleQuestion(q.id)}
                >
                  {q.label}
                  {!seenQuestions.has(q.id) && <span className={styles.sidebarDot} />}
                </button>
              ))}
            </div>

            <div className={styles.response} ref={responseRef}>
              {!activeQuestion && !isTyping && (
                <div className={styles.welcomeMsg}>
                  <span dangerouslySetInnerHTML={{ __html: chatTexts.welcome }} />
                </div>
              )}

              {subOptions && (
                <>
                  <div className={styles.tabIntro}>
                    <span dangerouslySetInnerHTML={{ __html: data.categories[activeQuestion]?.response }} />
                  </div>
                  <div className={styles.tabs}>
                    {subOptions.map((opt) => (
                      <button
                        key={opt.id}
                        className={`${styles.tab} ${activeTab === opt.id ? styles.tabActive : ''}`}
                        onClick={() => handleTab(opt.id)}
                      >
                        {tabIcons[opt.id]} {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {(isTyping || isTabLoading) && (
                <div className={styles.typing}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              )}

              {botResponse && !isTyping && !isTabLoading && activeQuestion === 'contacto' && (
                <div className={styles.botMsg}>
                  <strong>{currentLanguage === 'es' ? '¡Contactanos!' : 'Get in touch!'}</strong>
                  <div className={styles.contactLinks}>
                    <button onClick={handleGoToContact} className={styles.contactLink}>
                      <FiMessageCircle /> {currentLanguage === 'es' ? 'Enviar mensaje' : 'Send message'}
                    </button>
                  </div>
                </div>
              )}

              {botResponse && !isTyping && !isTabLoading && activeQuestion === 'referencias' && (
                <div className={styles.botMsg}>
                  <strong>{currentLanguage === 'es'
                    ? 'Tengo dos referencias profesionales de Lilab:'
                    : 'I have two professional references from Lilab:'}</strong>
                  <div className={styles.refCard}>
                    <strong>Carlos Escobar</strong><br/>
                    <span className={styles.refRole}>Project Manager TI — PMO • IA Aplicada • Agile</span>
                    <a
                      href="https://www.linkedin.com/in/carloseescobarc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      <FaLinkedinIn /> {currentLanguage === 'es' ? 'Ver en LinkedIn' : 'View on LinkedIn'}
                    </a>
                  </div>
                  <div className={styles.refCard}>
                    <strong>Carlos Alberto Vargas Mori</strong><br/>
                    <span className={styles.refRole}>
                      {currentLanguage === 'es'
                        ? 'Líder en Transformación Digital y Gestión de Proyectos TI'
                        : 'Leader in Digital Transformation and IT Project Management'}
                    </span><br/>
                    <span className={styles.refRole}>
                      {currentLanguage === 'es'
                        ? '+13 años experiencia • Agilidad • Innovación'
                        : '13+ years experience • Agility • Innovation'}
                    </span>
                    <a
                      href="https://www.linkedin.com/in/carlos-alberto-vargas-mori-99178768/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      <FaLinkedinIn /> {currentLanguage === 'es' ? 'Ver en LinkedIn' : 'View on LinkedIn'}
                    </a>
                  </div>
                </div>
              )}

              {botResponse && !isTyping && !isTabLoading && activeQuestion === 'proyectos' && (
                <div className={styles.botMsg}>
                  <strong>{currentLanguage === 'es' ? 'Mis proyectos:' : 'My projects:'}</strong>
                  <div className={styles.projectList}>
                    {[
                      { id: 'prikly', es: 'Prikly — Plataforma de gestión para salones de belleza', en: 'Prikly — Management platform for beauty salons' },
                      { id: 'standford', es: 'Standford Pets — Sistema de sorteos nacional para Perú', en: 'Standford Pets — National raffle system for Peru' },
                      { id: 'viuti', es: 'Viuti — Sistema de gestión para salones', en: 'Viuti — Salon management system' },
                      { id: 'miarbol', es: 'Mi Árbol en el Mundo — Marketplace + red social ambiental', en: 'Mi Árbol en el Mundo — Marketplace + environmental social network' },
                      { id: 'theriapp', es: 'TheriApp — Quiz de personalidad con IA', en: 'TheriApp — AI personality quiz' },
                      { id: 'djdivito', es: 'DJ Divito — Landing page para DJ en Australia', en: 'DJ Divito — Landing page for a DJ in Australia' },
                      { id: 'triso', es: 'Triso — Landing corporativa para empresa de ingeniería', en: 'Triso — Corporate landing for an engineering company' },
                      { id: 'lolinails', es: 'Loli Nails — Catálogo digital para estudio de nail art', en: 'Loli Nails — Digital catalog for a nail art studio' },
                    ].map((p) => (
                      <Link
                        key={p.id}
                        to={`/project/${p.id}`}
                        className={`${styles.projectLink} ${location.pathname === `/project/${p.id}` ? styles.projectLinkActive : ''}`}
                      >
                        <FiExternalLink /> {currentLanguage === 'es' ? p.es : p.en}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {botResponse && !isTyping && !isTabLoading && activeQuestion === 'proyectoComplejo' && (
                <div className={styles.botMsg}>
                  <strong><Link to="/project/prikly" className={styles.projectLink} style={{ display: 'inline-flex', width: 'auto', padding: '2px 0', background: 'none', border: 'none' }}>Prikly</Link></strong>
                  {' '}{currentLanguage === 'es'
                    ? 'fue mi proyecto más complejo.'
                    : "was my most complex project."}
                  <br/><br/>
                  <strong>{currentLanguage === 'es' ? 'Duración:' : 'Duration:'}</strong> {currentLanguage === 'es' ? '2 años de desarrollo' : '2 years of development'}<br/>
                  <strong>{currentLanguage === 'es' ? 'Equipo:' : 'Team:'}</strong> {currentLanguage === 'es' ? '+10 personas (5+ devs, 2+ diseñadoras, QA, PM)' : '10+ people (5+ devs, 2+ designers, QA, PM)'}<br/>
                  <strong>{currentLanguage === 'es' ? 'Arquitectura:' : 'Architecture:'}</strong> 20+ microfrontends + 15+ {currentLanguage === 'es' ? 'microservicios' : 'microservices'}<br/>
                  <strong>{currentLanguage === 'es' ? 'Pagos:' : 'Payments:'}</strong> MercadoPago + Culqi + {currentLanguage === 'es' ? 'facturación electrónica SUNAT' : 'SUNAT e-invoicing'}<br/>
                  <strong>DevOps:</strong> Docker, GitHub Actions, SonarQube<br/>
                  <strong>Stack:</strong> React, TypeScript, Single-SPA, .NET Core, MySQL<br/><br/>
                  {currentLanguage === 'es'
                    ? 'Es una plataforma de gestión integral para salones de belleza con 50+ salones activos en producción.'
                    : "It's a comprehensive management platform for beauty salons with 50+ active salons in production."}
                </div>
              )}

              {botResponse && !isTyping && !isTabLoading && activeQuestion === 'experiencia' && (
                <div className={styles.botMsg}>
                  <strong>{currentLanguage === 'es' ? 'Mi experiencia laboral:' : 'My work experience:'}</strong><br/><br/>
                  <strong><a href="https://www.lilab.io/" target="_blank" rel="noopener noreferrer">LILAB</a></strong> — Full Stack Developer ({currentLanguage === 'es' ? 'Remoto' : 'Remote'})<br/>
                  {currentLanguage === 'es' ? 'Dic 2022 - Dic 2025 (4 años)' : 'Dec 2022 - Dec 2025 (4 years)'}<br/>
                  • {currentLanguage === 'es' ? 'Arquitectura y desarrollo de' : 'Architecture and development of'}{' '}
                  <Link to="/project/prikly" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Prikly</Link>
                  {' '}{currentLanguage === 'es' ? 'desde cero (2 años)' : 'from scratch (2 years)'}<br/>
                  • {currentLanguage === 'es'
                    ? 'Sistema de sorteo nacional para Perú: 200.000 códigos encriptados (4 meses)'
                    : 'National raffle system for Peru: 200,000 encrypted codes (4 months)'}<br/>
                  • {currentLanguage === 'es'
                    ? 'Gestión de 50+ salones activos en producción (8 meses)'
                    : 'Management of 50+ active salons in production (8 months)'}<br/><br/>
                  <strong><a href="https://miarbolenelmundo.com/" target="_blank" rel="noopener noreferrer">Mi Árbol en el Mundo</a></strong> — Co-Founder & Full Stack Developer<br/>
                  {currentLanguage === 'es' ? 'Ene 2025 - Actualidad' : 'Jan 2025 - Present'}<br/>
                  • 4 {currentLanguage === 'es' ? 'aplicaciones (web, mobile, landing, API)' : 'applications (web, mobile, landing, API)'}<br/>
                  • 270+ endpoints, 220+ {currentLanguage === 'es' ? 'componentes' : 'components'}, 25 {currentLanguage === 'es' ? 'tablas' : 'tables'}<br/>
                  • {currentLanguage === 'es'
                    ? 'Pagos con MercadoPago, chat en tiempo real, moderación con IA'
                    : 'MercadoPago payments, real-time chat, AI moderation'}
                </div>
              )}

              {botResponse && !isTyping && !isTabLoading && !['contacto', 'referencias', 'proyectos', 'proyectoComplejo', 'experiencia'].includes(activeQuestion) && (
                <div className={styles.botMsg} onClick={(e) => {
                  const link = e.target.closest('a');
                  if (link && link.href && new URL(link.href).origin === window.location.origin) {
                    e.preventDefault();
                    navigate(link.getAttribute('href'));
                  }
                }}>
                  <span dangerouslySetInnerHTML={{ __html: botResponse.html }} />
                </div>
              )}
            </div>
          </div>
        </div>
        </>
      )}

      <div className={styles.bubbleWrapper}>
        {!isOpen && (
          <div className={`${styles.bubbleTooltip} ${showTooltip ? styles.tooltipVisible : styles.tooltipHover}`}>
            {chatTexts.bubbleMessage || 'Preguntas sobre mí'}
            {unseenCount > 0 && (
              <span className={styles.notificationBadge}>{unseenCount}</span>
            )}
          </div>
        )}
        <button className={styles.bubble} onClick={isOpen ? minimizeChat : openChat} aria-label={chatTexts.title}>
          <img src={showTooltip ? avatarImg2 : avatarImg1} alt="Chat" className={styles.avatarImg} />
        </button>
      </div>
    </>
  );
};

export default ChatWidget;
