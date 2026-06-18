import React from 'react';
import { Brain, Database, Code } from 'lucide-react';

export const PROJECTS = [
  { 
    title: "Daily Spark", 
    tag: "Productivity App", 
    desc: "A daily motivation and habit-tracking application that helps users build positive routines with AI-powered personalized suggestions.", 
    stack: "Python · AI · Mobile", 
    link: "https://daily-spark-app-da74b.web.app",
    github: "https://github.com/sahaya-savari",
    longDesc: "Daily Spark is a comprehensive productivity ecosystem designed to overcome procrastination through intelligent intervention. By tracking daily habits and analyzing user behavior patterns, the AI engine generates personalized daily routines and motivational nudges tailored to the user's optimal performance windows.",
    metrics: [
      { label: "Core Tech", value: "Python, Firebase" },
      { label: "Focus", value: "Behavioral AI" },
      { label: "Platform", value: "Web App" }
    ],
    features: ["Habit Pattern Recognition", "AI-Generated Routine Suggestions", "Real-time Progress Dashboard", "Push Notifications"],
    problem: "Procrastination and lack of personalized daily routine structures leading to low productivity.",
    architecture: "Python backend with Firebase real-time database. Behavioral AI algorithms analyze user patterns to suggest optimal tasks.",
    techStack: ["Python", "Firebase", "React", "AI/ML", "TypeScript"],
    challenges: "Developing a performant algorithm capable of processing daily user habits in real-time without draining device battery.",
    results: "Successfully built an MVP that demonstrates personalized AI-generated nudges based on user behavior.",
    lessonsLearned: "Optimizing state management is critical when handling continuous real-time data streams from Firebase.",
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
    title: "PrepMind AI", 
    tag: "AI Education", 
    desc: "An intelligent study companion that generates practice questions, summaries, and personalized learning paths using AI.", 
    stack: "Python · LLMs · React", 
    link: "",
    github: "https://github.com/sahaya-savari",
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
    results: "Achieved high accuracy in generated flashcard relevance compared to manual textbook extraction.",
    lessonsLearned: "Prompt engineering requires rigorous testing; structuring LLM output into strict JSON formats is essential for reliable frontend rendering.",
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
    title: "Portfolio Website", 
    tag: "Web Development", 
    desc: "A modern, animated portfolio website built with React, TypeScript, and Tailwind CSS featuring liquid glass design and smooth animations.", 
    stack: "React · TypeScript · Vite", 
    link: "https://sahayasavari.web.app",
    github: "https://github.com/sahaya-savari/portfolio",
    longDesc: "A masterclass in modern frontend development, this portfolio leverages Framer Motion for liquid-smooth animations and hardware-accelerated transitions. It features a custom glassmorphism design system, responsive grids, and an isolated state architecture for maximum performance.",
    metrics: [
      { label: "Core Tech", value: "React, Framer Motion" },
      { label: "Performance", value: "Sub-second Load" },
      { label: "Design", value: "Glassmorphism" }
    ],
    features: ["Custom UI Engine", "Hardware Accelerated Motion", "Responsive Layout Architecture", "HLS Video Streaming"],
    problem: "Standard portfolios fail to communicate the technical depth and design sensibility of a modern AI/Backend Developer.",
    architecture: "Single Page Application built with React, Vite, and Tailwind CSS. Framer Motion used for animations. No traditional router used to preserve 'liquid' state.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    challenges: "Achieving 60fps glassmorphism and spring animations without causing layout thrashing on mobile devices.",
    results: "Perfect performance score with seamless cross-browser layout stability.",
    lessonsLearned: "Using absolute DOM offset measurements instead of relying on offsetParent trees resolves critical layout bugs in complex tracks.",
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

export const STATS = [
  ['M.Sc', 'AI Student'],
  ['3', 'Major Projects'],
  ['3', 'Certifications'],
  ['Daily', 'Learning Focus']
];

export const CERTIFICATIONS = [
  { 
    icon: React.createElement(Database, { className: "w-5 h-5", "aria-hidden": true }), 
    title: 'Data Analytics', 
    items: [{ name: "IBM Data Analyst Course" }] 
  },
  { 
    icon: React.createElement(Code, { className: "w-5 h-5", "aria-hidden": true }), 
    title: 'Information Technology', 
    items: [{ name: "Honor's Diploma in Information Technology" }] 
  },
  { 
    icon: React.createElement(Brain, { className: "w-5 h-5", "aria-hidden": true }), 
    title: 'Business Intelligence', 
    items: [{ name: "Mastering Excel Data Analysis & Dashboard Reporting" }] 
  }
];

export const JOURNEY = [
  {
    year: "Present",
    title: "M.Sc. Artificial Intelligence",
    org: "Academic Studies",
    desc: "Currently pursuing advanced studies focusing on Generative AI, LLMs, and scalable machine learning architectures.",
    icon: "Brain"
  },
  {
    year: "Recent",
    title: "Generative AI Developer",
    org: "Independent Projects",
    desc: "Built full-stack AI applications including PrepMind AI and Daily Spark, integrating Python backends with modern React frontends.",
    icon: "Code"
  },
  {
    year: "Past",
    title: "IT & Data Analytics",
    org: "Certifications",
    desc: "Completed IBM Data Analyst Course, Honor's Diploma in IT, and mastered Excel Data Analysis for robust data foundations.",
    icon: "Database"
  }
];
