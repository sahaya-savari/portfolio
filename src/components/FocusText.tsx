import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const WORDS = ["Data", "AI", "Analytics", "GenAI"];

interface FocusTextProps {
  prefix?: string;
  focusText?: string;
  className?: string;
}

export default function FocusText({ className = "" }: FocusTextProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [xOffset, setXOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const activeItem = itemRefs.current[activeIndex];
      if (!activeItem) return;
      
      // NEW TRANSLATEX CALCULATION:
      // We use pure unscaled DOM layout values (offsetLeft/offsetWidth).
      // This is 100% deterministic and forces the track to physically slide.
      const itemCenter = activeItem.offsetLeft + (activeItem.offsetWidth / 2);
      
      setXOffset(-itemCenter);
    };
    
    // Delay ensures fonts and layout are fully painted before measuring
    const timeout = setTimeout(updatePosition, 50);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updatePosition);
    };
  }, [activeIndex]);

  return (
    <div className={`relative w-full overflow-hidden h-[100px] md:h-[140px] flex items-center ${className}`}>
      
      {/* 
        This wrapper is positioned exactly in the horizontal center of the screen.
        By translating the inner track by the negative center of the active item, 
        we guarantee the active item perfectly aligns with the screen center.
      */}
      <div className="absolute left-1/2 flex items-center">
        <motion.div 
          ref={trackRef}
          className="relative flex items-center gap-6 md:gap-10"
          animate={{ x: xOffset }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        >
          {WORDS.map((word, index) => {
            const isActive = index === activeIndex;
            const isGenAI = word === "GenAI";
            
            return (
              <motion.div
                key={word}
                ref={(el) => { itemRefs.current[index] = el; }}
                className="relative shrink-0 flex items-center justify-center px-2 py-2 md:px-4 md:py-4"
                style={{ willChange: "transform, filter, opacity" }}
                animate={{
                  scale: isActive ? 1.15 : 0.85,
                  opacity: isActive ? 1 : 0.4,
                  filter: isActive ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Focus Brackets - Only visible on active item */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-white rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-white rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-white rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-white rounded-br-lg" />
                </motion.div>

                <span 
                  className="text-4xl md:text-5xl lg:text-6xl leading-none text-white whitespace-nowrap z-10"
                  style={{
                    fontFamily: isGenAI ? '"Lobster", cursive' : '"Outfit", sans-serif',
                    fontWeight: isGenAI ? 'normal' : 800,
                    fontStyle: isGenAI ? 'italic' : 'normal',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                >
                  {word}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
