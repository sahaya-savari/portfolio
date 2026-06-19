import React, { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { m as motion, AnimatePresence  } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import ClickSpark from './components/ClickSpark';
import ErrorBoundary from './components/ErrorBoundary';

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
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

  return (
    <ClickSpark sparkColor='#fff' sparkSize={12} sparkRadius={25} sparkCount={10} duration={300}>
      <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">

        {/* SKIP TO CONTENT LINK */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:rounded-full focus:font-body focus:font-medium focus:text-sm focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* NAVBAR */}
        <header>
          <nav className="fixed top-6 left-0 right-0 z-[100] px-6" aria-label="Main navigation">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a href="#home" className="w-10 h-10 liquid-glass-strong rounded-full flex items-center justify-center border border-white/20" aria-label="Sahaya Savari F — Go to top">
                  <span className="font-heading text-lg italic" aria-hidden="true">SF</span>
                </a>
                <span className="font-body text-xs font-medium tracking-widest hidden lg:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
                  AVAILABLE FOR WORK
                </span>
                <span className="font-body text-[10px] font-mono text-white/65 hidden lg:flex items-center gap-1.5 ml-4 px-2 py-1 rounded border border-white/10 bg-white/5">
                  Press <kbd className="font-semibold text-white/70">Ctrl + K</kbd> for quick nav
                </span>
              </div>
              <div className="hidden md:flex liquid-glass px-4 lg:px-6 py-2.5 rounded-full items-center gap-3 lg:gap-8 backdrop-blur-md" role="menubar">
                <a href="#home" role="menuitem" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">Home</a>
                <a href="#about" role="menuitem" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">About</a>
                <button onClick={() => setShowResume(true)} role="menuitem" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors cursor-pointer">Resume</button>
                <button onClick={() => setShowBlog(true)} role="menuitem" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors cursor-pointer">Blog</button>
                <a href="#skills" role="menuitem" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">Skills</a>
                <a href="#projects" role="menuitem" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">Projects</a>
                <a href="#certifications" role="menuitem" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">Certs</a>
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
              className="fixed inset-0 z-[105] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center"
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
          <IntersectionLazy fallbackHeight="100vh">
            <AboutSection setShowResume={setShowResume} />
          </IntersectionLazy>
          <IntersectionLazy fallbackHeight="80vh">
            <SkillsSection />
          </IntersectionLazy>
          <IntersectionLazy fallbackHeight="40vh">
            <StatsSection />
          </IntersectionLazy>
          <div id="projects">
            <IntersectionLazy fallbackHeight="150vh">
              <ProjectsSection />
            </IntersectionLazy>
          </div>
          <IntersectionLazy fallbackHeight="100vh">
            <CertificationsSection />
          </IntersectionLazy>
        </main>

        <IntersectionLazy fallbackHeight="100vh">
          <ContactSection setShowBlog={setShowBlog} setShowCommandPalette={setShowCommandPalette} />
        </IntersectionLazy>

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
