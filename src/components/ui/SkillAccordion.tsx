import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
// Remove framer-motion layout animations inside accordion to fix forced reflow issues.
// Use simple CSS transitions instead.

let skillAccordionIdCounter = 0;

export default function SkillAccordion({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [panelId] = useState(() => `skill-panel-${++skillAccordionIdCounter}`);
  const [buttonId] = useState(() => `skill-btn-${skillAccordionIdCounter}`);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-6 group hover:text-white transition-colors min-h-[48px]"
      >
        <div className="flex items-center gap-4">
          <div className="liquid-glass-strong w-10 h-10 flex items-center justify-center rounded-full" aria-hidden="true">
            <Icon className="w-5 h-5 text-white/80" />
          </div>
          <span className="font-heading italic text-2xl md:text-3xl text-white/70 group-hover:text-white transition-colors">{title}</span>
        </div>
        <div 
          className="transition-transform duration-300 ease-out" 
          style={{ transform: `rotate(${isOpen ? '180deg' : '0deg'})` }} 
          aria-hidden="true"
        >
          <ChevronDown className="w-6 h-6 text-white/40" />
        </div>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ 
          maxHeight: isOpen ? '500px' : '0', 
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-8 text-white/60 font-body font-light text-base leading-relaxed pl-14">
          {children}
        </div>
      </div>
    </div>
  );
}
