import RotatingText from './components/RotatingText';
import Dock from './components/Dock';
import ClickSpark from './components/ClickSpark';
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Database, Brain, Code, ChevronDown, Mail, Linkedin, ExternalLink, Award, Terminal, Github, MapPin, Check, Menu, X } from 'lucide-react';
import { PROJECTS, STATS, CERTIFICATIONS } from './data';
import Hls from 'hls.js';
import BlurText from './components/BlurText';
import ErrorBoundary from './components/ErrorBoundary';
import FocusText from './components/FocusText';
import LearningJourney from './components/LearningJourney';

const ResumeViewer = lazy(() => import('./components/ResumeViewer'));

const HlsVideo = ({ src, className, style, desaturated = false }: { src: string; className?: string; style?: React.CSSProperties; desaturated?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
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

  return <video ref={videoRef} className={className} style={{ ...style, filter: desaturated ? 'saturate(0)' : 'none', transform: 'translate3d(0, 0, 0)', willChange: 'transform, filter' }} autoPlay loop muted playsInline />;
};

const SkillAccordion = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-6 group hover:text-white transition-colors">
        <div className="flex items-center gap-4">
          <div className="liquid-glass-strong w-10 h-10 flex items-center justify-center rounded-full">
            <Icon className="w-5 h-5 text-white/80" />
          </div>
          <span className="font-heading italic text-2xl md:text-3xl text-white/70 group-hover:text-white transition-colors">{title}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden">
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (showResume) setShowResume(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, showResume]);

  useEffect(() => {
    const handleFirstClick = () => {
      if (!started && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setStarted(true);
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, [started]);

  return (
    <ClickSpark sparkColor='#fff' sparkSize={12} sparkRadius={25} sparkCount={10} duration={300}>
      <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
        <audio ref={audioRef} src="/song.mp3" loop />

        {/* NAVBAR */}
        <nav className="fixed top-6 left-0 right-0 z-[100] px-6" aria-label="Main Navigation">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 liquid-glass-strong rounded-full flex items-center justify-center border border-white/20">
                <span className="font-heading text-lg italic">SF</span>
              </div>
              <span className="font-body text-xs font-medium tracking-widest hidden md:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                AVAILABLE FOR WORK
              </span>
            </div>
            <div className="hidden md:flex liquid-glass px-6 py-2.5 rounded-full items-center gap-8 backdrop-blur-md">
              <a href="#home" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">About</a>
              <button onClick={() => setShowResume(true)} className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors cursor-pointer">Resume</button>
              <a href="#skills" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">Projects</a>
              <a href="#certifications" className="text-sm font-body font-medium text-white/70 hover:text-white transition-colors">Certs</a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  if (muted) {
                    audio.muted = false;
                    audio.play().catch(() => {});
                    setMuted(false);
                  } else {
                    audio.muted = true;
                    audio.pause();
                    setMuted(true);
                  }
                }}
                className="hidden md:flex liquid-glass w-10 h-10 rounded-full items-center justify-center text-white/70 hover:text-white transition-colors text-lg"
              >
                {muted ? '🔇' : '🔊'}
              </button>
              <a
                href="#contact"
                className="hidden md:flex relative text-sm font-medium rounded-full h-10 pl-6 pr-14 group transition-all duration-500 hover:pl-14 hover:pr-6 overflow-hidden cursor-pointer bg-white text-black items-center"
              >
                <span className="relative z-10 transition-all duration-500">Get In Touch</span>
                <div className="absolute right-1 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </div>
              </a>
              <button 
                className="md:hidden w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-[110]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[105] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex flex-col items-center gap-8" onClick={e => e.stopPropagation()}>
                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors">Home</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors">About</a>
                <button onClick={() => { setShowResume(true); setMobileMenuOpen(false); }} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors cursor-pointer">Resume</button>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors">Skills</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors">Projects</a>
                <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading italic text-white/70 hover:text-white transition-colors">Certs</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO SECTION */}
        <section id="home" className="relative h-[1000px] flex items-start justify-center pt-[200px] px-6 overflow-hidden bg-black">
          <div className="absolute top-[15%] left-0 w-full z-0 opacity-40">
            <div className="relative w-full">
              <img 
                src="https://image.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A/thumbnail.webp?time=0" 
                alt="Hero Video Poster" 
                className={`absolute top-0 left-0 w-full h-auto object-contain transition-opacity duration-1000 ease-in-out ${isHeroLoaded ? 'opacity-0' : 'opacity-100'}`}
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
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-black via-black/80 to-transparent z-[1]" />
          <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2">
              <span className="bg-white text-black text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>
              <span className="text-xs font-body font-medium text-white/80">M.Sc Artificial Intelligence Student</span>
            </motion.div>
            <div className="mb-8">
              <BlurText text="Sahaya Savari F" delay={200} animateBy="words" direction="top" className="text-6xl md:text-8xl lg:text-[7rem] font-heading italic text-white tracking-[-4px] leading-[0.8] mb-4" />
              <motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.6, duration: 1 }} className="flex flex-wrap items-center justify-center gap-3 mb-8 w-full px-4">
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

            <motion.p initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.8, duration: 0.8 }} className="text-white/60 font-body font-light text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              Building AI-powered applications, scalable backend systems, and modern full-stack experiences.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
              <button onClick={() => setShowResume(true)} className="liquid-glass-strong px-8 py-4 rounded-full font-body font-medium text-sm flex items-center gap-2 group transition-all hover:scale-105 active:scale-95 cursor-pointer text-white">
                View Resume <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a href="#projects" className="text-white/60 hover:text-white font-body font-medium text-sm flex items-center gap-2 transition-all px-8 py-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10">
                View Projects <Play className="w-4 h-4 fill-current" />
              </a>
            </motion.div>
          </div>
          <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-6 px-6">
            <div className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/40">What I work with</div>
            <FocusText prefix="Data AI Analytics" focusText="GenAI" className="mb-8" />
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
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
                <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center mb-6"><Brain className="w-5 h-5 text-white" /></div>
                <h3 className="font-heading italic text-2xl text-white mb-4">How I think</h3>
                <ul className="space-y-4 text-sm text-white/50 font-body font-light">
                  <li>• Understand the problem deeply before writing code.</li>
                  <li>• Design for simplicity, reliability, and scalability.</li>
                  <li>• Blend AI, clean architecture, and great UX.</li>
                </ul>
              </div>
              <div className="liquid-glass-strong rounded-3xl p-8 backdrop-blur-2xl">
                <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center mb-6"><Terminal className="w-5 h-5 text-white" /></div>
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
                  <a href="#contact" className="bg-white text-black px-8 py-3 rounded-full font-body font-medium text-sm inline-flex items-center gap-2 hover:scale-105 transition-transform shrink-0">
                    Let's Connect <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-32 px-6">
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
                <div className="liquid-glass-strong rounded-3xl p-1 w-full flex mb-12">
                  <button onClick={() => setActivePillar('Data')} className={`flex-1 py-4 rounded-[22px] transition-all font-body font-medium text-sm ${activePillar === 'Data' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}>Data Pillar</button>
                  <button onClick={() => setActivePillar('AI')} className={`flex-1 py-4 rounded-[22px] transition-all font-body font-medium text-sm ${activePillar === 'AI' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}>AI Pillar</button>
                </div>
                <div className="liquid-glass rounded-3xl p-10 min-h-[400px] flex flex-col justify-center text-center">
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
        <section id="journey" className="py-32 px-6 bg-black relative border-t border-white/5">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center justify-center mb-16 text-center">
              <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Academic & Technical</div>
              <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Learning Journey.</h2>
            </div>
            <LearningJourney />
          </div>
        </section>

        {/* PROJECTS GRID */}
        <section id="projects" className="py-32 px-6 bg-black relative">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
              <div>
                <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Selected Work</div>
                <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">AI-Powered <br/> Projects.</h2>
              </div>
              <p className="text-white/50 font-body font-light max-w-xs md:text-right">Ask me for live demos, code samples, or walkthroughs of any project.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((p, i) => {
                const theme = p.theme || {};
                return (
                  <motion.a 
                    key={i} 
                    href={p.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.1 }} 
                    className="rounded-3xl p-8 group flex flex-col hover:-translate-y-2 transition-transform cursor-pointer border border-white/10"
                    style={{
                      background: theme.bg || 'rgba(255, 255, 255, 0.01)',
                      boxShadow: theme.glow ? `0 0 30px ${theme.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.15)` : 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(20px)',
                    }}
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
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 z-20"
                            style={{
                              background: 'transparent',
                              color: theme.iconColor || '#fff',
                              border: `1px solid ${theme.border || 'rgba(255, 255, 255, 0.2)'}`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors"
                          style={{
                            background: theme.iconBg || 'rgba(255, 255, 255, 0.1)',
                            color: theme.iconColor || '#fff',
                            border: `1px solid ${theme.border || 'rgba(255, 255, 255, 0.2)'}`,
                          }}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-heading italic text-3xl text-white mb-4">{p.title}</h3>
                    <p className="text-white/70 font-body font-light text-sm leading-relaxed mb-8 flex-grow">{p.desc}</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: theme.iconColor || 'rgba(255, 255, 255, 0.4)' }}>
                      <Terminal className="w-3 h-3" />
                      {p.stack}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <HlsVideo src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8" className="w-full h-full object-cover" desaturated />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
          </div>
          <div className="relative z-10 max-w-screen-xl mx-auto px-6">
            <div className="liquid-glass-strong rounded-[3rem] p-12 md:p-20 backdrop-blur-3xl text-center">
              <div className="mb-16">
                <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Snapshot</div>
                <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight">Creative Mind. AI Heart.</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
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
        <section id="certifications" className="py-32 px-6">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-24 text-center">
              <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">Learning Journey</div>
              <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Certificates & Courses</h2>
              <p className="text-white/50 font-body font-light mt-6 max-w-xl mx-auto">Focused on building practical, project-ready skills in AI, machine learning, and software development.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {CERTIFICATIONS.map(({ icon, title, items }) => (
                <div key={title} className="space-y-6">
                  <h3 className="font-heading italic text-2xl flex items-center gap-3 text-white/80">{icon} {title}</h3>
                  <div className="space-y-3">
                    {items.map((c: any) => (
                      <a key={c.name} href={c.link} target="_blank" rel="noopener noreferrer" className="liquid-glass p-4 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <Award className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                          <span className="text-sm font-body font-light text-white/60">{c.name}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="relative pt-32 pb-16 px-6 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <HlsVideo src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
          </div>
          <div className="relative z-10 max-w-screen-xl mx-auto">
            <div className="text-center mb-32">
              <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-heading italic text-white tracking-tight leading-[0.8] mb-12">Let's Build <br/> Something.</h2>
              <p className="text-white/60 font-body font-light text-xl max-w-2xl mx-auto mb-16">I'm open to new projects, internships, and collaborations — especially where AI and machine learning can create real-world impact.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <button onClick={() => { navigator.clipboard.writeText('sahayasavari@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="liquid-glass-strong px-8 py-5 rounded-full font-body font-medium text-lg flex items-center gap-3 hover:scale-105 transition-transform group cursor-pointer">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />} 
                  {copied ? 'Copied to Clipboard!' : 'sahayasavari@gmail.com'}
                </button>
                <a href="https://www.google.com/maps/search/Madurai,+Tamil+Nadu" target="_blank" rel="noopener noreferrer" className="liquid-glass px-8 py-5 rounded-full font-body font-medium text-lg flex items-center gap-3 hover:scale-105 transition-transform" aria-label="Location: Madurai, Tamil Nadu">
                  <MapPin className="w-5 h-5" /> Madurai, Tamil Nadu
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/10 gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 liquid-glass rounded-full flex items-center justify-center border border-white/20">
                  <span className="font-heading text-sm italic">S</span>
                </div>
                <span className="font-heading italic text-lg tracking-tight">Sahaya Savari F</span>
              </div>
              <Dock
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
                items={[
                  { icon: <Linkedin size={20} />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/sahayasavari', '_blank') },
                  { icon: <Github size={20} />, label: 'GitHub', onClick: () => window.open('https://github.com/sahaya-savari', '_blank') },
                  { icon: <ExternalLink size={20} />, label: 'Resume', onClick: () => window.open('/resume.pdf', '_blank') },
                  { icon: <Mail size={20} />, label: 'Email', onClick: () => window.open('mailto:sahayasavari@gmail.com') },
                ]}
              />
              <div className="text-white/20 font-body text-[10px] uppercase tracking-widest">© 2026 Sahaya Savari F — Built with AI</div>
            </div>
          </div>
        </footer>

      </div>
      
      <AnimatePresence>
        {showResume && (
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50"></div></div>}>
              <ResumeViewer onClose={() => setShowResume(false)} />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>
    </ClickSpark>
  );
}