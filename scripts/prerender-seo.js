import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

const SITE_URL = 'https://sahayasavari.me';

const ROUTES = [
  {
    path: '/',
    title: 'Sahaya Savari | AI/ML & Full Stack Developer',
    description: 'Portfolio of Sahaya Savari, an M.Sc. AI student and AI/ML & Full Stack Developer building Machine Learning tools, Python APIs, React apps, and scalable software.',
    canonical: `${SITE_URL}`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sahaya Savari',
      url: SITE_URL,
      jobTitle: 'AI/ML & Full Stack Developer',
      sameAs: [
        'https://www.linkedin.com/in/sahaya-savari',
        'https://github.com/sahaya-savari'
      ]
    }
  },
  {
    path: '/projects',
    title: 'Projects | Sahaya Savari',
    description: 'Explore machine learning applications, Python APIs, full stack React apps, open-source contributions, and software architectures created by Sahaya Savari.',
    canonical: `${SITE_URL}/projects`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` }
      ]
    }
  },
  {
    path: '/resume',
    title: 'Resume | Sahaya Savari',
    description: 'View and download the complete curriculum vitae of Sahaya Savari, M.Sc. Artificial Intelligence student, AI/ML & Full Stack Developer.',
    canonical: `${SITE_URL}/resume`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Resume', item: `${SITE_URL}/resume` }
      ]
    }
  },
  {
    path: '/blog',
    title: 'Blog | Sahaya Savari',
    description: 'Technical articles and insights on Artificial Intelligence, Machine Learning pipelines, React performance optimization, and software engineering by Sahaya Savari.',
    canonical: `${SITE_URL}/blog`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` }
      ]
    }
  },
  {
    path: '/recruiter',
    title: 'Recruiter Summary | Sahaya Savari',
    description: 'ATS-friendly recruiter summary for Sahaya Savari F, an AI Engineer, Python Developer, Full Stack Developer, and M.Sc. Artificial Intelligence student.',
    canonical: `${SITE_URL}/recruiter`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Recruiter Summary', item: `${SITE_URL}/recruiter` }
      ]
    }
  },
  {
    path: '/ai',
    title: 'Ask Sahaya AI | Interactive Digital Assistant',
    description: 'Interact with an AI assistant trained on Sahaya Savari\'s background, technical skills, projects, and career experience.',
    canonical: `${SITE_URL}/ai`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Ask Sahaya AI', item: `${SITE_URL}/ai` }
      ]
    }
  },
  {
    path: '/projects/prepmind-ai',
    title: 'PrepMind AI | Sahaya Savari',
    description: 'PrepMind AI is a comprehensive interview preparation platform that leverages LLMs to simulate realistic technical and behavioral interviews. It provides tailored feedback, tracks progress, and helps candidates build confidence.',
    canonical: `${SITE_URL}/projects/prepmind-ai`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
        { '@type': 'ListItem', position: 3, name: 'PrepMind AI', item: `${SITE_URL}/projects/prepmind-ai` }
      ]
    }
  },
  {
    path: '/projects/daily-spark',
    title: 'Daily Spark | Sahaya Savari',
    description: 'A privacy-first, local-storage based habit tracking application designed to help users build consistent routines without the clutter of traditional productivity tools.',
    canonical: `${SITE_URL}/projects/daily-spark`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
        { '@type': 'ListItem', position: 3, name: 'Daily Spark', item: `${SITE_URL}/projects/daily-spark` }
      ]
    }
  },
  {
    path: '/projects/neobeat',
    title: 'NeoBeat | Sahaya Savari',
    description: 'NeoBeat is an experimental web application for discovering independent artists, featuring a brutalist UI and synchronized audio visualizations.',
    canonical: `${SITE_URL}/projects/neobeat`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
        { '@type': 'ListItem', position: 3, name: 'NeoBeat', item: `${SITE_URL}/projects/neobeat` }
      ]
    }
  },
  {
    path: '/projects/portfolio-website',
    title: 'Portfolio Website | Sahaya Savari',
    description: 'A masterclass in modern frontend development, this portfolio leverages Framer Motion for liquid-smooth animations and hardware-accelerated transitions. It features a custom glassmorphism design system, responsive grids, and an isolated state architecture for maximum performance.',
    canonical: `${SITE_URL}/projects/portfolio-website`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
        { '@type': 'ListItem', position: 3, name: 'Portfolio Website', item: `${SITE_URL}/projects/portfolio-website` }
      ]
    }
  }
];

function prerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error(`Error: Base ${INDEX_HTML_PATH} does not exist. Run vite build first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  console.log(`Starting SEO static HTML pre-rendering for ${ROUTES.length} routes...`);

  for (const route of ROUTES) {
    let html = baseHtml;

    // 1. Title
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${route.title}</title>`);

    // 2. Canonical
    html = html.replace(/<link rel="canonical" href=".*?" \/>/gi, `<link rel="canonical" href="${route.canonical}" />`);

    // 3. Description
    html = html.replace(/<meta name="description" content=".*?" \/>/gi, `<meta name="description" content="${route.description}" />`);

    // 4. Open Graph
    html = html.replace(/<meta property="og:title" content=".*?" \/>/gi, `<meta property="og:title" content="${route.title}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/gi, `<meta property="og:description" content="${route.description}" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/gi, `<meta property="og:url" content="${route.canonical}" />`);

    // 5. Twitter Card
    html = html.replace(/<meta name="twitter:title" content=".*?" \/>/gi, `<meta name="twitter:title" content="${route.title}" />`);
    html = html.replace(/<meta name="twitter:description" content=".*?" \/>/gi, `<meta name="twitter:description" content="${route.description}" />`);

    // 6. JSON-LD Schema injection
    if (route.schema) {
      const jsonLd = `<script type="application/ld+json">${JSON.stringify(route.schema)}</script>\n  </head>`;
      html = html.replace('</head>', jsonLd);
    }

    // Determine file output target
    if (route.path === '/') {
      fs.writeFileSync(INDEX_HTML_PATH, html, 'utf-8');
      console.log(`  [✓] Pre-rendered / -> dist/index.html`);
    } else {
      const targetDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
      fs.mkdirSync(targetDir, { recursive: true });
      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, html, 'utf-8');
      console.log(`  [✓] Pre-rendered ${route.path} -> ${path.relative(DIST_DIR, targetFile)}`);
    }
  }

  console.log('SEO pre-rendering completed successfully!');
}

prerender();
