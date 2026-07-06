import { useState, memo } from 'react';
import { Award, ExternalLink, ArrowUpRight, Database, Code, Brain } from 'lucide-react';
import { CERTIFICATIONS, FEATURED_CREDENTIALS } from '../data';
import SectionBadge from '../components/ui/SectionBadge';

// Resolve string icon identifiers from data.ts to actual components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  database: Database,
  code: Code,
  brain: Brain,
};

const CertificationsSection = memo(() => {
  // Fix: Converted the massive vertical grid into an interactive Tab system.
  const [activeTab, setActiveTab] = useState(CERTIFICATIONS[0]?.title || '');

  // Pre-compute tab IDs to link tabs ↔ panels (A11y-1, A11y-4)
  const getTabId = (title: string) => `cert-tab-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const getPanelId = (title: string) => `cert-panel-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section aria-label="Certifications and courses" className="py-16 px-6 relative">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12 text-center">
          <SectionBadge>Learning Journey</SectionBadge>
          <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9]">Certificates &amp; Courses</h2>
          <p className="text-white/50 font-body font-light mt-6 max-w-xl mx-auto">Focused on building practical, project-ready skills in Artificial Intelligence, Machine Learning, Python development, data analytics, and software development.</p>
        </div>

        {/* FEATURED CREDENTIALS SUBSECTION */}
        <div className="mb-12 md:mb-20 lg:mb-24">
          <div className="flex items-center gap-3 justify-center mb-10">
            <Award className="w-6 h-6 text-white/50 animate-pulse" aria-hidden="true" />
            <h3 className="font-heading italic text-3xl text-white tracking-tight">Featured Credentials</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {FEATURED_CREDENTIALS.map((cred) => (
              <div
                key={cred.title}
                className="certificate-card liquid-glass p-6 rounded-[2rem] flex flex-col justify-between border border-white/10 hover:-translate-y-1 transition-transform group relative cursor-target"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <span className="text-3xl select-none" role="img" aria-label="Credential badge">{cred.prefix}</span>
                    <div className="flex flex-col items-end gap-1">
                      {cred.verifyUrl && cred.credentialId && (
                        <span className="text-[8px] font-mono uppercase tracking-widest text-green-400 border border-green-500/30 bg-green-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-green-400"></span>
                          Verified
                        </span>
                      )}
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 text-right">{cred.issuer}</span>
                    </div>
                  </div>
                  <h4 className="font-heading italic text-xl md:text-2xl text-white mb-3 leading-tight tracking-tight">{cred.title}</h4>
                  {cred.desc && (
                    <p className="text-white/60 font-body font-light text-xs leading-relaxed mb-4">
                      {cred.desc}
                    </p>
                  )}
                  {cred.skills && cred.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cred.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded-full text-[9px] font-mono text-white/50 bg-white/5 border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {(cred.issueDate || cred.credentialId || cred.score || cred.credits) && (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] font-mono text-white/50 mb-4 border-t border-white/5 pt-3">
                      {cred.issueDate && (
                        <div>
                          <span className="text-white/60 block text-[8px] uppercase tracking-wider">Issued</span>
                          {cred.issueDate}
                        </div>
                      )}
                      {cred.credentialId && (
                        <div className="truncate" title={cred.credentialId}>
                          <span className="text-white/60 block text-[8px] uppercase tracking-wider">
                            {cred.issuer.includes("NIELIT") ? "Certificate No." : "ID"}
                          </span>
                          {cred.credentialId}
                        </div>
                      )}
                      {cred.score && (
                        <div>
                          <span className="text-white/60 block text-[8px] uppercase tracking-wider">Score</span>
                          {cred.score}
                        </div>
                      )}
                      {cred.credits && (
                        <div>
                          <span className="text-white/60 block text-[8px] uppercase tracking-wider">Credits</span>
                          {cred.credits}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {(cred.verifyUrl || cred.linkedinUrl) && (
                  <div className="mt-4 flex flex-col gap-2 relative z-20">
                    {cred.verifyUrl && (
                      <a
                        href={cred.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-body font-semibold transition-all duration-300 hover:scale-[1.02] min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        aria-label={`Verify ${cred.title} credential from ${cred.issuer}`}
                      >
                        <span>Verify Credential</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-black/60 group-hover:text-black" />
                      </a>
                    )}
                    {cred.linkedinUrl && (
                      <a
                        href={cred.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-body font-medium transition-all duration-300 border border-white/10 min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        aria-label={`View ${cred.title} credential on LinkedIn`}
                      >
                        <span>View Credential</span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* LEARNING JOURNEY TIMELINE */}
        <div className="mb-16 lg:mb-24">
          <div className="flex items-center gap-3 justify-center mb-10">
            <h3 className="font-heading italic text-3xl text-white/60 tracking-tight">The Learning Journey</h3>
          </div>
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[2px] bg-gradient-to-b from-white/0 via-white/10 to-white/0 -translate-x-1/2"></div>
            
            {[
              { year: '2023', title: 'Foundations & Python', desc: 'Started with CS50P and automation scripts, building strong core programming logic.' },
              { year: '2023', title: 'Web Development', desc: 'Learned full-stack architecture, React, and Firebase to bring ideas to the browser.' },
              { year: '2024', title: 'Data Analytics', desc: 'Completed IBM Data Analyst Specialization, mastering SQL, Pandas, and visualization.' },
              { year: '2024', title: 'Machine Learning', desc: 'Dived into Kaggle, TensorFlow, and Scikit-learn to build predictive models.' },
              { year: '2025', title: 'Artificial Intelligence', desc: 'Pursuing M.Sc AI while focusing on LLMs, Prompt Engineering, Machine Learning evaluation, and intelligent pipelines.' }
            ].map((item, index) => (
              <div key={index} className={`relative flex items-center mb-8 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-1/2"></div>
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 -translate-x-1/2 flex items-center justify-center z-10 transition-colors hover:border-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                </div>
                <div className="ml-12 md:ml-0 md:w-1/2 p-6 liquid-glass rounded-2xl md:mx-8 border border-white/5 hover:bg-white/5 transition-colors">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">{item.year}</span>
                  <h4 className="text-xl font-heading italic text-white mt-2 mb-2">{item.title}</h4>
                  <p className="text-sm font-body text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXISTING CATEGORIES TABS */}
        <div>
          <div className="flex items-center gap-3 justify-center mb-10">
            <h3 className="font-heading italic text-3xl text-white/60 tracking-tight">Browse by Category</h3>
          </div>
          
          {/* Mobile Category Dropdown Selector */}
          <div className="block md:hidden mb-8 px-2">
            <label htmlFor="cert-category-select" className="sr-only">Select Certification Category</label>
            <select
              id="cert-category-select"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-neutral-900 text-white border border-white/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-white/20 min-h-[48px] backdrop-blur-md"
            >
              {CERTIFICATIONS.map(({ title }) => (
                <option key={title} value={title} className="bg-black text-white">
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop/Tablet Category Tabs */}
          <div
            role="tablist"
            aria-label="Certification categories"
            className="hidden md:flex overflow-x-auto hide-scrollbar gap-2 justify-center mb-8 px-2"
          >
            {CERTIFICATIONS.map(({ title, icon }) => {
              const tabId = getTabId(title);
              const panelId = getPanelId(title);
              const IconComponent = ICON_MAP[icon];
              return (
                <button
                  key={title}
                  id={tabId}
                  onClick={() => setActiveTab(title)}
                  role="tab"
                  aria-selected={activeTab === title}
                  aria-controls={panelId}
                  className={`whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-full text-sm font-body font-medium transition-all duration-300 border min-h-[44px] ${
                    activeTab === title 
                      ? 'bg-white text-black border-transparent' 
                      : 'liquid-glass text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" aria-hidden={true} />} {title}
                </button>
              );
            })}
          </div>

          <div className="liquid-glass rounded-3xl p-6 md:p-8">
            {/* FIX INP-3: Only render the active tab's content, not all hidden tabs */}
            {CERTIFICATIONS.map(({ title, items }) => {
              const tabId = getTabId(title);
              const panelId = getPanelId(title);
              const isActive = activeTab === title;

              return (
                <div
                  key={title}
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={tabId}
                  hidden={!isActive}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {isActive && items.map((c: any) => (
                    <div key={c.name} className="certificate-card bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                      <Award className="w-5 h-5 text-white/40 shrink-0" aria-hidden="true" />
                      <span className="text-sm font-body font-light text-white/80">{c.name}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default CertificationsSection;
