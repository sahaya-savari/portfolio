import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import BlogSection from '../sections/BlogSection';
import { SITE_URL, createBreadcrumbSchema } from '../seo';

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogBreadcrumbs = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ]);

  return (
    <>
      <SEOHead 
        title="Developer Blog & AI Technical Articles | Sahaya Savari"
        description="Technical articles and insights on Artificial Intelligence, Machine Learning pipelines, React performance optimization, and software engineering by Sahaya Savari."
        url={`${SITE_URL}/blog`}
        schema={blogBreadcrumbs}
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

        <BlogSection />
      </div>
    </>
  );
}
