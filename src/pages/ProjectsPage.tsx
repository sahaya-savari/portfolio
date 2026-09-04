import { useEffect, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SITE_URL, createBreadcrumbSchema } from '../seo';

const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const OpenSourceSection = lazy(() => import('../sections/OpenSourceSection'));

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projectsSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Projects', url: `${SITE_URL}/projects` },
    ]);
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/projects/#webpage`,
          url: `${SITE_URL}/projects`,
          name: 'Projects | Sahaya Savari',
          description: 'Explore machine learning applications, Python APIs, full stack React apps, open-source contributions, and software architectures created by Sahaya Savari.',
          author: { '@id': `${SITE_URL}/#person` },
        },
      ],
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="AI Projects & Case Studies | Sahaya Savari"
        description="Explore machine learning applications, Python APIs, full stack React apps, open-source contributions, and software architectures created by Sahaya Savari."
        url={`${SITE_URL}/projects`}
        schema={projectsSchema}
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

        <Suspense fallback={
          <div className="py-24 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white/50" />
          </div>
        }>
          <ProjectsSection />
          <div className="my-16 section-divider" aria-hidden="true" />
          <OpenSourceSection />
        </Suspense>
      </div>
    </>
  );
}
