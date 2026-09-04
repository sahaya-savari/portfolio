import React, { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Search, Sparkles, Download } from 'lucide-react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';

import ClickSpark from '../components/ClickSpark';
import ErrorBoundary from '../components/ErrorBoundary';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
const TargetCursor = lazy(() => import('../components/ui/TargetCursor/TargetCursor'));

// Lazy load heavy global modals
const ResumeViewer = lazy(() => import('../components/ResumeViewer'));
const CommandPalette = lazy(() => import('../components/CommandPalette'));

export default function RootLayout() {
  const [showResume, setShowResume] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [enableTargetCursor, setEnableTargetCursor] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const cleanId = targetId.replace(/^#/, '');
    if (location.pathname !== '/') {
      navigate(`/#${cleanId}`);
    } else {
      const el = document.getElementById(cleanId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', `/#${cleanId}`);
    }
    setMobileMenuOpen(false);
  };

  // Manage focus when mobile menu opens/closes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (mobileMenuOpen) {
      const timer = setTimeout(() => {
        const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>('a, button');
        firstLink?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      mobileMenuToggleRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  const scrollToHashTarget = useCallback(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return undefined;

    const alignToTarget = () => {
      const scrollPaddingTop = parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop
      ) || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - scrollPaddingTop;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    };

    alignToTarget();

    const startedAt = performance.now();
    let rafId = 0;
    const keepAlignedWhileLazySectionsMount = () => {
      alignToTarget();
      if (performance.now() - startedAt < 2500) {
        rafId = window.requestAnimationFrame(keepAlignedWhileLazySectionsMount);
      }
    };

    rafId = window.requestAnimationFrame(keepAlignedWhileLazySectionsMount);
    return () => window.cancelAnimationFrame(rafId);
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

  // Performance: Only load and instantiate TargetCursor after the user moves pointer on desktop
  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!query.matches) return;

    const handleFirstPointerMove = () => {
      setEnableTargetCursor(true);
      window.removeEventListener('mousemove', handleFirstPointerMove);
    };

    window.addEventListener('mousemove', handleFirstPointerMove, { once: true, passive: true });
    return () => window.removeEventListener('mousemove', handleFirstPointerMove);
  }, []);

  // Fallback for browsers without CSS animation-timeline: scroll() support (e.g., older Safari)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const supportsCssScroll = window.CSS && window.CSS.supports && window.CSS.supports('animation-timeline', 'scroll()');
    if (supportsCssScroll) return;

    let ticking = false;
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  // Active section tracking
  useEffect(() => {
    if (location.pathname !== '/') return;
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

    const sectionIds = ['home', 'about', 'skills', 'projects', 'blog', 'certifications', 'contact'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

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

  return (
    <ClickSpark sparkColor='#FFFFFF' sparkSize={8} sparkRadius={14} sparkCount={8} duration={350}>
      {enableTargetCursor && (
        <Suspense fallback={null}>
          <TargetCursor
            targetSelector=".cursor-target"
            spinDuration={2}
            hideDefaultCursor={false}
            parallaxOn
            hoverDuration={0.2}
            cursorColor="#FFFFFF"
            cursorColorOnTarget="#C084FC"
          />
        </Suspense>
      )}
      <div className="bg-transparent min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
        
        {/* Hardware-accelerated Scroll Progress Indicator (Zero JS overhead on modern browsers) */}
        <div
          ref={scrollProgressRef}
          className="scroll-progress-bar"
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
        <header className="relative z-[120]">
          <nav className="fixed top-4 md:top-6 left-0 right-0 z-[120] px-4 md:px-6" aria-label="Main navigation">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to="/" className="w-10 h-10 liquid-glass-strong rounded-full flex items-center justify-center border border-white/20" aria-label="Sahaya Savari F — Go to home">
                  <span className="font-heading text-lg italic" aria-hidden="true">SF</span>
                </Link>
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
                <Link to="/" className={`text-sm font-body font-medium transition-colors ${location.pathname === '/' && activeSection === 'home' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Home</Link>
                <a href="/#about" onClick={(e) => handleNavClick(e, 'about')} className={`text-sm font-body font-medium transition-colors ${location.pathname === '/' && activeSection === 'about' ? 'text-white' : 'text-white/50 hover:text-white'}`}>About</a>
                <Link to="/resume" className={`text-sm font-body font-medium transition-colors ${location.pathname === '/resume' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Resume</Link>
                <Link to="/blog" className={`text-sm font-body font-medium transition-colors ${location.pathname === '/blog' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Blog</Link>
                <a href="/#skills" onClick={(e) => handleNavClick(e, 'skills')} className={`text-sm font-body font-medium transition-colors ${location.pathname === '/' && activeSection === 'skills' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Skills</a>
                <Link to="/projects" className={`text-sm font-body font-medium transition-colors ${location.pathname.startsWith('/projects') ? 'text-white' : 'text-white/50 hover:text-white'}`}>Projects</Link>
                <a href="/#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={`text-sm font-body font-medium transition-colors ${location.pathname === '/' && activeSection === 'certifications' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Certs</a>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white text-xs font-body font-medium transition-all shadow-sm"
                  aria-label="Download Resume PDF"
                >
                  <Download size={13} />
                  <span className="hidden lg:inline">Download CV</span>
                </a>
                <a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
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
                  className="md:hidden w-11 h-11 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-[130] touch-manipulation cursor-pointer"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[115] bg-black/95 backdrop-blur-2xl flex flex-col items-center overflow-y-auto px-6 py-20"
              onClick={() => setMobileMenuOpen(false)}
              onKeyDown={handleMobileMenuKeyDown}
            >
              <nav className="flex flex-col items-center gap-6 my-auto" onClick={e => e.stopPropagation()} aria-label="Mobile navigation">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Home</Link>
                <a href="/#about" onClick={(e) => handleNavClick(e, 'about')} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">About</a>
                <Link to="/resume" onClick={() => setMobileMenuOpen(false)} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Resume</Link>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Blog</Link>
                <a href="/#skills" onClick={(e) => handleNavClick(e, 'skills')} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Skills</a>
                <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Projects</Link>
                <a href="/#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors min-h-[48px] flex items-center">Certs</a>
                <a href="/resume.pdf" download onClick={() => setMobileMenuOpen(false)} className="text-xl sm:text-2xl font-body font-medium text-white/90 hover:text-white transition-colors min-h-[48px] flex items-center gap-2 mt-2">
                  <Download size={20} /> Download Resume PDF
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="main-content">
          <Outlet context={{ setShowResume, setShowCommandPalette }} />
        </main>

        <Link 
          to="/ai"
          className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center hover:scale-110 transition-transform hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] group"
          aria-label="Ask Sahaya AI"
        >
          <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
        </Link>
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
        {showCommandPalette && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center" role="status"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" aria-hidden="true"></div><span className="sr-only">Loading search...</span></div>}>
              <CommandPalette 
                onClose={() => setShowCommandPalette(false)} 
                onOpenResume={() => setShowResume(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>
    </ClickSpark>
  );
}
