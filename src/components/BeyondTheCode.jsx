import React from 'react';
import { Compass, Book, Coffee, Palette } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const BeyondTheCode = () => {
  const { beyondCode } = portfolioData;

  const getPersonalIcon = (idx) => {
    switch (idx) {
      case 0: return <Compass size={22} />;
      case 1: return <Book size={22} />;
      case 2: return <Coffee size={22} />;
      case 3: return <Palette size={22} />;
      default: return <Compass size={22} />;
    }
  };

  const getCapsuleClass = (tagColor) => {
    if (tagColor.includes('FCE8A2')) return 'capsule-yellow';
    if (tagColor.includes('DCF2B0')) return 'capsule-sage';
    if (tagColor.includes('BFE3EC')) return 'capsule-blue';
    return 'capsule-lavender';
  };

  return (
    <section className="section" style={{ background: 'radial-gradient(circle at 70% 20%, rgba(229, 204, 244, 0.03), transparent 60%)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">BEYOND THE TERMINAL</span>
          <h2 className="section-title">THE HUMAN PERSPECTIVE</h2>
          <p className="section-subtitle">
            Curiosity, craftsmanship, and the personal interests that shape how I approach building technology.
          </p>
        </div>

        <div className="beyond-grid">
          {beyondCode.map((item, idx) => (
            <div key={idx} className="beyond-card">
              <div className="beyond-tag-row">
                <span className={`capsule-pill ${getCapsuleClass(item.tagColor)}`} style={{ fontSize: '0.72rem' }}>
                  {item.tag}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {getPersonalIcon(idx)}
                </span>
              </div>

              <div>
                <h3 className="beyond-title">{item.title}</h3>
                <div className="beyond-subtitle">{item.subtitle}</div>
              </div>

              <p className="beyond-content">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
