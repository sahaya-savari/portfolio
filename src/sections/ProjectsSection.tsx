import { useState, memo, lazy, Suspense } from 'react';
import { Github, ArrowUpRight, Terminal } from 'lucide-react';
import { PROJECTS } from '../data';
import SectionBadge from '../components/ui/SectionBadge';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load the modal to keep initial bundle small
const ProjectModal = lazy(() => import('../components/ProjectModal'));

const ProjectsSection = memo(() => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <>
      <section aria-label="Selected projects" className="py-16 px-6 bg-black relative">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <SectionBadge>Selected Work</SectionBadge>
              <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9]">AI-Powered <br/> Projects.</h2>
            </div>
            <p className="text-white/60 font-body font-light max-w-xs md:text-right">Ask me for live demos, code samples, or walkthroughs of any project.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => {
              const theme = p.theme || {};
              return (
                <div 
                  key={i} 
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(p)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(p); } }}
                  className="text-left w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-3xl p-5 md:p-8 group flex flex-col hover:-translate-y-2 transition-transform cursor-pointer border border-white/10"
                  style={{
                    background: theme.bg || 'rgba(255, 255, 255, 0.01)',
                    boxShadow: theme.glow ? `0 0 30px ${theme.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.15)` : 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                  }}
                  aria-label={`${p.title} — ${p.tag}. Click to view details.`}
                >
                  <div className="flex justify-between items-start mb-6 md:mb-12">
                    <div className="flex gap-2">
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
                      <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                        p.status === 'Live' 
                          ? 'text-green-400 border-green-500/30 bg-green-500/10' 
                          : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Live' ? 'bg-green-400' : 'bg-amber-400'}`} aria-hidden="true"></span>
                        {p.status}
                      </div>
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
                  <div className="flex flex-col gap-2 mt-auto text-xs font-body border-l-2 pl-3 py-1" style={{ borderColor: theme.border || 'rgba(255,255,255,0.2)' }}>
                    <div className="flex items-center">
                      <span className="text-white/40 w-16 uppercase tracking-wider text-[9px]">Status</span>
                      <span className="text-white/80">{p.status}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white/40 w-16 uppercase tracking-wider text-[9px]">Category</span>
                      <span className="text-white/80">{p.tag}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white/40 w-16 uppercase tracking-wider text-[9px]">Stack</span>
                      <span className="text-white/80">{p.stack.split(' · ').join(' • ')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ErrorBoundary>
          <Suspense fallback={<div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center" role="status"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" aria-hidden="true"></div><span className="sr-only">Loading project viewer...</span></div>}>
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
});

export default ProjectsSection;
