/**
 * Navigation and Section Scrolling Coordinator
 *
 * Provides smooth, deterministic scrolling to page sections that dynamically adjusts
 * when lazy-loaded sections (or images/fonts) above or at the target change their height.
 */

export const revealLazySections = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('reveal-lazy-sections'));
  }
};

interface ScrollOptions {
  behavior?: 'smooth' | 'auto';
  offset?: number;
}

export function scrollToSection(targetId: string, options?: ScrollOptions): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const cleanId = targetId.replace(/^#/, '');
  if (!cleanId) return () => {};

  // Signal all lazy sections to start loading immediately
  revealLazySections();

  let cancelled = false;
  let animId = 0;
  let observerTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let resizeObserver: ResizeObserver | undefined;

  const cleanupListeners = () => {
    window.removeEventListener('wheel', onUserInterrupt);
    window.removeEventListener('touchstart', onUserInterrupt);
    window.removeEventListener('keydown', onKeyInterrupt);
  };

  const cancel = () => {
    cancelled = true;
    if (animId) cancelAnimationFrame(animId);
    if (observerTimeoutId) clearTimeout(observerTimeoutId);
    if (resizeObserver) resizeObserver.disconnect();
    cleanupListeners();
  };

  const onUserInterrupt = () => {
    cancel();
  };

  const onKeyInterrupt = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
      cancel();
    }
  };

  const getScrollPaddingTop = () => {
    if (options?.offset !== undefined) return options.offset;
    const computed = parseFloat(
      window.getComputedStyle(document.documentElement).scrollPaddingTop
    );
    return isNaN(computed) || computed <= 0 ? 80 : computed;
  };

  const executeScroll = (el: HTMLElement) => {
    if (cancelled) return;

    const scrollPaddingTop = getScrollPaddingTop();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isAuto = options?.behavior === 'auto' || prefersReducedMotion;

    const computeTargetY = () => {
      const rect = el.getBoundingClientRect();
      return Math.max(0, rect.top + window.scrollY - scrollPaddingTop);
    };

    // Keep target aligned if late layout shifts occur within 1.2s after landing
    const startStabilization = () => {
      if (cancelled) return;

      let lastY = computeTargetY();
      const startTime = performance.now();

      const checkStability = () => {
        if (cancelled) return;
        const currentTargetY = computeTargetY();
        const diff = Math.abs(currentTargetY - window.scrollY);

        // If a layout shift moved the target by more than 4px, smoothly re-align
        if (diff > 4 && Math.abs(currentTargetY - lastY) > 2) {
          window.scrollTo({ top: currentTargetY, behavior: 'smooth' });
          lastY = currentTargetY;
        }

        if (performance.now() - startTime < 1200) {
          animId = requestAnimationFrame(checkStability);
        }
      };

      animId = requestAnimationFrame(checkStability);

      // Disconnect safety after 1.5s
      observerTimeoutId = setTimeout(() => {
        cancel();
      }, 1500);
    };

    if (isAuto) {
      window.scrollTo({ top: computeTargetY(), behavior: 'auto' });
      startStabilization();
      return;
    }

    // Smooth scroll with dynamic target adjustment
    window.addEventListener('wheel', onUserInterrupt, { passive: true });
    window.addEventListener('touchstart', onUserInterrupt, { passive: true });
    window.addEventListener('keydown', onKeyInterrupt, { passive: true });

    const startY = window.scrollY;
    const startTime = performance.now();
    const duration = 650; // ms

    const cubicEaseInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      if (cancelled) return;

      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = cubicEaseInOut(progress);

      // Recomputed every frame so expansion of sections above target is smoothly absorbed
      const currentTargetY = computeTargetY();
      const currentY = startY + (currentTargetY - startY) * ease;

      window.scrollTo({ top: currentY, behavior: 'auto' });

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        // Final exact snap
        window.scrollTo({ top: computeTargetY(), behavior: 'auto' });
        cleanupListeners();
        startStabilization();
      }
    };

    animId = requestAnimationFrame(step);
  };

  // Wait for element to be present in DOM and have rendered section children
  const startTime = performance.now();
  const waitForTarget = () => {
    if (cancelled) return;

    const el = document.getElementById(cleanId);
    // If element exists and either has a section or we've waited at least 150ms
    if (el) {
      const hasSectionChild = Boolean(el.querySelector('section'));
      if (hasSectionChild || performance.now() - startTime > 150) {
        executeScroll(el);
        return;
      }
    }

    if (performance.now() - startTime < 1500) {
      animId = requestAnimationFrame(waitForTarget);
    } else if (el) {
      executeScroll(el);
    }
  };

  animId = requestAnimationFrame(waitForTarget);

  return cancel;
}
