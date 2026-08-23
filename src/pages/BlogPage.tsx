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

        <BlogSection />
      </div>
    </>
  );
}

