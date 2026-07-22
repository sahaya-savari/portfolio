import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SITE_URL } from '../seo';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="404 Not Found | Sahaya Savari F Portfolio"
        description="The page you are looking for does not exist."
        url={`${SITE_URL}/404`}
        robots="noindex, nofollow"
      />
      <div className="pt-32 pb-24 px-6 max-w-screen-md mx-auto min-h-screen bg-black text-white flex flex-col items-center justify-center text-center selection:bg-white selection:text-black">
        <h1 className="text-9xl font-heading italic tracking-tight mb-4 text-white/20">404</h1>
        <h2 className="text-3xl font-heading italic tracking-tight mb-6">Page Not Found</h2>
        <p className="text-lg font-body text-white/60 mb-12 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>
    </>
  );
}
