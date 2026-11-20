import { useEffect, useState, memo, useRef, lazy, Suspense } from "react";
const HeroBadge = lazy(() => import("../components/reactbits/HeroBadge"));
import { Play, ArrowUpRight } from "lucide-react";
import RotatingText from "../components/RotatingText";
import FocusText from "../components/FocusText";
import { RainbowButton } from "../components/magicui/rainbow-button";
import { Text3DFlip } from "../components/magicui/text-3d-flip";

// Static Badge Card fallback - visually matches Three.js 3D Lanyard badge to prevent layout/visual flash
const StaticBadgeCard = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-start pointer-events-none select-none animate-portrait-float">
    {/* Hanging Lanyard Strap & Clip extending gracefully */}
    <div className="w-5 h-16 bg-gradient-to-b from-transparent via-[#18181b] to-[#18181b] border-x border-white/20 flex flex-col items-center justify-end -mb-1 z-10 shadow-md">
      <div className="w-6 h-2.5 bg-[#27272a] rounded-[2px] border border-white/30" />
      <div className="w-3 h-2 border-b border-x border-zinc-400" />
    </div>

    {/* ID Badge Card matching 3D Lanyard aspect ratio & dimensions */}
    <div className="relative w-[180px] h-[255px] sm:w-[205px] sm:h-[290px] lg:w-[230px] lg:h-[325px] rounded-2xl overflow-hidden border border-white/20 bg-[#0b0b14] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-center">
      <img
        src={`${import.meta.env.BASE_URL}profile.webp`}
        alt="Sahaya Savari F"
        width={240}
        height={340}
        className="w-full h-full object-cover object-top"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15 pointer-events-none" />
    </div>
  </div>
);

// Magic UI Text 3D Flip heading with Plus Jakarta Sans & reduced semibold weight
const HeroHeadingName = () => (
  <Text3DFlip
    className="text-[clamp(1.85rem,7.2vw,6.5rem)] font-heading font-semibold tracking-tight text-white inline-flex flex-nowrap whitespace-nowrap justify-center md:justify-start leading-[0.95] drop-shadow-[0_2px_24px_rgba(255,255,255,0.22)]"
    textClassName="text-white whitespace-nowrap"
    flipTextClassName="text-white/85 whitespace-nowrap"
    staggerDuration={0.035}
    rotateDirection="top"
  >
    Sahaya Savari F
  </Text3DFlip>
);

interface HeroSectionProps {
  setShowResume: (show: boolean) => void;
}

const RESUME_URL = `${import.meta.env.BASE_URL}sahaya_savari_resume.pdf?v=${typeof __RESUME_HASH__ !== "undefined" ? __RESUME_HASH__ : Date.now()}`;
// Ambient hero background visual assets
const HERO_POSTER = `${import.meta.env.BASE_URL}hero-ambient-poster.webp`;
const HERO_VIDEO = `${import.meta.env.BASE_URL}hero-ambient.mp4`;

