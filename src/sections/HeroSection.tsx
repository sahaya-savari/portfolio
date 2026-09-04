import { useEffect, useState, memo } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import RotatingText from '../components/RotatingText';
import FocusText from '../components/FocusText';
import { RainbowButton } from '../components/magicui/rainbow-button';

interface HeroSectionProps {
  setShowResume: (show: boolean) => void;
}

// Mux poster — same image already preloaded in index.html
const HERO_POSTER = 'https://image.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A/thumbnail.webp?time=0&width=400';

const HeroSection = memo(({ setShowResume }: HeroSectionProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCompactViewport = window.matchMedia('(max-width: 767px)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const constrainedConnection = connection?.saveData || /2g/.test(connection?.effectiveType || '');

    if (prefersReducedMotion || constrainedConnection || isCompactViewport || isCoarsePointer) return;

    const loadHeroVideo = () => setShouldLoadVideo(true);
    const timer = window.setTimeout(loadHeroVideo, 1800);
    window.addEventListener('load', loadHeroVideo, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', loadHeroVideo);
    };
  }, []);

  return (
    <section id="home" aria-label="Introduction" className="relative min-h-[100dvh] flex flex-col px-6 overflow-hidden bg-transparent">
      {/* Background ambient video on larger screens (deferred, non-blocking) */}
      <div className="hidden md:block absolute top-[15%] left-0 w-full z-0 opacity-40 pointer-events-none" aria-hidden="true">
        <div className="relative w-full">
          <video
            src={shouldLoadVideo ? 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4' : undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={shouldLoadVideo ? HERO_POSTER : undefined}
            width={1920}
            height={1080}
            onCanPlay={() => setIsVideoLoaded(true)}
            className={`relative w-full h-auto object-contain transition-opacity duration-1000 ease-in-out ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-black via-black/80 to-transparent z-[1]" aria-hidden="true" />

      {/* Main hero content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 w-full">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl text-center flex flex-col items-center w-full">
          <div className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
            <span className="text-xs font-body font-medium text-white/80">Open to Opportunities · Summer/Fall 2026</span>
          </div>
          <div className="relative mb-6 md:mb-8 flex flex-col items-center justify-center w-full">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative w-full">
              <h1 className="text-fluid-hero-title font-heading italic text-white tracking-[-2px] md:tracking-[-4px] leading-[0.8] order-2 md:order-1 select-none text-center md:text-left">
                Sahaya Savari&nbsp;F
              </h1>

              {/* Balanced Floating Ethereal Portrait (Hardware-composited via GPU CSS animation) */}
              <div className="relative order-1 md:order-2 shrink-0 group animate-portrait-float">
                {/* Multi-layered Atmospheric Glow Behind Portrait */}
                <div 
                  className="absolute inset-0 -m-8 sm:-m-10 md:-m-12 lg:-m-16 rounded-full bg-radial from-white/[0.14] via-indigo-500/[0.06] to-transparent blur-3xl pointer-events-none" 
                  aria-hidden="true" 
                />
                
                {/* Lens / Glass Halo subtle ring */}
                <div className="relative w-36 h-36 min-[390px]:w-40 min-[390px]:h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full p-[1.5px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black/60 backdrop-blur-sm relative">
                    <picture>
                      <source type="image/webp" media="(max-width: 640px)" srcSet="/profile-sm.webp" width={240} height={240} />
                      <source type="image/webp" srcSet="/profile.webp" width={400} height={400} />
                      <img
                        src="/profile.jpg"
                        alt="Sahaya Savari F"
                        width={400}
                        height={400}
                        fetchPriority="high"
                        className="w-full h-full object-cover object-top scale-105 transition-transform duration-700 group-hover:scale-110"
                        style={{
                          maskImage: 'radial-gradient(ellipse at 50% 45%, black 64%, rgba(0,0,0,0.85) 78%, transparent 100%)',
                          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 64%, rgba(0,0,0,0.85) 78%, transparent 100%)',
                        }}
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 w-full px-4 mt-4">
              <span className="font-heading italic text-fluid-hero-role text-white/70">I am an</span>
              <div className="w-[280px] sm:w-auto text-center sm:text-left flex justify-center sm:justify-start">
                <RotatingText
                  texts={["AI Engineer", "M.Sc. AI Student", "Python Developer", "Full Stack Developer"]}
                  mainClassName="px-3.5 py-1 liquid-glass text-white overflow-hidden rounded-lg font-bold not-italic text-fluid-hero-role inline-flex items-center justify-center"
                  staggerFrom="last"
                  splitBy="words"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </div>
            </div>
          </div>

          {/* LCP Text: Rendered immediately with optimal contrast */}
          <p className="text-white/75 font-body font-light text-lg md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed">
            M.Sc. Artificial Intelligence student building Machine Learning applications, Python automation tools, and responsive web software with React and TypeScript. Highlighting verified engineering projects for Summer/Fall 2026 opportunities.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
            <RainbowButton onClick={() => setShowResume(true)} aria-label="View Resume">
              View Resume
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </RainbowButton>
            <a href="#projects" className="text-white/70 hover:text-white font-body font-medium text-sm flex items-center gap-2 transition-all px-8 py-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 min-h-[48px]" aria-label="View Projects">
              View Projects <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            </a>
          </div>

          {/* Recruiter Quick View Card */}
          <div
            className="mt-12 w-full max-w-4xl rounded-3xl border border-white/[0.08] transition-all duration-700"
            style={{
              background: 'rgba(10, 10, 14, 0.65)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 20px 50px rgba(0,0,0,0.4)',
            }}
          >
            <div className="grid md:grid-cols-3 gap-8 p-6 md:p-8 text-left">
              {/* Left Column: Core Credentials & Bio info */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div>
                    <h2 className="text-white font-heading italic text-lg leading-none">Recruiter Quick View</h2>
                    <span className="text-[10px] text-white/70 font-body uppercase tracking-wider block mt-1.5">Candidate profile summary</span>
                  </div>
                  <span className="text-[9px] font-mono text-green-400 border border-green-500/20 px-2 py-0.5 rounded bg-green-500/5 flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                    Available Summer/Fall 2026
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-body">
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">Education</span>
                    <span className="text-white/90 font-medium">M.Sc. Artificial Intelligence</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">Location</span>
                    <span className="text-white/90 font-medium">Trichy / Madurai, India</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">Target Roles</span>
                    <span className="text-white/90 font-medium">AI Engineer, Python Developer, Full Stack Developer</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">Preference</span>
                    <span className="text-white/90 font-medium">Open to Remote / Relocation</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-[9px] font-body text-white/70 uppercase tracking-widest mb-2">Primary Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'Artificial Intelligence', 'Machine Learning', 'React', 'TypeScript', 'Firebase'].map(skill => (
                      <span key={skill} className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/70">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: CTA Actions */}
              <div className="flex flex-col justify-center gap-4 bg-white/[0.01] border-t md:border-t-0 md:border-l border-white/[0.06] pt-6 md:pt-0 md:pl-8">
                {/* 1-Click Resume Download */}
                <a
                  href="/resume.pdf?v=2"
                  download="Sahaya_Savari_Resume.pdf"
                  className="w-full text-center text-xs font-body font-semibold px-4 py-3.5 rounded-full bg-white text-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  aria-label="Download PDF Resume"
                >
                  Download PDF Resume
                </a>

                {/* Get in Touch CTA */}
                <a
                  href="#contact"
                  className="w-full text-center text-xs font-body font-medium px-4 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/90 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  aria-label="Get In Touch — Contact section"
                >
                  Get In Touch
                </a>

                {/* Profiles row */}
                <div className="flex items-center justify-center gap-6 mt-2">
                  <a
                    href="https://github.com/sahaya-savari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-xs font-body flex items-center gap-1.5"
                    aria-label="GitHub (opens in new tab)"
                  >
                    GitHub
                  </a>
                  <span className="text-white/10" aria-hidden="true">|</span>
                  <a
                    href="https://www.linkedin.com/in/sahaya-savari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-xs font-body flex items-center gap-1.5"
                    aria-label="LinkedIn (opens in new tab)"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Moved outside max-w-4xl to give FocusText full section width */}
        <div
          className="mt-8 md:mt-12 flex flex-col items-center gap-4 shrink-0 pointer-events-none w-full"
          aria-hidden="true"
        >
          <div className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/70">What I work with</div>
          <FocusText prefix="Data AI Analytics" focusText="GenAI" className="" />
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
