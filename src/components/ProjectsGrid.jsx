import React, { useState } from 'react';
import { ArrowUpRight, Code, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { portfolioData } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All Projects', 'Full Stack Web', 'Engineering Systems'];

  const filteredProjects = activeFilter === 'All Projects'
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === activeFilter);

  const getTagStyleClass = (idx) => {
    const classes = ['capsule-yellow', 'capsule-sage', 'capsule-blue', 'capsule-lavender', 'capsule-peach'];
    return classes[idx % classes.length];
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">ENGINEERING PORTFOLIO</span>
          <h2 className="section-title">FEATURED PROJECTS</h2>
          <p className="section-subtitle">
            Use the filters to explore projects by technical domain.
          </p>

          {/* Filter Pills */}
          <div className="projects-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className={`project-card ${proj.featured && activeFilter === 'All Projects' ? 'featured-card' : ''}`}
            >
              {/* Card Visual / Mockup Preview */}
              <div className="project-card-visual">
                <div className="project-visual-badge">
                  <span>{proj.readTime}</span>
                </div>

                <div className="project-mockup-graphic">
                  <div className="mockup-header">
                    <div className="mockup-dot" />
                    <div className="mockup-dot" />
                    <div className="mockup-dot" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                      {proj.id}.system.spec
                    </span>
                  </div>
                  <div className="mockup-body">
                    <span className="capsule-pill capsule-outline" style={{ fontSize: '0.72rem' }}>
                      {proj.category}
                    </span>
                    <div className="mockup-display-title">
                      {proj.title}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--pastel-yellow-bg)' }}>
                      [Verified Architecture]
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="project-card-content">
                <div className="project-title-group">
                  <h3 className="project-title">{proj.title}</h3>
                  <div className="project-subtitle">{proj.subtitle}</div>
                </div>

                <p className="project-desc">{proj.description}</p>

                {/* Tech Pills */}
                <div className="project-tech-pills">
                  {proj.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className={`capsule-pill ${getTagStyleClass(tIdx)}`} style={{ fontSize: '0.72rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="project-card-footer">
                  <button
                    onClick={() => setActiveModalProject(proj)}
                    className="btn-pill-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    <span>Inspect Specs</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <div className="project-card-links">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon-pill"
                        style={{ width: '34px', height: '34px' }}
                        title="GitHub Source"
                        aria-label="GitHub Source"
                      >
                        <GithubIcon size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};
