import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, ZoomIn, ZoomOut, Maximize, X, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { lockScroll, unlockScroll } from '../utils/scrollLock';

// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface ResumeViewerProps {
  onClose: () => void;
  pdfUrl?: string;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ onClose, pdfUrl = `${(import.meta as any).env.BASE_URL}resume.pdf?v=2` }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        // Subtract 24px (12px padding on each side) to keep margins inside PDF Container
        setContainerWidth(Math.max(100, entries[0].contentRect.width - 24));
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Store the element that had focus before the modal opened
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    // Focus close button on open
    setTimeout(() => closeButtonRef.current?.focus(), 100);
    return () => {
      // Return focus to triggering element on close
      previouslyFocusedRef.current?.focus();
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const fitWidth = () => setScale(1.0);

  return (
    <div 
      className="fixed inset-0 z-[300] flex flex-col items-center justify-start bg-black/80 backdrop-blur-md pt-20 pb-6 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Resume Viewer"
      ref={modalRef}
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      {/* Controls Bar */}
      <div 
        className="liquid-glass-strong bg-black/90 px-3 py-3 md:px-4 rounded-2xl md:rounded-full flex flex-wrap items-center justify-center gap-2 md:gap-6 mb-6 shadow-2xl border border-white/20 fixed top-4 left-4 right-4 md:top-6 md:left-auto md:right-auto md:w-auto z-[310]"
        onClick={e => e.stopPropagation()}
      >
        <div className="hidden md:flex flex-col border-r border-white/20 pr-6 mr-2">
          <span className="text-white font-heading italic text-lg leading-none">Sahaya Savari F</span>
          <span className="text-white/50 font-body text-[10px] uppercase tracking-widest mt-1">M.Sc Artificial Intelligence • Resume</span>
        </div>
        <div className="flex items-center gap-2 border-r border-white/20 pr-6">
          <button onClick={zoomOut} className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Zoom out">
            <ZoomOut className="w-4 h-4" aria-hidden="true" />
          </button>
          <span className="text-white/60 font-mono text-xs w-12 text-center" aria-live="polite" aria-atomic="true">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Zoom in">
            <ZoomIn className="w-4 h-4" aria-hidden="true" />
          </button>
          <button onClick={fitWidth} className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors ml-2" aria-label="Fit to width">
            <Maximize className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <a href={pdfUrl} download className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Download resume as PDF">
            <Download className="w-4 h-4" aria-hidden="true" />
          </a>
          <button ref={closeButtonRef} onClick={onClose} className="w-10 h-10 liquid-glass-strong rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors bg-white/10" aria-label="Close resume viewer">
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* PDF Container */}
      <div 
        ref={containerRef}
        className="relative overflow-y-auto w-full max-w-4xl flex-grow flex flex-col items-center hide-scrollbar rounded-xl"
        onClick={e => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center" role="status">
            <Loader2 className="w-10 h-10 text-white/50 animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading resume...</span>
          </div>
        )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="h-[800px] w-full max-w-2xl bg-white/5 rounded-xl animate-pulse" role="status"><span className="sr-only">Loading resume document...</span></div>}
          className="flex flex-col items-center"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={`page_${index + 1}`} className="mb-6 shadow-2xl rounded-lg overflow-hidden bg-white/5">
              <Page
                pageNumber={index + 1}
                scale={scale}
                width={containerWidth ? Math.min(containerWidth, 800) : undefined}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={<div className="h-[800px] w-full max-w-2xl bg-white/5 rounded-xl animate-pulse" role="status"><span className="sr-only">Loading page {index + 1}...</span></div>}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default ResumeViewer;
