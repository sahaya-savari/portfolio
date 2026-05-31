import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, ZoomIn, ZoomOut, Maximize, X, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeViewerProps {
  onClose: () => void;
  pdfUrl?: string;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ onClose, pdfUrl = '/resume.pdf' }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);

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

  // Trap focus (simple implementation)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
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
      onClick={onClose}
    >
      {/* Controls Bar */}
      <div 
        className="liquid-glass-strong bg-black/90 p-4 rounded-full flex items-center gap-6 mb-6 shadow-2xl border border-white/20 fixed top-6 z-[310]"
        onClick={e => e.stopPropagation()}
      >
        <div className="hidden md:flex flex-col border-r border-white/20 pr-6 mr-2">
          <span className="text-white font-heading italic text-lg leading-none">Sahaya Savari F</span>
          <span className="text-white/50 font-body text-[10px] uppercase tracking-widest mt-1">M.Sc Artificial Intelligence • Resume</span>
        </div>
        <div className="flex items-center gap-2 border-r border-white/20 pr-6">
          <button onClick={zoomOut} className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Zoom Out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-white/60 font-mono text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Zoom In">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={fitWidth} className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors ml-2" aria-label="Fit Width">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <a href={pdfUrl} download className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Download Resume">
            <Download className="w-4 h-4" />
          </a>
          <button onClick={onClose} className="w-10 h-10 liquid-glass-strong rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors bg-white/10" aria-label="Close Viewer">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Container */}
      <div 
        className="relative overflow-y-auto w-full max-w-4xl flex-grow flex flex-col items-center hide-scrollbar rounded-xl"
        onClick={e => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-white/50 animate-spin" />
          </div>
        )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="h-[800px] w-full max-w-2xl bg-white/5 rounded-xl animate-pulse" />}
          className="flex flex-col items-center"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="mb-6 shadow-2xl rounded-lg overflow-hidden bg-white/5">
              <Page
                pageNumber={index + 1}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={<div className="h-[800px] w-full max-w-2xl bg-white/5 rounded-xl animate-pulse" />}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default ResumeViewer;
