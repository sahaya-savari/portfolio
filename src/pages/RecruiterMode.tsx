import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Mail, ExternalLink } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function RecruiterMode() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="Sahaya Savari F | Recruiter Mode" 
        description="A scannable, ATS-friendly summary of Sahaya Savari F's skills, experience, and projects for recruiters and hiring managers." 
      />
      <div className="pt-32 pb-24 px-6 max-w-screen-md mx-auto min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors font-body text-sm no-print">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        
        <header className="mb-12 border-b border-white/10 pb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-heading italic tracking-tight mb-2">Sahaya Savari F</h1>
            <p className="text-xl font-body text-white/70 mb-4">Software Engineer / AI Enthusiast</p>
            <div className="flex flex-wrap gap-4 text-sm font-body text-white/50">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> sahayasavari.f@gmail.com</span>
              <span className="flex items-center gap-1.5"><ExternalLink className="w-4 h-4" /> github.com/sahaya-savari</span>
              <span className="flex items-center gap-1.5"><ExternalLink className="w-4 h-4" /> linkedin.com/in/sahayasavari</span>
            </div>
          </div>
          <button 
            onClick={() => window.print()}
            className="no-print hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4" />
            Save as PDF
          </button>
        </header>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Professional Summary</h2>
          <p className="text-base font-body leading-relaxed text-white/80">
            A passionate Software Engineering student with strong foundations in full-stack development, Python, and scalable web architectures. Proven ability to build performant, accessible, and user-centric applications using modern technologies like React, TypeScript, and FastAPI. Actively seeking internship or entry-level opportunities to contribute to high-impact engineering teams.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-body text-sm text-white/80">
            <div>
              <strong className="block text-white mb-2">Languages</strong>
              <ul className="space-y-1 text-white/60">
                <li>Python</li>
                <li>TypeScript / JavaScript</li>
                <li>SQL</li>
                <li>HTML / CSS</li>
              </ul>
            </div>
            <div>
              <strong className="block text-white mb-2">Frontend</strong>
              <ul className="space-y-1 text-white/60">
                <li>React.js (v18)</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>Vite</li>
              </ul>
            </div>
            <div>
              <strong className="block text-white mb-2">Backend & Tools</strong>
              <ul className="space-y-1 text-white/60">
                <li>FastAPI</li>
                <li>Firebase</li>
                <li>Git / GitHub</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Top Projects</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-heading italic text-white">PrepMind AI</h3>
                <span className="text-xs font-body text-white/50 border border-white/10 px-2 py-1 rounded-full">React, Firebase, Gemini API</span>
              </div>
              <p className="text-sm font-body text-white/70">
                An AI-powered interview preparation platform. Implemented secure user authentication, real-time data syncing, and integrated LLM capabilities to generate tailored practice questions based on user roles and experience levels.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-heading italic text-white">Daily Spark</h3>
                <span className="text-xs font-body text-white/50 border border-white/10 px-2 py-1 rounded-full">React, Tailwind, LocalStorage</span>
              </div>
              <p className="text-sm font-body text-white/70">
                A habit-tracking application focusing on mental wellness. Designed an intuitive, distraction-free UI with complex client-side state management for offline accessibility.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/40 uppercase tracking-widest mb-4">Education</h2>
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-lg font-bold font-body text-white">B.E. Computer Science and Engineering</h3>
              <span className="text-sm font-body text-white/50">2022 – 2026</span>
            </div>
            <p className="text-sm font-body text-white/70">Saveetha Engineering College, Chennai</p>
          </div>
        </section>

      </div>
    </>
  );
}
