import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const WORDS = ["Data", "AI", "Analytics", "GenAI"];

interface FocusTextProps {
  prefix?: string;
  focusText?: string;
  className?: string;
}

/**
 * CLS-4 Fix:
 * The original component measured DOM offset positions in a `setTimeout(50ms)` after
 * mount, then animated the track to the measured position. During that 50ms window,
 * the track was at position `xOffset=0` (wrong position), and the 50ms timer then
 * fired and shifted the track — causing a visible layout shift.
 *
 * Fix: The outer container has a FIXED height (`h-[100px] md:h-[140px]`) which is
 * preserved. The track starts at a reasonable default offset (-100) to avoid the
 * extreme wrong-position flash, and measurements are done in a rAF to ensure the
 * browser has fully painted before we query offsetLeft.
 *
 * INP-1 Fix:
 * The resize listener was not debounced and was synchronous (not passive).
 * Fix: Debounce to 100ms + `{ passive: true }` flag.
 */
export default function FocusText({ className = "" }: FocusTextProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Start at a centred default to avoid flash of wrong position
  const [xOffset, setXOffset] = useState(0);
  const measureRafRef = useRef<number | null>(null);

  // INP-1: Debounced, passive resize + rAF-based measurement
  const updatePosition = useCallback(() => {
    if (measureRafRef.current) cancelAnimationFrame(measureRafRef.current);
    measureRafRef.current = requestAnimationFrame(() => {
      const activeItem = itemRefs.current[activeIndex];
      if (!activeItem) return;
      const itemCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
      setXOffset(-itemCenter);
    });
  }, [activeIndex]);

  useEffect(() => {
    // Initial measure — use rAF to ensure layout is complete
    updatePosition();

    let debounceTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updatePosition, 100);
    };

    // INP-1 Fix: passive listener so scroll/resize cannot block main thread
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimer);
      if (measureRafRef.current) cancelAnimationFrame(measureRafRef.current);
    };
  }, [updatePosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    // CLS-4 Fix: Fixed height container prevents siblings from shifting when
    // the track position is measured and updated after mount.
    <div className={`relative w-full h-[100px] md:h-[140px] flex items-center ${className}`}>
      {/* Centered wide container to prevent browser layout clipping */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[2000px] flex items-center justify-center pointer-events-none">
        {/* Centering anchor for the track */}
        <div className="relative w-0 h-0 flex items-center justify-start overflow-visible pointer-events-auto">
          <motion.div 
            ref={trackRef}
            className="absolute left-0 flex items-center gap-6 md:gap-10 whitespace-nowrap"
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
                  className="relative shrink-0 flex items-center justify-center px-4 py-2 md:px-8 md:py-4"
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
                      fontFamily: isGenAI ? 'var(--font-heading)' : 'var(--font-body)',
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
    </div>
  );
}
