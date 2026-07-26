export const SITE_URL = 'https://sahayasavari.me';
export const SITE_NAME = 'Sahaya Savari Portfolio';
export const DEFAULT_TITLE = 'Sahaya Savari | AI/ML & Full Stack Developer';
export const DEFAULT_DESCRIPTION =
  'Portfolio of Sahaya Savari, an M.Sc. AI student and AI/ML & Full Stack Developer building Machine Learning tools, Python APIs, React apps, and scalable software.';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sahaya Savari',
  url: SITE_URL,
  jobTitle: 'AI/ML & Full Stack Developer',
  description:
    'M.Sc. Artificial Intelligence Student, AI/ML & Full Stack Developer building Machine Learning tools, Python APIs, React apps, and scalable software applications.',
  email: 'contact@sahayasavari.me',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madurai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/in/sahaya-savari',
    'https://github.com/sahaya-savari',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'AI/ML',
    'Full Stack Development',
    'Python',
    'React',
    'FastAPI',
    'Firebase',
    'TypeScript',
    'JavaScript',
    'REST APIs',
    'Software Development',
    'Open Source',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sahaya Savari Portfolio',
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  author: {
    '@type': 'Person',
    name: 'Sahaya Savari',
    url: SITE_URL,
  },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

