import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * CLS-5 Fix:
 * The previous implementation rendered two fundamentally different DOM structures:
 *   - Disabled: <>{children}</> — no wrapper
 *   - Enabled:  <div style="position:relative; width:100%; minHeight:100vh">{children}</div>
 *
 * This caused a page-level layout context switch on mount (after the performance
 * check resolved), shifting ALL content below by the div's margin/padding.
 *
 * Fix: Always render children in a plain fragment regardless of enabled/disabled state.
 * The canvas is absolutely/fixed positioned so it never affects document flow.
 */
const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<any[]>([]);
  const isAnimatingRef = useRef<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Evaluate performance constraints on mount
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = (navigator.hardwareConcurrency || 4) <= 4;
    setIsDisabled(isMobile || isReducedMotion || isLowEnd);
  }, []);

  const configRef = useRef({
    sparkColor,
    sparkSize,
    sparkRadius,
    sparkCount,
    duration,
    easing,
    extraScale
  });

  useEffect(() => {
    configRef.current = {
      sparkColor,
      sparkSize,
      sparkRadius,
      sparkCount,
      duration,
      easing,
      extraScale
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

  const easeFunc = useCallback((t: number, easeType: string) => {
    switch (easeType) {
      case 'linear': return t;
      case 'ease-in': return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t);
    }
  }, []);

  useEffect(() => {
    if (isDisabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isDisabled]);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) { isAnimatingRef.current = false; return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { isAnimatingRef.current = false; return; }

    const { sparkColor, sparkSize, sparkRadius, duration, easing, extraScale } = configRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;
      const progress = elapsed / duration;
      const eased = easeFunc(progress, easing);
      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      return true;
    });

    if (sparksRef.current.length > 0) {
      requestAnimationFrame(draw);
    } else {
      isAnimatingRef.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [easeFunc]);

  useEffect(() => {
    if (isDisabled) return;

    const handleClick = (e: MouseEvent) => {
      // Defer to prevent blocking React's synthetic event handler (INP fix)
      setTimeout(() => {
        const { sparkCount } = configRef.current;
        const now = performance.now();
        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now
        }));
        sparksRef.current.push(...newSparks);
        if (!isAnimatingRef.current) {
          isAnimatingRef.current = true;
          requestAnimationFrame(draw);
        }
      }, 0);
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, [draw, isDisabled]);

  // CLS-5 Fix: ALWAYS render children in a fragment — never in a wrapping div.
  // The canvas overlay is position:fixed so it never affects document flow.
  return (
    <>
      {!isDisabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9999,
            userSelect: 'none'
          }}
        />
      )}
      {children}
    </>
  );
};

export default ClickSpark;