import { useEffect, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ErrorBoundary from '../components/ErrorBoundary';
import { SITE_URL, createBreadcrumbSchema } from '../seo';
import resumePdf from '../assets/resume.pdf';

const ResumeViewer = lazy(() => import('../components/ResumeViewer'));

export default function ResumePage() {
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
            href={resumePdf} 
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
            <a href={resumePdf} download="Sahaya_Savari_Resume.pdf" className="text-purple-300 hover:text-white underline font-medium">Download Official Resume (PDF)</a>
          </div>
        </section>

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
