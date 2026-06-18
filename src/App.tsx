import RotatingText from './components/RotatingText';
import Dock from './components/Dock';
import ClickSpark from './components/ClickSpark';
import React, { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Database, Brain, Code, ChevronDown, Mail, Linkedin, ExternalLink, Award, Terminal, Github, MapPin, Check, Menu, X, BookOpen, Search } from 'lucide-react';
import { PROJECTS, STATS, CERTIFICATIONS, FEATURED_CREDENTIALS } from './data';

import BlurText from './components/BlurText';
import ErrorBoundary from './components/ErrorBoundary';
import FocusText from './components/FocusText';
import LearningJourney from './components/LearningJourney';

const ResumeViewer = lazy(() => import('./components/ResumeViewer'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const BlogModal = lazy(() => import('./components/BlogModal'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));

const HlsVideo = ({ src, className, style, desaturated = false }: { src: string; className?: string; style?: React.CSSProperties; desaturated?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: any = null;
    const initHls = async () => {
      const HlsModule = await import('hls.js');
      const Hls = HlsModule.default;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }
    };
    initHls();
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={videoRef} className={className} style={{ ...style, filter: desaturated ? 'saturate(0)' : 'none', transform: 'translate3d(0, 0, 0)', willChange: 'transform, filter' }} autoPlay loop muted playsInline aria-hidden="true" />;
};

let skillAccordionIdCounter = 0;

const SkillAccordion = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelId] = useState(() => `skill-panel-${++skillAccordionIdCounter}`);
  const [buttonId] = useState(() => `skill-btn-${skillAccordionIdCounter}`);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-6 group hover:text-white transition-colors min-h-[48px]"
      >
        <div className="flex items-center gap-4">
          <div className="liquid-glass-strong w-10 h-10 flex items-center justify-center rounded-full" aria-hidden="true">
            <Icon className="w-5 h-5 text-white/80" />
          </div>
          <span className="font-heading italic text-2xl md:text-3xl text-white/70 group-hover:text-white transition-colors">{title}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} aria-hidden="true">
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-white/60 font-body font-light text-base leading-relaxed pl-14">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activePillar, setActivePillar] = useState<'Data' | 'AI'>('Data');
  const [copied, setCopied] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);

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
                <span className="font-body text-xs font-medium tracking-widest hidden md:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
                  AVAILABLE FOR WORK
                </span>
                <span className="font-body text-[10px] font-mono text-white/40 hidden lg:flex items-center gap-1.5 ml-4 px-2 py-1 rounded border border-white/10 bg-white/5">
                  Press <kbd className="font-semibold text-white/70">Ctrl + K</kbd> for quick nav
                </span>
              </div>
              <div className="hidden md:flex liquid-glass px-6 py-2.5 rounded-full items-center gap-8 backdrop-blur-md" role="menubar">
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
          {/* HERO SECTION */}
          <section id="home" aria-label="Introduction" className="relative min-h-[100svh] flex flex-col px-6 overflow-hidden bg-black">
            <div className="absolute top-[15%] left-0 w-full z-0 opacity-40" aria-hidden="true">
              <div className="relative w-full">
                <img 
                  src="https://image.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A/thumbnail.webp?time=0" 
                  alt="" 
                  className={`absolute top-0 left-0 w-full h-auto object-contain transition-opacity duration-1000 ease-in-out ${isHeroLoaded ? 'opacity-0' : 'opacity-100'}`}
                  fetchPriority="high"
                />
                <video 
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="auto"
                  onCanPlay={() => setIsHeroLoaded(true)}
                  className={`relative w-full h-auto object-contain transition-opacity duration-1000 ease-in-out ${isHeroLoaded ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-black via-black/80 to-transparent z-[1]" aria-hidden="true" />

            {/* Main hero content — centered with flex-grow */}
            <div className="relative z-10 flex-grow flex items-center justify-center pt-[140px] md:pt-[180px] pb-8">
              <div className="max-w-4xl text-center flex flex-col items-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2">
                  <span className="bg-white text-black text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>
                  <span className="text-xs font-body font-medium text-white/80">M.Sc Artificial Intelligence Student</span>
                </motion.div>
                <div className="mb-6 md:mb-8">
                  <BlurText as="h1" text="Sahaya Savari F" delay={200} animateBy="words" direction="top" className="text-6xl md:text-8xl lg:text-[7rem] font-heading italic text-white tracking-[-4px] leading-[0.8] mb-4" />
                  <motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.6, duration: 1 }} className="flex flex-wrap items-center justify-center gap-3 w-full px-4">
                    <span className="font-heading italic text-3xl md:text-4xl text-white/60">I am an</span>
                    <RotatingText
                      texts={['AI Developer', 'Python Developer', 'Machine Learning Eng', 'AI Builder']}
                      mainClassName="px-3 py-1 liquid-glass text-white overflow-hidden rounded-lg font-bold not-italic text-2xl md:text-3xl"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                    />
                  </motion.div>
                </div>

                <motion.p initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.8, duration: 0.8 }} className="text-white/60 font-body font-light text-lg md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed">
                  Building AI-powered applications, scalable backend systems, and modern full-stack experiences.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
                  <button onClick={() => setShowResume(true)} className="liquid-glass-strong px-8 py-4 rounded-full font-body font-medium text-sm flex items-center gap-2 group transition-all hover:scale-105 active:scale-95 cursor-pointer text-white min-h-[48px]" aria-label="View my resume">
                    View Resume <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                  </button>
                  <a href="#projects" className="text-white/60 hover:text-white font-body font-medium text-sm flex items-center gap-2 transition-all px-8 py-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 min-h-[48px]" aria-label="View my projects">
                    View Projects <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* FocusText — in document flow, pushed to bottom with mt-auto */}
            <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 pb-8 md:pb-16 mt-auto shrink-0" aria-hidden="true">
              <div className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/40">What I work with</div>
              <FocusText prefix="Data AI Analytics" focusText="GenAI" className="" />
            </div>
          </section>

          {/* ABOUT ME SECTION */}
          <section id="about" aria-label="About me" className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 z-0" aria-hidden="true">
              <HlsVideo src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>
            <div className="relative z-10 max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
              <div>
                <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-8">About Me</div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-12">Building intelligent <br/> AI-powered solutions.</h2>
                <div className="space-y-8 text-white/60 font-body font-light text-lg leading-relaxed max-w-xl">
                  <p>I am an AI Developer pursuing M.Sc in Artificial Intelligence at St. Joseph's College (Autonomous), Trichy, focused on building intelligent systems and machine learning solutions.</p>
                  <p>I design and develop AI-powered applications that solve real problems, from smart study tools to daily productivity apps, with a passion for clean code and user-centric design.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="liquid-glass-strong rounded-3xl p-8 backdrop-blur-2xl">
                  <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center mb-6" aria-hidden="true"><Brain className="w-5 h-5 text-white" /></div>
                  <h3 className="font-heading italic text-2xl text-white mb-4">How I think</h3>
                  <ul className="space-y-4 text-sm text-white/50 font-body font-light">
                    <li>• Understand the problem deeply before writing code.</li>
                    <li>• Design for simplicity, reliability, and scalability.</li>
                    <li>• Blend AI, clean architecture, and great UX.</li>
                  </ul>
                </div>
                <div className="liquid-glass-strong rounded-3xl p-8 backdrop-blur-2xl">
                  <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center mb-6" aria-hidden="true"><Terminal className="w-5 h-5 text-white" /></div>
                  <h3 className="font-heading italic text-2xl text-white mb-4">What I build</h3>
                  <ul className="space-y-4 text-sm text-white/50 font-body font-light">
                    <li>• AI-powered applications that solve daily challenges.</li>
                    <li>• Machine learning models for real-world use cases.</li>
                    <li>• Full-stack projects from concept to deployment.</li>
                  </ul>
                </div>
                <div className="lg:col-span-2 liquid-glass rounded-3xl p-10 mt-6 overflow-hidden relative">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                      <h4 className="font-heading italic text-3xl text-white mb-2">Looking for</h4>
                      <p className="text-white/50 font-body font-light max-w-md">Opportunities to work on AI projects, internships, and collaborations that push the boundaries of intelligent systems.</p>
                    </div>
                    <a href="#contact" className="bg-white text-black px-8 py-3 rounded-full font-body font-medium text-sm inline-flex items-center gap-2 hover:scale-105 transition-transform shrink-0 min-h-[48px]" aria-label="Let's connect — jump to contact section">
                      Let's Connect <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section id="skills" aria-label="Skills and capabilities" className="py-32 px-6">
            <div className="max-w-screen-xl mx-auto">
              <div className="mb-24">
                <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Capabilities</div>
                <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Core Proficiencies <br/> & Technical Pillars.</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-24">
                <div className="space-y-2">
                  <SkillAccordion title="Artificial Intelligence" icon={Brain}>
                    <ul className="space-y-4">
                      <li>• Machine Learning model development and training.</li>
                      <li>• Deep Learning with TensorFlow and PyTorch.</li>
                      <li>• Natural Language Processing and text analysis.</li>
                      <li>• Computer Vision and image classification.</li>
                      <li>• LLM integration and prompt engineering.</li>
                    </ul>
                  </SkillAccordion>
                  <SkillAccordion title="Python Development" icon={Code}>
                    <ul className="space-y-4">
                      <li>• Backend development with Flask and FastAPI.</li>
                      <li>• Data processing with Pandas and NumPy.</li>
                      <li>• API development and third-party integrations.</li>
                      <li>• Automation scripts and task scheduling.</li>
                    </ul>
                  </SkillAccordion>
                  <SkillAccordion title="Web Development" icon={Terminal}>
                    <ul className="space-y-4">
                      <li>• React and TypeScript for frontend development.</li>
                      <li>• Responsive UI design with Tailwind CSS.</li>
                      <li>• Full-stack application architecture.</li>
                      <li>• Version control with Git and GitHub.</li>
                    </ul>
                  </SkillAccordion>
                  <SkillAccordion title="Data & Databases" icon={Database}>
                    <ul className="space-y-4">
                      <li>• SQL for data querying and management.</li>
                      <li>• Data visualization with Matplotlib and Seaborn.</li>
                      <li>• Database design and optimization.</li>
                    </ul>
                  </SkillAccordion>
                </div>
                <div>
                  <div className="liquid-glass-strong rounded-3xl p-1 w-full flex mb-12" role="tablist" aria-label="Technical pillar selection">
                    <button
                      onClick={() => setActivePillar('Data')}
                      role="tab"
                      aria-selected={activePillar === 'Data'}
                      aria-controls="pillar-panel"
                      id="tab-data"
                      className={`flex-1 py-4 rounded-[22px] transition-all font-body font-medium text-sm min-h-[48px] ${activePillar === 'Data' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                    >Data Pillar</button>
                    <button
                      onClick={() => setActivePillar('AI')}
                      role="tab"
                      aria-selected={activePillar === 'AI'}
                      aria-controls="pillar-panel"
                      id="tab-ai"
                      className={`flex-1 py-4 rounded-[22px] transition-all font-body font-medium text-sm min-h-[48px] ${activePillar === 'AI' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                    >AI Pillar</button>
                  </div>
                  <div id="pillar-panel" role="tabpanel" aria-labelledby={activePillar === 'Data' ? 'tab-data' : 'tab-ai'} className="liquid-glass rounded-3xl p-10 min-h-[400px] flex flex-col justify-center text-center">
                    <AnimatePresence mode="wait">
                      <motion.div key={activePillar} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                        <h3 className="font-heading italic text-6xl text-white mb-8">{activePillar === 'Data' ? 'Code meets logic.' : 'Intelligence by design.'}</h3>
                        <p className="text-white/50 font-body font-light text-lg leading-relaxed max-w-md mx-auto">
                          {activePillar === 'Data' ? 'Building robust applications with Python, React, and modern web technologies that deliver clean, reliable experiences.' : 'Developing AI and ML solutions that learn, adapt, and solve real-world problems with precision and purpose.'}
                        </p>
                        <div className="mt-12 flex flex-wrap justify-center gap-3">
                          {(activePillar === 'Data' ? ['Python', 'React', 'TypeScript', 'Flask', 'SQL'] : ['TensorFlow', 'PyTorch', 'NLP', 'LLMs', 'Computer Vision']).map(t => (
                            <span key={t} className="liquid-glass px-4 py-1.5 rounded-full text-xs font-body text-white/80">{t}</span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LEARNING JOURNEY */}
          <section id="journey" aria-label="Learning journey" className="py-32 px-6 bg-black relative border-t border-white/5">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex flex-col items-center justify-center mb-16 text-center">
                <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Academic & Technical</div>
                <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Learning Journey.</h2>
              </div>
              <LearningJourney />
            </div>
          </section>

          {/* PROJECTS GRID */}
          <section id="projects" aria-label="Selected projects" className="py-32 px-6 bg-black relative">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                <div>
                  <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Selected Work</div>
                  <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">AI-Powered <br/> Projects.</h2>
                </div>
                <p className="text-white/60 font-body font-light max-w-xs md:text-right">Ask me for live demos, code samples, or walkthroughs of any project.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((p, i) => {
                  const theme = p.theme || {};
                  return (
                    <motion.div 
                      key={i} 
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedProject(p)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(p); } }}
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: i * 0.1 }} 
                      className="text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-3xl p-8 group flex flex-col hover:-translate-y-2 transition-transform cursor-pointer border border-white/10"
                      style={{
                        background: theme.bg || 'rgba(255, 255, 255, 0.01)',
                        boxShadow: theme.glow ? `0 0 30px ${theme.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.15)` : 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px)',
                      }}
                      aria-label={`${p.title} — ${p.tag}. Click to view details.`}
                    >
                      <div className="flex justify-between items-start mb-12">
                        <div 
                          className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            background: theme.tagBg || 'rgba(255, 255, 255, 0.1)',
                            color: theme.tagText || 'rgba(255, 255, 255, 0.5)',
                            border: `1px solid ${theme.border || 'rgba(255, 255, 255, 0.2)'}`,
                          }}
                        >
                          {p.tag}
                        </div>
                        <div className="flex items-center gap-3">
                          {(p as any).github && (
                            <a 
                              href={(p as any).github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 min-h-[44px] min-w-[44px]"
                              style={{
                                background: 'transparent',
                                color: theme.iconColor || '#fff',
                                border: `1px solid ${theme.border || 'rgba(255, 255, 255, 0.2)'}`,
                              }}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`View ${p.title} source code on GitHub`}
                            >
                              <Github className="w-5 h-5" aria-hidden="true" />
                            </a>
                          )}
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors"
                            style={{
                              background: theme.iconBg || 'rgba(255, 255, 255, 0.1)',
                              color: theme.iconColor || '#fff',
                              border: `1px solid ${theme.border || 'rgba(255, 255, 255, 0.2)'}`,
                            }}
                            aria-hidden="true"
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-heading italic text-3xl text-white mb-4">{p.title}</h3>
                      <p className="text-white/70 font-body font-light text-sm leading-relaxed mb-8 flex-grow">{p.desc}</p>
                      <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: theme.iconColor || 'rgba(255, 255, 255, 0.4)' }}>
                        <Terminal className="w-3 h-3" aria-hidden="true" />
                        {p.stack}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* STATS SECTION */}
          <section aria-label="Key statistics" className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 z-0" aria-hidden="true">
              <HlsVideo src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8" className="w-full h-full object-cover" desaturated />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
            </div>
            <div className="relative z-10 max-w-screen-xl mx-auto px-6">
              <div className="liquid-glass-strong rounded-[3rem] p-12 md:p-20 backdrop-blur-3xl text-center">
                <div className="mb-16">
                  <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Snapshot</div>
                  <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight">Creative Mind. AI Heart.</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                  {STATS.map(([num, label]) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className="text-6xl md:text-7xl font-heading italic text-white mb-2">{num}</span>
                      <span className="text-white/40 font-body font-light text-sm uppercase tracking-widest">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section id="certifications" aria-label="Certifications and courses" className="py-32 px-6">
            <div className="max-w-screen-xl mx-auto">
              <div className="mb-24 text-center">
                <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Learning Journey</div>
                <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Certificates & Courses</h2>
                <p className="text-white/50 font-body font-light mt-6 max-w-xl mx-auto">Focused on building practical, project-ready skills in AI, machine learning, and software development.</p>
              </div>

              {/* FEATURED CREDENTIALS SUBSECTION */}
              <div className="mb-24">
                <div className="flex items-center gap-3 justify-center mb-10">
                  <Award className="w-6 h-6 text-white/50 animate-pulse" aria-hidden="true" />
                  <h3 className="font-heading italic text-3xl text-white tracking-tight">Featured Credentials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  {FEATURED_CREDENTIALS.map((cred, i) => (
                    <motion.div
                      key={cred.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="liquid-glass p-6 rounded-[2rem] flex flex-col justify-between border border-white/10 hover:-translate-y-1 transition-transform group relative"
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 gap-2">
                          <span className="text-3xl select-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" role="img" aria-label="Credential badge">{cred.prefix}</span>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 text-right">{cred.issuer}</span>
                        </div>
                        <h4 className="font-heading italic text-xl md:text-2xl text-white mb-3 leading-tight tracking-tight">{cred.title}</h4>
                        {cred.desc && (
                          <p className="text-white/60 font-body font-light text-xs leading-relaxed mb-4">
                            {cred.desc}
                          </p>
                        )}
                        
                        {(cred.issueDate || cred.credentialId || cred.score || cred.credits) && (
                          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] font-mono text-white/50 mb-4 border-t border-white/5 pt-3">
                            {cred.issueDate && (
                              <div>
                                <span className="text-white/30 block text-[8px] uppercase tracking-wider">Issued</span>
                                {cred.issueDate}
                              </div>
                            )}
                            {cred.credentialId && (
                              <div className="truncate" title={cred.credentialId}>
                                <span className="text-white/30 block text-[8px] uppercase tracking-wider">
                                  {cred.issuer.includes("NIELIT") ? "Certificate No." : "ID"}
                                </span>
                                {cred.credentialId}
                              </div>
                            )}
                            {cred.score && (
                              <div>
                                <span className="text-white/30 block text-[8px] uppercase tracking-wider">Score</span>
                                {cred.score}
                              </div>
                            )}
                            {cred.credits && (
                              <div>
                                <span className="text-white/30 block text-[8px] uppercase tracking-wider">Credits</span>
                                {cred.credits}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {cred.skills && cred.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {cred.skills.map((s) => (
                              <span key={s} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/60">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Actions */}
                      {(cred.verifyUrl || cred.linkedinUrl || cred.pdfPath) && (
                        <div className="space-y-2 mt-auto pt-4 border-t border-white/5">
                          {cred.verifyUrl && (
                            <a
                              href={cred.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-body font-medium transition-all duration-300 border border-white/10 min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                              aria-label={`Verify ${cred.title} credential`}
                            >
                              <span>Verify Credential</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
                            </a>
                          )}
                          {cred.linkedinUrl && (
                            <a
                              href={cred.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-body font-medium transition-all duration-300 border border-white/10 min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                              aria-label={`View ${cred.title} credential on LinkedIn`}
                            >
                              <span>View Credential</span>
                              <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
                            </a>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* EXISTING CATEGORIES */}
              <div>
                <div className="flex items-center gap-3 justify-center mb-10">
                  <h3 className="font-heading italic text-3xl text-white/60 tracking-tight">Browse by Category</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {CERTIFICATIONS.map(({ icon, title, items }) => (
                    <div key={title} className="space-y-6">
                      <h4 className="font-heading italic text-2xl flex items-center gap-3 text-white/80">{icon} {title}</h4>
                      <div className="space-y-3">
                        {items.map((c: any) => (
                          <div key={c.name} className="liquid-glass p-4 rounded-2xl flex items-center gap-4">
                            <Award className="w-5 h-5 text-white/40 shrink-0" aria-hidden="true" />
                            <span className="text-sm font-body font-light text-white/60">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer id="contact" className="relative pt-32 pb-16 px-6 overflow-hidden bg-black" aria-label="Contact information">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <HlsVideo src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
          </div>
          <div className="relative z-10 max-w-screen-xl mx-auto">
            <div className="text-center mb-32">
              <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-heading italic text-white tracking-tight leading-[0.8] mb-12">Let's Build <br/> Something.</h2>
              <p className="text-white/60 font-body font-light text-xl max-w-2xl mx-auto mb-16">I'm open to new projects, internships, and collaborations — especially where AI and machine learning can create real-world impact.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <button onClick={() => { navigator.clipboard.writeText('sahayasavari@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="liquid-glass-strong px-8 py-5 rounded-full font-body font-medium text-lg flex items-center gap-3 hover:scale-105 transition-transform group cursor-pointer min-h-[48px]" aria-label="Copy email address to clipboard">
                  {copied ? <Check className="w-5 h-5 text-green-400" aria-hidden="true" /> : <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />} 
                  <span aria-live="polite">{copied ? 'Copied to Clipboard!' : 'sahayasavari@gmail.com'}</span>
                </button>
                <a href="https://www.google.com/maps/search/Madurai,+Tamil+Nadu" target="_blank" rel="noopener noreferrer" className="liquid-glass px-8 py-5 rounded-full font-body font-medium text-lg flex items-center gap-3 hover:scale-105 transition-transform min-h-[48px]" aria-label="View location: Madurai, Tamil Nadu on Google Maps">
                  <MapPin className="w-5 h-5" aria-hidden="true" /> Madurai, Tamil Nadu
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/10 gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 liquid-glass rounded-full flex items-center justify-center border border-white/20" aria-hidden="true">
                  <span className="font-heading text-sm italic">S</span>
                </div>
                <span className="font-heading italic text-lg tracking-tight">Sahaya Savari F</span>
              </div>
              <Dock
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
                items={[
                  { icon: <Linkedin size={20} aria-hidden="true" />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/sahayasavari', '_blank'), ariaLabel: 'Visit LinkedIn profile' },
                  { icon: <Github size={20} aria-hidden="true" />, label: 'GitHub', onClick: () => window.open('https://github.com/sahaya-savari', '_blank'), ariaLabel: 'Visit GitHub profile' },
                  { icon: <BookOpen size={20} aria-hidden="true" />, label: 'Blog', onClick: () => setShowBlog(true), ariaLabel: 'Open technical blog' },
                  { icon: <Search size={20} aria-hidden="true" />, label: 'Search', onClick: () => setShowCommandPalette(true), ariaLabel: 'Open spotlight search command palette' },
                  { icon: <ExternalLink size={20} aria-hidden="true" />, label: 'Resume', onClick: () => window.open('/resume.pdf', '_blank'), ariaLabel: 'Open resume PDF in new tab' },
                  { icon: <Mail size={20} aria-hidden="true" />, label: 'Email', onClick: () => window.open('mailto:sahayasavari@gmail.com'), ariaLabel: 'Send email to Sahaya Savari' },
                ]}
              />
              <div className="text-white/20 font-body text-[10px] uppercase tracking-widest">© {new Date().getFullYear()} Sahaya Savari F — Built with AI</div>
            </div>
          </div>
        </footer>

      </div>
      
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
        {selectedProject && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-[400] bg-black/80 flex items-center justify-center" role="status"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" aria-hidden="true"></div><span className="sr-only">Loading project details...</span></div>}>
              <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBlog && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-[400] bg-black/80 flex items-center justify-center" role="status"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" aria-hidden="true"></div><span className="sr-only">Loading blog viewer...</span></div>}>
              <BlogModal onClose={() => setShowBlog(false)} />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCommandPalette && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-[500] bg-black/80 flex items-center justify-center" role="status"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" aria-hidden="true"></div><span className="sr-only">Loading command palette...</span></div>}>
              <CommandPalette 
                onClose={() => setShowCommandPalette(false)} 
                onSelectProject={(proj) => setSelectedProject(proj)}
                onOpenBlog={() => setShowBlog(true)}
                onOpenResume={() => setShowResume(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>
    </ClickSpark>
  );
}