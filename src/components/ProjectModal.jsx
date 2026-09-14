import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="capsule-pill capsule-yellow">
            {project.category}
          </span>
          <span className="capsule-pill capsule-outline">
            {project.year || project.readTime}
          </span>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <p style={{ color: 'var(--pastel-yellow-bg)', fontSize: 'var(--font-size-body-sm)', marginTop: '4px' }}>
            {project.subtitle}
          </p>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-body)', lineHeight: '1.65' }}>
          {project.description}
        </p>

        {project.bulletPoints && (
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-secondary)', fontSize: 'var(--font-size-body-sm)' }}>
            {project.bulletPoints.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>
        )}

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-meta)', color: 'var(--text-muted)', marginBottom: '10px' }}>
            ENGINEERED TECHNOLOGIES:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="capsule-pill capsule-sage">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', marginTop: '12px' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-primary btn-pill-sm"
            >
              <GithubIcon size={16} />
              <span>View Source</span>
            </a>
          )}

          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-secondary btn-pill-sm"
            >
              <ExternalLink size={16} />
              <span>Live Demonstration</span>
            </a>
          ) : (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-meta)', color: 'var(--text-muted)' }}>
              Source verified · Deployment in progress
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
