import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './RotatingText.css';

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: 'characters' | 'words' | 'lines';
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  staggerDuration?: number;
  [key: string]: any;
}

const RotatingText = forwardRef<any, RotatingTextProps>((props, ref) => {
  const {
    texts,
    rotationInterval = 3500,
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    staggerDuration = 0.025,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const isInViewRef = useRef(true);
  const spanRef = useRef<HTMLSpanElement>(null);

  const splitIntoCharacters = (text: string) => {
    // @ts-ignore
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      // @ts-ignore
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), (segment: any) => segment.segment);
    }
    return Array.from(text);
  };

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setAnimating(true);
      const timer = setTimeout(() => {
        setCurrentTextIndex(newIndex);
        setAnimating(false);
        if (onNext) onNext(newIndex);
      }, 240);
      return () => clearTimeout(timer);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  // INP-2 Fix: Observe visibility — pause interval when hero is off-screen
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isInViewRef.current = entry.isIntersecting; },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // INP-2 Fix: Only advance text when element is in view
  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(() => {
      if (isInViewRef.current) next();
    }, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  const currentText = texts[currentTextIndex] || '';
  const words = currentText.split(' ');

  return (
    <span ref={spanRef} className={cn('text-rotate', mainClassName)} style={(rest as any).style}>
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <span
        key={currentTextIndex}
        className={cn('text-rotate', animating ? 'text-rotate-exit' : 'text-rotate-enter')}
        aria-hidden="true"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
            {splitIntoCharacters(word).map((char: any, charIndex: number) => (
              <span
                key={charIndex}
                className={cn('text-rotate-element', elementLevelClassName)}
                style={{
                  animationDelay: `${charIndex * staggerDuration}s`,
                }}
              >
                {char}
              </span>
            ))}
            {wordIndex !== words.length - 1 && <span className="text-rotate-space"> </span>}
          </span>
        ))}
      </span>
    </span>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
