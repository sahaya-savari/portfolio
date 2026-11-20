import { memo, useState, useEffect, useCallback, useRef } from "react";
import {
  Briefcase,
  Trophy,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Award,
  X,
  Maximize2,
  Image as ImageIcon,
  Building2,
  Play,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import SectionBadge from "../components/ui/SectionBadge";
import { EXPERIENCES, HONORS_AND_AWARDS, HonorAward, HonorMedia } from "../data";
import { lockScroll, unlockScroll } from "../utils/scrollLock";

const BADGE_STYLES: Record<string, string> = {
  gold: "border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]",
  silver:
    "border-slate-300/40 bg-slate-300/10 text-slate-200 shadow-[0_0_15px_rgba(226,232,240,0.15)]",
  cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]",
  purple:
    "border-purple-400/40 bg-purple-400/10 text-purple-300 shadow-[0_0_15px_rgba(192,132,252,0.15)]",
};

interface CardImageSliderProps {
  images?: HonorMedia[];
  fallbackCover?: string;
  title: string;
  onOpenLightbox: (index: number) => void;
  className?: string;
}

const CardImageSlider = ({
  images,
  fallbackCover,
  title,
  onOpenLightbox,
  className,
}: CardImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const photoList =
    images && images.length > 0
      ? images
      : fallbackCover
        ? [{ url: fallbackCover, caption: title }]
        : [];

  // Automatically advance images 1 by 1 every 3.5 seconds when not hovered
  useEffect(() => {
    if (photoList.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photoList.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [photoList.length, isHovered]);

  if (photoList.length === 0) return null;

  const currentPhoto = photoList[currentIndex] || photoList[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photoList.length) % photoList.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photoList.length);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenLightbox(currentIndex)}
      className={
        className ||
        "relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-neutral-900/90 cursor-pointer border border-white/10 group-hover:border-white/25 transition-colors"
      }
    >
      {/* Clean high-contrast dark studio backing - eliminates any blurry backdrop artifacts */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111622] via-[#0b0e14] to-[#06080c] pointer-events-none" />

      {/* Main Image: 100% visible, centered, fitted with clean padding so no heads, people, or text are cropped */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-5 z-10 pointer-events-none">
        <img
          key={currentPhoto.url}
          src={currentPhoto.url}
          alt={`${title} - image ${currentIndex + 1}`}
          loading="eager"
          className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl [image-rendering:-webkit-optimize-contrast] [image-rendering:high-quality]"
        />
      </div>

      {/* PHOTO COUNT BADGE */}
      {photoList.length > 1 && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90 shadow-lg">
          <ImageIcon className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
          <span>
            {currentIndex + 1} / {photoList.length}
          </span>
        </div>
      )}

      {/* QUICK VIEW ON HOVER */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px] pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-body font-semibold shadow-2xl">
          <Maximize2 className="w-4 h-4" aria-hidden="true" />
          <span>View Lightbox</span>
        </div>
      </div>

      {/* MINI PREV / NEXT ARROWS TO MOVE IMAGES 1 BY 1 */}
      {photoList.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* DOT INDICATORS (PROGRESS 1 BY 1) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-lg">
            {photoList.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? "bg-amber-400 w-4" : "bg-white/40 w-1.5 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ExperienceSection = memo(() => {
  const [activeTab, setActiveTab] = useState<"experience" | "awards">("awards");
  const [selectedAward, setSelectedAward] = useState<HonorAward | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [featuredHonorIndex, setFeaturedHonorIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance the featured honors 1 by 1 every 6 seconds when not hovered and lightbox is closed
  useEffect(() => {
    if (!isAutoPlaying || activeTab !== "awards" || selectedAward !== null) return;
    const timer = setInterval(() => {
      setFeaturedHonorIndex((prev) => (prev + 1) % HONORS_AND_AWARDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeTab, selectedAward]);

  const handlePrevHonor = () => {
    setFeaturedHonorIndex(
      (prev) => (prev - 1 + HONORS_AND_AWARDS.length) % HONORS_AND_AWARDS.length,
    );
  };

  const handleNextHonor = () => {
    setFeaturedHonorIndex((prev) => (prev + 1) % HONORS_AND_AWARDS.length);
  };

  const openLightbox = useCallback((award: HonorAward, photoIdx = 0) => {
    setSelectedAward(award);
    setActivePhotoIndex(photoIdx);
    setIsZoomed(false);
    lockScroll();
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedAward(null);
    setActivePhotoIndex(0);
    setIsZoomed(false);
    unlockScroll();
  }, []);

  const nextPhoto = useCallback(() => {
    if (!selectedAward || !selectedAward.images) return;
    setIsZoomed(false);
    setActivePhotoIndex((prev) => (prev + 1) % selectedAward.images!.length);
  }, [selectedAward]);

  const prevPhoto = useCallback(() => {
    if (!selectedAward || !selectedAward.images) return;
    setIsZoomed(false);
    setActivePhotoIndex(
      (prev) => (prev - 1 + selectedAward.images!.length) % selectedAward.images!.length,
    );
  }, [selectedAward]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedAward) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextPhoto();
      } else if (e.key === "ArrowLeft") {
        prevPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAward, nextPhoto, prevPhoto, closeLightbox]);

  return (
    <section
      aria-label="Work Experience & Achievements"
      className="py-16 md:py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <SectionBadge>Proven Track Record</SectionBadge>
            <h2 className="text-fluid-section-heading font-heading font-bold text-white tracking-tight leading-[0.9] mb-4">
              Work Experience &amp; <br />
              Hackathon Honors.
            </h2>
            <p className="text-white/70 font-body font-light text-base md:text-lg leading-relaxed">
              Demonstrated experience as Digital Marketing Intern at HodoLabs with focus on
              technical SEO, PageSpeed optimizations, and web performance, combined with
              championship honors in competitive AI hackathons and technical symposia.
            </p>
          </div>

          {/* Controls: Tab selector + slider arrow buttons */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            {activeTab === "awards" && (
              <div className="hidden sm:flex items-center gap-1.5 mr-2">
                <button
                  type="button"
                  onClick={handlePrevHonor}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous achievement"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNextHonor}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next achievement"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-1.5 liquid-glass rounded-2xl sm:rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("awards")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
                  activeTab === "awards"
                    ? "bg-white text-black shadow-lg font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
                aria-pressed={activeTab === "awards"}
              >
                <Trophy size={14} />
                <span>Hackathons &amp; Honors</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 ml-0.5">
                  {HONORS_AND_AWARDS.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("experience")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
                  activeTab === "experience"
                    ? "bg-white text-black shadow-lg font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
                aria-pressed={activeTab === "experience"}
              >
                <Briefcase size={14} />
                <span>Work Experience</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 ml-0.5">
                  {EXPERIENCES.length}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Work Experience */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {EXPERIENCES.map((exp) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className="liquid-glass p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {exp.type}
                      </span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs font-body text-white/60 flex items-center gap-1">
                        <MapPin size={12} className="text-white/40" />
                        {exp.location}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-body font-medium text-white/80">{exp.company}</p>
                      <a
                        href="https://www.linkedin.com/in/sahaya-savari"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                        aria-label={`View ${exp.company} experience on LinkedIn`}
                      >
                        <span>LinkedIn</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-white/60 shrink-0 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10">
                    <Calendar size={13} className="text-white/50" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3 mb-6">
                  {exp.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm font-body font-light text-white/70 leading-relaxed"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Hackathons & Competitions - Matches User Reference Layout */}
        {activeTab === "awards" &&
          (() => {
            const award = HONORS_AND_AWARDS[featuredHonorIndex];
            const badgeClass = BADGE_STYLES[award.badgeVariant || "gold"] || BADGE_STYLES.gold;
            const linkedinTarget = award.linkedinUrl || "https://www.linkedin.com/in/sahaya-savari";
            const photoCount = award.images ? award.images.length : 0;

            return (
              <div className="space-y-6">
                {/* MAIN SHOWCASE CONTAINER (Standalone image on left, standalone card on right) */}
                <div
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8"
                >
                  {/* LEFT: Standalone Large Event Photo Showcase */}
                  <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full lg:min-h-[480px] rounded-3xl overflow-hidden bg-neutral-900/90 border border-white/10 hover:border-white/25 transition-colors shadow-2xl group flex items-center justify-center">
                      <CardImageSlider
                        images={award.images}
                        fallbackCover={award.coverImage}
                        title={award.title}
                        onOpenLightbox={(photoIdx) => openLightbox(award, photoIdx)}
                        className="w-full h-full absolute inset-0 cursor-pointer group"
                      />
                    </div>
                  </div>

                  {/* RIGHT: Standalone Dark Glass Detail Card */}
                  <div className="w-full lg:w-1/2 relative rounded-3xl border border-white/10 bg-[#0d1117]/95 backdrop-blur-2xl p-7 sm:p-9 lg:p-10 flex flex-col justify-between shadow-2xl min-h-[460px] lg:min-h-[480px]">
                    <div>
                      {/* Top Row: Refined Amber Trophy Icon + Date */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/15 to-amber-500/5 border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.12)]">
                          <Trophy className="w-5 h-5 text-amber-300" aria-hidden="true" />
                        </div>

                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-zinc-400">
                          <Calendar size={14} className="text-zinc-500" />
                          <span>{award.date}</span>
                        </div>
                      </div>

                      {/* Big Heading */}
                      <h3 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-3 tracking-tight leading-tight">
                        {award.title}
                      </h3>

                      {/* Category & Badge Pills */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-5">
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] text-zinc-300 border border-white/10">
                          {award.category || "Competition"}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium border ${badgeClass}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                          <span>{award.badge}</span>
                        </span>

                        <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                          <Building2 size={13} className="text-zinc-500" />
                          {award.organizer}
                        </span>
                      </div>

                      {/* Full Detailed Story Narrative */}
                      <p className="text-zinc-300 font-body font-light text-sm sm:text-base leading-relaxed mb-6">
                        {award.desc || award.summary}
                      </p>

                      {/* Highlights Checklist */}
                      {award.highlights && (
                        <div className="space-y-2 mb-6">
                          {award.highlights.slice(0, 3).map((h, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm font-body text-zinc-300/80"
                            >
                              <CheckCircle2
                                size={15}
                                className="text-emerald-400 shrink-0 mt-0.5"
                              />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row (Matches '▷ Watch Demo Video' button) */}
                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/[0.08]">
                      {award.caseStudyUrl && (
                        <Link
                          to={award.caseStudyUrl}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/60 hover:bg-white hover:text-black text-white font-body text-xs font-semibold transition-all duration-300 shadow-lg cursor-pointer"
                        >
                          <Play size={13} className="fill-current" />
                          <span>Watch Demo Video</span>
                        </Link>
                      )}

                      {photoCount > 0 && (
                        <button
                          type="button"
                          onClick={() => openLightbox(award, 0)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-body text-xs font-medium border border-white/15 transition-colors cursor-pointer"
                        >
                          <Maximize2 size={13} />
                          <span>View Proof &amp; Gallery ({photoCount})</span>
                        </button>
                      )}

                      <a
                        href={linkedinTarget}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-body text-xs font-medium border border-white/10 transition-colors"
                      >
                        <span>Verify on LinkedIn</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    {/* Vertical Rail / Scroll Indicator on the right edge (like the screenshot!) */}
                    <div className="hidden lg:flex flex-col items-center gap-2 absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <div className="w-1.5 h-32 rounded-full bg-white/10 relative overflow-hidden">
                        <div
                          className="w-full rounded-full bg-purple-500 transition-all duration-500"
                          style={{
                            height: `${100 / HONORS_AND_AWARDS.length}%`,
                            transform: `translateY(${featuredHonorIndex * 100}%)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom 1-by-1 Switcher Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 liquid-glass rounded-2xl border border-white/10 bg-white/[0.02]">
                  <button
                    type="button"
                    onClick={handlePrevHonor}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-mono border border-white/10 transition-colors cursor-pointer"
                    aria-label="Previous achievement"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>

                  {/* Numbered tabs for all 5 events */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {HONORS_AND_AWARDS.map((item, idx) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setFeaturedHonorIndex(idx)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                          idx === featuredHonorIndex
                            ? "bg-white text-black font-semibold shadow-lg scale-105"
                            : "text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5"
                        }`}
                        aria-label={`Jump to ${item.title}`}
                      >
                        <span className="font-bold">{String(idx + 1).padStart(2, "0")}</span>
                        <span className="truncate max-w-[140px]">
                          {item.title.split(" - ")[0].trim()}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextHonor}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-mono border border-white/10 transition-colors cursor-pointer"
                    aria-label="Next achievement"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })()}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {selectedAward && selectedAward.images && selectedAward.images.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedAward.title}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-neutral-950/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono border ${BADGE_STYLES[selectedAward.badgeVariant || "gold"]}`}
                >
                  <Trophy className="w-3 h-3" aria-hidden="true" />
                  {selectedAward.badge}
                </span>
                <span className="text-xs font-mono text-white/50 hidden sm:inline">
                  {selectedAward.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedAward.images[activePhotoIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono border border-white/15 transition-all shadow-sm"
                  title="Open original high-definition photo in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View Original HD</span>
                </a>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Close details modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* MODAL BODY (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* IMAGE VIEWER */}
              <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center min-h-[300px] sm:min-h-[500px]">
                <div className="relative w-full flex flex-col items-center">
                  <div
                    onClick={() => setIsZoomed((prev) => !prev)}
                    className={`w-full flex items-center justify-center p-2 sm:p-4 overflow-auto transition-all ${
                      isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    title={isZoomed ? "Click to reset zoom" : "Click to zoom 150%"}
                  >
                    <img
                      src={selectedAward.images[activePhotoIndex].url}
                      alt={selectedAward.images[activePhotoIndex].caption}
                      className={`${
                        isZoomed
                          ? "max-h-none max-w-none scale-125 sm:scale-150 transition-transform duration-300"
                          : "max-h-[70vh] sm:max-h-[78vh] w-auto max-w-full transition-transform duration-300"
                      } object-contain rounded-xl shadow-2xl [image-rendering:-webkit-optimize-contrast] [image-rendering:high-quality]`}
                    />
                  </div>

                  {/* CAPTION */}
                  <div className="w-full px-4 py-2.5 bg-black/80 backdrop-blur-md border-t border-white/10 text-center">
                    <p className="text-xs sm:text-sm font-body text-white/90">
                      {selectedAward.images[activePhotoIndex].caption}
                    </p>
                    <span className="text-[10px] font-mono text-white/50 mt-1 block">
                      Photo {activePhotoIndex + 1} of {selectedAward.images.length}
                    </span>
                  </div>

                  {/* PREV / NEXT BUTTONS */}
                  {selectedAward.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevPhoto();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextPhoto();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* THUMBNAIL STRIP */}
              {selectedAward.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {selectedAward.images.map((img, idx) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activePhotoIndex === idx
                          ? "border-amber-400 ring-2 ring-amber-400/30 scale-105"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img
                        src={img.url}
                        alt=""
                        className={`w-full h-full object-cover ${
                          img.url.includes("portrait") ? "object-top" : "object-center"
                        }`}
                      />
                      <span className="absolute bottom-0.5 right-1 text-[9px] font-mono bg-black/80 text-white px-1 rounded">
                        {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                      {selectedAward.title}
                    </h3>
                    <p className="text-sm font-mono text-white/60 mt-1">{selectedAward.event}</p>
                    <p className="text-xs font-mono text-white/40 mt-0.5">
                      Organized by {selectedAward.organizer}
                    </p>
                  </div>

                  <p className="text-sm font-body font-light text-white/80 leading-relaxed">
                    {selectedAward.desc}
                  </p>

                  {selectedAward.projectTitle && (
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                      <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider">
                        <Award className="w-3.5 h-3.5" />
                        <span>Winning Innovation</span>
                      </div>
                      <h4 className="font-heading font-bold text-lg text-white">
                        {selectedAward.projectTitle}
                      </h4>
                      {selectedAward.projectDescription && (
                        <p className="text-xs font-body text-white/70 leading-relaxed">
                          {selectedAward.projectDescription}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedAward.highlights && selectedAward.highlights.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2.5">
                        Key Highlights
                      </h4>
                      <ul className="space-y-2">
                        {selectedAward.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm font-body text-white/80"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                        Honor &amp; Award
                      </span>
                      <p className="text-xs font-mono text-white font-medium mt-0.5">
                        {selectedAward.badge}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                        Date
                      </span>
                      <p className="text-xs font-mono text-white/80 mt-0.5">{selectedAward.date}</p>
                    </div>

                    {selectedAward.teamName && (
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                          Team
                        </span>
                        <p className="text-xs font-mono text-white/80 mt-0.5">
                          {selectedAward.teamName}
                        </p>
                      </div>
                    )}

                    {selectedAward.teamMembers && selectedAward.teamMembers.length > 0 && (
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                          Roster
                        </span>
                        <ul className="space-y-1">
                          {selectedAward.teamMembers.map((member, i) => (
                            <li
                              key={i}
                              className="text-xs font-mono text-white/70 flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                              <span>{member}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {selectedAward.tags && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-2">
                        Domains
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedAward.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] font-mono text-white/60 bg-white/5 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/40">
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">
                  Esc
                </kbd>{" "}
                to close ·{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">
                  ←
                </kbd>{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">
                  →
                </kbd>{" "}
                to cycle photos
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-body font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default ExperienceSection;
