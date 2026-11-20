import React, { useState, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Search,
  Sparkles,
  Download,
  Github,
  Gitlab,
  Linkedin,
  Code2,
  Mail,
} from "lucide-react";
import { Outlet, useNavigate, useLocation, Link } from "@/lib/router-compat";

import ClickSpark from "../components/ClickSpark";
import ErrorBoundary from "../components/ErrorBoundary";
import AstralPreloader from "../components/AstralPreloader";
import { lockScroll, unlockScroll, forceUnlockScroll } from "../utils/scrollLock";
import { scrollToSection, revealLazySections, initLazyPreload } from "../utils/navigation";
const SiteCursor = lazy(() => import("../components/reactbits/SiteCursor"));

// Lazy load heavy global modals
const ResumeViewer = lazy(() => import("../components/ResumeViewer"));
const CommandPalette = lazy(() => import("../components/CommandPalette"));

export default function RootLayout() {
  const appBase = import.meta.env.BASE_URL;
  const [showResume, setShowResume] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [enableSiteCursor, setEnableSiteCursor] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const cleanId = targetId.replace(/^#/, "");
    forceUnlockScroll();
    setMobileMenuOpen(false);

    if (cleanId === "resume") {
      navigate("/resume");
      return;
    }

    if (location.pathname === "/") {
      if (typeof window !== "undefined" && window.location.hash) {
        window.history.replaceState(null, "", appBase);
      }
      scrollToSection(cleanId, { behavior: "smooth" });
      setActiveSection(cleanId);
    } else {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("targetSection", cleanId);
      }
      navigate("/");
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    forceUnlockScroll();
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      if (window.location.hash) {
        window.history.pushState(null, "", appBase);
      }
      scrollToSection("home", { behavior: "smooth" });
      setActiveSection("home");
    }
  };

  // Manage focus when mobile menu opens/closes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (mobileMenuOpen) {
      const timer = setTimeout(() => {
        const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>("a, button");
        firstLink?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      mobileMenuToggleRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  // Ctrl + K Spotlight listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Preload remaining lazy sections when browser is idle to ensure instant, stable navigation
  useEffect(() => {
    initLazyPreload();
  }, []);

  // Performance: Only load the crosshair cursor after the user moves a mouse on desktop
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!query.matches) return;

    const handleFirstPointerMove = () => {
      setEnableSiteCursor(true);
      window.removeEventListener("mousemove", handleFirstPointerMove);
    };

    window.addEventListener("mousemove", handleFirstPointerMove, { once: true, passive: true });
    return () => window.removeEventListener("mousemove", handleFirstPointerMove);
  }, []);

  // Fallback for browsers without CSS animation-timeline: scroll() support (e.g., older Safari)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsCssScroll =
      window.CSS && window.CSS.supports && window.CSS.supports("animation-timeline", "scroll()");
    if (supportsCssScroll) return;

    let ticking = false;
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    if (location.pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;
        let maxRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target.id;
          }
        });
        if (mostVisible) {
          setActiveSection(mostVisible);
        }
      },
      { threshold: [0.1, 0.5, 0.9], rootMargin: "-20% 0px -40% 0px" },
    );

    const sectionIds = [
      "home",
      "about",
      "experience",
      "skills",
      "projects",
      "blog",
      "certifications",
      "contact",
    ];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap for mobile menu
  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

  // Lock body scroll when mobile menu is open, pre-reveal sections for instant scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      revealLazySections();
      lockScroll();
      return () => unlockScroll();
    }
  }, [mobileMenuOpen]);

  // Scroll target on initial load or navigation to homepage, immediately cleaning any # hash from address bar
  useEffect(() => {
    if (location.pathname !== "/") return;
    const target =
      (typeof window !== "undefined" ? sessionStorage.getItem("targetSection") : null) ||
      (location.hash ? location.hash.replace(/^#/, "") : "") ||
      (typeof window !== "undefined" && window.location.hash
        ? window.location.hash.replace(/^#/, "")
        : "");

    if (!target) return;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("targetSection");
      if (window.location.hash) {
        window.history.replaceState(null, "", appBase);
      }
    }

    if (target === "resume") {
      navigate("/resume");
      return;
    }

    const cancel = scrollToSection(target, { behavior: "smooth" });
    setActiveSection(target);
    return () => {
      cancel?.();
    };
  }, [location.pathname, location.hash, navigate, appBase]);

  // Handle browser back/forward history navigation
  useEffect(() => {
    const handleHashOrPopState = () => {
      if (location.pathname !== "/") return;
      const cleanId = window.location.hash.replace(/^#/, "");
      if (cleanId) {
        window.history.replaceState(null, "", appBase);
        scrollToSection(cleanId, { behavior: "smooth" });
        setActiveSection(cleanId);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
      }
    };

    window.addEventListener("popstate", handleHashOrPopState);
    window.addEventListener("hashchange", handleHashOrPopState);
    return () => {
      window.removeEventListener("popstate", handleHashOrPopState);
      window.removeEventListener("hashchange", handleHashOrPopState);
    };
  }, [location.pathname, appBase]);

  return (
    <ClickSpark sparkColor="#FFFFFF" sparkSize={8} sparkRadius={14} sparkCount={8} duration={350}>
      {enableSiteCursor && (
        <Suspense fallback={null}>
          <SiteCursor />
        </Suspense>
      )}
      <div className="bg-transparent min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
        {/* Hardware-accelerated Scroll Progress Indicator (Zero JS overhead on modern browsers) */}
        <div ref={scrollProgressRef} className="scroll-progress-bar" aria-hidden="true" />

        {/* SKIP TO CONTENT LINK */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:rounded-full focus:font-body focus:font-medium focus:text-sm focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* NAVBAR */}
        <header className="relative z-[120]">
          <nav
            className="fixed top-4 md:top-6 left-0 right-0 z-[120] px-4 md:px-6"
            aria-label="Main navigation"
          >
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  onClick={handleHomeClick}
                  className="w-10 h-10 liquid-glass-strong rounded-full flex items-center justify-center border border-white/20"
                  aria-label="SF -       SAHAYA SAVARI F Home"
                >
                  <span className="font-heading text-lg font-bold" aria-hidden="true">
                    SF
                  </span>
                </Link>
                <span className="font-body text-xs font-medium tracking-widest hidden xl:flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                    aria-hidden="true"
                  ></span>
                  AVAILABLE FOR WORK
                </span>
                <button
                  onClick={() => setShowCommandPalette(true)}
                  className="font-body text-[11px] font-medium text-white/70 hidden 2xl:flex items-center gap-2.5 ml-4 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300 shadow-sm cursor-pointer group"
                >
                  <Search
                    size={12}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="group-hover:text-white transition-colors">Search</span>
                  <kbd className="font-mono text-[9px] text-white/80 bg-white/[0.07] border border-white/[0.08] px-1.5 py-0.5 rounded-md group-hover:text-white group-hover:bg-white/[0.1] transition-all">
                    Ctrl K
                  </kbd>
                </button>
              </div>
              <div className="hidden md:flex liquid-glass px-4 lg:px-6 py-2 rounded-full items-center gap-3.5 lg:gap-5 xl:gap-6 backdrop-blur-md shrink-0">
                <Link
                  to="/"
                  onClick={(e) => handleNavClick(e, "about")}
                  className={`text-xs lg:text-[13px] xl:text-sm font-body font-medium transition-colors whitespace-nowrap cursor-pointer ${location.pathname === "/" && activeSection === "about" ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}
                >
                  About
                </Link>
                <Link
                  to="/"
                  onClick={(e) => handleNavClick(e, "experience")}
                  className={`text-xs lg:text-[13px] xl:text-sm font-body font-medium transition-colors whitespace-nowrap cursor-pointer ${location.pathname === "/" && activeSection === "experience" ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}
                >
                  Experience
                </Link>
                <Link
                  to="/"
                  onClick={(e) => handleNavClick(e, "projects")}
                  className={`text-xs lg:text-[13px] xl:text-sm font-body font-medium transition-colors whitespace-nowrap cursor-pointer ${location.pathname === "/" && activeSection === "projects" ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}
                >
                  Projects
                </Link>
                <Link
                  to="/resume"
                  className={`text-xs lg:text-[13px] xl:text-sm font-body font-medium transition-colors whitespace-nowrap ${location.pathname === "/resume" ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}
                >
                  Resume
                </Link>
                <Link
                  to="/"
                  onClick={(e) => handleNavClick(e, "certifications")}
                  className={`text-xs lg:text-[13px] xl:text-sm font-body font-medium transition-colors whitespace-nowrap cursor-pointer ${location.pathname === "/" && activeSection === "certifications" ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}
                >
                  Certifications
                </Link>
                <Link
                  to="/"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className={`text-xs lg:text-[13px] xl:text-sm font-body font-medium transition-colors whitespace-nowrap cursor-pointer ${location.pathname === "/" && activeSection === "contact" ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}
                >
                  Contact
                </Link>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <a
                  href={`${appBase}sahaya_savari_resume.pdf`}
                  download="sahaya_savari_resume.pdf"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white text-xs font-body font-medium transition-all shadow-sm shrink-0"
                  aria-label="Download CV (Resume PDF)"
                >
                  <Download size={13} />
                  <span className="hidden xl:inline">Download CV</span>
                </a>
                <Link
                  to="/"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="hidden md:flex relative text-xs xl:text-sm font-medium rounded-full h-9 xl:h-10 pl-4 xl:pl-6 pr-11 xl:pr-14 group transition-all duration-500 hover:pl-11 hover:pr-4 xl:hover:pl-14 xl:hover:pr-6 overflow-hidden cursor-pointer bg-white text-black items-center shrink-0"
                  aria-label="Get in touch - scroll to contact section"
                >
                  <span className="relative z-10 transition-all duration-500">Get In Touch</span>
                  <div
                    className="absolute right-1 w-7 h-7 xl:w-8 xl:h-8 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-32px)] xl:group-hover:right-[calc(100%-36px)] group-hover:rotate-45"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={13} />
                  </div>
                </Link>
                <button
                  ref={mobileMenuToggleRef}
                  className="md:hidden w-11 h-11 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-[130] touch-manipulation cursor-pointer"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav-menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </nav>
        </header>

        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[115] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center overflow-y-auto px-6 py-16 transition-opacity duration-200"
            style={{
              paddingTop: "max(5rem, calc(env(safe-area-inset-top, 0px) + 4rem))",
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom, 0px) + 2rem))",
            }}
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={handleMobileMenuKeyDown}
          >
            <nav
              className="flex flex-col items-center justify-center text-center gap-4 sm:gap-5 my-auto w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile navigation"
            >
              <Link
                to="/"
                onClick={handleHomeClick}
                className="text-2xl sm:text-3xl font-heading font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center justify-center"
              >
                Home
              </Link>
              <Link
                to="/"
                onClick={(e) => handleNavClick(e, "about")}
                className="text-2xl sm:text-3xl font-heading font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center justify-center"
              >
                About
              </Link>
              <Link
                to="/"
                onClick={(e) => handleNavClick(e, "experience")}
                className="text-2xl sm:text-3xl font-heading font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center justify-center"
              >
                Experience
              </Link>
              <Link
                to="/"
                onClick={(e) => handleNavClick(e, "projects")}
                className="text-2xl sm:text-3xl font-heading font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center justify-center"
              >
                Projects
              </Link>
              <Link
                to="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl sm:text-3xl font-heading font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center justify-center"
              >
                Resume
              </Link>
              <Link
                to="/"
                onClick={(e) => handleNavClick(e, "certifications")}
                className="text-2xl sm:text-3xl font-heading font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center justify-center"
              >
                Certifications
              </Link>
              <Link
                to="/"
                onClick={(e) => handleNavClick(e, "contact")}
                className="text-2xl sm:text-3xl font-heading font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center justify-center"
              >
                Contact
              </Link>
              <a
                href={`${appBase}sahaya_savari_resume.pdf`}
                download="sahaya_savari_resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-sm font-body font-medium text-white transition-all duration-200 mt-2 min-h-[44px]"
              >
                <Download size={16} /> Download Resume PDF
              </a>

              {/* Mobile Social Profiles Bar */}
              <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-white/10 w-full">
                <a
                  href="https://github.com/sahaya-savari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/5 border border-white/10 transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://gitlab.com/sahaya-savari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/5 border border-white/10 transition-colors"
                  aria-label="GitLab profile"
                >
                  <Gitlab size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sahaya-savari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/5 border border-white/10 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </nav>
          </div>
        )}

        <main id="main-content">
          <Outlet context={{ setShowResume, setShowCommandPalette }} />
        </main>

        {/* Floating Social Sidebar (Desktop - Reference Image 3) */}
        <aside
          aria-label="Social and engineering channels"
          className="fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 liquid-glass px-2.5 py-4 rounded-full border border-white/15 shadow-2xl backdrop-blur-xl transition-all"
        >
          <a
            href="https://github.com/sahaya-savari"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-200"
            aria-label="Sahaya Savari GitHub profile"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://gitlab.com/sahaya-savari"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-200"
            aria-label="Sahaya Savari GitLab profile"
            title="GitLab"
          >
            <Gitlab size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/sahaya-savari"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-200"
            aria-label="Sahaya Savari LinkedIn profile"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "projects")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-200 cursor-pointer"
            aria-label="Engineering projects and source code"
            title="Projects"
          >
            <Code2 size={18} />
          </Link>
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "contact")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-200 cursor-pointer"
            aria-label="Get in touch / Email"
            title="Contact"
          >
            <Mail size={18} />
          </Link>
        </aside>

        {/* Astral Preloader (Non-blocking for Lighthouse & Prerender) */}
        <AstralPreloader />

        {/* Universal Floating AI Chatbot Action Button (Mobile & Desktop) */}
        <Link
          to="/ai"
          className="fixed right-5 md:right-6 z-[100] w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-white text-black rounded-full shadow-[0_4px_24px_rgba(255,255,255,0.25)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] group no-print touch-manipulation"
          style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
          aria-label="Ask Sahaya AI Assistant"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-pulse text-black" />
        </Link>
      </div>

      {/* Global Modals */}
      {showResume && (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div
                className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center"
                role="status"
              >
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50"
                  aria-hidden="true"
                ></div>
                <span className="sr-only">Loading resume viewer...</span>
              </div>
            }
          >
            <ResumeViewer onClose={() => setShowResume(false)} />
          </Suspense>
        </ErrorBoundary>
      )}

      {showCommandPalette && (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div
                className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center"
                role="status"
              >
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50"
                  aria-hidden="true"
                ></div>
                <span className="sr-only">Loading search...</span>
              </div>
            }
          >
            <CommandPalette
              onClose={() => setShowCommandPalette(false)}
              onOpenResume={() => setShowResume(true)}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </ClickSpark>
  );
}
