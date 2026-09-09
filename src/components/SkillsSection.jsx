import React from 'react';
import { Code2, Globe, Cpu, Wrench, Terminal, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SkillsSection = () => {
  const { skills, softSkills } = portfolioData;

  const getCategoryIcon = (idx) => {
    switch (idx) {
      case 0: return <Code2 size={20} />;
      case 1: return <Terminal size={20} />;
      case 2: return <Cpu size={20} />;
      case 3: return <Wrench size={20} />;
      default: return <Wrench size={20} />;
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">TECHNICAL EXPERTISE</span>
          <h2 className="section-title">SKILLS &amp; SYSTEMS MATRIX</h2>
          <p className="section-subtitle">
            Core CS foundations, programming languages, agentic AI architectures, and developer tooling.
          </p>
        </div>

        {/* 4 Technical Skill Cards */}
        <div className="skills-grid">
          {skills.map((cat, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="skill-cat-header">
                <div className="skill-cat-title">
                  <span style={{ color: cat.badgeColor }}>
                    {getCategoryIcon(idx)}
                  </span>
                  <span>{cat.category}</span>
                </div>
                <p className="skill-cat-desc">{cat.description}</p>
              </div>

              <div className="skill-items-list">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="skill-item-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cat.badgeColor }} />
                      <span className="skill-item-name">{item.name}</span>
                    </div>
                    <span className="skill-item-note">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills from Resume */}
        {softSkills && (
          <div style={{ marginTop: '36px', padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', textAlign: 'center' }}>
              PROFESSIONAL &amp; COLLABORATIVE COMPETENCIES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {softSkills.map((skill, idx) => (
                <span key={idx} className="capsule-pill capsule-outline" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                  <CheckCircle2 size={12} style={{ color: 'var(--pastel-yellow-bg)' }} />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
