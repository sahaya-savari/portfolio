import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Database } from 'lucide-react';
import { JOURNEY } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-5 h-5 text-[#d8b4fe]" />,
  Code: <Code className="w-5 h-5 text-[#6ee7b7]" />,
  Database: <Database className="w-5 h-5 text-[#fda4af]" />,
};

export default function LearningJourney() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 relative">
      {/* Background glowing line */}
      <div className="absolute left-8 md:left-1/2 top-12 bottom-12 w-px bg-white/10 hidden md:block"></div>
      
      <div className="space-y-16">
        {JOURNEY.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col md:flex-row relative items-center gap-8 md:gap-0 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Center Node */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-10 hidden md:flex">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"
                     style={{
                       background: 'rgba(255, 255, 255, 0.05)',
                       backdropFilter: 'blur(10px)',
                       boxShadow: '0 0 20px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
                     }}>
                  {iconMap[item.icon]}
                </div>
              </div>

              {/* Mobile Node */}
              <div className="flex w-full md:hidden items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
                     style={{
                       background: 'rgba(255, 255, 255, 0.05)',
                       backdropFilter: 'blur(10px)',
                       boxShadow: '0 0 20px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
                     }}>
                  {iconMap[item.icon]}
                </div>
                <div className="font-mono text-xs tracking-widest text-white/50 uppercase">{item.year}</div>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                <div 
                  className="p-8 rounded-3xl border border-white/10 transition-transform hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="hidden md:block font-mono text-[10px] tracking-widest text-white/40 uppercase mb-4">
                    {item.year}
                  </div>
                  <h3 className="font-heading italic text-2xl text-white mb-2">{item.title}</h3>
                  <h4 className="font-sans text-sm text-white/60 mb-6 font-medium">{item.org}</h4>
                  <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
