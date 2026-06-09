import React from 'react';
import { motion } from 'framer-motion';

interface FocusTextProps {
  prefix?: string;
  focusText: string;
  className?: string;
}

export default function FocusText({ prefix = "Data AI Analytics", focusText = "GenAI", className = "" }: FocusTextProps) {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 ${className}`}>
      {prefix && (
        <motion.span 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 0.5, filter: 'blur(3px)' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="font-heading italic text-4xl md:text-6xl lg:text-[5rem] text-white tracking-tight text-center"
        >
          {prefix}
        </motion.span>
      )}
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
        className="relative px-5 py-2 flex items-center justify-center shrink-0"
      >
        {/* Top Left Corner */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
        {/* Top Right Corner */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
        {/* Bottom Left Corner */}
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
        {/* Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />
        
        <span className="font-heading italic font-bold text-5xl md:text-7xl lg:text-[6rem] text-white tracking-tight leading-none z-10">
          {focusText}
        </span>
      </motion.div>
    </div>
  );
}
