import { useEffect, useState, memo } from 'react';
import { m as motion } from 'framer-motion';
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
      <div className="absolute top-[15%] left-0 w-full z-0 opacity-40" aria-hidden="true">
        <div className="relative w-full">
          {/*
           * LCP FIX:
           * 1. `poster` → the Mux thumbnail (already preloaded in index.html).
           *    The browser renders the poster immediately on first paint — this IS the LCP element.
           * 2. `preload="none"` → we don't need video bytes at paint time; the poster handles it.
           * 3. Video fades in only after it's ready, so there's no visual jump.
           * 4. The static skeleton in index.html (z-index:-1) is removed from LCP competition
           *    because this <video> element with an explicit poster wins immediately.
           */}
          <video
            src={shouldLoadVideo ? 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4' : undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={HERO_POSTER}
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
        <div className="max-w-4xl text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
            <span className="text-xs font-body font-medium text-white/80">Open to Opportunities · Summer/Fall 2026</span>
          </motion.div>
          <div className="mb-6 md:mb-8">
            <h1 className="text-fluid-hero-title font-heading italic text-white tracking-[-2px] md:tracking-[-4px] leading-[0.8] mb-4">
              Sahaya Savari F
            </h1>
            {/*
             * ANIMATION FIX: Removed `filter: blur()` from initial/animate.
             * filter:blur is a non-composited operation — it forces CPU repaint every frame.
             * Pure opacity fade achieves a near-identical entrance without the paint cost.
             */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 w-full px-4"
            >
              <span className="font-heading italic text-fluid-hero-role text-white/60">I am an</span>
              <div className="w-[280px] sm:w-auto text-center sm:text-left flex justify-center sm:justify-start">
                <RotatingText
                  texts={["M.Sc. AI Student", "AI Engineer", "Python Developer", "Full Stack Developer"]}
                  mainClassName="px-3 py-1 liquid-glass text-white overflow-hidden rounded-lg font-bold not-italic text-fluid-hero-role inline-flex items-center justify-center"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </motion.div>
          </div>

          {/* ANIMATION FIX: opacity only — no filter blur */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/60 font-body font-light text-lg md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed"
          >
            AI Engineer and M.Sc. Artificial Intelligence student building Machine Learning tools, Python automation, and full-stack web apps with React, TypeScript, and Firebase. This Portfolio highlights practical projects for Summer/Fall 2026 internships.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
            <RainbowButton onClick={() => setShowResume(true)} aria-label="View my resume">
              View Resume
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </RainbowButton>
            <a href="#projects" className="text-white/60 hover:text-white font-body font-medium text-sm flex items-center gap-2 transition-all px-8 py-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 min-h-[48px]" aria-label="View my projects">
              View Projects <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Recruiter Quick View Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 w-full max-w-4xl rounded-3xl border border-white/[0.08]"
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
                    <span className="text-[10px] text-white/40 font-body uppercase tracking-wider block mt-1.5">Candidate profile summary</span>
                  </div>
                  <span className="text-[9px] font-mono text-green-400 border border-green-500/20 px-2 py-0.5 rounded bg-green-500/5 flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                    Available Summer/Fall 2026
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-body">
                  <div>
                    <span className="block text-[9px] text-white/30 uppercase tracking-widest mb-1">Education</span>
                    <span className="text-white/80 font-medium">M.Sc. Artificial Intelligence</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/30 uppercase tracking-widest mb-1">Location</span>
                    <span className="text-white/80 font-medium">Trichy / Madurai, India</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/30 uppercase tracking-widest mb-1">Target Roles</span>
                    <span className="text-white/80 font-medium">AI Engineer, Python Developer, Full Stack Developer</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/30 uppercase tracking-widest mb-1">Preference</span>
                    <span className="text-white/80 font-medium">Open to Remote / Relocation</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-[9px] font-body text-white/30 uppercase tracking-widest mb-2">Primary Stack</span>
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
                  aria-label="Download PDF Resume directly"
                >
                  Download PDF Resume
                </a>

                {/* Get in Touch CTA */}
                <a
                  href="#contact"
                  className="w-full text-center text-xs font-body font-medium px-4 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/90 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  aria-label="Navigate to contact section"
                >
                  Get In Touch
                </a>

                {/* Profiles row */}
                <div className="flex items-center justify-center gap-6 mt-2">
                  <a
                    href="https://github.com/sahaya-savari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors text-xs font-body flex items-center gap-1.5"
                    aria-label="Open Github in new tab"
                  >
                    GitHub
                  </a>
                  <span className="text-white/10" aria-hidden="true">|</span>
                  <a
                    href="https://www.linkedin.com/in/sahaya-savari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors text-xs font-body flex items-center gap-1.5"
                    aria-label="Open LinkedIn profile in new tab"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Moved outside max-w-4xl to give FocusText full section width */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 md:mt-12 flex flex-col items-center gap-4 shrink-0 pointer-events-none w-full"
          aria-hidden="true"
        >
          <div className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/60">What I work with</div>
          <FocusText prefix="Data AI Analytics" focusText="GenAI" className="" />
        </motion.div>
      </div>
    </section>
  );
});

export default HeroSection;
