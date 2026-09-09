import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: portfolioData.personal.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-title">Shahbaz Ahmed Khan</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Software &amp; AI Systems Engineer
          </div>
        </div>

        {/* Live IST Clock */}
        <div className="footer-live-clock">
          <MapPin size={14} style={{ color: 'var(--pastel-yellow-bg)' }} />
          <span>{portfolioData.personal.location}</span>
          <span style={{ margin: '0 4px', opacity: 0.4 }}>•</span>
          <Clock size={14} style={{ color: 'var(--pastel-sage-bg)' }} />
          <span>{currentTime ? `${currentTime} IST` : 'Local Time'}</span>
        </div>

        {/* Links & Back to Top */}
        <div className="footer-links">
          <a href="#about" style={{ color: 'var(--text-muted)' }}>About</a>
          <a href="#flagship" style={{ color: 'var(--text-muted)' }}>Mark 1 AI</a>
          <a href="#projects" style={{ color: 'var(--text-muted)' }}>Projects</a>
          <button
            onClick={scrollToTop}
            className="btn-icon-pill"
            style={{ width: '32px', height: '32px' }}
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
        © {new Date().getFullYear()} Shahbaz Ahmed Khan. Crafted with React, Vite &amp; Vanilla CSS. Built for performance and reliability.
      </div>
    </footer>
  );
};
