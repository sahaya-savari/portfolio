import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const SERVER_DIR = path.resolve(__dirname, '../.tmp-server');
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
      '@id': `${SITE_URL}/#person`,
      name: 'Sahaya Savari',
      alternateName: 'Sahaya Savari F',
      url: SITE_URL,
      jobTitle: 'AI/ML & Full Stack Developer',
      description: 'M.Sc. Artificial Intelligence Student, AI/ML & Full Stack Developer building Machine Learning tools, Python APIs, React apps, and scalable software applications.',
      email: 'contact@sahayasavari.me',
      affiliation: {
        '@type': 'EducationalOrganization',
        name: "St. Joseph's College (Autonomous), Trichy"
      },
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Python',
        'React',
        'FastAPI',
        'Firebase',
        'TypeScript',
        'Tailwind CSS',
        'Vite'
      ],
      sameAs: [
        'https://www.linkedin.com/in/sahaya-savari',
        'https://github.com/sahaya-savari',
        'https://blog.sahayasavari.me'
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
    title: 'Ask Sahaya AI | Portfolio Assistant for AI Engineering',
    description: "Chat with Sahaya Savari F's portfolio assistant to learn about his AI Engineer skills, Machine Learning projects, Python, React, TypeScript, and Firebase work.",
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

async function prerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error(`Error: Base ${INDEX_HTML_PATH} does not exist. Run vite build first.`);
    process.exit(1);
  }

  console.log('Building server module for static HTML pre-rendering...');
  await build({
    build: {
      ssr: path.resolve(__dirname, '../src/entry-server.tsx'),
      outDir: SERVER_DIR,
      minify: false,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'esm'
        }
      }
    },
    configFile: false
  });

  const serverBundlePath = path.join(SERVER_DIR, 'entry-server.js');
  const { render } = await import(pathToFileURL(serverBundlePath).href);

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  console.log(`Starting SEO static HTML pre-rendering for ${ROUTES.length} routes...`);

  for (const route of ROUTES) {
    let html = baseHtml;

    // Render React components to static HTML for this route
    let appHtml = '';
    try {
      const rendered = render(route.path);
      appHtml = rendered.html || '';
    } catch (err) {
      console.warn(`[Warning] Failed to render React tree for route ${route.path}:`, err);
    }

    // Inject rendered React app into #root (stripping duplicate helmet metadata tags so metadata exists only in <head>)
    if (appHtml) {
      const cleanAppHtml = appHtml
        .replace(/<title>.*?<\/title>/gi, '')
        .replace(/<meta\b[^>]*\/?>/gi, '')
        .replace(/<link\b[^>]*rel=["']canonical["'][^>]*\/?>/gi, '');
      html = html.replace('<div id="root"></div>', `<div id="root">${cleanAppHtml}</div>`);
    } else {
      console.error(`[Error] appHtml was empty for route ${route.path}!`);
    }

    // Update noscript block to be clean and informative
    const updatedNoscript = `<noscript><div style="padding:1.5rem;text-align:center;color:#fff;background:#000;font-family:sans-serif;"><p style="font-size:1.25rem;font-weight:700;margin:0 0 0.5rem;">Sahaya Savari - Portfolio</p><p>JavaScript is recommended for interactive animations. Full static page content is displayed above.</p></div></noscript>`;
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, updatedNoscript);

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
      console.log(`  [✓] Pre-rendered / -> dist/index.html (${appHtml.length} bytes body HTML)`);
    } else {
      const targetDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
      fs.mkdirSync(targetDir, { recursive: true });
      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, html, 'utf-8');
      console.log(`  [✓] Pre-rendered ${route.path} -> ${path.relative(DIST_DIR, targetFile)} (${appHtml.length} bytes body HTML)`);
    }
  }

  // Generate automated sitemap.xml in dist/
  const DEFAULT_LASTMOD = '2026-08-15';
  const sitemapEntries = ROUTES.map(r => `  <url>
    <loc>${r.canonical}</loc>
    <changefreq>${r.path === '/' || r.path === '/projects' || r.path === '/blog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : r.path.startsWith('/projects') || r.path === '/blog' ? '0.9' : '0.8'}</priority>
    <lastmod>${r.lastmod || DEFAULT_LASTMOD}</lastmod>
  </url>`).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>\n`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`  [✓] Generated automated dist/sitemap.xml (${ROUTES.length} routes)`);

  // Cleanup temporary server build directory
  try {
    fs.rmSync(SERVER_DIR, { recursive: true, force: true });
  } catch (e) {
    // Ignore cleanup error
  }

  console.log('SEO pre-rendering completed successfully!');
}

prerender();
