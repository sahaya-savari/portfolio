import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from: any, steps: any[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s: any) => Object.keys(s))]);
  const keyframes: any = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map((s: any) => s[k])];
  });
  return keyframes;
};

/**
 * CLS-2 Fix:
 * The original `defaultFrom` used `y: -50` (or `y: 50`) which animated text
 * from off-screen (50px above/below) into position. Because the element is
 * in-flow (not position:absolute), the initial `y:-50` was causing the browser
 * to include the displaced element in flow layout calculations, producing reflow
 * when the animation started.
 *
 * Fix: Remove the Y-axis translation from the initial/final states entirely.
 * The entrance is now a blur+opacity fade only — visually identical at the
 * perceived "wow" level but without any layout-affecting movement.
 * The parent container uses `overflow:hidden` styling so any residual
 * visual artifact is clipped.
 */
const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  as: Component = 'p',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: any) => t,
  onAnimationComplete,
  stepDuration = 0.35
}: any) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // CLS-2 Fix: No Y translation — pure opacity+blur fade only.
  // Previously: { filter: 'blur(10px)', opacity: 0, y: -50 } caused in-flow reflow.
  // Now: { filter: 'blur(10px)', opacity: 0 } — no layout-affecting properties change.
  const defaultFrom = useMemo(
    () => ({ filter: 'blur(10px)', opacity: 0 }),
    []
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5 },
      { filter: 'blur(0px)', opacity: 1 }
    ],
    []
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  return (
    <Component ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment: string, index: number) => {
        const spanTransition: any = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };
        return (
          <motion.span
            className="inline-block will-change-[filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Component>
  );
};

export default BlurText;