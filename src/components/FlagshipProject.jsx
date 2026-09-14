import React, { useState } from 'react';
import { Bot, Shield, Cpu, Database, Wrench, CheckCircle2, GitFork, Terminal, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { portfolioData } from '../data/portfolioData';
import { Mark1Chat } from './Mark1Chat';

export const FlagshipProject = () => {
  const { flagship } = portfolioData;
  const [selectedNodeId, setSelectedNodeId] = useState('fallback-provider');
  const [activeTabId, setActiveTabId] = useState('failover');

  const selectedNode = flagship.architectureNodes.find((n) => n.id === selectedNodeId) || flagship.architectureNodes[0];
  const activeSubsystem = flagship.subsystems.find((s) => s.id === activeTabId) || flagship.subsystems[0];

  const getNodeIcon = (category) => {
    switch (category) {
      case 'Security': return <Shield size={16} />;
      case 'Inference': return <Cpu size={16} />;
      case 'Execution': return <Wrench size={16} />;
      case 'Storage': return <Database size={16} />;
      case 'Optimization': return <GitFork size={16} />;
      case 'Testing': return <CheckCircle2 size={16} />;
      default: return <Bot size={16} />;
    }
  };

  return (
    <section id="flagship" className="section flagship-section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left' }}>
          <span className="section-tag">FLAGSHIP ENGINEERING SHOWCASE</span>
        </div>

        <div className="flagship-card">
          {/* Header & Meta */}
          <div className="flagship-header">
            <div className="flagship-top-meta">
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="capsule-pill capsule-yellow">{flagship.badge}</span>
                <span className="capsule-pill capsule-sage">300+ Automated Tests</span>
                <span className="capsule-pill capsule-blue">Dual-Provider Failover</span>
              </div>
              <span className="capsule-pill capsule-outline">{flagship.readTime}</span>
            </div>

            <h2 className="flagship-title">{flagship.title}</h2>
            <p className="flagship-tagline">{flagship.tagline}</p>
          </div>

          {/* Stats Bar */}
          <div className="flagship-stats-bar">
            {flagship.stats.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-body)', lineHeight: '1.7', marginBottom: '24px' }}>
            {flagship.overview}
          </p>

          {/* Issue #9: Explanatory bridge clarifying the two interaction layers */}
          <div className="architecture-guide-bridge">
            <p className="bridge-copy">
              Explore the 7-node architecture overview below, then dive into each subsystem specification.
            </p>
          </div>

          {/* Layer 1: Interactive Architecture Overview */}
          <div className="architecture-explorer">
            <div className="architecture-title-bar">
              <div className="arch-title">
                <Terminal size={18} />
                <span>Architecture Topology Overview (Click node to inspect)</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-meta)', color: 'var(--text-muted)' }}>
                Active Node: {selectedNode.name}
              </span>
            </div>

            {/* Nodes Grid */}
            <div
              className="arch-nodes-grid"
              role="region"
              aria-label="Architecture Topology Nodes"
            >
              {flagship.architectureNodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  className={`arch-node-btn ${selectedNodeId === node.id ? 'selected' : ''}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  aria-pressed={selectedNodeId === node.id}
                  aria-controls="arch-node-inspector"
                  aria-label={`${node.category}: ${node.name}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="arch-node-cat">{node.category}</span>
                    <span style={{ color: node.color }}>{getNodeIcon(node.category)}</span>
                  </div>
                  <div className="arch-node-name">{node.name}</div>
                  <div className="arch-node-short">{node.shortDesc}</div>
                </button>
              ))}
            </div>

            {/* Inspector Details */}
            <div
              id="arch-node-inspector"
              className="arch-inspector"
              role="region"
              aria-live="polite"
              aria-label={`Node details for ${selectedNode.name}`}
            >
              <div className="inspector-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="capsule-pill capsule-yellow">
                    {selectedNode.category}
                  </span>
                  <span className="inspector-title">{selectedNode.name}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-meta)', color: 'var(--text-muted)' }}>
                  Verified Component
                </span>
              </div>
              <p className="inspector-body">{selectedNode.fullDetails}</p>
            </div>
          </div>

          {/* Layer 2: Subsystems Deep Dive Tabs */}
          <div className="subsystems-section">
            <div className="subsystems-header-bar">
              <span className="section-tag">Subsystem Specifications</span>
              <p className="subsystems-header-sub">
                Select a layer below to examine implementation details and verification criteria.
              </p>
            </div>

            <div
              className="subsystem-tabs"
              role="tablist"
              aria-label="Mark 1 AI Subsystem Specifications"
            >
              {flagship.subsystems.map((sub) => (
                <button
                  key={sub.id}
                  id={`subsystem-tab-${sub.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTabId === sub.id}
                  aria-controls={`subsystem-panel-${sub.id}`}
                  className={`subsystem-tab-btn ${activeTabId === sub.id ? 'active' : ''}`}
                  onClick={() => setActiveTabId(sub.id)}
                >
                  {sub.title}
                </button>
              ))}
            </div>

            <div
              id={`subsystem-panel-${activeSubsystem.id}`}
              role="tabpanel"
              aria-labelledby={`subsystem-tab-${activeSubsystem.id}`}
              className="subsystem-panel"
            >
              <div className="subsystem-details">
                <h3 className="subsystem-heading">{activeSubsystem.title}</h3>
                <p className="subsystem-desc">{activeSubsystem.description}</p>
                <ul className="subsystem-bullets">
                  {activeSubsystem.bulletPoints.map((pt, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="subsystem-code-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-muted)', fontSize: 'var(--font-size-meta)' }}>
                  <span>Architecture Specification</span>
                  <span>ES6 / Node.js</span>
                </div>
                <pre><code>{activeSubsystem.codeSnippet}</code></pre>
              </div>
            </div>
          </div>

          {/* Layer 3: Run the System (Interactive Live Mark 1 Experience) */}
          <div className="mark1-interactive-layer">
            <div className="mark1-interactive-header">
              <span className="section-tag" style={{ color: 'var(--pastel-yellow-bg)', letterSpacing: '0.08em' }}>
                ✦ RUN THE SYSTEM
              </span>
              <h3 className="mark1-interactive-title">Live Mark 1 Interaction</h3>
              <p className="mark1-interactive-sub">
                Try a live interaction below in this compact showcase, or open the complete deployed application (full frontend UI, agent controls &amp; session manager) in a new tab.
              </p>
            </div>

            <Mark1Chat />
          </div>

          {/* Tech Stack Chips & Actions */}
          <div className="flagship-actions">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '6px' }}>
                STACK:
              </span>
              {flagship.techStack.map((tech, idx) => (
                <span key={idx} className="capsule-pill capsule-outline" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="flagship-cta-wrapper">
              <div className="flagship-cta-btns">
                <a
                  href={flagship.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-primary"
                >
                  <GithubIcon size={16} />
                  <span>Mark 1 Repository</span>
                  <ArrowUpRight size={15} />
                </a>

                <a
                  href={flagship.liveDemoUrl || "https://ai-agent-mark-1.vercel.app"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary"
                >
                  <span>Open Mark 1</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <span className="flagship-demo-note">
                {flagship.liveDemoNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
