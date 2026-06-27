import { useState, memo } from 'react';
import { m as motion } from 'framer-motion';
import { Play } from 'lucide-react';
import RotatingText from '../components/RotatingText';
import BlurText from '../components/BlurText';
import FocusText from '../components/FocusText';
import Button from '../components/ui/Button';

interface HeroSectionProps {
  setShowResume: (show: boolean) => void;
}

// Mux poster — same image already preloaded in index.html
const HERO_POSTER = 'https://image.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A/thumbnail.webp?time=0&width=400';

const HeroSection = memo(({ setShowResume }: HeroSectionProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
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
            <BlurText as="h1" text="Sahaya Savari F" delay={200} animateBy="words" direction="top" className="text-fluid-hero-title font-heading italic text-white tracking-[-2px] md:tracking-[-4px] leading-[0.8] mb-4" />
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
                  texts={["M.Sc. AI Student", "Aspiring AI Engineer", "Python Developer", "Data Analyst"]}
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
            M.Sc Artificial Intelligence student building AI-powered applications — from LLM prompt pipelines to full-stack web apps. Open to Summer/Fall 2026 internships.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
            <Button variant="secondary" icon onClick={() => setShowResume(true)} aria-label="View my resume">
              View Resume
            </Button>
            <a href="#projects" className="text-white/60 hover:text-white font-body font-medium text-sm flex items-center gap-2 transition-all px-8 py-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 min-h-[48px]" aria-label="View my projects">
              View Projects <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Executive Summary Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 liquid-glass p-[1px] rounded-2xl w-full max-w-3xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-5 bg-black/40 backdrop-blur-xl rounded-2xl">
              <div className="text-left md:border-r border-white/10 pr-2">
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-1.5">Education</span>
                <span className="block text-xs font-medium text-white/90">M.Sc Artificial Intelligence</span>
              </div>
              <div className="text-left md:border-r border-white/10 pr-2">
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-1.5">Focus</span>
                <span className="block text-xs font-medium text-white/90">AI & Full-Stack Dev</span>
              </div>
              <div className="text-left md:border-r border-white/10 pr-2">
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-1.5">Certification</span>
                <span className="block text-xs font-medium text-white/90">IBM Data Analyst</span>
              </div>
              <div className="text-left">
                <span className="block text-[9px] text-green-400/70 uppercase tracking-widest mb-1.5">Status</span>
                <span className="block text-xs font-medium text-green-400">Open to Opportunities</span>
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
          <div className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/40">What I work with</div>
          <FocusText prefix="Data AI Analytics" focusText="GenAI" className="" />
        </motion.div>
      </div>
    </section>
  );
});

export default HeroSection;
