import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { FlagshipProject } from './components/FlagshipProject';
import { ProjectsGrid } from './components/ProjectsGrid';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { PortfolioAssistant } from './components/PortfolioAssistant';

function App() {
  const [isMark1Open, setIsMark1Open] = useState(false);

  const handleOpenMark1 = useCallback(() => {
    setIsMark1Open(true);
    if (typeof window !== 'undefined' && window.__openMark1Chat) {
      window.__openMark1Chat();
    }
  }, []);

  return (
    <div className="portfolio-app">
      <CustomCursor />
      <Navbar onOpenMark1={handleOpenMark1} isMark1Open={isMark1Open} />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <FlagshipProject />
        <ProjectsGrid />
        <SkillsSection />
        <ExperienceTimeline />
        <ContactSection />
      </main>
      <Footer />
      <PortfolioAssistant isOpen={isMark1Open} setIsOpen={setIsMark1Open} />
    </div>
  );
}

export default App;