const HeroSection = memo(({ setShowResume }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [enableInteractiveEffects, setEnableInteractiveEffects] = useState(false);

  // Interactive 3D Lanyard ID Card (Smooth 60fps desktop physics, crisp GPU CSS float on mobile)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileOrTouch =
      window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    if (isReducedMotion || isMobileOrTouch) return;

    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => {
      setEnableInteractiveEffects(true);
    };

    // Warm up interactive 3D physics badge after page is fully settled, or on hover
    if ("requestIdleCallback" in window) {
      idleId = (
        window as unknown as {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback(enable, { timeout: 12000 });
    } else {
      timerId = setTimeout(enable, 8000);
    }

    // On user interaction: defer activation so the interaction itself runs unblocked
    const onUserInteraction = () => {
      window.removeEventListener("pointerdown", onUserInteraction);
      if ("requestIdleCallback" in window) {
        (
          window as unknown as {
            requestIdleCallback: (cb: () => void) => number;
          }
        ).requestIdleCallback(enable);
      } else {
        setTimeout(enable, 150);
      }
    };
    window.addEventListener("pointerdown", onUserInteraction, { once: true, passive: true });

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(
          idleId,
        );
      }
      if (timerId) clearTimeout(timerId);
      window.removeEventListener("pointerdown", onUserInteraction);
    };
  }, []);

  // Ambient hero video:
  // Starts after page has settled or smoothly on first user interaction
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const constrainedConnection =
      connection?.saveData || /(2g|3g)/.test(connection?.effectiveType || "");

    if (prefersReducedMotion || constrainedConnection) return;

    const start = () => setShouldLoadVideo(true);
    const startDeferred = () => {
      if ("requestIdleCallback" in window) {
        (
          window as unknown as {
            requestIdleCallback: (cb: () => void) => void;
          }
        ).requestIdleCallback(start);
      } else {
        setTimeout(start, 100);
      }
    };

    const timer = window.setTimeout(startDeferred, 3000);

    const events = ["scroll", "pointerdown", "touchstart", "keydown", "wheel"] as const;
    events.forEach((e) => window.addEventListener(e, startDeferred, { once: true, passive: true }));

    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, startDeferred));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction"
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Background ambient visual */}
      <div
        className="absolute top-[8%] sm:top-[12%] md:top-[15%] left-0 w-full z-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative w-full flex items-center justify-center min-h-[340px] sm:min-h-[460px] md:min-h-0">
          {/* Ambient poster image */}
          <img
            src={HERO_POSTER}
            alt=""
            width={960}
            height={540}
            fetchPriority="low"
            decoding="async"
            className={`w-full h-auto min-h-[340px] sm:min-h-[460px] md:min-h-0 object-cover md:object-contain transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-0 md:opacity-0" : "opacity-40"
            }`}
            aria-hidden="true"
          />

          {/* Ambient video */}
          {shouldLoadVideo && (
            <video
              src={HERO_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={HERO_POSTER}
              width={1920}
              height={1080}
              onCanPlay={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover md:object-contain transition-opacity duration-1000 ease-in-out ${
                isVideoLoaded ? "opacity-40" : "opacity-0"
              }`}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Ambient atmospheric dark overlays */}
      <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-black via-black/80 to-transparent z-[1] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main hero content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center pt-20 pb-8 sm:pt-22 sm:pb-10 md:pt-24 md:pb-12 w-full max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl text-center flex flex-col items-center w-full">
          <div className="liquid-glass-strong border border-white/15 shadow-sm rounded-full px-4 py-1.5 mb-4 sm:mb-5 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-body font-medium text-white/90 tracking-wide">
              Open to Opportunities · Summer 2027
            </span>
          </div>
          <div className="relative mb-4 sm:mb-6 flex flex-col items-center justify-center w-full">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-14 relative w-full max-w-5xl mx-auto px-4">
              <h1
                aria-label="Sahaya Savari F"
                className="font-heading not-italic font-semibold text-white order-2 md:order-1 mb-4 md:mb-0 text-center md:text-left shrink-0"
                style={{ fontStyle: "normal" }}
              >
                <HeroHeadingName />
              </h1>

              {/* Balanced Floating Ethereal Portrait (Hardware-composited via GPU CSS animation) */}
              <div
                className="relative order-1 md:order-2 shrink-0 group"
                onPointerEnter={() => setEnableInteractiveEffects(true)}
              >
                <div className="relative w-[185px] h-[265px] sm:w-[215px] sm:h-[305px] lg:w-[235px] lg:h-[335px]">
                  {enableInteractiveEffects ? (
                    <div className="absolute -inset-x-[60px] -top-6 -bottom-6 sm:-inset-x-[70px] md:-inset-x-[95px] lg:-inset-x-[115px]">
                      <Suspense fallback={<StaticBadgeCard />}>
                        <HeroBadge />
                      </Suspense>
                    </div>
                  ) : (
                    <StaticBadgeCard />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 w-full max-w-full px-2 sm:px-4 mt-3 sm:mt-4">
              <span className="font-heading font-medium text-fluid-hero-role text-white/85 shrink-0">
                I am a
              </span>
              <div className="text-center sm:text-left inline-flex justify-center max-w-full">
                <RotatingText
                  texts={[
                    "Student AI/ML Engineer",
                    "M.Sc. AI @ St. Joseph's",
                    "Digital Marketing Intern",
                    "2x Hackathon Achiever",
                  ]}
                  mainClassName="px-4 py-1 sm:px-5 sm:py-1.5 liquid-glass-strong border border-white/20 text-white whitespace-nowrap rounded-xl font-bold not-italic text-fluid-hero-role inline-flex items-center justify-center shadow-[0_4px_24px_rgba(255,255,255,0.08)] max-w-full shrink-0"
                  staggerFrom="last"
                  splitBy="words"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-visible pb-0.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={4000}
                />
              </div>
            </div>
          </div>

          {/* LCP Text: High contrast with subtle shadow for crisp readability over flowers */}
          <p className="text-white/95 font-body font-normal text-sm sm:text-base md:text-lg max-w-2xl mb-6 sm:mb-8 leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
            M.Sc. Artificial Intelligence student building and shipping web applications with React,
            TypeScript, Next.js, and Python. Deployed practical tools including Daily Spark,
            PrepMind AI, and the VibeCraft campus apps. Seeking Summer 2027 internships in software
            engineering, backend, and applied AI.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4">
            <RainbowButton onClick={() => setShowResume(true)} aria-label="View Resume">
              View Resume
              <ArrowUpRight
                className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </RainbowButton>
            <a
              href="#projects"
              className="text-white/70 hover:text-white font-body font-medium text-sm flex items-center gap-2 transition-all px-8 py-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 min-h-[48px]"
              aria-label="View Projects"
            >
              View Projects <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            </a>
          </div>

          {/* Recruiter Quick View Card */}
          <div
            className="mt-12 w-full max-w-4xl rounded-3xl border border-white/[0.08] transition-all duration-700"
            style={{
              background: "rgba(10, 10, 14, 0.65)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 20px 50px rgba(0,0,0,0.4)",
            }}
          >
            <div className="grid md:grid-cols-3 gap-8 p-6 md:p-8 text-left">
              {/* Left Column: Core Credentials & Bio info */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div>
                    <h2 className="text-white font-heading font-bold text-lg leading-none">
                      Recruiter Quick View
                    </h2>
                    <span className="text-[10px] text-white/70 font-body uppercase tracking-wider block mt-1.5">
                      Candidate profile summary
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-green-400 border border-green-500/20 px-2 py-0.5 rounded bg-green-500/5 flex items-center gap-1.5 shrink-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                      aria-hidden="true"
                    />
                    Available Summer 2027
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-body">
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">
                      Education
                    </span>
                    <span className="text-white/90 font-medium">
                      M.Sc. AI (Current) · B.Sc. Data Science
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">
                      Experience
                    </span>
                    <span className="text-white/90 font-medium">
                      Digital Marketing Intern @ HodoLabs
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">
                      Target Roles
                    </span>
                    <span className="text-white/90 font-medium">
                      Software Engineering, Backend Development, Applied AI
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">
                      Location &amp; Preference
                    </span>
                    <span className="text-white/90 font-medium">
                      Madurai / Tamil Nadu · Remote / Relocate
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-[9px] font-body text-white/70 uppercase tracking-widest mb-2">
                    Primary Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Python", "React", "TypeScript", "Next.js", "SQL"].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/70"
                      >
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
                  href={RESUME_URL}
                  download="sahaya_savari_resume.pdf"
                  className="w-full text-center text-xs font-body font-semibold px-4 py-3.5 rounded-full bg-white text-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  aria-label="Download PDF Resume"
                >
                  Download PDF Resume
                </a>

                {/* Get in Touch CTA */}
                <a
                  href="#contact"
                  className="w-full text-center text-xs font-body font-medium px-4 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/90 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  aria-label="Get In Touch - Contact section"
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
                  <span className="text-white/10" aria-hidden="true">
                    |
                  </span>
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
          <div className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/70">
            What I work with
          </div>
          <FocusText prefix="Data Analytics Python" focusText="Applied AI" className="" />
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
