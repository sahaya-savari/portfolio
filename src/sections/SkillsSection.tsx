import { useState, memo, lazy, Suspense } from 'react';
import { Database, Brain, Code, Terminal } from 'lucide-react';
import { m as motion, AnimatePresence } from 'framer-motion';
import SkillAccordion from '../components/ui/SkillAccordion';
import SectionBadge from '../components/ui/SectionBadge';
import SkillsMatrix from '../components/SkillsMatrix';

// @ts-ignore
const Galaxy = lazy(() => import('../components/ui/Galaxy/Galaxy'));

const SkillsSection = memo(() => {
  const [activePillar, setActivePillar] = useState<'Data' | 'AI'>('Data');

  return (
    <section aria-label="Skills and capabilities" className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <Galaxy
            transparent={true}
            density={0.7}
            glowIntensity={0.15}
            saturation={0.22}
            rotationSpeed={0.015}
            twinkleIntensity={0.12}
            mouseInteraction={true}
            mouseRepulsion={true}
          />
        </Suspense>
      </div>
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="mb-12">
          <SectionBadge>Capabilities</SectionBadge>
          <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9] mb-4">Core Proficiencies <br/> & Technical Pillars.</h2>
          <p className="text-white/60 font-body font-light text-lg max-w-xl">A structured overview of my technical capabilities across Artificial Intelligence, Machine Learning, Python development, and full-stack development with React, TypeScript, and Firebase.</p>
        </div>

        <div className="mb-16">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <SectionBadge>Verified Evidence</SectionBadge>
              <p className="text-white/60 font-body font-light max-w-xl text-sm">Every skill listed is backed by a project, certification, or coursework.</p>
            </div>
          </div>
          <SkillsMatrix />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          <div className="space-y-2">
            <SkillAccordion title="Artificial Intelligence" icon={Brain}>
              <ul className="space-y-4">
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• Machine Learning model development, training, and evaluation for practical AI workflows.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">Advanced</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• LLM integration, prompt engineering, and structured response validation.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">Advanced</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• RAG Pipelines and context injection.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">Intermediate</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• Natural Language Processing and text analysis.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">Intermediate</span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>• Computer Vision and image classification.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded-full shrink-0">Learning</span>
                </li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Python Development" icon={Code}>
              <ul className="space-y-4">
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• Python Developer workflows for backend development with Flask and FastAPI.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">Advanced</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• Data processing with Pandas and NumPy.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">Advanced</span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>• API development and third-party integrations.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">Advanced</span>
                </li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Web Development" icon={Terminal}>
              <ul className="space-y-4">
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• React and TypeScript for accessible, responsive frontend development.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">Intermediate</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• Responsive UI design with Tailwind CSS.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">Advanced</span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>• Full Stack Developer architecture across client state, APIs, Firebase, and deployment.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">Intermediate</span>
                </li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Data & Databases" icon={Database}>
              <ul className="space-y-4">
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• SQL for data querying and management.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">Advanced</span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>• Data visualization with Matplotlib and Seaborn.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">Intermediate</span>
                </li>
              </ul>
            </SkillAccordion>
          </div>
          <div>
            <div className="liquid-glass-strong rounded-3xl p-1 w-full flex mb-6 md:mb-12" role="tablist" aria-label="Technical pillar selection">
              <button
                onClick={() => setActivePillar('Data')}
                role="tab"
                aria-selected={activePillar === 'Data'}
                aria-controls="pillar-panel"
                id="tab-data"
                className={`flex-1 py-4 rounded-[22px] transition-all font-body font-medium text-sm min-h-[48px] ${activePillar === 'Data' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
              >Data Pillar</button>
              <button
                onClick={() => setActivePillar('AI')}
                role="tab"
                aria-selected={activePillar === 'AI'}
                aria-controls="pillar-panel"
                id="tab-ai"
                className={`flex-1 py-4 rounded-[22px] transition-all font-body font-medium text-sm min-h-[48px] ${activePillar === 'AI' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
              >AI Pillar</button>
            </div>
            <div id="pillar-panel" role="tabpanel" aria-labelledby={activePillar === 'Data' ? 'tab-data' : 'tab-ai'} className="liquid-glass rounded-3xl p-6 md:p-10 flex flex-col justify-center text-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activePillar === 'Data' ? (
                  <motion.div
                    key="data"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-center items-center w-full"
                  >
                    <h3 className="font-heading italic text-5xl md:text-6xl text-white mb-6 md:mb-8">Code meets logic.</h3>
                    <p className="text-white/50 font-body font-light text-base md:text-lg leading-relaxed max-w-md mx-auto">
                      Building robust portfolio and production-style applications with Python, React, TypeScript, Firebase, and modern web technologies that deliver clean, reliable experiences.
                    </p>
                    <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3">
                      {['Python', 'React', 'TypeScript', 'Flask', 'SQL'].map(t => (
                        <span key={t} className="liquid-glass px-4 py-1.5 rounded-full text-xs font-body text-white/80">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-center items-center w-full"
                  >
                    <h3 className="font-heading italic text-5xl md:text-6xl text-white mb-6 md:mb-8">Intelligence by design.</h3>
                    <p className="text-white/50 font-body font-light text-base md:text-lg leading-relaxed max-w-md mx-auto">
                      Developing Artificial Intelligence and Machine Learning solutions that learn, adapt, and solve real-world problems with precision and purpose.
                    </p>
                    <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3">
                      {['TensorFlow', 'PyTorch', 'NLP', 'LLMs', 'Computer Vision'].map(t => (
                        <span key={t} className="liquid-glass px-4 py-1.5 rounded-full text-xs font-body text-white/80">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SkillsSection;
