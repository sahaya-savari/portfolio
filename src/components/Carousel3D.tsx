import { useMemo, useState, useEffect } from 'react';
import './Carousel3D.css';
import { ArrowUpRight, Star, GitFork, CircleDot } from 'lucide-react';

interface Carousel3DProps {
  projects: any[];
  onProjectClick?: (project: any) => void;
}

export default function Carousel3D({ projects, onProjectClick }: Carousel3DProps) {
  const displayProjects = useMemo(() => {
    let arr = [...projects];
    if (arr.length === 0) return arr;
    while (arr.length < 6) {
      arr = [...arr, ...projects];
    }
    return arr;
  }, [projects]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numItems = displayProjects.length;
  const angle = 360 / numItems;
  const cardWidth = isMobile ? 280 : 340;
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / numItems)) + 60;

  return (
    <div className="py-12 md:py-24">
      <div className="carousel-container relative h-[600px] overflow-visible">
        <div className="carousel-rotator">
          {displayProjects.map((p, i) => {
            const itemAngle = angle * i;
            const theme = p.theme || {};
            const slug = p.title.toLowerCase().replace(/\s+/g, '-');
            
            return (
              <div 
                key={`${p.title}-${i}`} 
                className="carousel-card rounded-3xl p-6 flex flex-col cursor-pointer transition-colors border border-white/10"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  background: theme.bg || 'rgba(15, 23, 42, 0.9)',
                  boxShadow: theme.glow ? `0 0 40px ${theme.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.15)` : 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  width: `${cardWidth}px`,
                  height: '480px',
                }}
                onClick={() => onProjectClick && onProjectClick(p)}
                role="group"
                aria-roledescription="slide"
                aria-label={`Project: ${p.title}`}
              >
                {/* Floating Tag Pill */}
                <div className="mb-6 inline-block">
                  <div 
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center justify-center"
                    style={{
                      border: `1px solid ${theme.tagText || 'rgba(255, 255, 255, 0.5)'}`,
                      color: theme.tagText || 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {p.tag}
                  </div>
                </div>

                {/* GitHub-style White Box */}
                <div className="bg-[#f6f8fa] rounded-xl p-5 mb-8 relative overflow-hidden flex flex-col justify-between" style={{ minHeight: '150px' }}>
                  <div className="flex justify-between items-start">
                    <div className="font-mono text-lg break-all leading-tight mt-1">
                      <span className="text-[#0969da] font-normal">sahayasavari/</span><br/>
                      <span className="text-[#24292f] font-bold">{slug}</span>
                    </div>
                    <img 
                      src="https://github.com/sahayasavari.png" 
                      alt="Avatar" 
                      className="w-10 h-10 rounded-full shrink-0 shadow-sm" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/9919?s=40&v=4';
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-[#57606a] mt-6 font-sans font-medium">
                    <div className="flex items-center gap-1.5"><CircleDot className="w-3.5 h-3.5" /> 0 Issues</div>
                    <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> 1 Star</div>
                    <div className="flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5" /> 0 Forks</div>
                  </div>
                  
                  {/* Bottom Blue Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#0969da]" />
                </div>

                {/* Title */}
                <h3 className="font-heading italic text-3xl md:text-4xl text-white mb-auto">{p.title}</h3>

                {/* Bottom Section */}
                <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-tight" style={{ color: theme.iconColor || 'rgba(255, 255, 255, 0.6)' }}>
                    <span className="opacity-70">&gt;_</span>
                    <span>{p.stack.replace(/·/g, '•')}</span>
                  </div>
                  
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      background: theme.iconBg || 'rgba(255, 255, 255, 0.1)',
                      color: theme.iconColor || '#fff',
                      border: `1px solid ${theme.border || 'rgba(255, 255, 255, 0.2)'}`,
                    }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-white/30 font-body text-xs text-center mt-12">Hover to pause • Click card for details</p>
    </div>
  );
}
