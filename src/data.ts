// Pure data module - no React or component dependencies.
// Icon identifiers are resolved at render time in CertificationsSection.

export const BLOG_URL = "https://blog.sahayasavari.dev";

export interface Article {
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  image: string;
  url: string;
  category: string;
  content?: string;
  keyTakeaways?: string[];
}

export const ARTICLES: Article[] = [
  {
    title:
      "Demystifying Core Web Vitals & Technical SEO: Lessons from Production Audits at HodoLabs",
    excerpt:
      "Practical insights from conducting on-page SEO audits, optimizing Largest Contentful Paint (LCP) performance, and restructuring JSON-LD schemas across production web properties.",
    date: "August 2026",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/core-web-vitals-seo-hodolabs`,
    category: "Web Performance & SEO",
    keyTakeaways: [
      "Interaction gates (scroll, touch, keydown) prevent heavy hero video streaming from inflating W3C LCP times.",
      "Strict aspect-ratio sizing and layout reserve blocks drop Cumulative Layout Shift (CLS) to an absolute 0.00.",
      "Interlinked schema graphs (@graph with Person, WebSite, and TechArticle) maximize search engine entity discovery.",
    ],
    content: `During my tenure as a Digital Marketing Intern at HodoLabs, the single most common culprit behind poor Google PageSpeed scores was not server latency - it was unmeasured client-side layout thrashing and deferred media rendering.

Key optimizations implemented across audit projects:

1. Locking LCP Before Heavy Background Media
Chrome's Performance Observer measures the Largest Contentful Paint until the first qualifying user interaction. If a 10MB hero video begins buffering on mouse movement, the browser may keep LCP open for 15+ seconds. By preloading a tiny 7KB WebP poster and delaying video initialization until genuine interaction events occur, LCP immediately locks in under 2.0 seconds.

2. Deterministic Layout Reservations
Cumulative Layout Shift (CLS) often spikes because modern particle canvases or dynamic title wrappers lack hard-coded dimensions during font-swap. Enforcing aspect-ratio containers and setting min-height: 0 removes shifting entirely.

3. Entity-Driven Schema Graphs
Search engines prioritize structured identity. Linking author, credential, and organization nodes within an unified JSON-LD graph enables Google's Knowledge Graph to verify author authority effortlessly.`,
  },
  {
    title: "Offline-First Web Apps: Managing State and Persistence with React & IndexedDB",
    excerpt:
      "A deep dive into Daily Spark's engineering: constructing a zero-latency habit tracking platform with local-first IndexedDB persistence, zero telemetry scripts, and instant cold-boots.",
    date: "July 2026",
    readingTime: 4,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/offline-first-indexeddb-react`,
    category: "Full Stack",
    keyTakeaways: [
      "Wrapping asynchronous IndexedDB operations in lightweight custom hooks prevents UI frame drops.",
      "Client-side state synchronization guarantees zero-latency interaction even under offline airplane mode.",
      "A privacy-first zero-tracking footprint eliminates cookie consent friction and improves consumer trust.",
    ],
    content: `Mental wellness and habit tracking apps frequently suffer from cloud bloat: tracking pixels, heavy database sync locks, and slow cold-start auth checks.

With Daily Spark, we took an intentionally contrarian engineering approach: 100% offline-first.

1. High-Performance IndexedDB Storage
LocalStorage caps storage at 5MB and runs synchronously on the main JavaScript thread, causing micro-stutters during heavy JSON serialization. By wrapping IndexedDB in an asynchronous transactional store, we achieved sub-5ms write latencies without blocking UI animations.

2. Hardware-Accelerated Micro-Interactions
Every habit completion triggers spring physics driven by CSS transforms rather than continuous JavaScript re-renders. The entire application bundle weighs under 90KB gzip, ensuring lightning-fast load times even on spotty 3G networks.`,
  },
];

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTheme {
  bg: string;
  border: string;
  glow: string;
  tagBg: string;
  tagText: string;
  iconBg: string;
  iconColor: string;
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  desc: string;
  stack: string;
  link: string;
  status: string;
  github: string;
  image?: string;
  longDesc: string;
  metrics: ProjectMetric[];
  features: string[];
  problem: string;
  architecture: string;
  techStack: string[];
  challenges: string;
  results: string;
  lessonsLearned: string;
  futureImprovements?: string;
  theme: ProjectTheme;
}

export const PROJECTS: Project[] = [
  {
    id: "nelsync-ai",
    title: "NelSync AI",
    tag: "AI & Agriculture",
    desc: "Overall Champion of the AIxcelerate 2026 AI Innovation Hackathon (66 teams). An AI layer for paddy procurement in Tamil Nadu with four stages: predict, optimize, schedule, and monitor.",
    stack: "Python · Machine Learning · Analytics",
    link: "https://lnkd.in/ghBUvf4P",
    status: "Hackathon Champion",
    github: "",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1000&auto=format&fit=crop&q=80",
    longDesc:
      "NelSync AI is an AI layer for paddy procurement in Tamil Nadu structured across four operational stages: predict, optimize, schedule, and monitor. Built by a team of four led by Jeeva Loganathan, the project won Overall Champion out of 66 teams at the AIxcelerate 2026 Multidisciplinary AI Innovation Hackathon at Dhanalakshmi Srinivasan University. Stage 1 scored 95/100 (Rank 2); Stage 2 advanced to Top 48 to build the MVP; the Final reached Top 12 with a 3-minute pitch and live Q&A. Sahaya's contribution: built the first pitch deck, drove the research behind the final presentation, coordinated the team, and led Q&A prep.",
    metrics: [
      { label: "Award", value: "Overall Champion (66 Teams)" },
      { label: "Team", value: "Team of 4 (Led by Jeeva L.)" },
      { label: "My Contribution", value: "Pitch Deck, Research & Q&A Prep" },
    ],
    features: [
      "Predictive Volume Forecasting (Stage 1)",
      "Procurement Capacity Optimization (Stage 2)",
      "Dynamic Arrival Scheduling (Stage 3)",
      "Real-Time Center Flow Monitoring (Stage 4)",
    ],
    problem:
      "Paddy grain procurement in Tamil Nadu direct procurement centers experiences severe bottlenecking, unpredictable grain arrival volumes, and prolonged farmer wait times.",
    architecture:
      "Four-stage procurement optimization framework: Stage 1 (Predict regional arrivals), Stage 2 (Optimize center capacity), Stage 3 (Schedule delivery slots), and Stage 4 (Monitor center flow).",
    techStack: ["Python", "Machine Learning", "Data Analytics", "Logistics Optimization"],
    challenges:
      "Designing multi-variable scheduling models under realistic rural infrastructure constraints and defending the solution during rigorous hackathon Q&A rounds.",
    results:
      "Stage 1 score of 95/100 (Rank 2), Top 48 MVP development in Stage 2, and 1st Place Overall Championship victory following the Top 12 pitch at AIxcelerate 2026.",
    lessonsLearned:
      "Thorough problem-space research, crisp pitch deck storytelling, and disciplined Q&A preparation were decisive factors in translating technical models into championship wins.",
    futureImprovements:
      "Integrate live mandi price indexes and automated government procurement portal sync.",
    theme: {
      bg: "linear-gradient(180deg, rgba(5,150,105,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(52,211,153,0.3)",
      glow: "rgba(52,211,153,0.15)",
      tagBg: "rgba(52,211,153,0.2)",
      tagText: "#a7f3d0",
      iconBg: "rgba(52,211,153,0.15)",
      iconColor: "#a7f3d0",
    },
  },
  {
    id: "vibecraft-2026",
    title: "VibeCraft 2026 (NeuraGenZers)",
    tag: "Campus Web Suite",
    desc: "Top 5 Finalist (out of 110 teams, 440 participants) at VibeCraft 2026 (SRM IST Trichy, YUVA'26). Two campus web apps combined into one live deployment: Student Attendance Predictor & Planner and Free Class Locator & Smart Search Floor Manager.",
    stack: "Next.js 16 · React 19 · TypeScript · Tailwind CSS · Gemini API · Vercel",
    link: "https://neuragenzers.vercel.app/",
    status: "Top 5 Finalist (out of 110 teams)",
    github: "",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80",
    longDesc:
      "Built during VibeCraft 2026 at SRM IST Trichy (YUVA'26) by Team NeuraGenZers, securing Top 5 Finalist standing out of 110 teams (440 participants). Combines two campus utility applications into a single live deployment: Round 1 Attendance Predictor & Planner and Round 2 Free Class Locator & Smart Search Floor Manager.",
    metrics: [
      { label: "Award", value: "Top 5 Finalist (110 Teams)" },
      { label: "Dataset", value: "13 Sections, 120 Subjects" },
      { label: "My Role", value: "Web Dev & Deployment" },
    ],
    features: [
      "Subject-wise attendance tracking & projections (75% threshold / 90% target)",
      "Detention risk detection & health visualization charts",
      "On-duty (OD) and medical leave simulator with rule-based advisor chatbot",
      "Floor-wise room grid, filters, and AI natural-language room search",
      "Deterministic real-time availability checks",
    ],
    problem:
      "Students lack visibility into dynamic attendance projections to prevent detention, while faculty and students struggle to locate free classrooms across campus in real time.",
    architecture:
      "Built with Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Recharts 3, and Gemini API. Scanned physical timetables were digitized into CSVs with OCR and verified against original records. Completed Round 1 and Round 2 Phase 1, skipping Phase 2 to ship one unified, stable deployment on Vercel.",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS v4",
      "Recharts 3",
      "Gemini API",
      "Vercel",
    ],
    challenges:
      "Transforming noisy scanned timetable images into 120 verified structured subject records and delivering a unified dual-app production build under hackathon deadline constraints.",
    results:
      "Achieved Top 5 Finalist standing out of 110 participating teams (440 participants) at VibeCraft 2026 and shipped a responsive, live deployment on Vercel.",
    lessonsLearned:
      "Disciplined scope management - focusing on delivering a rock-solid Round 1 and Round 2 Phase 1 rather than overextending into unstable Phase 2 features - enabled shipping a complete, working product under competition time limits.",
    futureImprovements:
      "Incorporate automated timetable synchronization with the university portal.",
    theme: {
      bg: "linear-gradient(180deg, rgba(14,116,144,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(6,182,212,0.3)",
      glow: "rgba(6,182,212,0.15)",
      tagBg: "rgba(6,182,212,0.2)",
      tagText: "#67e8f9",
      iconBg: "rgba(6,182,212,0.15)",
      iconColor: "#67e8f9",
    },
  },
  {
    id: "daily-spark",
    title: "Daily Spark",
    tag: "Productivity App",
    desc: "An offline-first habit and daily streak application built with React, TypeScript, Vite, Tailwind CSS, and IndexedDB, with Capacitor support for Android.",
    stack: "React · TypeScript · Capacitor",
    link: "https://daily-spark-app-da74b.web.app",
    status: "Live",
    github: "https://github.com/sahaya-savari/daily-spark",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1000&auto=format&fit=crop&q=80",
    longDesc:
      "Daily Spark is a minimalist productivity app designed to help users build consistent daily routines offline without distraction. Habit logs and streak metrics persist locally on the device via IndexedDB.",
    metrics: [
      { label: "Core Tech", value: "React, IndexedDB" },
      { label: "Mobile", value: "Capacitor Android" },
      { label: "Architecture", value: "Offline-First PWA" },
    ],
    features: [
      "Offline Habit Tracking",
      "IndexedDB Persistence",
      "Capacitor Android Build",
      "Streak Analytics",
    ],
    problem:
      "Traditional productivity tools require constant internet connectivity and clutter the UI with unwanted social feeds.",
    architecture:
      "Client-heavy Progressive Web App (PWA) with Capacitor support for Android. Data structures persist locally in IndexedDB and sync through React Context API.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "IndexedDB", "Capacitor"],
    challenges:
      "Handling date-time streak calculation across different timezones entirely offline without a server.",
    results:
      "Shipped a working web app and Android build with IndexedDB persistence for offline habit tracking.",
    lessonsLearned:
      "Client-side storage management and IndexedDB performance optimization for mobile viewports.",
    futureImprovements: "Add local notification reminders and cross-device sync options.",
    theme: {
      bg: "linear-gradient(180deg, rgba(88,28,135,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(168,85,247,0.3)",
      glow: "rgba(168,85,247,0.15)",
      tagBg: "rgba(168,85,247,0.2)",
      tagText: "#d8b4fe",
      iconBg: "rgba(168,85,247,0.15)",
      iconColor: "#d8b4fe",
    },
  },
  {
    id: "prepmind-ai",
    title: "PrepMind AI",
    tag: "Exam Prep & Learning",
    desc: "Web-based exam prep platform with topic-based MCQ practice, interactive study tools, AI tutoring, and progress tracking, featuring fallback practice questions when AI responses are unavailable.",
    stack: "React · TypeScript · Vercel",
    link: "https://prep-weblearning.vercel.app/",
    status: "Live",
    github: "",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
    longDesc:
      "PrepMind AI is a web-based exam preparation platform offering topic-based multiple choice question (MCQ) practice, interactive study utilities, AI tutoring, and learner progress tracking. The platform includes resilient fallback practice questions to ensure students can continue studying without interruption even when AI responses are unavailable.",
    metrics: [
      { label: "Status", value: "Live Deployment" },
      { label: "Platform", value: "Web-Based EdTech" },
      { label: "Resilience", value: "Fallback Question Bank" },
    ],
    features: [
      "Topic-Based MCQ Practice Modules",
      "Interactive Study Utilities & AI Tutoring",
      "Progress Tracking & Score Analytics",
      "Deterministic Fallback Question Bank",
    ],
    problem:
      "Students preparing for technical topics require structured MCQ evaluation with responsive feedback, but external AI service interruptions frequently halt online study sessions.",
    architecture:
      "Single-page web application built with React and TypeScript, deployed on Vercel. Features client-side state tracking for practice sessions and an integrated fallback question library when network AI calls are offline.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    challenges:
      "Designing seamless fallback handling that transitions to cached offline question sets without degrading the practice experience during network drops.",
    results: "Shipped a live, accessible web exam preparation application on Vercel.",
    lessonsLearned:
      "Building resilient client-side fallbacks guarantees learning continuity regardless of upstream AI API latency or rate limits.",
    futureImprovements: "Add customizable practice quiz generation from student notes.",
    theme: {
      bg: "linear-gradient(180deg, rgba(6,78,59,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(16,185,129,0.3)",
      glow: "rgba(16,185,129,0.15)",
      tagBg: "rgba(16,185,129,0.2)",
      tagText: "#6ee7b7",
      iconBg: "rgba(16,185,129,0.15)",
      iconColor: "#6ee7b7",
    },
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    tag: "Web Development",
    desc: "A modern AI Engineer portfolio website built with React, TypeScript, Vite, and Framer Motion featuring glassmorphism design, HLS video streaming, and lazy-loaded sections.",
    stack: "React · TypeScript · Vite",
    link: "https://sahayasavari.dev",
    status: "Live",
    github: "https://github.com/sahaya-savari/portfolio",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80",
    longDesc:
      "A masterclass in modern frontend development, this portfolio leverages Framer Motion for liquid-smooth animations and hardware-accelerated transitions. It features a custom glassmorphism design system, responsive grids, and an isolated state architecture for maximum performance.",
    metrics: [
      { label: "Core Tech", value: "React, Framer Motion" },
      { label: "Performance", value: "Sub-second Load" },
      { label: "Design", value: "Glassmorphism" },
    ],
    features: [
      "Custom UI Engine",
      "Hardware Accelerated Motion",
      "Responsive Layout Architecture",
      "HLS Video Streaming",
    ],
    problem:
      "Standard portfolios fail to communicate the technical depth and design sensibility of a modern AI Engineer, Python Developer, and Full Stack Developer.",
    architecture:
      "Single Page Application built with React, Vite, and Tailwind CSS. Framer Motion drives all transitions. No traditional router - all sections are in-page with lazy intersection loading to preserve 'liquid' scroll state.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    challenges:
      "Achieving 60fps glassmorphism and spring animations without causing layout thrashing on mobile devices.",
    results:
      "Built with lazy section rendering, manual Vite chunk splitting, and IntersectionObserver-based loading. Implements accessible tab patterns following WCAG 1.3.1 guidelines. Deployed on Firebase Hosting.",
    lessonsLearned:
      "Using absolute DOM offset measurements instead of relying on offsetParent trees resolves critical layout bugs in complex tracks.",
    futureImprovements:
      "Add full offline-first capabilities using Service Workers, introduce a theme preference toggler (dark/light), and automate build performance testing in CI.",
    theme: {
      bg: "linear-gradient(180deg, rgba(30,58,138,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(59,130,246,0.3)",
      glow: "rgba(59,130,246,0.15)",
      tagBg: "rgba(59,130,246,0.2)",
      tagText: "#93c5fd",
      iconBg: "rgba(59,130,246,0.15)",
      iconColor: "#93c5fd",
    },
  },
];

export interface LanguageProficiency {
  language: string;
  proficiency: string;
}

export const TOP_SKILLS = ["PostgreSQL", "Node.js", "React.js"] as const;

export const LANGUAGES: LanguageProficiency[] = [
  { language: "Tamil", proficiency: "Native or Bilingual" },
  { language: "English", proficiency: "Limited Working" },
  { language: "Hindi", proficiency: "Elementary" },
];

export const CONTACT_INFO = {
  name: "Sahaya Savari F",
  headline:
    "Student AI/ML Engineer | M.Sc. Artificial Intelligence @ SJC | Digital Marketing Intern @ HodoLabs | 2x Hackathon Achiever",
  location: "Madurai, Tamil Nadu, India",
  email: "contact@sahayasavari.dev",
  primaryEmail: "contact@sahayasavari.dev",
  phone: "+91 6385648514",
  phoneDisplay: "+91 6385648514",
  phoneRaw: "6385648514",
  linkedin: "https://www.linkedin.com/in/sahaya-savari",
  github: "https://github.com/sahaya-savari",
  gitlab: "https://gitlab.com/sahaya-savari",
  website: "https://sahayasavari.dev",
};

export interface FeaturedCredential {
  prefix?: string;
  rank?: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  linkedinUrl?: string;
  pdfPath?: string;
  score?: string;
  credits?: string | number;
  skills?: string[];
  desc?: string;
  image?: string;
}

export const FEATURED_CREDENTIALS: FeaturedCredential[] = [
  {
    rank: "01",
    title: "IBM Data Analyst Specialization",
    issuer: "IBM (Coursera)",
    issueDate: "August 28, 2024",
    credentialId: "DDWFE1NB25DZ",
    verifyUrl: "https://www.coursera.org/account/accomplishments/specialization/DDWFE1NB25DZ",
    image: "/certificates/ibm-data-analyst-cert.jpg?v=hd3",
    skills: [
      "Python",
      "SQL",
      "Microsoft Excel",
      "Data Analysis",
      "Data Visualization",
      "Dashboard Creation",
      "Data Storytelling",
      "IBM Cognos Analytics",
      "Data Wrangling",
      "Exploratory Data Analysis",
    ],
    desc: "Completed the IBM Data Analyst Professional Certificate covering Excel, SQL, Python, Data Visualization, Dashboards, Data Analysis, Relational Databases, Jupyter Notebooks, and IBM Cognos Analytics through hands-on projects and real-world datasets.",
  },
  {
    rank: "02",
    title: "Yuva AI for All",
    issuer: "NIELIT (Govt. of India)",
    issueDate: "March 2026",
    credentialId: "2026030427766558-105732",
    verifyUrl: "https://www.nielit.gov.in/",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari",
    image: "/certificates/nielit-ai-cert.jpg?v=hd3",
    skills: ["Prompt Engineering", "Accurate Prompting", "Generative AI", "Responsible AI"],
    desc: "Completed a Government of India Skill India initiative course covering Generative AI fundamentals, prompt engineering, responsible AI practices, and practical AI applications.",
  },
  {
    rank: "03",
    title: "Introduction to Machine Learning (Tamil)",
    issuer: "NPTEL / IIT Madras",
    issueDate: "March 2026",
    credentialId: "NPTEL26CS73S470101904",
    verifyUrl: "https://nptel.ac.in/noc/E_Certificate/NOC26CS73S47010190403177914",
    image: "/certificates/nptel-ml-cert.jpg?v=hd3",
    score: "53%",
    credits: 3,
    skills: [
      "Machine Learning",
      "Artificial Intelligence",
      "Classification",
      "Regression",
      "Model Evaluation",
      "Data Analysis",
    ],
    desc: "Completed NPTEL IIT Madras certification in Introduction to Machine Learning (Tamil), covering machine learning fundamentals, classification, regression, model evaluation, and practical AI concepts.",
  },
  {
    rank: "04",
    title: "Web Development and Software Engineering",
    issuer: "HodoLabs Technologies",
    issueDate: "June 2026",
    credentialId: "HL/TRN/SJCT/2026/822",
    verifyUrl: "https://www.linkedin.com/in/sahaya-savari",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari",
    image: "/certificates/hodolabs-training-cert.png?v=hd3",
    skills: [
      "Web Development",
      "Software Engineering",
      "React.js",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Git & GitHub",
      "Responsive UI",
    ],
    desc: "Completed software engineering and web development training covering modern web architecture, responsive frontend design, REST API integration, and Git version control workflows.",
  },
];

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  type: string;
  highlights: string[];
  skills: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "HodoLabs",
    location: "Madurai, Tamil Nadu, India",
    role: "Digital Marketing Intern",
    period: "June 2026 – Present",
    type: "Internship",
    highlights: [
      "Conduct in-depth technical SEO audits, site architecture reviews, and PageSpeed optimizations across client web properties.",
      "Analyze organic search visibility, metadata, crawlability, and conversion funnels to drive digital marketing growth.",
      "Manage Google Business Profiles and structured analytics reporting to measure and enhance digital campaign performance.",
    ],
    skills: [
      "Digital Marketing",
      "Technical SEO",
      "PageSpeed Optimization",
      "Web Analytics",
      "Google Business Profile",
      "PostgreSQL",
      "Node.js",
      "React.js",
    ],
  },
  {
    company: "HodoLabs",
    location: "Madurai, Tamil Nadu, India",
    role: "Web Development & Software Engineering Trainee",
    period: "May 2026 – June 2026",
    type: "Training",
    highlights: [
      "Completed intensive 1-month software engineering and web development training covering modern web architecture.",
      "Practiced responsive frontend design with React.js, backend fundamentals with Node.js and PostgreSQL, and REST APIs.",
      "Applied disciplined Git & GitHub version control workflows, leading to selection for the 6-month digital marketing internship.",
    ],
    skills: [
      "Web Development",
      "Software Engineering",
      "React.js",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Git & GitHub",
    ],
  },
];

export interface HonorMedia {
  url: string;
  caption: string;
  type?: "photo" | "certificate" | "poster" | "trophy";
}

export interface HonorAward {
  title: string;
  event: string;
  organizer: string;
  date: string;
  badge: string;
  category?: string;
  badgeVariant?: "gold" | "silver" | "cyan" | "purple";
  desc: string;
  summary?: string;
  linkedinUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  image?: string;
  coverImage?: string;
  images?: HonorMedia[];
  tags?: string[];
  projectTitle?: string;
  projectDescription?: string;
  teamName?: string;
  teamMembers?: string[];
  role?: string;
  highlights?: string[];
}

export const HONORS_AND_AWARDS: HonorAward[] = [
  {
    title: "Overall Champion - AIxcelerate 2026 Hackathon",
    event: "AIxcelerate 2026 (Multidisciplinary AI Innovation Hackathon)",
    organizer: "Dhanalakshmi Srinivasan University, Tiruchirappalli (with DefineInfoTech)",
    date: "September 2026",
    badge: "Overall Champion",
    category: "Competition",
    badgeVariant: "gold",
    desc: "As developer, team leader and sole presenter of Team NelSync AI across both rounds, led the build and pitch of NelSync AI - an AI intelligence platform optimizing Tamil Nadu's paddy procurement ecosystem (predict → optimize → schedule → monitor). The team won the Overall Champion title at AIxcelerate 2026, a multidisciplinary AI hackathon by DefineInfoTech with 66 competing teams, securing a ₹8,000 cash prize, champion trophy, and merit certificates.",
    summary:
      "As developer, team leader and sole presenter of Team NelSync AI across both rounds, led the build and pitch of NelSync AI - an AI intelligence platform optimizing Tamil Nadu's paddy procurement ecosystem (predict → optimize → schedule → monitor). The team won the Overall Champion title at AIxcelerate 2026, a multidisciplinary AI hackathon by DefineInfoTech with 66 competing teams, securing a ₹8,000 cash prize, champion trophy, and merit certificates.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari",
    caseStudyUrl: "/projects/nelsync-ai",
    image: "/achievements/aixcelerate-presentation.jpg?v=hd3",
    coverImage: "/achievements/aixcelerate-presentation.jpg?v=hd3",
    teamName: "NelSync AI (Team DIT-029)",
    teamMembers: [
      "Sahaya Savari F (Team Lead & Presenter)",
      "Jeeva L",
      "Nandakumaaran N I",
      "Chris Matthew",
    ],
    role: "Team Lead, AI System Architect & Sole Presenter",
    projectTitle: "NelSync AI - Smart Paddy Procurement Optimization",
    projectDescription:
      "An intelligent, end-to-end agricultural logistics optimization system built for Direct Purchase Centres (DPCs). Features moisture loss risk modeling, predictive truck dispatch scheduling, and real-time farmer queue management to eliminate procurement bottlenecks.",
    highlights: [
      "Awarded 1st Place & Overall Champion out of 66 competing engineering teams",
      "Won ₹8,000 Cash Prize, Golden Trophy, and Certificates of Achievement",
      "Architected NelSync AI with predictive moisture loss & queue optimization models",
      "Sole presenter across all rounds before DefineInfoTech and university leadership",
    ],
    tags: ["Artificial Intelligence", "Agricultural Logistics", "Optimization", "Team Lead"],
    images: [
      {
        url: "/achievements/aixcelerate-presentation.jpg?v=hd3",
        caption:
          "Sahaya Savari F pitching NelSync AI live at the microphone to jury and university dignitaries",
        type: "photo",
      },
      {
        url: "/achievements/aixcelerate-stage.jpg?v=hd3",
        caption:
          "Stage presentation ceremony receiving the Overall Champion Trophy, Cheque & Certificates from Dhanalakshmi Srinivasan University leadership",
        type: "photo",
      },
      {
        url: "/achievements/aixcelerate-cert.jpg?v=hd3",
        caption:
          "Official Certificate of Achievement awarded to Sahaya Savari F as Overall Champion of AIxcelerate 2026",
        type: "certificate",
      },
      {
        url: "/achievements/aixcelerate-poster.jpg?v=hd3",
        caption:
          "Official Winners Announcement poster featuring DIT-029 NelSync AI (St. Joseph's College) as Overall Champion",
        type: "poster",
      },
    ],
  },
  {
    title: "Overall Runners & Dual Winner - BOOTFEST-2K26",
    event: "BOOTFEST-2K26 (National Intercollegiate Technical Symposium)",
    organizer: "PG Dept. of Computer Science (SF-II), Bishop Heber College (Autonomous)",
    date: "March 12, 2026",
    badge: "Overall Runners",
    category: "National Symposium",
    badgeVariant: "gold",
    desc: "Led St. Joseph's College contingent to the Overall Runners Trophy. Clinched 1st Prize in Technical Quiz and 2nd Prize in Capture The Flag (CTF) cybersecurity challenge.",
    summary:
      "Led St. Joseph's College contingent to the Overall Runners Trophy. Clinched 1st Prize in Technical Quiz and 2nd Prize in Capture The Flag (CTF) cybersecurity challenge.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari",
    image: "/achievements/bootfest-trophy.jpg?v=hd3",
    coverImage: "/achievements/bootfest-trophy.jpg?v=hd3",
    teamName: "St. Joseph's College Contingent",
    teamMembers: ["Sahaya Savari F", "St. Joseph's College Delegation"],
    role: "Technical Quiz Lead & CTF Specialist",
    highlights: [
      "Secured the Prestigious Golden Overall Runners Trophy for St. Joseph's College",
      "Winner (1st Prize) - Technical Quiz Competition",
      "Runner (2nd Prize) - Capture The Flag (CTF) Cybersecurity Event",
      "Contributed maximum podium points leading the college contingent",
    ],
    tags: ["Technical Quiz", "Capture The Flag (CTF)", "Cybersecurity", "Algorithms"],
    images: [
      {
        url: "/achievements/bootfest-trophy.jpg?v=hd3",
        caption: "BOOTFEST-2K26 Overall Runners Gold Trophy won by St. Joseph's College",
        type: "trophy",
      },
      {
        url: "/achievements/bootfest-team.jpg?v=hd3",
        caption:
          "Contingent on stage celebrating the Overall Runners Trophy with Bishop Heber College dignitaries and faculty",
        type: "photo",
      },
      {
        url: "/achievements/bootfest-stage.jpg?v=hd3",
        caption: "Stage certificate and medal presentation ceremony by symposium coordinators",
        type: "photo",
      },
      {
        url: "/achievements/bootfest-quiz-cert.jpg?v=hd3",
        caption:
          "Official Winner Certificate (1st Place) in Technical Quiz awarded to Sahaya Savari F",
        type: "certificate",
      },
      {
        url: "/achievements/bootfest-ctf-cert.jpg?v=hd3",
        caption:
          "Official Runner Certificate (2nd Place) in Capture The Flag (CTF) awarded to Sahaya Savari F",
        type: "certificate",
      },
    ],
  },
  {
    title: "Rank V Finalist - VibeCraft Season '26",
    event: "SRM Yuva '26 / VibeCraft Season '26 National Hackathon",
    organizer: "SRM Institute of Science and Technology, Tiruchirappalli",
    date: "March 2026",
    badge: "Rank V Finalist",
    category: "24H Hackathon",
    badgeVariant: "cyan",
    desc: "Top 5 Finalist out of 110 teams (440 participants) with Team NeuraGenZers, developing two combined campus productivity applications for attendance projection and smart room location.",
    summary:
      "Competed in a rigorous 24-hour national hackathon against top engineering colleges, securing 5th Place (Rank V) with high jury acclaim for UI/UX and AI architecture.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari",
    image: "/achievements/vibecraft-team.jpg?v=hd3",
    coverImage: "/achievements/vibecraft-team.jpg?v=hd3",
    teamName: "NeuraGenzers",
    teamMembers: ["Sahaya Savari F", "NeuraGenzers Team"],
    role: "Frontend Architect & AI Integrator",
    highlights: [
      "Rank V (5th Place) among 100+ competing engineering and AI teams nationally",
      "24-Hour non-stop rapid software development and AI engineering marathon",
      "Certificate of Achievement awarded for technical design and interface craftsmanship",
    ],
    tags: ["24H Hackathon", "SRM Yuva '26", "Generative UI", "Rapid Prototyping"],
    images: [
      {
        url: "/achievements/vibecraft-team.jpg?v=hd3",
        caption:
          "Team NeuraGenzers at the SRM Yuva '26 / VibeCraft Season '26 National Hackathon arena",
        type: "photo",
      },
      {
        url: "/achievements/vibecraft-cert.jpg?v=hd3",
        caption:
          "Certificate of Achievement awarded to Sahaya Savari F for securing 5th Place (Rank V)",
        type: "certificate",
      },
      {
        url: "/achievements/vibecraft-poster.jpg?v=hd3",
        caption: "Official Winners Podium Announcement featuring Team NeuraGenzers in Rank V",
        type: "poster",
      },
    ],
  },
  {
    title: "Academic & Contest Merit Award - Achievers' Day 2026",
    event: "Annual Achievers' Day 2026 Interdepartmental Contest",
    organizer: "St. Joseph's College (Autonomous), Tiruchirappalli",
    date: "March 2026",
    badge: "Merit Award",
    category: "Academic Merit",
    badgeVariant: "purple",
    desc: "Awarded Certificate of Merit for technical design and software presentation among competing postgraduate STEM departments.",
    summary:
      "Honored on Achievers' Day at St. Joseph's College for outstanding performance and victory in collegiate interdepartmental technical competitions.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari",
    image: "/achievements/achievers-day-portrait.jpg?v=hd3",
    coverImage: "/achievements/achievers-day-portrait.jpg?v=hd3",
    teamName: "St. Joseph's College",
    teamMembers: ["Sahaya Savari F"],
    role: "Representative & Awardee",
    highlights: [
      "Certificate of Merit presented by college management and academic deans",
      "Recognized for consecutive technical contest victories and student leadership",
      "Awarded for distinction in interdepartmental technical competitions",
    ],
    tags: ["St. Joseph's College", "Achievers' Day", "Certificate of Merit", "Academic Excellence"],
    images: [
      {
        url: "/achievements/achievers-day-portrait.jpg?v=hd3",
        caption:
          "Sahaya Savari F holding the Certificate of Merit at St. Joseph's College during Achievers' Day",
        type: "photo",
      },
      {
        url: "/achievements/achievers-day-cert.jpg?v=hd3",
        caption: "Official Certificate of Merit awarded for Interdepartmental Contest Winners",
        type: "certificate",
      },
    ],
  },
  {
    title: "Event In-Charge (Treasure Titans) - AION 2K26",
    event: "AION 2K26 (State-Level Technical Symposium)",
    organizer: "Department of Artificial Intelligence, St. Joseph's College (Autonomous)",
    date: "February 13, 2026",
    badge: "Event In-Charge",
    category: "Symposium Leadership",
    badgeVariant: "cyan",
    desc: "Served as Event In-Charge for 'Treasure Titans' at AION 2K26, a State-Level Technical Symposium conducted by the Department of Artificial Intelligence, St. Joseph's College.",
    summary:
      "Served as Event In-Charge for 'Treasure Titans' at AION 2K26 State-Level Technical Symposium. Led event organization, technical puzzle design, and coordination across competing college teams.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari",
    image: "/achievements/aion-event-incharge-cert.jpg?v=hd3",
    coverImage: "/achievements/aion-event-incharge-cert.jpg?v=hd3",
    role: "Event In-Charge & Technical Coordinator",
    teamName: "St. Joseph's College (I - M.Sc. AI)",
    highlights: [
      "Awarded official Certificate of Appreciation by Principal and AI Department leadership",
      "Organized and directed the 'Treasure Titans' technical problem-solving event",
      "Designed algorithmic challenges and coordinated state-level participants",
    ],
    tags: ["Event Leadership", "AION 2K26", "Dept of AI", "St. Joseph's College"],
    images: [
      {
        url: "/achievements/aion-event-incharge-cert.jpg?v=hd3",
        caption:
          "Official Certificate of Appreciation awarded to Sahaya Savari F for serving as Event In-Charge (Treasure Titans) at AION 2K26",
        type: "certificate",
      },
    ],
  },
];

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  focus: string;
}

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    degree: "Master of Science, AI",
    institution: "St. Joseph's College (Autonomous), Tiruchirappalli",
    period: "July 2025 – May 2027",
    grade: "Pursuing",
    focus:
      "Artificial Intelligence, Machine Learning Architectures, Python Applications & Natural Language Processing.",
  },
  {
    degree: "Bachelor of Science, Data science",
    institution: "Thiagarajar College, Madurai",
    period: "August 2022 – May 2025",
    grade: "65.06%",
    focus:
      "Data Science, Statistics, Probability, Linear Algebra, Machine Learning Fundamentals & SQL Database Systems.",
  },
  {
    degree: "HSC, BIO-MATHS (Maths Physics Chemistry Biology)",
    institution: "St. Mary's Higher Secondary School, Madurai",
    period: "June 2020 – July 2022",
    grade: "Completed",
    focus: "Mathematics, Physics, Chemistry & Biology foundational STEM curriculum.",
  },
];

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export const STATS: StatItem[] = [
  {
    value: "1st",
    label: "AI Hackathon Champion",
    description: "NelSync AI · AIxcelerate 2026 Grand Champion",
  },
  {
    value: "5",
    label: "Honors & Awards",
    description: "AIxcelerate, VibeCraft, BOOTFEST, Achievers Day & AION",
  },
  {
    value: "2",
    label: "Hackathons",
    description: "AIxcelerate '26 (1st of 66) & VibeCraft '26 (Top 5 of 110)",
  },
  {
    value: "4",
    label: "Verified Credentials",
    description: "IBM, NIELIT, NPTEL IIT Madras & HodoLabs",
  },
];

export interface CertificationCategory {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  items: {
    name: string;
    tag?: string;
  }[];
}

export const CERTIFICATIONS: CertificationCategory[] = [
  {
    icon: "database",
    title: "Data Analytics",
    subtitle: "IBM Specialization",
    desc: "Exploratory data analysis, SQL querying, Python analytics pipelines, and dynamic dashboard creation.",
    items: [
      { name: "IBM Data Analyst Professional Certificate", tag: "Professional Cert" },
      { name: "Python for Data Science, AI & Development", tag: "Core Python" },
      { name: "Relational Databases, SQL & PostgreSQL", tag: "Databases" },
    ],
  },
];

export const HACKATHON_ACHIEVEMENTS = HONORS_AND_AWARDS;
export type HackathonAchievement = HonorAward;
export type HackathonMedia = HonorMedia;
