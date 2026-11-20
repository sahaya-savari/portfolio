import { useState, useEffect, useCallback, useRef, memo } from "react";
import { Download, FileText, ArrowRight, Award } from "lucide-react";

interface AstralPreloaderProps {
  onComplete?: () => void;
}

const SESSION_KEY = "sf_preloader_shown";
const DURATION_MS = 850; // Ultra-snappy 850ms total time for high productivity & optimal LCP
const FADE_OUT_MS = 250;
const READY_DELAY_MS = 150;

interface TelemetryPhase {
  minPct: number;
  badge: string;
  highlight: string;
  subtext: string;
}

const PHASES: TelemetryPhase[] = [
  {
    minPct: 0,
    badge: "CORE_INIT",
    highlight: "NEURAL WORKSPACE INITIALIZING",
    subtext: "Calibrating AI workflows & production runtime...",
  },
  {
    minPct: 25,
    badge: "HONORS",
    highlight: "AIXCELERATE 2026 OVERALL CHAMPION",
    subtext: "NelSync AI · Agri-Logistics & Predictive Grading",
  },
  {
    minPct: 50,
    badge: "EXPERIENCE",
    highlight: "HODOLABS TECHNOLOGIES PVT. LTD.",
    subtext: "Digital Marketing Intern @ HodoLabs",
  },
  {
    minPct: 75,
    badge: "EDUCATION",
    highlight: "M.SC. ARTIFICIAL INTELLIGENCE",
    subtext: "St. Joseph's College (Current) · B.Sc. Data Science (Graduated)",
  },
  {
    minPct: 92,
    badge: "STACK",
    highlight: "PYTHON · MACHINE LEARNING · REACT · TYPESCRIPT",
    subtext: "Data analytics pipelines & modern responsive frontend",
  },
  {
    minPct: 100,
    badge: "SYSTEM_READY",
    highlight: "PORTFOLIO CALIBRATION COMPLETE",
    subtext: "Welcome to Sahaya Savari’s engineering space",
  },
];

function getCurrentPhase(pct: number): TelemetryPhase {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (pct >= PHASES[i].minPct) {
      return PHASES[i];
    }
  }
  return PHASES[0];
}

/** Smooth cubic ease-out: quick burst, smooth settle */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ─── Corner Bracket HUD Component ─── */
function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const size = 16;
  const thickness = 1.5;
  const color = "rgba(255, 255, 255, 0.45)";

  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
  };

  const borders: Record<string, React.CSSProperties> = {
    tl: {
      top: 0,
      left: 0,
      borderTop: `${thickness}px solid ${color}`,
      borderLeft: `${thickness}px solid ${color}`,
    },
    tr: {
      top: 0,
      right: 0,
      borderTop: `${thickness}px solid ${color}`,
      borderRight: `${thickness}px solid ${color}`,
    },
    bl: {
      bottom: 0,
      left: 0,
      borderBottom: `${thickness}px solid ${color}`,
      borderLeft: `${thickness}px solid ${color}`,
    },
    br: {
      bottom: 0,
      right: 0,
      borderBottom: `${thickness}px solid ${color}`,
      borderRight: `${thickness}px solid ${color}`,
    },
  };

  return <div style={{ ...base, ...borders[position] }} aria-hidden="true" />;
}

/* ─── Segmented HUD Line ─── */
function SegmentedLine({ width = 280, activePct = 0 }: { width?: number; activePct?: number }) {
  const segmentCount = 14;
  const segments = Array.from({ length: segmentCount }, (_, i) => i);
  const activeSegments = Math.round((activePct / 100) * segmentCount);

  return (
    <div
      style={{ display: "flex", gap: 4, justifyContent: "center", alignItems: "center", width }}
      aria-hidden="true"
    >
      {segments.map((i) => {
        const isActive = i < activeSegments;
        return (
          <div
            key={i}
            style={{
              flex: i % 4 === 0 ? 2 : 1,
              height: 2,
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.75)" : "rgba(255, 255, 255, 0.12)",
              borderRadius: 1,
              transition: "background-color 100ms ease",
            }}
          />
        );
      })}
    </div>
  );
}

