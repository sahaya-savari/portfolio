export const SITE_URL = 'https://sahayasavari.me';
export const SITE_NAME = 'Sahaya Savari';
export const DEFAULT_TITLE = 'Sahaya Savari F | AI Engineer & M.Sc. AI Student';
export const DEFAULT_DESCRIPTION =
  'Portfolio of Sahaya Savari F, an M.Sc. Artificial Intelligence student, AI Engineer, and Full Stack Developer building Machine Learning solutions, Python APIs, and React web applications.';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const personEntity = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Sahaya Savari F',
  alternateName: 'Sahaya Savari',
  url: SITE_URL,
  jobTitle: 'AI/ML & Full Stack Developer',
  description:
    'M.Sc. Artificial Intelligence Student, AI Engineer, Python Developer, and Full Stack Developer building Machine Learning solutions, Python APIs, React applications, and LLM-integrated tools.',
  email: 'contact@sahayasavari.me',
  // Current student affiliation — not alumniOf as degree is ongoing
  affiliation: {
    '@type': 'EducationalOrganization',
    name: "St. Joseph's College (Autonomous), Tiruchirappalli",
  },
  // Occupation reflects demonstrated and active role
  hasOccupation: {
    '@type': 'Occupation',
    name: 'AI Engineer & Full Stack Developer',
    occupationLocation: {
      '@type': 'Country',
      name: 'India',
    },
    skills: 'Machine Learning, Python, React, TypeScript, FastAPI, LLM Applications',
  },
  sameAs: [
    'https://www.linkedin.com/in/sahaya-savari',
    'https://github.com/sahaya-savari',
    'https://blog.sahayasavari.me',
    'https://leetcode.com/u/sahaya_savari/',
  ],
  // Demonstrated expertise from projects, articles, and certifications
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'LLM Applications',
    'AI Agent Architecture',
    'Generative AI',
    'Prompt Engineering',
    'Python',
    'FastAPI',
    'Flask',
    'React',
    'TypeScript',
    'Full Stack Development',
    'Web Development',
    'Firebase',
    'REST APIs',
    'GitHub Actions CI/CD',
    'Pydantic',
    'Data Analysis',
    'Software Development',
    'Open Source',
  ],
};

export const websiteEntity = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Sahaya Savari Portfolio',
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  author: {
    '@id': `${SITE_URL}/#person`,
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

export const profilePageEntity = {
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: 'Sahaya Savari | Personal Portfolio & Profile',
  description: DEFAULT_DESCRIPTION,
  mainEntity: {
    '@id': `${SITE_URL}/#person`,
  },
};

export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    personEntity,
    websiteEntity,
    profilePageEntity,
  ],
};

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// TechArticle schemas derived from the actual published articles in src/data.ts
export const techArticleSchemas = [
  {
    '@type': 'TechArticle',
    '@id': `https://blog.sahayasavari.me/blog/ai-agents-from-scratch#article`,
    headline: 'Building AI Agents from Scratch in Python',
    description:
      'An engineering guide to designing autonomous LLM agent loops, tool call schemas, and memory management using Python.',
    url: 'https://blog.sahayasavari.me/blog/ai-agents-from-scratch',
    datePublished: '2026-02-10',
    author: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en-US',
  },
  {
    '@type': 'TechArticle',
    '@id': `https://blog.sahayasavari.me/blog/pydantic-v2-guide#article`,
    headline: 'Pydantic V2: High-Performance Data Validation',
    description:
      'Leveraging Pydantic V2 Rust core for strict schema enforcement, fast JSON serialization, and LLM output parsing in Python applications.',
    url: 'https://blog.sahayasavari.me/blog/pydantic-v2-guide',
    datePublished: '2026-01-28',
    author: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en-US',
  },
  {
    '@type': 'TechArticle',
    '@id': `https://blog.sahayasavari.me/blog/tailwind-css-v4-guide#article`,
    headline: 'Tailwind CSS v4 Migration & Performance',
    description:
      'Upgrading to Tailwind CSS v4 in React 19 and Vite 7 for zero-config CSS builds and hardware-accelerated CSS variable theming.',
    url: 'https://blog.sahayasavari.me/blog/tailwind-css-v4-guide',
    datePublished: '2026-01-15',
    author: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en-US',
  },
  {
    '@type': 'TechArticle',
    '@id': `https://blog.sahayasavari.me/blog/github-actions-ci-cd#article`,
    headline: 'Production CI/CD Pipelines with GitHub Actions',
    description:
      'Automating static HTML pre-rendering, automated test runs, and Firebase Hosting preview channel deployments using GitHub Actions workflows.',
    url: 'https://blog.sahayasavari.me/blog/github-actions-ci-cd',
    datePublished: '2025-12-20',
    author: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en-US',
  },
];

// SoftwareApplication schema for the Ask Sahaya AI interactive assistant page (/ai)
export const askSahayaAIAppSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/ai/#app`,
  name: 'Ask Sahaya AI',
  description:
    "An interactive portfolio assistant that answers questions about Sahaya Savari's AI engineering skills, Machine Learning projects, Python experience, and how to contact him.",
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: `${SITE_URL}/ai`,
  author: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'en-US',
};
