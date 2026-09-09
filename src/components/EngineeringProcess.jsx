import React, { useState } from 'react';
import { 
  Search, Layers, Cpu, ShieldCheck, Rocket, 
  Coffee, AlertTriangle, GitFork, CheckCircle2, Sparkles 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const EngineeringProcess = () => {
  const [realityMode, setRealityMode] = useState(false);
  const { engineeringProcess } = portfolioData;

  const currentMode = realityMode ? engineeringProcess.modes.reality : engineeringProcess.modes.spec;

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Search': return <Search size={22} />;
      case 'Layers': return <Layers size={22} />;
      case 'Cpu': return <Cpu size={22} />;
      case 'ShieldCheck': return <ShieldCheck size={22} />;
      case 'Rocket': return <Rocket size={22} />;
      case 'Coffee': return <Coffee size={22} />;
      case 'AlertTriangle': return <AlertTriangle size={22} />;
      case 'GitFork': return <GitFork size={22} />;
      case 'CheckCircle2': return <CheckCircle2 size={22} />;
      case 'Sparkles': return <Sparkles size={22} />;
      default: return <Cpu size={22} />;
    }
  };

  return (
    <section id="process" className="section process-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{engineeringProcess.sectionTag}</span>
          <h2 className="section-title">{engineeringProcess.title}</h2>
          <p className="section-subtitle">{engineeringProcess.subtitle}</p>

          {/* Interactive Mode Toggle */}
          <div className="process-toggle-container">
            <div 
              className="toggle-switch-wrapper"
              onClick={() => setRealityMode(!realityMode)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setRealityMode(!realityMode)}
              aria-label="Toggle engineering reality mode"
            >
              <span className="toggle-label-text">
                {realityMode ? "Reality Mode Active" : "Spec Mode Active"}
              </span>
              <div className={`toggle-pill-switch ${realityMode ? 'active' : ''}`}>
                <div className="toggle-thumb" />
              </div>
            </div>
            <span className="process-mode-badge">
              {currentMode.badge}
            </span>
          </div>
        </div>

        {/* 5 Process Step Cards */}
        <div className="process-steps-row">
          {currentMode.steps.map((step) => (
            <div key={step.number} className="process-card">
              <div className="process-icon-circle">
                {renderIcon(step.icon)}
              </div>
              <div className="process-card-num">{step.number}</div>
              <h3 className="process-card-title">{step.title}</h3>
              <p className="process-card-desc">{step.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
