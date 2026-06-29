let lockCount = 0;
let originalOverflow = '';

/**
 * Safely locks body scroll by adding overflow: hidden.
 * Supports nesting (multiple modals/menus locking scroll simultaneously)
 * without race conditions.
 */
export const lockScroll = () => {
  if (typeof document === 'undefined') return;
  
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
};

/**
 * Safely unlocks body scroll by restoring original overflow style.
 * Only unlocks when all locks are released.
 */
export const unlockScroll = () => {
  if (typeof document === 'undefined') return;
  
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow || '';
  }
};
