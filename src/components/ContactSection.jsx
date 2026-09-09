import React, { useState } from 'react';
import { Mail, Copy, Check, FileText, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

export const ContactSection = () => {
  const { contact, personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FCE8A2', '#DCF2B0', '#E5CCF4', '#F5F2EB']
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-card">
          <span className="section-tag">{contact.sectionTag}</span>

          <h2 className="contact-callout">
            {contact.callout}
          </h2>

          <p className="contact-body">
            {contact.body}
          </p>

          {/* Contact Details from Resume */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center', margin: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <MapPin size={15} style={{ color: 'var(--pastel-yellow-bg)' }} />
              <span>{personal.location}</span>
            </div>
            <span style={{ opacity: 0.3 }}>•</span>
            <a href={`tel:${personal.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Phone size={15} style={{ color: 'var(--pastel-sage-bg)' }} />
              <span>{personal.phone}</span>
            </a>
            <span style={{ opacity: 0.3 }}>•</span>
            <a href={`mailto:${personal.email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Mail size={15} style={{ color: 'var(--pastel-blue-bg)' }} />
              <span>{personal.email}</span>
            </a>
          </div>

          <div className="contact-status-box">
            <span className="pulse-dot" />
            <span>{contact.status}</span>
          </div>

          {/* Action Buttons */}
          <div className="contact-actions-row">
            <button
              onClick={handleCopyEmail}
              className="btn-pill-primary"
              aria-label="Copy email address"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? contact.copiedFeedbackText : contact.copyButtonText}</span>
            </button>

            <a
              href={`mailto:${personal.email}`}
              className="btn-pill-secondary"
            >
              <Mail size={16} />
              <span>Direct Email</span>
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
          </div>

          {/* Profiles Row from Resume */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '12px' }}>
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
              href={personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="capsule-pill capsule-outline"
              style={{ fontSize: '0.74rem', padding: '6px 12px' }}
            >
              LeetCode
            </a>

            <a
              href={personal.geeksforgeeks}
              target="_blank"
              rel="noopener noreferrer"
              className="capsule-pill capsule-outline"
              style={{ fontSize: '0.74rem', padding: '6px 12px' }}
            >
              GeeksforGeeks
            </a>

            <a
              href={personal.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="capsule-pill capsule-outline"
              style={{ fontSize: '0.74rem', padding: '6px 12px' }}
            >
              HackerRank
            </a>
          </div>

          {copied && (
            <div className="copy-feedback-toast">
              <span>{personal.email} copied! Looking forward to connecting.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
