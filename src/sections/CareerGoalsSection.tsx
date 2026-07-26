import { memo } from 'react';
import { Target, Rocket, Compass, Sparkles } from 'lucide-react';
import SectionBadge from '../components/ui/SectionBadge';

const CareerGoalsSection = memo(() => {
  return (
    <section aria-label="Career Goals and Vision" className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="liquid-glass-strong rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6">
              <SectionBadge>Vision & Ambition</SectionBadge>
              <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9]">
                Career Goals & <br /> Professional Roadmap.
              </h2>
              <p className="text-white/80 font-body font-light text-lg leading-relaxed">
                My overarching career goal is to become an exceptional AI Engineer and Technical Architect who bridges state-of-the-art Machine Learning research with reliable, real-world software products.
              </p>
              <p className="text-white/60 font-body font-light text-base leading-relaxed">
                As an M.Sc. Artificial Intelligence student, I continuously invest in mastering deep learning architectures, scalable FastAPI backends, vector database indexing, and responsive React frontend systems. I am dedicated to constructing software that solves high-impact domain problems, enhances human productivity, and maintains uncompromising standards of performance and design elegance.
              </p>
            </div>

            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
              <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-green-400 font-mono text-xs">
                  <Target className="w-4 h-4" aria-hidden="true" />
                  <span>Immediate Objective</span>
                </div>
                <h3 className="font-heading italic text-lg text-white">Summer/Fall 2026 AI Roles</h3>
                <p className="text-white/50 text-xs font-body font-light">Securing AI/ML or Full Stack Engineering internships to deploy intelligent software systems.</p>
              </div>

              <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-xs">
                  <Rocket className="w-4 h-4" aria-hidden="true" />
                  <span>Technical Growth</span>
                </div>
                <h3 className="font-heading italic text-lg text-white">AI Engineering Mastery</h3>
                <p className="text-white/50 text-xs font-body font-light">Advancing specialized knowledge in multi-agent LLM systems, RAG optimization, and edge deployment.</p>
              </div>

              <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs">
                  <Compass className="w-4 h-4" aria-hidden="true" />
                  <span>System Excellence</span>
                </div>
                <h3 className="font-heading italic text-lg text-white">Scalable Architecture</h3>
                <p className="text-white/50 text-xs font-body font-light">Combining robust Python APIs, Firestore data models, and clean UI engineering for high availability.</p>
              </div>

              <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Product Impact</span>
                </div>
                <h3 className="font-heading italic text-lg text-white">User-Centric Innovation</h3>
                <p className="text-white/50 text-xs font-body font-light">Creating accessible, high-performance web applications that deliver real value to users.</p>
              </div>
            </div>

          </div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
});

export default CareerGoalsSection;
