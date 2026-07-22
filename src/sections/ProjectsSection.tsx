import { useState, memo, useEffect, useRef, useMemo } from 'react';
import { Github, ArrowUpRight, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { PROJECTS, Project } from '../data';
import SectionBadge from '../components/ui/SectionBadge';
import './ProjectsSection.css';

// ─── Pixel animation engine (inlined from React Bits PixelCard) ─────────────
class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    if (!context) throw new Error("Could not get 2d context for PixelCard");
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = Math.random() * (2 - 0.5) + 0.5;
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }
  draw() {
    const off = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + off, this.y + off, this.size, this.size);
  }
  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) { this.counter += this.counterStep; return; }
    if (this.size >= this.maxSize) { this.isShimmer = true; }
    if (this.isShimmer) { this._shimmer(); } else { this.size += this.sizeStep; }
    this.draw();
  }
  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) { this.isIdle = true; return; }
    this.size -= 0.1;
    this.draw();
  }
  _shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    this.isReverse ? (this.size -= this.speed) : (this.size += this.speed);
  }
}

interface PixelCanvasProps {
  gap?: number;
  speed?: number;
  colors?: string;
}

function usePixelCanvas({ gap = 8, speed = 18, colors = '#ffffff,#d4d4d8,#a1a1aa,#71717a' }: PixelCanvasProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number>(performance.now());
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const effectiveSpeed = reducedMotion ? 0 : Math.min(Math.max(speed, 0), 100) * 0.001;
  const colorsArr = colors.split(',');

  const init = () => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    canvasRef.current.style.width = `${w}px`;
    canvasRef.current.style.height = `${h}px`;
    const pxs = [];
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
        const dx = x - w / 2, dy = y - h / 2;
        const delay = reducedMotion ? 0 : Math.sqrt(dx * dx + dy * dy);
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, effectiveSpeed, delay));
      }
    }
    pixelsRef.current = pxs;
  };

  const animate = (fnName: 'appear' | 'disappear') => {
    animRef.current = requestAnimationFrame(() => animate(fnName));
    const now = performance.now();
    const passed = now - prevTimeRef.current;
    if (passed < 1000 / 60) return;
    prevTimeRef.current = now - (passed % (1000 / 60));
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    let allIdle = true;
    for (const px of pixelsRef.current) {
      px[fnName]();
      if (!px.isIdle) allIdle = false;
    }
    if (allIdle && animRef.current) cancelAnimationFrame(animRef.current);
  };

  const trigger = (fnName: 'appear' | 'disappear') => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(() => animate(fnName));
  };

  useEffect(() => {
    init();
    const ro = new ResizeObserver(init);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, containerRef, trigger };
}

