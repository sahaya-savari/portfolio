import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, Database, Layout, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

function ArchitectureDiagram({ title }: { title: string }) {
  if (title === "Daily Spark") {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6 bg-white/5 rounded-2xl border border-white/10 my-4 text-sm">
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 w-40 text-center">
          <Layout className="w-5 h-5 text-purple-400" />
          <span className="font-semibold text-white">React Frontend</span>
          <span className="text-xs text-white/50">Client App</span>
        </div>
        <ArrowRight className="w-5 h-5 text-white/30 rotate-90 sm:rotate-0 shrink-0" />
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 w-48 text-center">
          <Database className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white">Firebase Realtime DB</span>
          <span className="text-xs text-white/50">Data Store & Auth</span>
        </div>
        <ArrowRight className="w-5 h-5 text-white/30 rotate-90 sm:rotate-0 shrink-0" />
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 w-40 text-center">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-white">Python Backend</span>
          <span className="text-xs text-white/50">Behavioral Engine</span>
        </div>
      </div>
    );
  }
  if (title === "PrepMind AI") {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6 bg-white/5 rounded-2xl border border-white/10 my-4 text-sm">
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 w-40 text-center">
          <Layout className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-white">React Frontend</span>
          <span className="text-xs text-white/50">Adaptive UI</span>
        </div>
        <ArrowRight className="w-5 h-5 text-white/30 rotate-90 sm:rotate-0 shrink-0" />
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 w-40 text-center">
          <Cpu className="w-5 h-5 text-purple-400" />
          <span className="font-semibold text-white">Python Pipeline</span>
          <span className="text-xs text-white/50">Context Engine</span>
        </div>
        <ArrowRight className="w-5 h-5 text-white/30 rotate-90 sm:rotate-0 shrink-0" />
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 w-40 text-center">
          <Database className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white">OpenAI API</span>
          <span className="text-xs text-white/50">LLM Generation</span>
        </div>
      </div>
    );
  }
  // Portfolio Website
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6 bg-white/5 rounded-2xl border border-white/10 my-4 text-sm">
      <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 w-44 text-center">
        <Layout className="w-5 h-5 text-blue-400" />
        <span className="font-semibold text-white">Vite & React SPA</span>
        <span className="text-xs text-white/50">Framer Motion UI</span>
      </div>
      <ArrowRight className="w-5 h-5 text-white/30 rotate-90 sm:rotate-0 shrink-0" />
      <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 w-44 text-center">
        <Database className="w-5 h-5 text-purple-400" />
        <span className="font-semibold text-white">Static Files / JSON</span>
        <span className="text-xs text-white/50">Client-Side State</span>
      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Store the element that had focus before the modal opened
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    // Focus close button on open
    setTimeout(() => closeButtonRef.current?.focus(), 100);
    return () => {
      // Return focus to triggering element on close
      previouslyFocusedRef.current?.focus();
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
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

  if (!project) return null;

  const titleId = `project-modal-title-${project.title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div 
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      ref={modalRef}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl" 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto hide-scrollbar rounded-3xl border border-white/10 flex flex-col"
        style={{
          background: 'rgba(15, 23, 42, 0.7)',
          boxShadow: `0 0 80px -20px ${project.theme.glow}`
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-start justify-between p-6 md:p-8 border-b border-white/10"
             style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(20px)' }}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="liquid-glass px-3 py-1 rounded-full text-xs font-mono font-medium text-white/80" style={{ backgroundColor: project.theme.tagBg, color: project.theme.tagText }}>
                {project.tag}
              </span>
            </div>
            <h2 id={titleId} className="text-3xl md:text-5xl font-heading italic text-white tracking-tight">{project.title}</h2>
          </div>
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-12">
          
          {/* Left Column: Case Study Details */}
          <div className="md:col-span-2 space-y-10">
            
            {/* Overview / Solution */}
            <section className="space-y-3">
              <h3 className="text-lg font-mono tracking-widest uppercase text-white/40">Overview & Solution</h3>
              <p className="text-white/80 font-body font-light text-lg leading-relaxed">
                {project.longDesc}
              </p>
            </section>

            {/* Problem */}
            <section className="space-y-3">
              <h3 className="text-lg font-mono tracking-widest uppercase text-white/40">The Problem</h3>
              <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-white/80 font-body font-light leading-relaxed">
                {project.problem}
              </div>
            </section>

            {/* Current Architecture */}
            <section className="space-y-3">
              <h3 className="text-lg font-mono tracking-widest uppercase text-white/40">Current Architecture</h3>
              <p className="text-white/80 font-body font-light leading-relaxed">
                {project.architecture}
              </p>
              <ArchitectureDiagram title={project.title} />
            </section>

            {/* Challenges & What I Learned */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-3">
                <h3 className="text-lg font-mono tracking-widest uppercase text-white/40">Challenges</h3>
                <p className="text-white/80 font-body font-light leading-relaxed">
                  {project.challenges}
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-mono tracking-widest uppercase text-white/40">What I Learned</h3>
                <p className="text-white/80 font-body font-light leading-relaxed">
                  {project.lessonsLearned}
                </p>
              </section>
            </div>

            {/* Future Roadmap */}
            {project.futureImprovements && (
              <section className="space-y-3 pt-6 border-t border-white/5">
                <h3 className="text-lg font-mono tracking-widest uppercase text-purple-400">Future Roadmap</h3>
                <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-white/80 font-body font-light leading-relaxed">
                  {project.futureImprovements}
                </div>
              </section>
            )}
            
          </div>

          {/* Right Column: Meta Info */}
          <div className="space-y-8">
            <div className="liquid-glass p-6 rounded-2xl border border-white/5 space-y-6">
              
              <div>
                <h4 className="text-xs font-mono text-white/40 tracking-widest uppercase mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech: string) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/80 font-body font-medium border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xs font-mono text-white/40 tracking-widest uppercase mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {project.features?.map((feature: string) => (
                    <li key={feature} className="text-sm text-white/70 font-body flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full liquid-glass-strong py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium hover:bg-white/20 transition-colors" aria-label={`View live demo of ${project.title}`}>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-full liquid-glass py-3 rounded-xl flex items-center justify-center gap-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors" aria-label={`View source code of ${project.title} on GitHub`}>
                    <Github className="w-4 h-4" aria-hidden="true" /> View Source
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
