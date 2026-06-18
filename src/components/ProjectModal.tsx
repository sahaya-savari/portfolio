import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
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
          
          {/* Left Column: Details */}
          <div className="md:col-span-2 space-y-12">
            
            <section>
              <h3 className="text-xl font-heading italic text-white mb-4 flex items-center gap-2">Overview</h3>
              <p className="text-white/70 font-body font-light text-lg leading-relaxed">
                {project.longDesc}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-heading italic text-white mb-4 flex items-center gap-2">The Problem</h3>
              <p className="text-white/70 font-body font-light leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-heading italic text-white mb-4 flex items-center gap-2">Architecture & Solution</h3>
              <p className="text-white/70 font-body font-light leading-relaxed">
                {project.architecture}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-heading italic text-white mb-4 flex items-center gap-2">Challenges</h3>
              <p className="text-white/70 font-body font-light leading-relaxed">
                {project.challenges}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-heading italic text-white mb-4 flex items-center gap-2">Results</h3>
                <p className="text-white/70 font-body font-light leading-relaxed">
                  {project.results}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-heading italic text-white mb-4 flex items-center gap-2">Lessons Learned</h3>
                <p className="text-white/70 font-body font-light leading-relaxed">
                  {project.lessonsLearned}
                </p>
              </section>
            </div>
            
          </div>

          {/* Right Column: Meta */}
          <div className="space-y-8">
            <div className="liquid-glass p-6 rounded-2xl border border-white/5 space-y-6">
              
              <div>
                <h4 className="text-sm font-mono text-white/40 tracking-widest uppercase mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech: string) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/80 font-body font-medium border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-sm font-mono text-white/40 tracking-widest uppercase mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {project.features?.map((feature: string) => (
                    <li key={feature} className="text-sm text-white/70 font-body flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 shrink-0" aria-hidden="true" />
                      {feature}
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
