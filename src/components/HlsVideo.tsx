import React, { useEffect, useRef, useState } from 'react';

/**
 * INP-6 Fix: Cache the hls.js module at module level.
 * Previously, each HlsVideo mount did a fresh dynamic import('hls.js'), meaning
 * three separate mounts (About, Stats, Contact) each waited for and executed the
 * hls.js module separately — adding ~80-120ms of import overhead each time.
 * Now the module is resolved once and reused across all instances.
 *
 * CLS-6 Fix: Added `poster` prop to display a static image while HLS loads,
 * and explicit width/height attributes so the browser can reserve layout space
 * before video metadata arrives — preventing height collapse on load.
 *
 * Performance Fix: Lazily initialize HLS and load hls.js only after the video
 * container has intersected with the viewport to defer bundle execution.
 */

// Module-level cache — shared across all HlsVideo instances
let hlsModuleCache: Promise<any> | null = null;
const getHlsModule = () => {
  if (!hlsModuleCache) {
    hlsModuleCache = import('hls.js');
  }
  return hlsModuleCache;
};

const HlsVideo = ({ 
  src, 
  className, 
  style, 
  desaturated = false,
  poster,
  width,
  height
}: { 
  src: string; 
  className?: string; 
  style?: React.CSSProperties; 
  desaturated?: boolean;
  poster?: string;
  width?: number | string;
  height?: number | string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  // Play/pause and lazy load HLS based on intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: '100px' } // Preload when video is 100px close
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Initialize HLS only after first intersection
  useEffect(() => {
    if (!hasIntersected) return;

    const video = videoRef.current;
    if (!video) return;
    let hls: any = null;

    const initHls = async () => {
      const HlsModule = await getHlsModule();
      const Hls = HlsModule.default;
      if (Hls.isSupported()) {
        hls = new Hls({
          // Performance: Reduce memory/load pressure by limiting buffer length
          maxBufferLength: 10,
          maxMaxBufferLength: 20,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }
    };

    initHls();
    return () => {
      if (hls) hls.destroy();
    };
  }, [hasIntersected, src]);

  return (
    <video 
      ref={videoRef} 
      className={className} 
      style={{ 
        ...style, 
        filter: desaturated ? 'saturate(0)' : 'none', 
        transform: 'translate3d(0, 0, 0)', 
        willChange: 'transform, filter' 
      }} 
      width={width}
      height={height}
      poster={poster}
      autoPlay 
      loop 
      muted 
      playsInline 
      aria-hidden="true"
      preload="none"
    />
  );
};

export default HlsVideo;
