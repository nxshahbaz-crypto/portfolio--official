import React from 'react';
import { Award, GitCommit, GraduationCap, Trophy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceTimeline = () => {
  const { education, training, certifications } = portfolioData;

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">ACADEMIC &amp; ENGINEERING JOURNEY</span>
          <h2 className="section-title">EDUCATION &amp; MILESTONES</h2>
          <p className="section-subtitle">
            Formal education, specialized multi-agent systems training, and verified certifications.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="timeline-container">
          {/* Flagship Milestone */}
          <div className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-card" style={{ borderColor: 'rgba(252, 232, 162, 0.35)' }}>
              <div className="timeline-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="capsule-pill capsule-yellow" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                    Flagship Project
                  </span>
                  <span className="timeline-period">2026</span>
                </div>
                <span style={{ color: 'var(--pastel-yellow-bg)' }}><Award size={16} /></span>
              </div>

              <div>
                <h3 className="timeline-title">Mark 1 AI — Autonomous Multi-Provider Agent</h3>
                <div className="timeline-org">Autonomous Agentic System Architecture</div>
              </div>

              <p className="timeline-desc">
                Engineered dual-provider inference (Gemini primary + Groq automatic fallback), dynamic Tool Registry, persistent Supabase conversation memory, vector RAG retrieval, smart context budgeting, and security guardrails verified with 300+ automated tests.
              </p>
            </div>
          </div>

          {/* Education Entries */}
          {education.map((edu, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="capsule-pill capsule-sage" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                      Education
                    </span>
                    <span className="timeline-period">{edu.period}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}><GraduationCap size={16} /></span>
                </div>

                <div>
                  <h3 className="timeline-title">{edu.degree}</h3>
                  <div className="timeline-org">{edu.institution} • {edu.location}</div>
                </div>

                <p className="timeline-desc">{edu.details}</p>
              </div>
            </div>
          ))}

          {/* Training Entries */}
          {training.map((t, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="capsule-pill capsule-blue" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                      Specialized Training
                    </span>
                    <span className="timeline-period">{t.period}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}><GitCommit size={16} /></span>
                </div>

                <div>
                  <h3 className="timeline-title">{t.title}</h3>
                  <div className="timeline-org">{t.role}</div>
                </div>

                <p className="timeline-desc">{t.description}</p>
              </div>
            </div>
          ))}

          {/* Certifications Card */}
          <div className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-card">
              <div className="timeline-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="capsule-pill capsule-lavender" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                    Certifications
                  </span>
                </div>
                <span style={{ color: 'var(--text-muted)' }}><Trophy size={16} /></span>
              </div>

              <div>
                <h3 className="timeline-title">Verified Certifications &amp; Drives</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                {certifications.map((cert, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(20, 19, 18, 0.5)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {cert.name}
                    </span>
                    <span className="capsule-pill capsule-outline" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                      {cert.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
