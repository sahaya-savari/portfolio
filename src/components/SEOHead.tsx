// Title, description, canonical, Open Graph and Twitter tags are set by each
// route's head() (see buildSeoHead in ../seo). This component keeps emitting
// the page's JSON-LD schema exactly as before.
interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  schema?: Record<string, unknown>;
  robots?: string;
}

export default function SEOHead({ schema }: SEOHeadProps) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
