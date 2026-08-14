// Pure data module — no React or component dependencies.
// Icon identifiers are resolved at render time in CertificationsSection.

export const BLOG_URL = 'https://blog.sahayasavari.me';

export interface Article {
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  image: string;
  url: string;
  category: string;
}

export const ARTICLES: Article[] = [
  {
    title: "Building AI Agents from Scratch in Python",
    excerpt: "An engineering guide to designing autonomous LLM agent loops, tool call schemas, and memory management using Python.",
    date: "February 10, 2026",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/ai-agents-from-scratch`,
    category: "AI/ML",
  },
  {
    title: "Pydantic V2: High-Performance Data Validation",
    excerpt: "Leveraging Pydantic V2 Rust core for strict schema enforcement, fast JSON serialization, and LLM output parsing.",
    date: "January 28, 2026",
    readingTime: 4,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/pydantic-v2-guide`,
    category: "Python",
  },
  {
    title: "Tailwind CSS v4 Migration & Performance",
    excerpt: "Upgrading to Tailwind CSS v4 in React 19 and Vite 7 for zero-config CSS builds and hardware-accelerated themes.",
    date: "January 15, 2026",
    readingTime: 3,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/tailwind-css-v4-guide`,
    category: "React",
  },
  {
    title: "Production CI/CD Pipelines with GitHub Actions",
    excerpt: "Automating static HTML pre-rendering, automated test runs, and Firebase Hosting preview channel deployments.",
    date: "December 20, 2025",
    readingTime: 4,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/github-actions-ci-cd`,
    category: "DevOps",
  }
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
    id: "daily-spark",
    title: "Daily Spark", 
    tag: "Productivity App", 
    desc: "An offline-first habit and daily streak application built with React, TypeScript, Vite, Tailwind CSS, and IndexedDB, with Capacitor support for Android.", 
    stack: "React · TypeScript · Capacitor", 
    link: "https://daily-spark-app-da74b.web.app",
    status: "Live",
    github: "https://github.com/sahaya-savari/daily-spark",
    longDesc: "Daily Spark is a minimalist productivity app designed to help users build consistent daily routines offline without distraction. Habit logs and streak metrics persist locally on the device via IndexedDB.",
    metrics: [
      { label: "Core Tech", value: "React, IndexedDB" },
      { label: "Mobile", value: "Capacitor Android" },
      { label: "Architecture", value: "Offline-First PWA" }
    ],
    features: ["Offline Habit Tracking", "IndexedDB Persistence", "Capacitor Android Build", "Streak Analytics"],
    problem: "Traditional productivity tools require constant internet connectivity and clutter the UI with unwanted social feeds.",
    architecture: "Client-heavy Progressive Web App (PWA) with Capacitor support for Android. Data structures persist locally in IndexedDB and sync through React Context API.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "IndexedDB", "Capacitor"],
    challenges: "Handling date-time streak calculation across different timezones entirely offline without a server.",
    results: "Shipped a working web app and Android build with IndexedDB persistence for offline habit tracking.",
    lessonsLearned: "Client-side storage management and IndexedDB performance optimization for mobile viewports.",
    futureImprovements: "Add local notification reminders and cross-device sync options.",
    theme: {
      bg: "linear-gradient(180deg, rgba(88,28,135,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(168,85,247,0.3)",
      glow: "rgba(168,85,247,0.15)",
      tagBg: "rgba(168,85,247,0.2)",
      tagText: "#d8b4fe",
      iconBg: "rgba(168,85,247,0.15)",
      iconColor: "#d8b4fe",
    }
  },
  { 
    id: "prepmind-ai",
    title: "PrepMind AI", 
    tag: "AI Education", 
    desc: "An Artificial Intelligence study companion concept that uses Python LLM pipelines, React, and prompt engineering to generate practice questions, summaries, and personalized learning paths.", 
    stack: "Python · LLMs · React", 
    link: "",
    status: "In Development",
    github: "",
    longDesc: "PrepMind AI transforms static study materials into highly interactive, adaptive learning experiences. Users can upload lecture notes or textbooks, and the underlying LLM dynamically generates flashcards, mock exams, and concept summaries that adapt to the user's demonstrated knowledge gaps.",
    metrics: [
      { label: "Core Tech", value: "LLMs, React" },
      { label: "Focus", value: "EdTech AI" },
      { label: "Status", value: "In Development" }
    ],
    features: ["Dynamic Quiz Generation", "Context-Aware Summarization", "Adaptive Difficulty Scaling", "Upload-to-Learn Pipeline"],
    problem: "Static study materials do not adapt to individual student knowledge gaps.",
    architecture: "Python-based LLM integration pipeline. React frontend handles dynamic component rendering of mock exams and flashcards.",
    techStack: ["Python", "OpenAI API", "React", "Tailwind CSS"],
    challenges: "Ensuring the LLM does not hallucinate facts during quiz generation by implementing strict system prompts and context injection.",
    results: "Designed an LLM pipeline structure that converts uploaded text into structured flashcards and mock exams using context-injected prompts.",
    lessonsLearned: "Prompt engineering requires rigorous testing; structuring LLM output into strict JSON formats is essential for reliable frontend rendering.",
    futureImprovements: "Support local document embedding with Vector Stores, optimize OpenAI context windows, and enable speech-to-text notes transcription.",
    theme: {
      bg: "linear-gradient(180deg, rgba(6,78,59,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(16,185,129,0.3)",
      glow: "rgba(16,185,129,0.15)",
      tagBg: "rgba(16,185,129,0.2)",
      tagText: "#6ee7b7",
      iconBg: "rgba(16,185,129,0.15)",
      iconColor: "#6ee7b7",
    }
  },
  { 
    id: "portfolio-website",
    title: "Portfolio Website", 
    tag: "Web Development", 
    desc: "A modern AI Engineer portfolio website built with React, TypeScript, Vite, and Framer Motion featuring glassmorphism design, HLS video streaming, and lazy-loaded sections.", 
    stack: "React · TypeScript · Vite", 
    link: "https://sahayasavari.me",
    status: "Live",
    github: "https://github.com/sahaya-savari/portfolio",
    longDesc: "A masterclass in modern frontend development, this portfolio leverages Framer Motion for liquid-smooth animations and hardware-accelerated transitions. It features a custom glassmorphism design system, responsive grids, and an isolated state architecture for maximum performance.",
    metrics: [
      { label: "Core Tech", value: "React, Framer Motion" },
      { label: "Performance", value: "Sub-second Load" },
      { label: "Design", value: "Glassmorphism" }
    ],
    features: ["Custom UI Engine", "Hardware Accelerated Motion", "Responsive Layout Architecture", "HLS Video Streaming"],
    problem: "Standard portfolios fail to communicate the technical depth and design sensibility of a modern AI Engineer, Python Developer, and Full Stack Developer.",
    architecture: "Single Page Application built with React, Vite, and Tailwind CSS. Framer Motion drives all transitions. No traditional router — all sections are in-page with lazy intersection loading to preserve 'liquid' scroll state.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    challenges: "Achieving 60fps glassmorphism and spring animations without causing layout thrashing on mobile devices.",
    results: "Built with lazy section rendering, manual Vite chunk splitting, and IntersectionObserver-based loading. Implements accessible tab patterns following WCAG 1.3.1 guidelines. Deployed on Firebase Hosting.",
    lessonsLearned: "Using absolute DOM offset measurements instead of relying on offsetParent trees resolves critical layout bugs in complex tracks.",
    futureImprovements: "Add full offline-first capabilities using Service Workers, introduce a theme preference toggler (dark/light), and automate build performance testing in CI.",
    theme: {
      bg: "linear-gradient(180deg, rgba(30,58,138,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(59,130,246,0.3)",
      glow: "rgba(59,130,246,0.15)",
      tagBg: "rgba(59,130,246,0.2)",
      tagText: "#93c5fd",
      iconBg: "rgba(59,130,246,0.15)",
      iconColor: "#93c5fd",
    }
  }
];

