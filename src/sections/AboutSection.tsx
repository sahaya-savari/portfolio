import { memo } from 'react';

import HlsVideo from '../components/HlsVideo';
import SectionBadge from '../components/ui/SectionBadge';
import Button from '../components/ui/Button';

interface AboutSectionProps {
  setShowResume: (show: boolean) => void;
}

const AboutSection = memo(({ setShowResume }: AboutSectionProps) => {
  return (
    <section aria-label="About me" className="relative py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HlsVideo 
          src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" 
          className="w-full h-full object-cover opacity-30"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
        <div>
          <SectionBadge>About Me</SectionBadge>
          <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9] mb-12">Building intelligent <br/> AI-powered solutions.</h2>
          <div className="space-y-8 text-white/60 font-body font-light text-lg leading-relaxed max-w-xl">
            <p>I am an AI Developer pursuing M.Sc in Artificial Intelligence at St. Joseph's College (Autonomous), Trichy, focused on building intelligent systems and machine learning solutions.</p>
            <p>I design and develop AI-powered applications that solve real problems, from smart study tools to daily productivity apps, with a passion for clean code and user-centric design.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 liquid-glass rounded-3xl p-8 overflow-hidden relative border border-white/10 cursor-target">
             <h3 className="font-heading italic text-3xl text-white mb-6">Recruiter Quick Scan</h3>
             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-2">What I Do</h4>
                  <p className="text-sm font-body text-white/80 font-light">Build AI-powered full-stack apps and machine learning pipelines.</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-2">What I Know</h4>
                  <p className="text-sm font-body text-white/80 font-light">Python, React, TypeScript, Prompt Engineering, SQL, Firebase.</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-2">What I'm Learning</h4>
                  <p className="text-sm font-body text-white/80 font-light">Advanced Deep Learning, Vector Databases, System Design.</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-2">What I'm Looking For</h4>
                  <p className="text-sm font-body text-white/80 font-light">Summer/Fall 2026 AI/ML or Software Engineering Internships.</p>
                </div>
             </div>
          </div>

          <div className="md:col-span-2 liquid-glass-strong rounded-3xl p-8 backdrop-blur-2xl cursor-target">
            <h3 className="font-heading italic text-3xl text-white mb-6">Why Work With Me</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-4 text-sm text-white/70 font-body font-light">
                <li><strong className="text-white font-medium">Problem Solving:</strong> I deeply understand requirements before writing code, prioritizing scalable architecture over quick hacks.</li>
                <li><strong className="text-white font-medium">AI & Full-Stack Synergy:</strong> I don't just train models; I integrate them into accessible, production-ready web applications.</li>
              </ul>
              <ul className="space-y-4 text-sm text-white/70 font-body font-light">
                <li><strong className="text-white font-medium">Continuous Learning:</strong> I rapidly adapt to new tech stacks, evidenced by my self-directed transition into AI and Data Analytics.</li>
                <li><strong className="text-white font-medium">Verifiable Output:</strong> Every skill I claim is backed by a deployed project, a certified credential, or an academic result.</li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-2 liquid-glass rounded-3xl p-8 mt-8 overflow-hidden relative border border-white/10 cursor-target">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start">
              
              {/* Left Panel: Currently Seeking Banner */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
                  <h4 className="font-mono text-xs tracking-widest text-green-400 uppercase font-bold">Currently Seeking</h4>
                </div>
                <h5 className="font-heading italic text-3xl text-white leading-tight">
                  AI, ML, & Data Engineering Internships
                </h5>
                <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                  Looking for summer/fall 2026 co-ops or internship roles focused on machine learning pipelines, LLM prompt engineering, and intelligent web applications.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
                  <div>
                    <span className="text-white/60 block text-[9px] uppercase tracking-wider mb-1">Availability</span>
                    <span className="text-white">Summer / Fall 2026</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[9px] uppercase tracking-wider mb-1">Location Flexibility</span>
                    <span className="text-white">Madurai, Remote, Relocation Open</span>
                  </div>
                </div>
              </div>
              
              {/* Right Panel: Recruiter Snapshot Card */}
              <div className="space-y-4 border-t border-white/10 pt-6 mt-6 md:border-t-0 md:pt-0 md:mt-0 md:border-l md:border-white/10 md:pl-8">
                <h4 className="font-mono text-xs tracking-widest text-blue-400 uppercase font-bold">Professional Snapshot</h4>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-white/60 block font-mono text-[9px] uppercase tracking-wider mb-1">Key Strengths</span>
                    <span className="text-white/80 font-body text-sm block font-medium">Python ML Pipelines · Context-Injected Prompts · Full-Stack React/TS</span>
                  </div>
                  <div>
                    <span className="text-white/60 block font-mono text-[9px] uppercase tracking-wider mb-1">Value Contribution</span>
                    <span className="text-white/80 font-body text-sm block font-light leading-relaxed">Building end-to-end intelligent apps (PrepMind AI, Daily Spark) and validating data workflows, achieving up to 99.7% LLM structured-output reliability.</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button variant="primary" icon onClick={() => setShowResume(true)} aria-label="Open Resume PDF viewer">
                    View Resume
                  </Button>
                  <a 
                    href="#contact"
                    className="liquid-glass px-5 py-2.5 rounded-full font-body font-semibold text-xs inline-flex items-center gap-1.5 hover:scale-105 transition-transform border border-white/10 min-h-[38px] text-white"
                    aria-label="Scroll to contact information"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
              
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
