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
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Tag with subtle accent */}
        <div className="section-header about-header">
          <span className="section-tag about-tag">✦ PROFESSIONAL SUMMARY</span>
        </div>

        <div className="about-grid">
          {/* Left Narrative: Core Editorial Statement & Summary */}
          <div className="about-narrative">
            <h2 className="about-heading">
              Computer Science (AI &amp; ML) undergraduate at Vardhaman College of Engineering, passionate about <em>scalable software</em> and <em>intelligent systems</em>.
            </h2>

            <p className="about-text">
              {professionalSummary}
            </p>

            {/* Quick Direction / Focus Areas grounded in Resume */}
            <div className="about-focus-pills" aria-label="Core focus areas">
              <span className="capsule-pill capsule-outline">Java &amp; C++ OOP</span>
              <span className="capsule-pill capsule-outline">Data Structures &amp; Algorithms</span>
              <span className="capsule-pill capsule-outline">LLMs &amp; Multi-Agent Systems</span>
              <span className="capsule-pill capsule-outline">Full-Stack Web</span>
            </div>
          </div>

          {/* Right Structured Highlights Cards */}
          <div className="about-highlights-grid">
            {summaryHighlights.map((item, idx) => (
              <div key={idx} className="highlight-card">
                <div>
                  <div className="highlight-label">{item.label}</div>
                  <div className="highlight-val">{item.value}</div>
                  <div className="highlight-sub">
                    {item.sub}
                  </div>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <span className={`capsule-pill ${getCapsuleClass(item.accent)}`}>
                    {item.tag || 'Verified'}
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
