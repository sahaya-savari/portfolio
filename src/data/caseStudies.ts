export interface RelatedArticle {
  title: string;
  url: string;
}

export interface CaseStudy {
  id: string;
  title: string;
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
  relatedArticle?: RelatedArticle;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'prepmind-ai': {
    id: 'prepmind-ai',
    title: 'PrepMind AI',
    tagline: 'AI-Powered Interview Preparation Platform',
    overview: 'PrepMind AI is a comprehensive interview preparation platform that leverages LLMs to simulate realistic technical and behavioral interviews. It provides tailored feedback, tracks progress, and helps candidates build confidence.',
    problem: 'Candidates often lack realistic environments to practice technical interviews, and mock interviews with peers or professionals can be expensive and difficult to schedule.',
    goals: [
      'Create a low-latency AI interviewer.',
      'Support dynamic questioning based on candidate responses.',
      'Provide actionable, structured feedback using rubrics.'
    ],
    solution: 'Built a React frontend interfacing with a FastAPI backend that orchestrates calls to the Gemini API. Integrated Firebase for secure authentication and progress tracking.',
    architecture: 'The frontend handles real-time transcription via WebRTC. The backend maintains conversation state, injects interview context into the LLM prompt, and streams responses back to the client via WebSockets.',
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Gemini API', 'Firebase'],
    challenges: [
      'Managing LLM hallucination and keeping the AI "in character" as an interviewer.',
      'Minimizing latency in speech-to-text and text-to-speech pipelines.'
    ],
    lessons: [
      'Learned advanced prompt engineering techniques to constrain LLM outputs.',
      'Mastered WebSocket integrations for real-time streaming in React.'
    ],
    relatedArticle: {
      title: 'Building AI Agents from Scratch in Python',
      url: 'https://blog.sahayasavari.me/blog/ai-agents-from-scratch'
    }
  },
  'daily-spark': {
    id: 'daily-spark',
    title: 'Daily Spark',
    tagline: 'Minimalist Offline Habit Tracker',
    overview: 'A privacy-first, local-storage based habit tracking application designed to help users build consistent routines without the clutter of traditional productivity tools.',
    problem: 'Existing habit trackers are often bloated with social features, notifications, and require constant internet connectivity.',
    goals: [
      'Design a beautiful, distraction-free UI.',
      'Ensure 100% offline functionality.',
      'Provide insightful data visualization for habit streaks.'
    ],
    solution: 'Developed an offline-first habit tracking Progressive Web App (PWA) using React, Vite, and Tailwind CSS with Capacitor support for native Android builds. Implemented client-side state management for offline data persistence using IndexedDB and Context API.',
    architecture: 'A client-heavy, offline-first architecture where all habit logs and streak logic run locally on the device. Capacitor provides native Android bridge integration.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'IndexedDB', 'Capacitor Android'],
    challenges: [
      'Handling date-time logic across different timezones without a backend.',
      'Creating smooth micro-animations that don\'t degrade performance on mobile devices.'
    ],
    lessons: [
      'Deepened understanding of client-side storage limitations and optimization.',
      'Improved accessible design practices, ensuring full keyboard navigability.'
    ],
    githubUrl: 'https://github.com/sahaya-savari/daily-spark',
    demoUrl: 'https://daily-spark-app-da74b.web.app',
    relatedArticle: {
      title: 'Pydantic V2: High-Performance Data Validation',
      url: 'https://blog.sahayasavari.me/blog/pydantic-v2-guide'
    }
  },
  'portfolio-website': {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    tagline: 'High-Performance SPA Portfolio',
    overview: 'A masterclass in modern frontend development, this portfolio leverages Framer Motion for liquid-smooth animations and hardware-accelerated transitions. It features a custom glassmorphism design system, responsive grids, and an isolated state architecture for maximum performance.',
    problem: 'Standard portfolios fail to communicate the technical depth and design sensibility of a modern AI Engineer and Full Stack Developer.',
    goals: [
      'Achieve sub-second load times despite heavy animations.',
      'Implement an accessible, keyboard-navigable SPA architecture.',
      'Showcase modern React features and Vite optimizations.'
    ],
    solution: 'Built a Single Page Application using React and Vite, optimizing chunk size and asset loading. Replaced traditional routing with lazy-loaded section components for immediate perceived performance.',
    architecture: 'Framer Motion orchestrates page-level transitions and micro-interactions. A custom pixel-canvas engine powers the background effects. HLS is used for optimized video streaming.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Firebase Hosting'],
    challenges: [
      'Achieving 60fps glassmorphism and spring animations without causing layout thrashing on mobile devices.',
      'Configuring Vite and Firebase for perfect SEO and canonical routing in a pure SPA.'
    ],
    lessons: [
      'Using absolute DOM offset measurements resolves critical layout bugs in complex Framer Motion tracks.',
      'Manual Vite chunk splitting and IntersectionObserver-based lazy loading are essential for modern media-heavy web apps.'
    ],
    githubUrl: 'https://github.com/sahaya-savari/portfolio',
    demoUrl: 'https://sahayasavari.me',
    relatedArticle: {
      title: 'Tailwind CSS v4 Migration & Performance',
      url: 'https://blog.sahayasavari.me/blog/tailwind-css-v4-guide'
    }
  }
};
