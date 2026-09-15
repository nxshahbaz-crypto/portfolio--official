import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Bot } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Navbar = ({ onOpenMark1, isMark1Open = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link spy
      const sections = ['hero', 'about', 'flagship', 'projects', 'skills', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Summary', href: '#about', id: 'about' },
    { label: 'Mark 1 AI', href: '#flagship', id: 'flagship' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Technical Skills', href: '#skills', id: 'skills' },
    { label: 'Education & Training', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand */}
        <a href="#hero" className="navbar-brand" aria-label="Shahbaz Home">
          <span>SHAHBAZ</span>
          <span className="brand-dot" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-container" aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-item-try-mark1">
              <button
                type="button"
                onClick={onOpenMark1}
                className={`nav-link-try-mark1 ${isMark1Open ? 'active' : ''}`}
                aria-label="Try Mark 1 AI — Open interactive chat assistant"
                aria-expanded={isMark1Open}
              >
                <Bot size={13} aria-hidden="true" />
                <span>Try Mark 1 AI</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-secondary btn-pill-sm nav-resume-btn"
          >
            <FileText size={14} />
            <span>Resume ↗</span>
          </a>

          <div className="nav-divider" aria-hidden="true" />

          {/* Issue #12 & #4: Semantic status badge at far end */}
          <span
            className="status-pill nav-status-badge"
            role="status"
            aria-label="Internship status: Open for Internships 2026-2027"
          >
            <span className="pulse-dot" aria-hidden="true" />
            <span className="status-text-full">{portfolioData.personal.statusBadge}</span>
            <span className="status-text-compact">2026-2027</span>
          </span>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation Menu">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="mobile-nav-link mobile-nav-action"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMark1?.();
            }}
            aria-label="Try Mark 1 AI — Open interactive chat assistant"
          >
            <Bot size={16} aria-hidden="true" />
            <span>Try Mark 1 AI</span>
          </button>
          <div style={{ paddingTop: '12px' }}>
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <FileText size={16} />
              <span>Resume ↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
