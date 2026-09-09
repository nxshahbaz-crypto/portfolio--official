import React from 'react';
import { ArrowDownRight, Sparkles, Mail, FileText, Bot } from 'lucide-react';
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
            <div className="hero-greeting">
              <span>{personal.greetingEmoji}</span>
              <span>{personal.greetingText}</span>
            </div>

            <h1 className="hero-headline">
              I build <em>autonomous AI systems</em> &amp; scalable software where robust engineering meets intuitive craft.
            </h1>

            <p className="hero-subheadline">
              {personal.subStatement}
            </p>

            {/* Quick Action Buttons */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn-pill-primary">
                <span>View My Work</span>
                <ArrowDownRight size={16} />
              </a>

              <a href="#flagship" className="btn-pill-accent">
                <Bot size={16} />
                <span>Mark 1 AI (Flagship)</span>
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

              <a href="#contact" className="btn-pill-secondary">
                <Mail size={16} />
                <span>Contact</span>
              </a>
            </div>

            {/* Social & Verification Badges */}
            <div className="hero-socials">
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

              <a
                href={personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="capsule-pill capsule-outline"
                style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                title="LeetCode Profile"
              >
                LeetCode
              </a>

              <a
                href={personal.geeksforgeeks}
                target="_blank"
                rel="noopener noreferrer"
                className="capsule-pill capsule-outline"
                style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                title="GeeksforGeeks Profile"
              >
                GeeksforGeeks
              </a>

              <a
                href={personal.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="capsule-pill capsule-outline"
                style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                title="HackerRank Profile"
              >
                HackerRank
              </a>

              <div className="status-pill" style={{ marginLeft: '6px' }}>
                <span className="pulse-dot" />
                <span>{personal.statusBadge}</span>
              </div>
            </div>
          </div>

          {/* Right Portrait Treatment */}
          <div className="hero-image-wrapper">
            <img
              src={personal.portraitImage}
              alt="Shahbaz - Software & AI Systems Engineer"
              className="hero-portrait"
              loading="eager"
            />
            <div className="hero-image-gradient" />

            {/* Floating Info Badge on Portrait */}
            <div className="hero-image-badge">
              <div>
                <div className="badge-text-primary">Shahbaz Ahmed Khan</div>
                <div className="badge-text-sub">AI Systems &amp; Software Engineer</div>
              </div>
              <span className="capsule-pill capsule-yellow" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                Flagship: Mark 1
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
