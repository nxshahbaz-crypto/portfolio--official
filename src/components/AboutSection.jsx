import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const AboutSection = () => {
  const { professionalSummary, summaryHighlights } = portfolioData;

  const getCapsuleClass = (accent) => {
    switch (accent) {
      case 'yellow': return 'capsule-yellow';
      case 'sage': return 'capsule-sage';
      case 'lavender': return 'capsule-lavender';
      case 'blue': return 'capsule-blue';
      default: return 'capsule-yellow';
    }
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left' }}>
          <span className="section-tag">PROFESSIONAL SUMMARY</span>
        </div>

        <div className="about-grid">
          {/* Left Narrative: Exact Professional Summary from Resume */}
          <div className="about-narrative">
            <h2 className="about-heading" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', lineHeight: 1.35 }}>
              Computer Science (AI &amp; ML) undergraduate with a strong foundation in Java, C++, DSA, and modern web development.
            </h2>
            <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: 1.75 }}>
              {professionalSummary}
            </p>
          </div>

          {/* Right Architecture Highlights */}
          <div className="about-highlights-grid">
            {summaryHighlights.map((item, idx) => (
              <div key={idx} className="highlight-card">
                <div className="highlight-label">{item.label}</div>
                <div className="highlight-val">{item.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {item.sub}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <span className={`capsule-pill ${getCapsuleClass(item.accent)}`} style={{ fontSize: '0.7rem' }}>
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
