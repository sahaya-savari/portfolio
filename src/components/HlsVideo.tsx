import React, { useEffect, useRef } from 'react';

const HlsVideo = ({ 
  src, 
  className, 
  style, 
  desaturated = false,
  width,
  height
}: { 
  src: string; 
  className?: string; 
  style?: React.CSSProperties; 
  desaturated?: boolean;
  width?: number | string;
  height?: number | string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: any = null;
    const initHls = async () => {
      const HlsModule = await import('hls.js');
      const Hls = HlsModule.default;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }
    };
    initHls();
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video 
      ref={videoRef} 
      className={className} 
      style={{ ...style, filter: desaturated ? 'saturate(0)' : 'none', transform: 'translate3d(0, 0, 0)', willChange: 'transform, filter' }} 
      width={width}
      height={height}
      autoPlay 
      loop 
      muted 
      playsInline 
      aria-hidden="true" 
    />
  );
};

export default HlsVideo;
