import { BookOpen, Code, Award, CheckCircle } from 'lucide-react';

export default function DevDashboard() {
  const stats = [
    { label: "M.Sc AI Program", value: "St. Joseph's", icon: BookOpen, desc: "Active research in Generative AI, LLMs, and Neural Network design." },
    { label: "Major Projects", value: "3 Applications", icon: Code, desc: "PrepMind AI, Daily Spark, and custom responsive web UI engines." },
    { label: "Credentials Earned", value: "4 Certifications", icon: Award, desc: "Verified IBM Data Analyst, IIT NPTEL ML, NIELIT AI, and HodoLabs Web." }
  ];

  const topics = [
    { name: "Generative AI", level: "Active Exploration", details: "Structured prompt injection, schema mapping validation, token context window optimization." },
    { name: "Machine Learning", level: "Core Studies", details: "Loss parameter tuning, predictive classification models, exploratory data regressions." },
    { name: "Data Analytics", level: "Practical Competency", details: "Relational schema layouts, dashboard reporting, business metric modeling." }
  ];

  return (
    <div className="w-full mt-10 md:mt-20 text-left space-y-8 md:space-y-12">
      
      {/* Metrics Row */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="liquid-glass p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-300">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-white/40 uppercase tracking-wider">{stat.label}</span>
                  <span className="block text-xl font-heading italic text-white">{stat.value}</span>
                </div>
              </div>
              <p className="text-white/60 font-body font-light text-xs leading-relaxed">
                {stat.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Research & Topic Exploration */}
      <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-2xl">
        <div className="mb-8 border-b border-white/5 pb-4">
          <h3 className="font-heading italic text-2xl text-white">Research & Learning Focus</h3>
          <p className="text-white/40 font-body font-light text-xs mt-1">
            Core subjects and methodologies actively explored through studies and application design.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {topics.map((topic, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-heading italic text-lg text-white/95">{topic.name}</h4>
                <span className="text-[9px] font-mono text-green-400 border border-green-500/20 px-2 py-0.5 rounded bg-green-500/5 flex items-center gap-1">
                  <CheckCircle className="w-2.5 h-2.5" /> {topic.level}
                </span>
              </div>
              <p className="text-white/60 font-body font-light text-xs leading-relaxed">
                {topic.details}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
