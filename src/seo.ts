export const SITE_URL = 'https://sahayasavari.me';
export const SITE_NAME = 'Sahaya Savari F Portfolio';
export const DEFAULT_TITLE = 'Sahaya Savari F | AI Engineer, Full Stack Developer & M.Sc. AI Student';
export const DEFAULT_DESCRIPTION =
  'Portfolio of Sahaya Savari F, an AI Engineer, Python Developer, Full Stack Developer, and M.Sc. Artificial Intelligence student building Machine Learning, React, TypeScript, and Firebase projects.';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sahaya Savari F',
  url: SITE_URL,
  jobTitle: 'AI Engineer',
  description:
    'AI Engineer, Python Developer, Full Stack Developer, and M.Sc. Artificial Intelligence student at St. Josephs College, Trichy, focused on Machine Learning, LLM applications, React, TypeScript, and Firebase projects.',
  email: 'sahayasavari.info@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madurai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'St. Josephs College (Autonomous), Trichy',
    url: 'https://www.sjctni.edu',
  },
  sameAs: [
    'https://www.linkedin.com/in/sahaya-savari',
    'https://github.com/sahaya-savari',
  ],
  knowsAbout: [
    'AI Engineer',
    'Artificial Intelligence',
    'Machine Learning',
    'Python Developer',
    'Full Stack Developer',
    'React',
    'TypeScript',
    'Firebase',
    'Portfolio',
    'Data Analytics',
    'LLM Applications',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  author: {
    '@type': 'Person',
    name: 'Sahaya Savari F',
    url: SITE_URL,
  },
  inLanguage: 'en-US',
};

export const collegeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  name: 'St. Josephs College (Autonomous), Trichy',
  url: 'https://www.sjctni.edu',
  sameAs: 'https://www.sjctni.edu',
};