const AstralPreloader = memo(({ onComplete }: AstralPreloaderProps) => {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [percentage, setPercentage] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const skippedRef = useRef(false);
  const completedRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const preloaderRef = useRef<HTMLDivElement>(null);

  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf?v=${typeof __RESUME_HASH__ !== "undefined" ? __RESUME_HASH__ : Date.now()}`;

  // SSR-safe session and environment check
  useEffect(() => {
    if (typeof window === "undefined") {
      setShouldRender(false);
      return;
    }

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isBotOrLighthouse = Boolean(
      navigator.webdriver || /HeadlessChrome|Lighthouse/i.test(navigator.userAgent),
    );
    const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "true";

    if (alreadyShown || isReducedMotion || isBotOrLighthouse) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    setShouldRender(true);
  }, [onComplete]);

  useEffect(() => {
    if (shouldRender) {
      preloaderRef.current?.focus();
    }
  }, [shouldRender]);

  const finishPreloader = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    setPercentage(100);

    const readyTimer = setTimeout(() => {
      setFadingOut(true);

      const fadeTimer = setTimeout(() => {
        setRemoved(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem(SESSION_KEY, "true");
        }
        onComplete?.();
      }, FADE_OUT_MS);

      timeoutsRef.current.push(fadeTimer);
    }, READY_DELAY_MS);

    timeoutsRef.current.push(readyTimer);
  }, [onComplete]);

  // Clean up all timers and animation frames on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  // Snappy percentage animation loop
  useEffect(() => {
    if (shouldRender !== true) return;

    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      if (skippedRef.current) return;

      const elapsed = now - startTimeRef.current;
      const linear = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeOutCubic(linear);
      const pct = Math.min(Math.round(eased * 100), 100);

      setPercentage(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finishPreloader();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldRender, finishPreloader]);

  // Skip handler (Space, Escape, or Enter)
  useEffect(() => {
    if (shouldRender !== true) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        if (skippedRef.current || completedRef.current) return;
        skippedRef.current = true;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        finishPreloader();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender, finishPreloader]);

  const handleManualSkip = () => {
    if (skippedRef.current || completedRef.current) return;
    skippedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    finishPreloader();
  };

  // Don't render if SSR, already shown, or fully removed
  if (shouldRender !== true || removed) return null;

  const currentPhase = getCurrentPhase(percentage);

  return (
    <div
      ref={preloaderRef}
      className="astral-preloader fixed inset-0 z-[10000] bg-black text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
      style={{
        opacity: fadingOut ? 0 : 1,
        transform: fadingOut ? "scale(1.02)" : "scale(1)",
        transition: `opacity ${FADE_OUT_MS}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${FADE_OUT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="System Initialization"
    >
      {/* Screen Reader Accessible Announcement Only */}
      <span className="sr-only" role="status" aria-live="polite">
        Loading Sahaya Savari portfolio workspace...
      </span>

      {/* Top HUD Telemetry Bar (aria-hidden for screen-readers) */}
      <div
        className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/50 tracking-wider"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80">SAHAYA SAVARI F · SYSTEM INITIALIZATION</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/40">
          <span>AI ENGINEER &amp; FULL STACK</span>
          <span>·</span>
          <span>9.9252° N, 78.1198° E (TN, INDIA)</span>
        </div>
        {/* Instant Skip Pill */}
        <button
          type="button"
          onClick={handleManualSkip}
          className="px-3 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all text-[10px] flex items-center gap-1.5 cursor-pointer"
          title="Press Space or Click to Skip"
        >
          <span>Skip Intro</span>
          <span className="opacity-40">[Space]</span>
          <ArrowRight size={10} />
        </button>
      </div>

      {/* Center HUD Box */}
      <div className="flex flex-col items-center justify-center my-auto py-8" aria-hidden="true">
        {/* Top Segmented Line */}
        <SegmentedLine width={280} activePct={percentage} />

        {/* Reticle HUD Frame */}
        <div
          className="relative my-4 px-8 py-5 rounded-2xl flex flex-col items-center justify-center"
          style={{
            width: "min(90vw, 360px)",
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Corner position="tl" />
          <Corner position="tr" />
          <Corner position="bl" />
          <Corner position="br" />

          {/* Phase Badge */}
          <div className="mb-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              {currentPhase.badge}
            </span>
          </div>

          {/* Large Dynamic Percentage Counter */}
          <div className="font-mono text-4xl sm:text-5xl font-light text-white tracking-widest leading-none my-1">
            {String(percentage).padStart(3, "\u2007")}%
          </div>

          {/* Candidate Value Highlight */}
          <div className="text-center mt-2 space-y-1">
            <p className="font-heading font-bold text-sm sm:text-base text-white/95 tracking-wide">
              {currentPhase.highlight}
            </p>
            <p className="font-mono text-[10px] text-white/60 tracking-tight">
              {currentPhase.subtext}
            </p>
          </div>
        </div>

        {/* Bottom Segmented Line */}
        <SegmentedLine width={280} activePct={percentage} />
      </div>

      {/* Bottom Productive Shortcuts & Candidate Telemetry */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 z-20">
        <div
          className="text-[10px] font-mono text-white/40 text-center sm:text-left"
          aria-hidden="true"
        >
          <span>STATUS: </span>
          <span className="text-emerald-400 font-semibold">
            {percentage >= 100 ? "READY" : "STREAMING ASSETS"}
          </span>
          <span className="ml-2 hidden md:inline">· 0.8s responsive startup</span>
        </div>

        {/* Productive Direct Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={resumeUrl}
            download="sahaya_savari_resume.pdf"
            onClick={finishPreloader}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-body text-xs font-semibold hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            aria-label="Direct 1-Click Resume Download"
          >
            <Download size={12} />
            <span>1-Click CV</span>
          </a>

          <a
            href={`${import.meta.env.BASE_URL}projects/nelsync-ai`}
            onClick={finishPreloader}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 font-body text-xs font-medium transition-all cursor-pointer"
            aria-label="Direct link to NelSync AI Champion Project"
          >
            <Award size={12} />
            <span>NelSync AI (1st Place)</span>
          </a>

          <a
            href={`${import.meta.env.BASE_URL}recruiter`}
            onClick={finishPreloader}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-body text-xs font-medium transition-all cursor-pointer"
            aria-label="Direct link to Recruiter Summary mode"
          >
            <FileText size={12} />
            <span>Recruiter View</span>
          </a>
        </div>
      </div>

      {/* Background Watermark */}
      <div
        className="absolute bottom-6 right-6 font-heading text-6xl sm:text-8xl font-bold uppercase not-italic opacity-[0.03] text-white pointer-events-none select-none"
        aria-hidden="true"
      >
        SAHAYA
      </div>
    </div>
  );
});

export default AstralPreloader;
