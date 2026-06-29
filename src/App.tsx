import React, { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { m as motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X, Search } from 'lucide-react';

import ClickSpark from './components/ClickSpark';
import ErrorBoundary from './components/ErrorBoundary';
import { lockScroll, unlockScroll } from './utils/scrollLock';


// Import Sections
import HeroSection from './sections/HeroSection';
import IntersectionLazy from './components/IntersectionLazy';

const AboutSection = lazy(() => import('./sections/AboutSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const StatsSection = lazy(() => import('./sections/StatsSection'));
const CertificationsSection = lazy(() => import('./sections/CertificationsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));


// Lazy load heavy global modals
const ResumeViewer = lazy(() => import('./components/ResumeViewer'));
const BlogModal = lazy(() => import('./components/BlogModal'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));

export default function App() {
  const [showResume, setShowResume] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);

  const scrollToHashTarget = useCallback(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return undefined;

    const alignToTarget = () => {
      const scrollPaddingTop = parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop
      ) || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - scrollPaddingTop;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    };

    alignToTarget();

    const startedAt = performance.now();
    let rafId = 0;
    const keepAlignedWhileLazySectionsMount = () => {
      alignToTarget();
      if (performance.now() - startedAt < 1200) {
        rafId = requestAnimationFrame(keepAlignedWhileLazySectionsMount);
      }
    };

    rafId = requestAnimationFrame(keepAlignedWhileLazySectionsMount);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Ctrl + K Spotlight listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fade out static skeleton after hydration
  useEffect(() => {
    const skeleton = document.getElementById('static-hero-skeleton');
    if (skeleton) {
      skeleton.style.transition = 'opacity 0.8s ease-in-out';
      skeleton.style.opacity = '0';
      setTimeout(() => skeleton.remove(), 800);
    }
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let mostVisible = null;
      let maxRatio = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisible = entry.target.id;
        }
      });
      if (mostVisible) {
        setActiveSection(mostVisible);
      }
    }, { threshold: [0.1, 0.5, 0.9], rootMargin: '-20% 0px -40% 0px' });

    const sectionIds = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap for mobile menu
  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    let cancelScrollStabilizer: (() => void) | undefined;
    const handleHashChange = () => {
      cancelScrollStabilizer?.();
      cancelScrollStabilizer = scrollToHashTarget();
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) handleHashChange();

    return () => {
      cancelScrollStabilizer?.();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [scrollToHashTarget]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ClickSpark sparkColor='#fff' sparkSize={12} sparkRadius={25} sparkCount={10} duration={300}>
      <div className="bg-transparent min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
        
        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-white/40 z-[200] origin-left"
          style={{ scaleX }}
          aria-hidden="true"
        />

        {/* SKIP TO CONTENT LINK */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:rounded-full focus:font-body focus:font-medium focus:text-sm focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* NAVBAR */}
        <header>
          <nav className="fixed top-4 md:top-6 left-0 right-0 z-[100] px-4 md:px-6" aria-label="Main navigation">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a href="#home" className="w-10 h-10 liquid-glass-strong rounded-full flex items-center justify-center border border-white/20" aria-label="Sahaya Savari F — Go to top">
                  <span className="font-heading text-lg italic" aria-hidden="true">SF</span>
                </a>
                <span className="font-body text-xs font-medium tracking-widest hidden lg:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
                  AVAILABLE FOR WORK
                </span>
                <button 
                  onClick={() => setShowCommandPalette(true)}
                  className="font-body text-[11px] font-medium text-white/60 hidden lg:flex items-center gap-2.5 ml-4 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300 shadow-sm cursor-pointer group"
                  aria-label="Open command palette"
                >
                  <Search size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:text-white transition-colors">Search</span>
                  <kbd className="font-mono text-[9px] text-white/40 bg-white/[0.07] border border-white/[0.08] px-1.5 py-0.5 rounded-md group-hover:text-white/60 group-hover:bg-white/[0.1] transition-all">Ctrl K</kbd>
                </button>
              </div>
              <div className="hidden md:flex liquid-glass px-4 lg:px-6 py-2.5 rounded-full items-center gap-3 lg:gap-8 backdrop-blur-md">
                <a href="#home" className={`text-sm font-body font-medium transition-colors ${activeSection === 'home' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Home</a>
                <a href="#about" className={`text-sm font-body font-medium transition-colors ${activeSection === 'about' ? 'text-white' : 'text-white/50 hover:text-white'}`}>About</a>
                <button onClick={() => setShowResume(true)} className="text-sm font-body font-medium text-white/50 hover:text-white transition-colors cursor-pointer">Resume</button>
                <button onClick={() => setShowBlog(true)} className="text-sm font-body font-medium text-white/50 hover:text-white transition-colors cursor-pointer">Blog</button>
                <a href="#skills" className={`text-sm font-body font-medium transition-colors ${activeSection === 'skills' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Skills</a>
                <a href="#projects" className={`text-sm font-body font-medium transition-colors ${activeSection === 'projects' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Projects</a>
                <a href="#certifications" className={`text-sm font-body font-medium transition-colors ${activeSection === 'certifications' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Certs</a>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="hidden md:flex relative text-sm font-medium rounded-full h-10 pl-6 pr-14 group transition-all duration-500 hover:pl-14 hover:pr-6 overflow-hidden cursor-pointer bg-white text-black items-center"
                  aria-label="Get in touch — jump to contact section"
                >
                  <span className="relative z-10 transition-all duration-500">Get In Touch</span>
                  <div className="absolute right-1 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45" aria-hidden="true">
                    <ArrowUpRight size={14} />
                  </div>
                </a>
                <button 
                  ref={mobileMenuToggleRef}
                  className="md:hidden w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-[110]"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav-menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </nav>
        </header>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-menu"
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[105] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center overflow-y-auto p-6"
              onClick={() => setMobileMenuOpen(false)}
              onKeyDown={handleMobileMenuKeyDown}
            >
              <nav className="flex flex-col items-center gap-8" onClick={e => e.stopPropagation()} aria-label="Mobile navigation">
                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Home</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">About</a>
                <button onClick={() => { setShowResume(true); setMobileMenuOpen(false); }} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors cursor-pointer min-h-[48px]">Resume</button>
                <button onClick={() => { setShowBlog(true); setMobileMenuOpen(false); }} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors cursor-pointer min-h-[48px]">Blog</button>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Skills</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Projects</a>
                <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Certs</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="main-content">
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
          <div id="certifications">
            <IntersectionLazy fallbackHeight="100vh">
              <CertificationsSection />
            </IntersectionLazy>
          </div>
        </main>

        <div className="section-divider" aria-hidden="true" />
        <div id="contact">
          <IntersectionLazy fallbackHeight="100vh">
            <ContactSection setShowBlog={setShowBlog} setShowCommandPalette={setShowCommandPalette} />
          </IntersectionLazy>
        </div>

      </div>
      
      {/* Global Modals */}
      <AnimatePresence>
        {showResume && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center" role="status"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" aria-hidden="true"></div><span className="sr-only">Loading resume viewer...</span></div>}>
              <ResumeViewer onClose={() => setShowResume(false)} />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBlog && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center" role="status"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" aria-hidden="true"></div><span className="sr-only">Loading blog...</span></div>}>
              <BlogModal onClose={() => setShowBlog(false)} />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCommandPalette && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center" role="status"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" aria-hidden="true"></div><span className="sr-only">Loading search...</span></div>}>
              <CommandPalette 
                onClose={() => setShowCommandPalette(false)} 
                onOpenResume={() => setShowResume(true)}
                onOpenBlog={() => setShowBlog(true)}
                onSelectProject={() => {
                  window.location.hash = 'projects';
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>
    </ClickSpark>
  );
}
