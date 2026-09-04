import { forceUnlockScroll } from './scrollLock';

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

/**
 * Preload remaining lazy sections in the background after above-the-fold content has loaded.
 * Ensures all sections and their true DOM heights are ready when user clicks navigation.
 */
export const initLazyPreload = () => {
  if (typeof window === 'undefined') return;

  const preload = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => revealLazySections(), { timeout: 1500 });
    } else {
      setTimeout(revealLazySections, 300);
    }
  };

  if (document.readyState === 'complete') {
    preload();
  } else {
    window.addEventListener('load', preload, { once: true });
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

  // Ensure body scroll is completely unlocked (e.g. from mobile menu closing)
  forceUnlockScroll();

  // Signal all lazy sections to mount immediately
  revealLazySections();

  const getScrollPaddingTop = () => {
    if (options?.offset !== undefined) return options.offset;
    const computed = parseFloat(
      window.getComputedStyle(document.documentElement).scrollPaddingTop
    );
    return isNaN(computed) || computed <= 0 ? 80 : computed;
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = prefersReducedMotion ? 'auto' : options?.behavior || 'smooth';

  let cancelled = false;
  let rafId = 0;

  const cleanupListeners = () => {
    window.removeEventListener('wheel', onUserInterrupt);
    window.removeEventListener('touchstart', onUserInterrupt);
    window.removeEventListener('keydown', onKeyInterrupt);
  };

  const cancel = () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
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

  window.addEventListener('wheel', onUserInterrupt, { passive: true });
  window.addEventListener('touchstart', onUserInterrupt, { passive: true });
  window.addEventListener('keydown', onKeyInterrupt, { passive: true });

  const getTargetPosition = () => {
    const el = document.getElementById(cleanId);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scrollPaddingTop = getScrollPaddingTop();
    return Math.max(0, window.scrollY + rect.top - scrollPaddingTop);
  };

  const initialTargetY = getTargetPosition();
  if (initialTargetY !== null) {
    window.scrollTo({ top: initialTargetY, behavior });
  }

  let lastTargetY = initialTargetY ?? 0;
  const startTime = performance.now();

  const watchAndAlign = (now: number) => {
    if (cancelled) return;

    const currentTargetY = getTargetPosition();
    if (currentTargetY !== null) {
      if (initialTargetY === null) {
        // Element appeared in DOM
        window.scrollTo({ top: currentTargetY, behavior });
        lastTargetY = currentTargetY;
      } else if (Math.abs(currentTargetY - lastTargetY) > 5) {
        // Layout shift detected from mounting lazy sections
        window.scrollTo({ top: currentTargetY, behavior });
        lastTargetY = currentTargetY;
      }
    }

    if (now - startTime < 2500) {
      rafId = requestAnimationFrame(watchAndAlign);
    } else {
      cancel();
    }
  };

  rafId = requestAnimationFrame(watchAndAlign);

  return cancel;
}
