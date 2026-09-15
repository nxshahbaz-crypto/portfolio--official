import React from 'react';
import { ArrowDownRight, Mail, FileText, Bot } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { portfolioData } from '../data/portfolioData';

export const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Editorial Narrative */}
          <div className="hero-content">
            <h1 className="hero-headline">
              I'm Shahbaz — a Computer Science (AI &amp; ML) student building my way into the world of <em>software and intelligent systems</em>.
            </h1>

            <p className="hero-subheadline">
              {personal.subStatement}
            </p>

            {/* Quick Action Buttons - Clear Hierarchy (Issue #8) */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn-pill-primary">
                <span>View My Work</span>
                <ArrowDownRight size={16} />
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-secondary"
              >
                <FileText size={16} />
                <span>Resume ↗</span>
              </a>

              <a href="#flagship" className="btn-pill-ghost">
                <Bot size={16} />
                <span>Mark 1 AI (Flagship)</span>
              </a>

              <a href="#contact" className="btn-pill-ghost">
                <Mail size={16} />
                <span>Contact</span>
              </a>
            </div>

            {/* Social & Verification Badges - Subdued & Grouped (Issue #8, #4) */}
            <div className="hero-socials">
              <div className="hero-social-links">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon-pill"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={18} />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon-pill"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                </a>

                <a
                  href={`mailto:${personal.email}`}
                  className="btn-icon-pill"
                  title="Send Email"
                  aria-label="Send Email"
                >
                  <Mail size={18} />
                </a>
              </div>

              <div className="hero-profile-pills">
                <a
                  href={personal.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capsule-pill capsule-outline"
                  title="LeetCode Profile"
                >
                  LeetCode
                </a>

                <a
                  href={personal.geeksforgeeks}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capsule-pill capsule-outline"
                  title="GeeksforGeeks Profile"
                >
                  GeeksforGeeks
                </a>

                <a
                  href={personal.hackerrank}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capsule-pill capsule-outline"
                  title="HackerRank Profile"
                >
                  HackerRank
                </a>
              </div>

              {/* Status Badge with 13px readable text (Issue #4) */}
              <span
                className="status-pill hero-status-pill"
                role="status"
                aria-label={`Internship status: ${personal.statusBadge}`}
              >
                <span className="pulse-dot" aria-hidden="true" />
                <span>{personal.statusBadge}</span>
              </span>
            </div>
          </div>

          {/* Right Portrait Treatment */}
          <div className="hero-image-wrapper">
            <img
              src={personal.portraitImage}
              alt="Shahbaz Ahmed Khan - Computer Science (AI & ML) Student"
              className="hero-portrait"
              loading="eager"
            />
            <div className="hero-image-gradient" />

            {/* Floating Info Badge on Portrait */}
            <div className="hero-image-badge">
              <div>
                <div className="badge-text-primary">Shahbaz Ahmed Khan</div>
                <div className="badge-text-sub">B.Tech CSE (AI &amp; ML) · Vardhaman</div>
              </div>
              <span className="capsule-pill capsule-yellow">
                Flagship: Mark 1
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
