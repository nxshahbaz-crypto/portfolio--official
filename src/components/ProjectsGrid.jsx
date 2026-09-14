import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { portfolioData } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = [
    'All Projects',
    ...Array.from(new Set(portfolioData.projects.map((p) => p.category)))
  ];

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
          {/* Issue #6: Title case Featured Projects */}
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Projects developed as part of academic coursework and engineering problem solving.
          </p>

          {/* Filter Pills */}
          <div className="projects-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: Balanced 2-Column Layout */}
        <div className="projects-grid">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="project-card"
            >
              {/* Card Visual / Mockup Preview */}
              <div className="project-card-visual">
                <div className="project-visual-badge">
                  <span>{proj.year || proj.readTime}</span>
                </div>

                <div className="project-mockup-graphic">
                  <div className="mockup-header">
                    <div className="mockup-dot" />
                    <div className="mockup-dot" />
                    <div className="mockup-dot" />
                    {/* Issue #7: Readable spec text >= 12px via shared metadata size */}
                    <span className="mockup-spec-label">
                      {proj.id}.system.spec
                    </span>
                  </div>
                  <div className="mockup-body">
                    <span className="capsule-pill capsule-outline">
                      {proj.category}
                    </span>
                    <div className="mockup-display-title">
                      {proj.title}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-meta)', color: 'var(--pastel-yellow-bg)' }}>
                      [Verified Project]
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
                    <span key={tIdx} className={`capsule-pill ${getTagStyleClass(tIdx)}`}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Footer (Issue #3: Shared button variants) */}
                <div className="project-card-footer">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(proj)}
                    className="btn-pill-secondary btn-pill-sm"
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
                        className="btn-icon-pill btn-icon-sm"
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
