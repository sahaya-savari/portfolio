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
    githubUrl: 'https://github.com/sahaya-savari'
  },
  'daily-spark': {
    id: 'daily-spark',
    title: 'Daily Spark',
    tagline: 'Minimalist Habit Tracker',
    overview: 'A privacy-first, local-storage based habit tracking application designed to help users build consistent routines without the clutter of traditional productivity tools.',
    problem: 'Existing habit trackers are often bloated with social features, notifications, and require constant internet connectivity.',
    goals: [
      'Design a beautiful, distraction-free UI.',
      'Ensure 100% offline functionality.',
      'Provide insightful data visualization for habit streaks.'
    ],
    solution: 'Developed a Progressive Web App (PWA) using React and Tailwind CSS. Implemented complex state management for offline data persistence using IndexedDB and Context API.',
    architecture: 'A client-heavy architecture where all logic runs locally. Data structures are optimized for quick daily retrieval and streak calculation.',
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion', 'IndexedDB'],
    challenges: [
      'Handling date-time logic across different timezones without a backend.',
      'Creating smooth micro-animations that don\'t degrade performance on mobile devices.'
    ],
    lessons: [
      'Deepened understanding of client-side storage limitations and optimization.',
      'Improved accessible design practices, ensuring full keyboard navigability.'
    ],
    githubUrl: 'https://github.com/sahaya-savari'
  },
  'neobeat': {
    id: 'neobeat',
    title: 'NeoBeat',
    tagline: 'Immersive Music Discovery',
    overview: 'NeoBeat is an experimental web application for discovering independent artists, featuring a brutalist UI and synchronized audio visualizations.',
    problem: 'Independent artists struggle to stand out on traditional streaming platforms with generic user interfaces.',
    goals: [
      'Build a highly unique, brutalist design language.',
      'Implement real-time audio visualization using Web Audio API.',
      'Create a seamless, SPA-like navigation experience.'
    ],
    solution: 'Leveraged React with raw CSS variables for a dynamic theming system. Used the Web Audio API to analyze frequency data and drive canvas animations in real-time.',
    architecture: 'The app streams audio via a custom lightweight player. A centralized AudioContext is shared across components to synchronize visualizations and UI state.',
    techStack: ['React', 'TypeScript', 'Web Audio API', 'Canvas API', 'Framer Motion'],
    challenges: [
      'Managing AudioContext lifecycle and browser autoplay policies.',
      'Optimizing canvas rendering to maintain 60fps during complex visualizations.'
    ],
    lessons: [
      'Mastered the Web Audio API for frequency analysis and audio routing.',
      'Learned to balance heavy visual effects with performance accessibility.'
    ]
  }
};
