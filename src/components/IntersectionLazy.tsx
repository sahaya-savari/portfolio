import React, { useState, useEffect, useRef, Suspense } from 'react';

interface IntersectionLazyProps {
  children: React.ReactNode;
  fallbackHeight?: string;
}

export default function IntersectionLazy({ children, fallbackHeight = '100vh' }: IntersectionLazyProps) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasIntersected) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load slightly before it comes into view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasIntersected]);

  return (
    <div ref={ref} style={{ minHeight: hasIntersected ? 'auto' : fallbackHeight }}>
      {hasIntersected && (
        <Suspense fallback={<div style={{ minHeight: fallbackHeight }} />}>
          {children}
        </Suspense>
      )}
    </div>
  );
}
