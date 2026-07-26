import { memo } from 'react';
import { GitBranch, GitCommit, GitPullRequest, Github, Star, Terminal } from 'lucide-react';
import SectionBadge from '../components/ui/SectionBadge';

const OpenSourceSection = memo(() => {
  return (
    <section aria-label="Open Source Contributions and GitHub Activity" className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Header & Description Column */}
          <div className="lg:col-span-6 space-y-6">
            <SectionBadge>Community & Code</SectionBadge>
            <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9]">
              Open Source & <br /> GitHub Engineering.
            </h2>
            <p className="text-white/60 font-body font-light text-lg leading-relaxed">
              I actively build, share, and contribute to open-source developer tools, Artificial Intelligence utilities, and full-stack software repositories on GitHub. I believe in clean code, transparent documentation, and reproducible architectures.
            </p>
            
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://github.com/sahaya-savari"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-strong px-6 py-3 rounded-full font-body font-medium text-sm inline-flex items-center gap-2.5 text-white hover:scale-105 transition-all border border-white/20"
                aria-label="Explore Sahaya Savari's GitHub repositories in new tab"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>Explore My GitHub Repositories</span>
              </a>
            </div>
          </div>

          {/* GitHub Activity Metrics & Feature Cards */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            
            <div className="liquid-glass rounded-2xl p-6 border border-white/10 space-y-3 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <GitPullRequest className="w-5 h-5 text-purple-400" aria-hidden="true" />
              </div>
              <h3 className="font-heading italic text-xl text-white">Modular Architecture</h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                Writing reusable Python libraries, custom React hooks, and standalone REST API utilities designed for easy integration and developer adoption.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/10 space-y-3 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <GitCommit className="w-5 h-5 text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="font-heading italic text-xl text-white">Version Control & CI/CD</h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                Maintaining disciplined Git commit hygiene, comprehensive README documentation, continuous testing pipelines, and Dockerized environments.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/10 space-y-3 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              </div>
              <h3 className="font-heading italic text-xl text-white">Developer Tooling</h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                Creating command-line interface tools, evaluation scripts for Machine Learning models, and automated build workflows for rapid prototyping.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/10 space-y-3 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-400" aria-hidden="true" />
              </div>
              <h3 className="font-heading italic text-xl text-white">Community & Learning</h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                Engaging with open-source project discussions, sharing bug fixes, and providing detailed implementation guides for full-stack AI applications.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
});

export default OpenSourceSection;
