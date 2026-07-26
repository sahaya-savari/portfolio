import { useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ErrorBoundary from '../components/ErrorBoundary';
import { SITE_URL, createBreadcrumbSchema } from '../seo';

const ResumeViewer = lazy(() => import('../components/ResumeViewer'));

export default function ResumePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resumeBreadcrumbs = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Resume', url: `${SITE_URL}/resume` },
  ]);

  return (
    <>
      <SEOHead 
        title="Resume | Sahaya Savari"
        description="View and download the complete curriculum vitae of Sahaya Savari, M.Sc. Artificial Intelligence student, AI/ML & Full Stack Developer."
        url={`${SITE_URL}/resume`}
        schema={resumeBreadcrumbs}
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
            href="/resume.pdf" 
            download 
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

        <ErrorBoundary>
          <Suspense fallback={
            <div className="min-h-[500px] rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white/50"></div>
            </div>
          }>
            <ResumeViewer inlineEmbed onClose={() => {}} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