// ─── Featured (large) project card ──────────────────────────────────────────
const FeaturedCard = ({ p, onClick }: { p: Project; onClick: () => void }) => {
  const { canvasRef, containerRef, trigger } = usePixelCanvas();

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      onMouseEnter={() => trigger('appear')}
      onMouseLeave={() => trigger('disappear')}
      onFocus={() => trigger('appear')}
      onBlur={() => trigger('disappear')}
      className="project-card-featured group cursor-target"
      aria-label={`${p.title} — ${p.tag}. Click to view details.`}
    >
      {/* Pixel canvas — sits at z-0 behind all content */}
      <canvas ref={canvasRef} className="project-pixel-canvas" aria-hidden="true" />

      {/* All card content — z-10 above canvas */}
      <div className="project-card-content grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8 min-h-[68px] sm:min-h-[28px] items-start">
            <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-purple-400 border border-purple-500/30 bg-purple-500/10">
              Flagship Project
            </div>
            <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/15 bg-white/5">
              {p.tag}
            </div>
            <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${p.status === 'Live' ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Live' ? 'bg-green-400' : 'bg-amber-400'}`} aria-hidden="true" />
              {p.status}
            </div>
          </div>
          <Link to={`/projects/${p.id}`} className="focus:outline-none" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading italic text-4xl md:text-5xl lg:text-6xl text-white mb-6 hover:text-white/80 transition-colors">{p.title}</h3>
          </Link>
          <p className="text-white/70 font-body font-light text-base md:text-lg leading-relaxed mb-8 max-w-xl">{p.desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 text-xs font-body border-l-2 border-white/20 pl-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-white/60 uppercase tracking-wider text-[9px]">Stack:</span>
              <span className="text-white/80">{p.stack.split(' · ').join(' • ')}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start lg:justify-end gap-3 mt-4 lg:mt-0 lg:absolute lg:top-0 lg:right-0">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 border border-white/15"
              style={{ background: 'transparent', color: '#fff' }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${p.title} source code on GitHub`}
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
          )}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors border border-white/15"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
            aria-hidden="true"
          >
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
    </div>
  );
};

// ─── Grid project card ───────────────────────────────────────────────────────
const GridCard = ({ p, onClick }: { p: Project; onClick: () => void }) => {
  const { canvasRef, containerRef, trigger } = usePixelCanvas();

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      onMouseEnter={() => trigger('appear')}
      onMouseLeave={() => trigger('disappear')}
      onFocus={() => trigger('appear')}
      onBlur={() => trigger('disappear')}
      className="project-card-grid group cursor-target"
      aria-label={`${p.title} — ${p.tag}. Click to view details.`}
    >
      {/* Pixel canvas — sits at z-0 */}
      <canvas ref={canvasRef} className="project-pixel-canvas" aria-hidden="true" />

      {/* Card content — z-10 */}
      <div className="project-card-content">
        <div className="flex justify-between items-start mb-6 md:mb-12 min-h-[84px] sm:min-h-[44px]">
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/15 bg-white/5">
              {p.tag}
            </div>
            <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
              p.status === 'Live'
                ? 'text-green-400 border-green-500/30 bg-green-500/10'
                : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Live' ? 'bg-green-400' : 'bg-amber-400'}`} aria-hidden="true" />
              {p.status}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 min-h-[44px] min-w-[44px] border border-white/15"
                style={{ background: 'transparent', color: '#fff' }}
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${p.title} source code on GitHub`}
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            )}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors border border-white/15"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
              aria-hidden="true"
            >
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
        <Link to={`/projects/${p.id}`} className="focus:outline-none" onClick={(e) => e.stopPropagation()}>
          <h3 className="font-heading italic text-3xl text-white mb-4 hover:text-white/80 transition-colors">{p.title}</h3>
        </Link>
        <p className="text-white/70 font-body font-light text-sm leading-relaxed mb-8 flex-grow">{p.desc}</p>
        <div className="flex flex-col gap-2 mt-auto text-xs font-body border-l-2 border-white/20 pl-3 py-1">
          <div className="flex items-center">
            <span className="text-white/60 w-16 uppercase tracking-wider text-[9px]">Status</span>
            <span className="text-white/80">{p.status}</span>
          </div>
          <div className="flex items-center">
            <span className="text-white/60 w-16 uppercase tracking-wider text-[9px]">Category</span>
            <span className="text-white/80">{p.tag}</span>
          </div>
          <div className="flex items-center">
            <span className="text-white/60 w-16 uppercase tracking-wider text-[9px]">Stack</span>
            <span className="text-white/80">{p.stack.split(' · ').join(' • ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
// ─── Section ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  'All',
  'AI / ML',
  'Python',
  'React',
  'Firebase',
  'Full Stack',
  'Data Analytics'
];

const ProjectsSection = memo(() => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleProjectClick = (p: Project) => {
    navigate(`/projects/${p.id}`);
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      // Category match logic
      let matchesCategory = false;
      if (activeCategory === 'All') {
        matchesCategory = true;
      } else if (activeCategory === 'AI / ML') {
        matchesCategory = p.stack.toLowerCase().includes('ai') || p.techStack.some(t => /ai|ml|llm|openai/i.test(t));
      } else if (activeCategory === 'Python') {
        matchesCategory = p.stack.toLowerCase().includes('python') || p.techStack.some(t => /python/i.test(t));
      } else if (activeCategory === 'React') {
        matchesCategory = p.stack.toLowerCase().includes('react') || p.techStack.some(t => /react/i.test(t));
      } else if (activeCategory === 'Firebase') {
        matchesCategory = p.techStack.some(t => /firebase/i.test(t));
      } else if (activeCategory === 'Full Stack') {
        matchesCategory = p.stack.toLowerCase().includes('vite') || p.techStack.some(t => /typescript|tailwind|vite/i.test(t));
      } else if (activeCategory === 'Data Analytics') {
        matchesCategory = p.techStack.some(t => /analytics|sql/i.test(t)) || p.title === 'Daily Spark';
      }

      // Search match logic (matches title, desc, stack, techStack array, or tag)
      const q = search.toLowerCase();
      const matchesSearch = !search ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.stack.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <section aria-label="Selected projects" className="py-16 px-6 relative overflow-hidden projects-section-bg">
        <div className="max-w-screen-xl mx-auto relative z-10">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <SectionBadge>Selected Work</SectionBadge>
              <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9]">AI-Powered <br/> Projects.</h2>
            </div>
            <p className="text-white/60 font-body font-light max-w-xs md:text-right">Ask me for live demos, code samples, or walkthroughs of any project.</p>
          </div>

          {/* Interactive Controls Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/[0.06]">
            
            {/* Search Input field */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search stack, title, or keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white font-body text-xs placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                aria-label="Search projects"
              />
            </div>

            {/* Category Quick Tags Selector */}
            <div className="flex flex-wrap gap-2 items-center" role="tablist" aria-label="Project categories">
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all cursor-pointer min-h-[36px] ${
                      isActive 
                        ? 'bg-white text-black border-transparent shadow' 
                        : 'bg-white/[0.03] text-white/60 border border-white/10 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Grid Results Container */}
          {filteredProjects.length > 0 ? (
            <div className="space-y-6">
              
              {/* Flagship featured card (always render first matched project as featured) */}
              <FeaturedCard p={filteredProjects[0]} onClick={() => handleProjectClick(filteredProjects[0])} />

              {/* Grid cards for subsequent matches */}
              {filteredProjects.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.slice(1).map((p) => (
                    <GridCard key={p.title} p={p} onClick={() => handleProjectClick(p)} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Elegant Glassmorphic Empty State */
            <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl text-center space-y-4">
              <Search className="w-10 h-10 text-white/20" aria-hidden="true" />
              <div>
                <h3 className="font-heading italic text-2xl text-white">No Matching Projects</h3>
                <p className="text-white/40 font-body font-light text-sm mt-1 max-w-sm">
                  We couldn't find any projects matching "<span className="text-white/60">{search}</span>" in this filter category. Try another keyword.
                </p>
              </div>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 text-xs font-body transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
});

export default ProjectsSection;
