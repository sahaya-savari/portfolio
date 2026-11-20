export const SITE_URL = "https://sahayasavari.dev";
export const SITE_NAME = "Sahaya Savari";
export const DEFAULT_TITLE = "Sahaya Savari F | Student AI/ML Engineer";
export const DEFAULT_DESCRIPTION =
  "M.Sc. AI student building and shipping web apps with React, TypeScript, Next.js and Python. Seeking Summer 2027 internships in software engineering, backend, and applied AI.";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const personEntity = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Sahaya Savari F",
  alternateName: "Sahaya Savari",
  image: `${SITE_URL}/profile.jpg`,
  url: SITE_URL,
  jobTitle: "Student AI/ML Engineer",
  description:
    "M.Sc. AI student building and shipping web apps with React, TypeScript, Next.js and Python. Seeking Summer 2027 internships in software engineering, backend, and applied AI.",
  email: "contact@sahayasavari.dev",
  telephone: "+91-6385648514",
  // Current student affiliation - not alumniOf as degree is ongoing
  affiliation: {
    "@type": "EducationalOrganization",
    name: "St. Joseph's College (Autonomous), Tiruchirappalli",
  },
  // Occupation reflects demonstrated and active role
  hasOccupation: {
    "@type": "Occupation",
    name: "Student AI/ML Engineer & Digital Marketing Intern",
    occupationLocation: {
      "@type": "Country",
      name: "India",
    },
    skills: "Python, React, TypeScript, Next.js, SQL, Machine Learning, Data Analytics",
  },
  sameAs: [
    "https://www.linkedin.com/in/sahaya-savari",
    "https://github.com/sahaya-savari",
    "https://gitlab.com/sahaya-savari",
    "https://blog.sahayasavari.dev",
    "https://leetcode.com/u/sahaya_savari/",
  ],
  // Demonstrated expertise from projects, articles, and certifications
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Analytics",
    "Python",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "SQL",
    "PostgreSQL",
    "Git & GitHub",
    "Full Stack Development",
    "Web Development",
    "Firebase",
    "REST APIs",
    "Software Development",
    "Cybersecurity Fundamentals",
  ],
};

export const websiteEntity = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Sahaya Savari Portfolio",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  author: {
    "@id": `${SITE_URL}/#person`,
  },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const profilePageEntity = {
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Sahaya Savari | Personal Portfolio & Profile",
  description: DEFAULT_DESCRIPTION,
  mainEntity: {
    "@id": `${SITE_URL}/#person`,
  },
};

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [personEntity, websiteEntity, profilePageEntity],
};

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// TechArticle schemas derived from the actual published articles in src/data.ts
export const techArticleSchemas = [
  {
    "@type": "TechArticle",
    "@id": `https://blog.sahayasavari.dev/blog/ai-agents-from-scratch#article`,
    headline: "Building Autonomous AI Agents from Scratch in Async Python",
    description:
      "An engineering guide to designing autonomous LLM agent loops, tool call schemas, and memory management using Python.",
    url: "https://blog.sahayasavari.dev/blog/ai-agents-from-scratch",
    datePublished: "2026-07-23",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  },
  {
    "@type": "TechArticle",
    "@id": `https://blog.sahayasavari.dev/blog/pydantic-v2-guide#article`,
    headline: "Pydantic V2 Deep Dive: Validation, Custom Serialization & Core Architecture",
    description:
      "Leveraging Pydantic V2 Rust core for strict schema enforcement, fast JSON serialization, and LLM output parsing in Python applications.",
    url: "https://blog.sahayasavari.dev/blog/pydantic-v2-guide",
    datePublished: "2026-07-23",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  },
  {
    "@type": "TechArticle",
    "@id": `https://blog.sahayasavari.dev/blog/tailwind-css-v4-guide#article`,
    headline: "Tailwind CSS v4 Guide: Oxide Engine, @theme Directive & Dynamic Utilities",
    description:
      "Upgrading to Tailwind CSS v4 in React 19 and Vite 7 for zero-config CSS builds and hardware-accelerated CSS variable theming.",
    url: "https://blog.sahayasavari.dev/blog/tailwind-css-v4-guide",
    datePublished: "2026-07-23",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  },
  {
    "@type": "TechArticle",
    "@id": `https://blog.sahayasavari.dev/blog/github-actions-ci-cd#article`,
    headline: "GitHub Actions CI/CD Pipelines: Automated Testing, Linting & Container Deployment",
    description:
      "Automating static HTML pre-rendering, automated test runs, and Firebase Hosting preview channel deployments using GitHub Actions workflows.",
    url: "https://blog.sahayasavari.dev/blog/github-actions-ci-cd",
    datePublished: "2026-07-23",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  },
];

// SoftwareApplication schema for the Ask Sahaya AI interactive assistant page (/ai)
export const askSahayaAIAppSchema = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/ai/#app`,
  name: "Ask Sahaya AI",
  description:
    "An interactive portfolio assistant that answers questions about Sahaya Savari's AI engineering skills, Machine Learning projects, Python experience, and how to contact him.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  url: `${SITE_URL}/ai`,
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
};

// Builds the per-route head() tags (previously rendered by SEOHead via Helmet).
export const buildSeoHead = ({
  title,
  description,
  url = SITE_URL,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index, follow",
}: {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  robots?: string;
}) => {
  const canonicalUrl = url.replace(/\/$/, "") || SITE_URL;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:type", content: type },
      { property: "og:url", content: canonicalUrl },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:image:secure_url", content: image },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${title} portfolio preview` },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: canonicalUrl },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: `${title} portfolio preview` },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
};
