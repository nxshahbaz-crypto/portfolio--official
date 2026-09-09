import React from 'react';
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

function App() {
  return (
    <div className="portfolio-app">
      <CustomCursor />
      <Navbar />
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
    </div>
  );
}

export default App;
