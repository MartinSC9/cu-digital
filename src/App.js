import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import Home from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Header from './components/Header/Header';
import ToastContainer from './components/Toast/ToastContainer';
import ChatWidget from './components/ChatWidget';

const AppLayout = () => {
  const location = useLocation();
  const showHeader = location.pathname === '/' || location.pathname.startsWith('/project/') || location.pathname === '/projects';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/process" element={<Services />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer />
      <ChatWidget />
    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
        <ToastProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AppLayout />
          </Router>
        </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
