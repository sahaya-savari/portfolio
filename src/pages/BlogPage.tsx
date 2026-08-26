import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import BlogSection from '../sections/BlogSection';
import { SITE_URL, createBreadcrumbSchema, techArticleSchemas } from '../seo';

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
    ]);
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'Blog',
          '@id': `${SITE_URL}/blog/#webpage`,
          url: `${SITE_URL}/blog`,
          name: 'Blog | Sahaya Savari',
          description: 'Technical articles and insights on Artificial Intelligence, Machine Learning pipelines, React performance optimization, and software engineering by Sahaya Savari.',
          author: { '@id': `${SITE_URL}/#person` },
        },
        ...techArticleSchemas,
      ],
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Technical Articles & Engineering Insights | Sahaya Savari"
        description="Technical articles and insights on Artificial Intelligence, Machine Learning pipelines, React performance optimization, and software engineering by Sahaya Savari."
        url={`${SITE_URL}/blog`}
        schema={blogSchema}
      />
      <div className="pt-28 pb-16 px-4 md:px-6 max-w-screen-xl mx-auto min-h-screen">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio Home
          </Link>
        </div>

        {/* Semantic Overview & Publication Scope */}
        <section aria-label="About the Engineering Blog" className="mb-8 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 font-body text-sm text-white/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Engineering Journal &amp; Publications</h2>
              <p className="text-white font-medium text-base">Technical Writings by Sahaya Savari</p>
            </div>
            <a
              href="https://blog.sahayasavari.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white font-mono transition-colors"
            >
              blog.sahayasavari.dev
            </a>
          </div>
          <p className="text-white/70 leading-relaxed">
            Welcome to my technical engineering blog. Here I document practical development insights, architectural patterns, and production engineering notes across Artificial Intelligence, Machine Learning pipelines, Python backend services with FastAPI, full-stack React and TypeScript web development, and DevOps CI/CD automation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10 text-xs">
            <div>
              <span className="block font-semibold text-white/90 mb-1">AI &amp; Machine Learning</span>
              <p className="text-white/50">LLM agent architectures, prompt design, and data validation workflows.</p>
            </div>
            <div>
              <span className="block font-semibold text-white/90 mb-1">Full Stack &amp; Web</span>
              <p className="text-white/50">React performance optimization, modern Tailwind CSS, and single-page apps.</p>
            </div>
            <div>
              <span className="block font-semibold text-white/90 mb-1">DevOps &amp; Infrastructure</span>
              <p className="text-white/50">GitHub Actions pipelines, static pre-rendering, and CDN hosting strategies.</p>
            </div>
          </div>
        </section>

        <BlogSection />
      </div>
    </>
  );
}

