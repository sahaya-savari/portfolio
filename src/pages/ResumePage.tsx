import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, ExternalLink } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ErrorBoundary from '../components/ErrorBoundary';
import { SITE_URL, createBreadcrumbSchema } from '../seo';

const RESUME_FILE_URL = `/resume.pdf?v=${typeof __RESUME_HASH__ !== 'undefined' ? __RESUME_HASH__ : Date.now()}`;

const ResumeViewer = lazy(() => import('../components/ResumeViewer'));

export default function ResumePage() {
  const [showCanvasViewer, setShowCanvasViewer] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resumeSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Resume', url: `${SITE_URL}/resume` },
    ]);
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/resume/#webpage`,
          url: `${SITE_URL}/resume`,
          name: 'Resume | Sahaya Savari',
          description: 'View and download the complete curriculum vitae of Sahaya Savari, M.Sc. Artificial Intelligence student, AI/ML & Full Stack Developer.',
          author: { '@id': `${SITE_URL}/#person` },
        },
      ],
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Resume & Curriculum Vitae | Sahaya Savari"
        description="View and download the complete curriculum vitae of Sahaya Savari, M.Sc. Artificial Intelligence student, AI/ML & Full Stack Developer."
        url={`${SITE_URL}/resume`}
        schema={resumeSchema}
      />
      <div className="pt-28 pb-20 px-4 md:px-6 max-w-screen-md mx-auto min-h-screen">
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio Home
          </Link>

          <a 
            href={RESUME_FILE_URL} 
            download="Sahaya_Savari_Resume.pdf" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-body font-medium hover:bg-white/90 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>
        </div>

        <header className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading italic">Curriculum Vitae</h1>
              <p className="text-white/60 font-body text-sm">Sahaya Savari · AI/ML & Full Stack Developer</p>
            </div>
          </div>
        </header>

        {/* Semantic Resume Highlights Summary */}
        <section aria-label="Curriculum Vitae Summary" className="mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10 font-body text-sm text-white/80 space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Professional Positioning</h2>
            <p className="text-white/90 leading-relaxed">
              M.Sc. Artificial Intelligence student specializing in Machine Learning engineering, Python backend services, and modern React full-stack applications. Available for AI/ML and software engineering internships in Summer/Fall 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Education</h3>
              <p className="font-medium text-white">M.Sc. Artificial Intelligence</p>
              <p className="text-xs text-white/60">St. Joseph's College (Autonomous), Trichy</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Core Tech Stack</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Python, TypeScript, React, FastAPI, LLM Prompt Engineering, Firebase, Vite, Tailwind CSS
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span><strong>Selected Projects:</strong> PrepMind AI, Daily Spark, Portfolio Architecture</span>
            <a href={RESUME_FILE_URL} download="Sahaya_Savari_Resume.pdf" className="text-purple-300 hover:text-white underline font-medium">Download Official Resume (PDF)</a>
          </div>
        </section>

        {/* Progressive PDF Document Viewer Container */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-body">
            <div className="flex items-center gap-2 text-white/70">
              <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
              <span>Official Document · Sahaya_Savari_Resume.pdf (33 KB)</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={RESUME_FILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                aria-label="Open PDF resume in a new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
              <span className="text-white/20" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => setShowCanvasViewer(prev => !prev)}
                className="text-purple-300 hover:text-white transition-colors cursor-pointer"
                aria-label={showCanvasViewer ? "Switch to native PDF preview" : "Switch to interactive canvas viewer"}
              >
                {showCanvasViewer ? "Switch to Native Viewer" : "Use Canvas Viewer"}
              </button>
            </div>
          </div>

          {showCanvasViewer ? (
            <ErrorBoundary>
              <Suspense fallback={
                <div className="min-h-[500px] rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white/50" />
                </div>
              }>
                <ResumeViewer inlineEmbed onClose={() => setShowCanvasViewer(false)} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
              {/* Native PDF Embed for Desktop */}
              <object
                data={RESUME_FILE_URL}
                type="application/pdf"
                className="w-full h-[800px] hidden md:block"
                aria-label="Sahaya Savari Curriculum Vitae PDF"
              >
                <div className="p-12 text-center text-sm text-white/70 space-y-4">
                  <p>Your browser does not embed PDF documents inline.</p>
                  <a
                    href={RESUME_FILE_URL}
                    download="Sahaya_Savari_Resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume (PDF)
                  </a>
                </div>
              </object>

              {/* Mobile Fallback Card */}
              <div className="md:hidden p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-purple-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading italic text-xl text-white">Curriculum Vitae</h3>
                  <p className="text-white/60 text-xs font-body max-w-xs mx-auto leading-relaxed">
                    Tap below to open or download the complete PDF resume directly on your device.
                  </p>
                </div>
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <a
                    href={RESUME_FILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open PDF in Browser
                  </a>
                  <a
                    href={RESUME_FILE_URL}
                    download="Sahaya_Savari_Resume.pdf"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF File
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
