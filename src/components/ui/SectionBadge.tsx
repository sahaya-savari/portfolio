import React from 'react';

export default function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
      {children}
    </div>
  );
}
