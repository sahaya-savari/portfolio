import { memo } from 'react';
import { Brain, Cpu, Layers, Code2, Atom, Network, Flame, Zap, Layout, Cloud } from 'lucide-react';
import SectionBadge from '../components/ui/SectionBadge';

interface CapabilityCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
}

const CapabilityCard = ({ icon: Icon, title, description, tags }: CapabilityCardProps) => (
  <div className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group">
    <div>
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
        <Icon className="w-5 h-5 text-white/90" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-xl text-white mb-2 italic tracking-tight">{title}</h3>
      <p className="text-white/60 font-body font-light text-sm leading-relaxed mb-4">{description}</p>
    </div>
    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
      {tags.map((tag) => (
        <span key={tag} className="text-[10px] font-mono text-white/50 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const WhatIDoSection = memo(() => {
  const capabilities: CapabilityCardProps[] = [
    {
      icon: Brain,
      title: 'Artificial Intelligence',
      description: 'Designing context-aware AI pipelines, prompt workflows, and structured LLM systems that deliver predictable, production-grade outputs.',
      tags: ['LLMs', 'Prompt Engineering', 'RAG'],
    },
    {
      icon: Cpu,
      title: 'Machine Learning',
      description: 'Developing, training, and evaluating classical ML models and neural architectures for classification, analysis, and data-driven insights.',
      tags: ['Python', 'Scikit-Learn', 'Model Evaluation'],
    },
    {
      icon: Layers,
      title: 'Full Stack Development',
      description: 'Architecting end-to-end web applications combining robust backend services with modern responsive frontend user interfaces.',
      tags: ['React', 'TypeScript', 'Node.js'],
    },
    {
      icon: Code2,
      title: 'Python Development',
      description: 'Writing clean, efficient Python scripts, automation tools, data processing pipelines, and modular backend modules.',
      tags: ['Python 3', 'Pandas', 'NumPy'],
    },
    {
      icon: Atom,
      title: 'React Development',
      description: 'Crafting high-performance React components with Vite, Tailwind CSS, modular state management, and accessibility standards.',
      tags: ['React 18', 'Vite', 'Tailwind CSS'],
    },
    {
      icon: Network,
      title: 'API Development',
      description: 'Engineering RESTful APIs and real-time endpoints with secure data models, strict payload validation, and CORS policies.',
      tags: ['REST APIs', 'FastAPI', 'JSON'],
    },
    {
      icon: Zap,
      title: 'FastAPI Backends',
      description: 'Building high-speed asynchronous Python backends utilizing Pydantic data validation and auto-generated OpenAPI documentation.',
      tags: ['FastAPI', 'AsyncIO', 'Python'],
    },
    {
      icon: Flame,
      title: 'Firebase Integration',
      description: 'Deploying real-time Firestore databases, Firebase Authentication, Cloud Functions, and Firebase Hosting for cloud scale.',
      tags: ['Firestore', 'Auth', 'Hosting'],
    },
    {
      icon: Layout,
      title: 'UI/UX Engineering',
      description: 'Implementing glassmorphic dark-mode aesthetics, fluid typography, responsive grid layouts, and intuitive user workflows.',
      tags: ['UI/UX', 'Design System', 'Accessibility'],
    },
    {
      icon: Cloud,
      title: 'Cloud Deployment',
      description: 'Configuring CI/CD deployment pipelines on Vercel, Firebase, Docker environments, and GitHub Actions for continuous integration.',
      tags: ['Vercel', 'Docker', 'GitHub Actions'],
    },
  ];

  return (
    <section aria-label="What I Do - Core Specializations" className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="mb-12">
          <SectionBadge>Capabilities Overview</SectionBadge>
          <h2 className="text-fluid-section-heading font-heading italic text-white tracking-tight leading-[0.9] mb-4">
            What I Do & <br /> Technical Domains.
          </h2>
          <p className="text-white/60 font-body font-light text-lg max-w-2xl leading-relaxed">
            I specialize in bridging the gap between Artificial Intelligence models and full stack software products, transforming complex data logic into fast, reliable, user-friendly web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhatIDoSection;
