import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  icon?: boolean;
}

export default function Button({ children, variant = 'primary', icon = false, className = '', ...props }: ButtonProps) {
  const baseClasses = "rounded-full font-body font-medium flex items-center justify-center transition-all cursor-pointer";
  
  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = "bg-white text-black px-5 py-2.5 text-xs hover:scale-105 min-h-[38px] gap-1.5";
  } else if (variant === 'secondary') {
    variantClasses = "liquid-glass-strong px-8 py-4 text-sm text-white hover:scale-105 active:scale-95 min-h-[48px] gap-2";
  } else if (variant === 'glass') {
    variantClasses = "bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-white/10 px-8 py-4 text-sm min-h-[48px] gap-2";
  }

  return (
    <button className={`${baseClasses} ${variantClasses} group ${className}`} {...props}>
      {children}
      {icon && <ArrowUpRight className={`transition-transform ${variant === 'secondary' ? 'w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : 'w-3.5 h-3.5'}`} aria-hidden="true" />}
    </button>
  );
}
