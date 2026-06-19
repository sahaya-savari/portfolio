import { useState, memo } from 'react';
import { Database, Brain, Code, Terminal } from 'lucide-react';
import SkillAccordion from '../components/ui/SkillAccordion';
import SectionBadge from '../components/ui/SectionBadge';
import SkillsMatrix from '../components/SkillsMatrix';

const SkillsSection = memo(() => {
  const [activePillar, setActivePillar] = useState<'Data' | 'AI'>('Data');

  return (
    <section id="skills" aria-label="Skills and capabilities" className="py-16 md:py-24 lg:py-32 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12 md:mb-20 lg:mb-24">
          <SectionBadge>Capabilities</SectionBadge>
          <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Core Proficiencies <br/> & Technical Pillars.</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          <div className="space-y-2">
            <SkillAccordion title="Artificial Intelligence" icon={Brain}>
              <ul className="space-y-4">
                <li>• Machine Learning model development and training.</li>
                <li>• Deep Learning with TensorFlow and PyTorch.</li>
                <li>• Natural Language Processing and text analysis.</li>
                <li>• Computer Vision and image classification.</li>
                <li>• LLM integration and prompt engineering.</li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Python Development" icon={Code}>
              <ul className="space-y-4">
                <li>• Backend development with Flask and FastAPI.</li>
                <li>• Data processing with Pandas and NumPy.</li>
                <li>• API development and third-party integrations.</li>
                <li>• Automation scripts and task scheduling.</li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Web Development" icon={Terminal}>
              <ul className="space-y-4">
                <li>• React and TypeScript for frontend development.</li>
                <li>• Responsive UI design with Tailwind CSS.</li>
                <li>• Full-stack application architecture.</li>
                <li>• Version control with Git and GitHub.</li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Data & Databases" icon={Database}>
              <ul className="space-y-4">
                <li>• SQL for data querying and management.</li>
                <li>• Data visualization with Matplotlib and Seaborn.</li>
                <li>• Database design and optimization.</li>
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
            <div id="pillar-panel" role="tabpanel" aria-labelledby={activePillar === 'Data' ? 'tab-data' : 'tab-ai'} className="liquid-glass rounded-3xl p-6 md:p-10 min-h-[260px] md:min-h-[400px] flex flex-col justify-center text-center relative overflow-hidden">
              
              <div className={`transition-opacity duration-300 absolute inset-0 flex flex-col justify-center items-center p-6 md:p-10 ${activePillar === 'Data' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`} aria-hidden={activePillar !== 'Data'}>
                <h3 className="font-heading italic text-6xl text-white mb-8">Code meets logic.</h3>
                <p className="text-white/50 font-body font-light text-lg leading-relaxed max-w-md mx-auto">
                  Building robust applications with Python, React, and modern web technologies that deliver clean, reliable experiences.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                  {['Python', 'React', 'TypeScript', 'Flask', 'SQL'].map(t => (
                    <span key={t} className="liquid-glass px-4 py-1.5 rounded-full text-xs font-body text-white/80">{t}</span>
                  ))}
                </div>
              </div>

              <div className={`transition-opacity duration-300 absolute inset-0 flex flex-col justify-center items-center p-6 md:p-10 ${activePillar === 'AI' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`} aria-hidden={activePillar !== 'AI'}>
                <h3 className="font-heading italic text-6xl text-white mb-8">Intelligence by design.</h3>
                <p className="text-white/50 font-body font-light text-lg leading-relaxed max-w-md mx-auto">
                  Developing AI and ML solutions that learn, adapt, and solve real-world problems with precision and purpose.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                  {['TensorFlow', 'PyTorch', 'NLP', 'LLMs', 'Computer Vision'].map(t => (
                    <span key={t} className="liquid-glass px-4 py-1.5 rounded-full text-xs font-body text-white/80">{t}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
        <SkillsMatrix />
      </div>
    </section>
  );
});

export default SkillsSection;
