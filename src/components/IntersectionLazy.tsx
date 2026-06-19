import React, { useState, useEffect, useRef, Suspense } from 'react';

interface IntersectionLazyProps {
  children: React.ReactNode;
  fallbackHeight?: string;
}

/**
 * CLS Fix (CLS-1):
 * The previous implementation collapsed the wrapper from `minHeight` → `auto`
 * the moment content mounted, causing everything below to jump (CLS).
 *
 * New strategy:
 * 1. Before intersection: render a placeholder with the given fallbackHeight.
 * 2. After first intersection: render children but KEEP the wrapper height stable
 *    by measuring the rendered content with ResizeObserver and setting an explicit
 *    minHeight only until the first real paint stabilises.
 * 3. After the content is measured, release the fixed height so the section can
 *    grow naturally without causing CLS.
 *
 * The `rootMargin: '400px'` pre-loads content well before it enters view, so the
 * content is fully rendered and height is already stable when the user scrolls to it.
 */
export default function IntersectionLazy({ children, fallbackHeight = '100vh' }: IntersectionLazyProps) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const [isStable, setIsStable] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Intersection observer — fire early (400px before viewport)
  useEffect(() => {
    if (hasIntersected) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [hasIntersected]);

  // Once content is mounted, use ResizeObserver to detect when height has stabilised.
  // After one frame where height is > 0, we lock in the real height then release the
  // placeholder — preventing any visible jump.
  useEffect(() => {
    if (!hasIntersected || isStable || !wrapperRef.current) return;

    const el = wrapperRef.current;
    let stabilisedHeight = 0;
    let frameCount = 0;

    const ro = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      if (height > 0 && height === stabilisedHeight) {
        frameCount++;
        // Wait 2 consecutive frames with the same height before releasing
        if (frameCount >= 2) {
          setIsStable(true);
          ro.disconnect();
        }
      } else {
        stabilisedHeight = height;
        frameCount = 0;
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [hasIntersected, isStable]);

  // Before intersection: stable placeholder div with fixed height
  if (!hasIntersected) {
    return (
      <div
        ref={wrapperRef}
        style={{ minHeight: fallbackHeight }}
        aria-hidden="false"
      />
    );
  }

  // While content has loaded but height hasn't stabilised yet: keep minHeight
  // so scroll position doesn't jump as children paint
  return (
    <div
      ref={wrapperRef}
      style={isStable ? undefined : { minHeight: fallbackHeight }}
    >
      <Suspense fallback={<div style={{ minHeight: fallbackHeight }} />}>
        {children}
      </Suspense>
    </div>
  );
}
