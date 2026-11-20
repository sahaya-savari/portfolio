export interface RelatedArticle {
  title: string;
  url: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  seoTitle?: string;
  tagline: string;
  overview: string;
  problem: string;
  goals: string[];
  solution: string;
  architecture: string;
  techStack: string[];
  challenges: string[];
  lessons: string[];
  demoUrl?: string;
  githubUrl?: string;
  statusBadge?: string;
  image?: string;
  relatedArticle?: RelatedArticle;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "nelsync-ai": {
    id: "nelsync-ai",
    title: "NelSync AI",
    seoTitle: "NelSync AI | AIxcelerate 2026 Champion Project | Sahaya Savari",
    tagline: "Overall Champion at AIxcelerate 2026 Hackathon (66 Teams)",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1000&auto=format&fit=crop&q=80",
    overview:
      "NelSync AI is an AI layer for paddy procurement in Tamil Nadu structured across four operational stages: predict, optimize, schedule, and monitor. Built by a team of four led by Jeeva Loganathan, the project won Overall Champion out of 66 teams at the AIxcelerate 2026 Multidisciplinary AI Innovation Hackathon at Dhanalakshmi Srinivasan University. Stage 1 scored 95/100 (Rank 2); Stage 2 advanced to Top 48 to build the MVP; the Final reached Top 12 with a 3-minute pitch and live Q&A to win.",
    problem:
      "Paddy grain procurement in Tamil Nadu direct procurement centers experiences severe bottlenecking, unpredictable grain arrival volumes, and prolonged farmer wait times.",
    goals: [
      "Stage 1 (Predict): Regional paddy arrival volume and yield forecasting.",
      "Stage 2 (Optimize): Center capacity balancing and bottleneck reduction.",
      "Stage 3 (Schedule): Dynamic truck arrival slot allocation.",
      "Stage 4 (Monitor): Real-time procurement center tracking and operational transparency.",
    ],
    solution:
      "Designed an AI-driven four-stage procurement layer optimizing rural paddy logistics. Built by a team of four led by Jeeva Loganathan, with Sahaya contributing the initial pitch deck, leading problem research behind the final deck, coordinating team milestones, and managing Q&A defense.",
    architecture:
      "Four-stage procurement optimization framework: Stage 1 (Predict regional arrivals), Stage 2 (Optimize center capacity), Stage 3 (Schedule delivery slots), and Stage 4 (Monitor center flow).",
    techStack: ["Python", "Machine Learning", "Data Analytics", "Logistics Optimization"],
    challenges: [
      "Designing multi-variable scheduling models under realistic rural infrastructure constraints.",
      "Defending agricultural logistics mechanics during rigorous hackathon judging Q&A rounds.",
    ],
    lessons: [
      "Thorough problem research, structured pitch decks, and disciplined Q&A prep were decisive in securing the championship win.",
      "My contribution: built the first pitch deck, drove research behind the final presentation, coordinated the team, and led Q&A prep.",
    ],
    demoUrl: "https://lnkd.in/ghBUvf4P",
    statusBadge: "Overall Champion (66 Teams) - AIxcelerate 2026",
  },
  "prepmind-ai": {
    id: "prepmind-ai",
    title: "PrepMind AI",
    statusBadge: "Status: Live",
    seoTitle: "PrepMind AI | Web-Based Exam Prep Platform | Sahaya Savari",
    tagline: "Web-Based Exam Prep & Practice Platform",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
    overview:
      "PrepMind AI is a web-based exam preparation platform offering topic-based multiple choice question (MCQ) practice, interactive study utilities, AI tutoring, and learner progress tracking, backed by an offline fallback question set when AI responses are unavailable.",
    problem:
      "Students preparing for technical topics require structured MCQ evaluation with responsive feedback, but external AI service interruptions frequently halt online study sessions.",
    goals: [
      "Deliver topic-based MCQ practice modules with clear explanations.",
      "Provide interactive study tools and AI-assisted tutoring for concept clarification.",
      "Track student progress and performance trends across study sessions.",
      "Ensure practice continuity via deterministic fallback questions during AI downtime.",
    ],
    solution:
      "Built a single-page exam prep application with React and TypeScript, incorporating client-side state tracking and resilient fallback questions for uninterrupted learning.",
    architecture:
      "Single-page application built with React and TypeScript, deployed on Vercel. Features client-side state tracking for practice sessions and an integrated fallback question library when network AI calls are offline.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    challenges: [
      "Designing seamless fallback handling that transitions to cached offline question sets without degrading the practice experience.",
      "Maintaining clean responsive UI states across topic modules and quiz tracking.",
    ],
    lessons: [
      "Building resilient client-side fallbacks guarantees learning continuity regardless of upstream AI API latency or rate limits.",
    ],
    demoUrl: "https://prep-weblearning.vercel.app/",
  },
  "daily-spark": {
    id: "daily-spark",
    title: "Daily Spark",
    tagline: "Minimalist Offline Habit Tracker",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1000&auto=format&fit=crop&q=80",
    overview:
      "A privacy-first, local-storage based habit tracking application designed to help users build consistent routines without the clutter of traditional productivity tools.",
    problem:
      "Existing habit trackers are often bloated with social features, notifications, and require constant internet connectivity.",
    goals: [
      "Design a beautiful, distraction-free UI.",
      "Ensure 100% offline functionality.",
      "Provide insightful data visualization for habit streaks.",
    ],
    solution:
      "Developed an offline-first habit tracking Progressive Web App (PWA) using React, Vite, and Tailwind CSS with Capacitor support for native Android builds. Implemented client-side state management for offline data persistence using IndexedDB and Context API.",
    architecture:
      "A client-heavy, offline-first architecture where all habit logs and streak logic run locally on the device. Capacitor provides native Android bridge integration.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "IndexedDB", "Capacitor Android"],
    challenges: [
      "Handling date-time logic across different timezones without a backend.",
      "Creating smooth micro-animations that don't degrade performance on mobile devices.",
    ],
    lessons: [
      "Deepened understanding of client-side storage limitations and optimization.",
      "Improved accessible design practices, ensuring full keyboard navigability.",
    ],
    githubUrl: "https://github.com/sahaya-savari/daily-spark",
    demoUrl: "https://daily-spark-app-da74b.web.app",
    relatedArticle: {
      title: "Offline-First Web Apps: Managing State and Persistence with React & IndexedDB",
      url: "https://blog.sahayasavari.dev/blog/offline-first-indexeddb-react",
    },
  },
  "portfolio-website": {
    id: "portfolio-website",
    title: "Portfolio Website",
    seoTitle: "Portfolio Architecture & Engineering | Sahaya Savari",
    tagline: "High-Performance SPA Portfolio",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80",
    overview:
      "A masterclass in modern frontend development, this portfolio leverages Framer Motion for liquid-smooth animations and hardware-accelerated transitions. It features a custom glassmorphism design system, responsive grids, and an isolated state architecture for maximum performance.",
    problem:
      "Standard portfolios fail to communicate the technical depth and design sensibility of a modern software engineer, web developer, and student AI/ML engineer.",
    goals: [
      "Achieve sub-second load times despite heavy animations.",
      "Implement an accessible, keyboard-navigable SPA architecture.",
      "Showcase modern React features and Vite optimizations.",
    ],
    solution:
      "Built a Single Page Application using React and Vite, optimizing chunk size and asset loading. Replaced traditional routing with lazy-loaded section components for immediate perceived performance.",
    architecture:
      "Framer Motion orchestrates page-level transitions and micro-interactions. A custom pixel-canvas engine powers the background effects. HLS is used for optimized video streaming.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Firebase Hosting"],
    challenges: [
      "Achieving 60fps glassmorphism and spring animations without causing layout thrashing on mobile devices.",
      "Configuring Vite and Firebase for perfect SEO and canonical routing in a pure SPA.",
    ],
    lessons: [
      "Using absolute DOM offset measurements resolves critical layout bugs in complex Framer Motion tracks.",
      "Manual Vite chunk splitting and IntersectionObserver-based lazy loading are essential for modern media-heavy web apps.",
    ],
    githubUrl: "https://github.com/sahaya-savari/portfolio",
    demoUrl: "https://sahayasavari.dev",
    relatedArticle: {
      title: "Tailwind CSS v4 Guide: Oxide Engine, @theme Directive & Dynamic Utilities",
      url: "https://blog.sahayasavari.dev/blog/tailwind-css-v4-guide",
    },
  },
  "vibecraft-2026": {
    id: "vibecraft-2026",
    title: "VibeCraft 2026 (NeuraGenZers)",
    seoTitle: "VibeCraft 2026 | Dual Campus Web Apps | Sahaya Savari",
    tagline: "Top 5 Finalist (out of 110 Teams, 440 Participants) at SRM IST Trichy YUVA'26",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80",
    overview:
      "VibeCraft 2026 is a unified campus productivity web application built by Team NeuraGenZers at SRM IST Trichy (YUVA'26), securing Top 5 Finalist standing out of 110 competing teams (440 participants). It brings two critical campus workflows into a single live deployment: Round 1 Student Attendance Predictor & Planner and Round 2 Free Class Locator & Smart Search Floor Manager.",
    problem:
      "Students struggle to balance attendance against mandatory 75% eligibility thresholds and 90% academic targets, while navigating daily campus life without real-time visibility into vacant classrooms for group study and club work.",
    goals: [
      "Digitize and verify 13 sections and 120 subject records from scanned physical timetables.",
      "Build a subject-wise attendance projection engine with detention detection and OD/medical leave simulation.",
      "Provide a floor-wise vacant room manager with deterministic checks and natural-language search via Gemini API.",
      "Ship one stable, unified production deployment under hackathon constraints.",
    ],
    solution:
      "Engineered an integrated Next.js and React web platform with Recharts visual health analytics, rule-based attendance advisors, and Gemini API query understanding. Completed Round 1 and Round 2 Phase 1, intentionally skipping Phase 2 to ensure zero bugs and high stability during judging.",
    architecture:
      "Next.js 16 app with React 19 and TypeScript 5 frontend. Timetable datasets were parsed via OCR into structured CSVs, validated against physical source sheets. Hosted live on Vercel.",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS v4",
      "Recharts 3",
      "Gemini API",
      "Vercel",
    ],
    challenges: [
      "Cleaning and normalizing OCR data from 13 disparate timetable sections into 120 clean subject records without schema errors.",
      "Managing tight time constraints across multi-round elimination hurdles.",
    ],
    lessons: [
      "Pruning out unstable secondary phase requirements to focus on bulletproof execution of core features earned higher judges' marks than unfinished feature bloat.",
      "My role centered on web development, deployment on Vercel, and crafting the final presentation deck.",
    ],
    statusBadge: "Top 5 Finalist (110 Teams) - VibeCraft 2026",
    demoUrl: "https://neuragenzers.vercel.app/",
  },
};