export interface FeaturedCredential {
  prefix: string;
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
}

export const FEATURED_CREDENTIALS: FeaturedCredential[] = [
  {
    prefix: "🥇",
    title: "IBM Data Analyst Specialization",
    issuer: "IBM (Coursera)",
    issueDate: "August 28, 2024",
    credentialId: "DDWFE1NB25DZ",
    verifyUrl: "https://www.coursera.org/account/accomplishments/specialization/DDWFE1NB25DZ",
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
      "Exploratory Data Analysis"
    ],
    desc: "Completed the IBM Data Analyst Professional Certificate covering Excel, SQL, Python, Data Visualization, Dashboards, Data Analysis, Relational Databases, Jupyter Notebooks, and IBM Cognos Analytics through hands-on projects and real-world datasets."
  },
  {
    prefix: "🥈",
    title: "Introduction to Machine Learning (Tamil)",
    issuer: "NPTEL / IIT Madras",
    issueDate: "March 2026",
    credentialId: "NPTEL26CS73S470101904",
    verifyUrl: "https://nptel.ac.in/noc/E_Certificate/NOC26CS73S47010190403177914",
    score: "53%",
    credits: 3,
    skills: [
      "Machine Learning",
      "Artificial Intelligence",
      "Classification",
      "Regression",
      "Model Evaluation",
      "Data Analysis"
    ],
    desc: "Completed NPTEL IIT Madras certification in Introduction to Machine Learning (Tamil), covering machine learning fundamentals, classification, regression, model evaluation, and practical AI concepts."
  },
  {
    prefix: "🥉",
    title: "Yuva AI for All",
    issuer: "National Institute of Electronics and Information Technology (NIELIT)",
    issueDate: "March 2026",
    credentialId: "2026030427766558-105732",
    verifyUrl: "",
    skills: [
      "Prompt Engineering",
      "Accurate Prompting",
      "Generative AI",
      "Responsible AI"
    ],
    desc: "Completed a Government of India Skill India initiative course covering Generative AI fundamentals, prompt engineering, responsible AI practices, and practical AI applications."
  }
];

export const STATS = [
  ['M.Sc', 'Artificial Intelligence'],
  ['3', 'Major Projects'],
  ['4', 'Certifications Earned'],
  ['9', 'IBM Courses Completed']
];

export const CERTIFICATIONS = [
  { 
    icon: 'database', 
    title: 'Data Analytics', 
    items: [{ name: "IBM Data Analyst Course" }] 
  },
  { 
    icon: 'code', 
    title: 'Information Technology', 
    items: [{ name: "Honours Diploma in Information Technology" }] 
  },
  { 
    icon: 'brain', 
    title: 'Business Intelligence', 
    items: [{ name: "Mastering Excel Data Analysis & Dashboard Reporting" }] 
  }
];


