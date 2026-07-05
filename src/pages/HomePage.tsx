import { lazy, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

// Import Sections
import HeroSection from '../sections/HeroSection';
import IntersectionLazy from '../components/IntersectionLazy';

const AboutSection = lazy(() => import('../sections/AboutSection'));
const SkillsSection = lazy(() => import('../sections/SkillsSection'));
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const BlogSection = lazy(() => import('../sections/BlogSection'));
const StatsSection = lazy(() => import('../sections/StatsSection'));
const CertificationsSection = lazy(() => import('../sections/CertificationsSection'));
const ContactSection = lazy(() => import('../sections/ContactSection'));

export default function HomePage() {
  const { setShowResume, setShowCommandPalette } = useOutletContext<{
    setShowResume: (show: boolean) => void;
    setShowCommandPalette: (show: boolean) => void;
  }>();

  const personSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sahaya Savari F",
    "url": "https://sahayasavari.me",
    "jobTitle": "Software Engineer",
    "alumniOf": "Saveetha Engineering College",
    "sameAs": [
      "https://github.com/sahaya-savari",
      "https://linkedin.com/in/sahayasavari"
    ]
  }), []);

  return (
    <>
      <SEOHead 
        title="Sahaya Savari F | Software Engineer" 
        description="Portfolio of Sahaya Savari F, a passionate Software Engineering student and full-stack developer specializing in React, TypeScript, and Python."
        schema={personSchema}
      />
      <HeroSection setShowResume={setShowResume} />
      <div className="section-divider" aria-hidden="true" />
      <div id="about">
        <IntersectionLazy fallbackHeight="100vh">
          <AboutSection setShowResume={setShowResume} />
        </IntersectionLazy>
      </div>
      <div className="section-divider" aria-hidden="true" />
      <div id="skills">
        <IntersectionLazy fallbackHeight="80vh">
          <SkillsSection />
        </IntersectionLazy>
      </div>
      <div className="section-divider" aria-hidden="true" />
      <IntersectionLazy fallbackHeight="40vh">
        <StatsSection />
      </IntersectionLazy>
      <div className="section-divider" aria-hidden="true" />
      <div id="projects">
        <IntersectionLazy fallbackHeight="150vh">
          <ProjectsSection />
        </IntersectionLazy>
      </div>
      <div className="section-divider" aria-hidden="true" />
      <div id="blog">
        <IntersectionLazy fallbackHeight="80vh">
          <BlogSection />
        </IntersectionLazy>
      </div>
      <div className="section-divider" aria-hidden="true" />
      <div id="certifications">
        <IntersectionLazy fallbackHeight="100vh">
          <CertificationsSection />
        </IntersectionLazy>
      </div>
      <div className="section-divider" aria-hidden="true" />
      <div id="contact">
        <IntersectionLazy fallbackHeight="100vh">
          <ContactSection setShowCommandPalette={setShowCommandPalette} />
        </IntersectionLazy>
      </div>
    </>
  );
}
