import { useState, memo } from 'react';
import { Award, ExternalLink, ArrowUpRight } from 'lucide-react';
import { CERTIFICATIONS, FEATURED_CREDENTIALS } from '../data';
import SectionBadge from '../components/ui/SectionBadge';

const CertificationsSection = memo(() => {
  // Fix: Converted the massive vertical grid into an interactive Tab system.
  const [activeTab, setActiveTab] = useState(CERTIFICATIONS[0]?.title || '');

  // Pre-compute tab IDs to link tabs ↔ panels (A11y-1, A11y-4)
  const getTabId = (title: string) => `cert-tab-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const getPanelId = (title: string) => `cert-panel-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section id="certifications" aria-label="Certifications and courses" className="py-16 md:py-24 lg:py-32 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12 md:mb-20 lg:mb-24 text-center">
          <SectionBadge>Learning Journey</SectionBadge>
          <h2 className="text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Certificates &amp; Courses</h2>
          <p className="text-white/50 font-body font-light mt-6 max-w-xl mx-auto">Focused on building practical, project-ready skills in AI, machine learning, and software development.</p>
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
                className="liquid-glass p-6 rounded-[2rem] flex flex-col justify-between border border-white/10 hover:-translate-y-1 transition-transform group relative"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <span className="text-3xl select-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" role="img" aria-label="Credential badge">{cred.prefix}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 text-right">{cred.issuer}</span>
                  </div>
                  <h4 className="font-heading italic text-xl md:text-2xl text-white mb-3 leading-tight tracking-tight">{cred.title}</h4>
                  {cred.desc && (
                    <p className="text-white/60 font-body font-light text-xs leading-relaxed mb-4">
                      {cred.desc}
                    </p>
                  )}
                  
                  {(cred.issueDate || cred.credentialId || cred.score || cred.credits) && (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] font-mono text-white/50 mb-4 border-t border-white/5 pt-3">
                      {cred.issueDate && (
                        <div>
                          <span className="text-white/30 block text-[8px] uppercase tracking-wider">Issued</span>
                          {cred.issueDate}
                        </div>
                      )}
                      {cred.credentialId && (
                        <div className="truncate" title={cred.credentialId}>
                          <span className="text-white/30 block text-[8px] uppercase tracking-wider">
                            {cred.issuer.includes("NIELIT") ? "Certificate No." : "ID"}
                          </span>
                          {cred.credentialId}
                        </div>
                      )}
                      {cred.score && (
                        <div>
                          <span className="text-white/30 block text-[8px] uppercase tracking-wider">Score</span>
                          {cred.score}
                        </div>
                      )}
                      {cred.credits && (
                        <div>
                          <span className="text-white/30 block text-[8px] uppercase tracking-wider">Credits</span>
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

        {/* EXISTING CATEGORIES TABS */}
        <div>
          <div className="flex items-center gap-3 justify-center mb-10">
            <h3 className="font-heading italic text-3xl text-white/60 tracking-tight">Browse by Category</h3>
          </div>
          
          {/* FIX A11y-1: role="tablist" must wrap all role="tab" buttons */}
          <div
            role="tablist"
            aria-label="Certification categories"
            className="flex overflow-x-auto hide-scrollbar gap-2 justify-start md:justify-center mb-8 px-2"
          >
            {CERTIFICATIONS.map(({ title, icon }) => {
              const tabId = getTabId(title);
              const panelId = getPanelId(title);
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
                  {icon} {title}
                </button>
              );
            })}
          </div>

          <div className="liquid-glass rounded-3xl p-6 md:p-8 min-h-[300px]">
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
                    <div key={c.name} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
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
