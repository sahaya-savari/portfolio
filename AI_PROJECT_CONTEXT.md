# AI_PROJECT_CONTEXT.md — Master Project Context & Architecture Reference

> **Internal Master Project Context / Handoff Document**  
> This file is the primary, single source of truth for **Sahaya Savari F's** production portfolio repository (`sahayasavari.me`). It is specifically designed so that future AI coding agents (especially Antigravity) can understand the entire project ecosystem, architecture, dependencies, security rules, and operational constraints without relying on external context or previous chat conversations.

---

## Infrastructure Verification Classification Matrix

To ensure technical rigor, all infrastructure, hosting, and operational claims in this document are classified strictly by their source of verification:

| Infrastructure Claim / Fact | Verification Category | Source Evidence & Verification Basis |
| :--- | :--- | :--- |
| **Firebase Project ID** (`my-portfolio-fss`) | **1. VERIFIED FROM REPOSITORY** | `.firebaserc` (`projects.default = "my-portfolio-fss"`) |
| **Firebase Hosting Target** (`sahayasavari`) | **1. VERIFIED FROM REPOSITORY** | `firebase.json` & `.firebaserc` (`targets.my-portfolio-fss.hosting.sahayasavari`) |
| **Firebase Hosting Config & Headers** | **1. VERIFIED FROM REPOSITORY** | `firebase.json` (rewrites, CSP, HSTS, Cache-Control rules) |
| **Installed Package Versions** | **1. VERIFIED FROM REPOSITORY** | `package.json` & `package-lock.json` (React 19.2.3, Vite 7.2.4, etc.) |
| **Production Build Command** | **1. VERIFIED FROM REPOSITORY** | `package.json` (`"build": "vite build && node scripts/prerender-seo.js"`) |
| **SSR Pre-rendering Architecture** | **1. VERIFIED FROM REPOSITORY** | `scripts/prerender-seo.js` & `src/entry-server.tsx` |
| **Active Routes (9 Routes)** | **1. VERIFIED FROM REPOSITORY** | `src/App.tsx`, `scripts/prerender-seo.js`, `public/sitemap.xml` |
| **NeoBeat Purged/Archived Status** | **1. VERIFIED FROM REPOSITORY** | Purged from `src/`, `public/`, `sitemap.xml`, and `App.tsx` |
| **SEO Metadata & Person Schema** | **1. VERIFIED FROM REPOSITORY** | `src/seo.ts` (`name: "Sahaya Savari F"`, `alternateName: "Sahaya Savari"`, `sameAs`) |
| **Origin Robots.txt Policy** | **1. VERIFIED FROM REPOSITORY** | `public/robots.txt` (Search engines allowed; AI-training blocked) |
| **Sitemap XML Content** | **1. VERIFIED FROM REPOSITORY** | `public/sitemap.xml` (9 canonical URLs, valid XML) |
| **Git Baseline & Commit History** | **1. VERIFIED FROM REPOSITORY** | Git repository (`HEAD` commit `0662fe7` on `main`) |
| **Live Homepage Response (`200 OK`)** | **2. VERIFIED FROM LIVE PRODUCTION** | Live HTTP fetch of `https://sahayasavari.me/` (pre-rendered HTML verified) |
| **Live Robots.txt Response (`200 OK`)** | **2. VERIFIED FROM LIVE PRODUCTION** | Live HTTP fetch of `https://sahayasavari.me/robots.txt` & `.web.app` |
| **Live Sitemap XML Response (`200 OK`)** | **2. VERIFIED FROM LIVE PRODUCTION** | Live HTTP fetch of `https://sahayasavari.me/sitemap.xml` (9 routes) |
| **Cloudflare Managed Robots Signals** | **2. VERIFIED FROM LIVE PRODUCTION** | Observed `Content-Signal: search=yes,ai-train=no,use=reference` prepended by Cloudflare edge |
| **Cloudflare Server Header** | **2. VERIFIED FROM LIVE PRODUCTION** | `Server: cloudflare` returned in live HTTP response headers |
| **GitHub Pages Blog Status** | **2. VERIFIED FROM LIVE PRODUCTION** | `https://sahaya-savari.github.io` returns `HTTP 404`; `blog.sahayasavari.me` returns `200 OK` |
| **Exact Deployed File Count (62 files)** | **2. VERIFIED FROM LIVE PRODUCTION** | Recorded from Firebase CLI deploy output (`found 62 files in dist`) |
| **Namecheap Domain Registrar Role** | **3. VERIFIED FROM USER INFO** | Confirmed by website owner (`sahayasavari.me`). Registrar only, **not hosting**. |
| **Domain Registration Dates** | **3. VERIFIED FROM USER INFO** | Dec 4, 2025 – Dec 4, 2026. Managed in Namecheap portal outside repository. |
| **Cloudflare DNS A Record Proxy Status** | **3. VERIFIED FROM USER INFO** | Orange Cloud proxied pointing to Firebase Hosting. Managed in Cloudflare portal outside repository. |
| **Cloudflare Email Routing** | **3. VERIFIED FROM USER INFO** | `contact@sahayasavari.me` forwarded to owner mailbox. Decoupled from web hosting. |
| **Cloudflare SSL/TLS Mode & Dashboard** | **4. NOT INDEPENDENTLY VERIFIED** | Not independently verified — managed outside the repository in Cloudflare portal. |
| **Namecheap Dashboard Glue Records** | **4. NOT INDEPENDENTLY VERIFIED** | Not independently verified — managed outside the repository in Namecheap portal. |
| **Google Search Console Index Status** | **4. NOT INDEPENDENTLY VERIFIED** | Not independently verified — requires Google Search Console portal report. |
| **Bing Webmaster Tools Real-Time Index** | **4. NOT INDEPENDENTLY VERIFIED** | Last known status: *"Discovered but not crawled"*; indexing requested. Requires Bing portal. |

---

## 1. Project Identity & Owner Baseline

- **Full Professional Name**: Sahaya Savari F
- **Alternate Public Name**: Sahaya Savari
- **Primary Positioning**: AI Engineer, Python Developer, Full Stack Developer, M.Sc. Artificial Intelligence Student
- **Academic Identity**: M.Sc. Artificial Intelligence — St. Joseph's College (Autonomous), Tiruchirappalli (Trichy), Tamil Nadu, India
- **Location**: Madurai / Tiruchirappalli, Tamil Nadu, India
- **Official Identity URLs**:
  - **Portfolio Website**: [https://sahayasavari.me](https://sahayasavari.me)
  - **Technical Blog**: [https://blog.sahayasavari.me](https://blog.sahayasavari.me)
  - **GitHub Profile**: [https://github.com/sahaya-savari](https://github.com/sahaya-savari)
  - **LinkedIn Profile**: [https://www.linkedin.com/in/sahaya-savari](https://www.linkedin.com/in/sahaya-savari)
  - **LeetCode Profile**: [https://leetcode.com/u/sahaya_savari/](https://leetcode.com/u/sahaya_savari/)
  - **Contact Email**: [contact@sahayasavari.me](mailto:contact@sahayasavari.me)
- **Search Engine Primary Entity Keywords**: `Sahaya Savari` / `Sahaya Savari F`

---

## 2. Multi-Layer Infrastructure & Hosting Architecture

The portfolio system separates domain registration, DNS edge proxying, website hosting, and email routing across specialized infrastructure layers.

```text
User Request (https://sahayasavari.me)
        ↓
Cloudflare Edge Proxy (DNS A Record - Proxied / Orange Cloud) [Verified from User & Live Response]
  ├── Edge SSL/TLS Termination
  ├── Cloudflare Managed Robots.txt & Content Signals [Verified from Live Response]
  ├── Cloudflare Insights Analytics [Verified from CSP in firebase.json]
  └── Security & DDoS Mitigation
        ↓
Firebase Hosting CDN Edge (Project: my-portfolio-fss | Target: sahayasavari) [Verified from Repository]
  ├── Serves pre-rendered static HTML (dist/<route>/index.html)
  ├── Serves immutable cached JS/CSS/Fonts/Assets
  └── Security Headers (CSP, HSTS, X-Frame-Options)
        ↓
Browser Load (Sub-second FCP/LCP) → React 19 Client Hydration
```

### Infrastructure Layer Breakdown

| Layer | Provider / Service | Exact Configuration / Identifier | Responsibility & Verification Status |
| :--- | :--- | :--- | :--- |
| **Domain Registrar** | Namecheap | `sahayasavari.me` (Dec 4, 2025 – Dec 4, 2026) | Domain name ownership. **Not website hosting.** *(Verified from User Info; managed outside repository)* |
| **DNS & Edge Proxy** | Cloudflare | DNS A Record (Proxied / Orange Cloud) | DNS resolution, edge SSL/TLS, Cloudflare Insights, Managed Robots signals. **Not website hosting.** *(Verified from User Info & Live Headers)* |
| **Website Hosting** | Firebase Hosting | Firebase Project: `my-portfolio-fss`<br>Hosting Target: `sahayasavari` | Primary website hosting provider. Serves 62 static files from `dist/` across global CDN. *(Verified from Repository)* |
| **Email Routing** | Cloudflare Email Routing | `contact@sahayasavari.me` | Forwards domain email queries to owner mailbox. Decoupled from web hosting. *(Verified from User Info; managed outside repository)* |
| **Source Repository** | GitHub | `sahaya-savari/portfolio` (Branch: `main`) | Version control source of truth for frontend application code. *(Verified from Repository)* |

---

## 3. Tech Stack & Dependency Matrix

Verified from `package.json`, `vite.config.ts`, and project dependencies:

| Category | Technology | Exact Version | Purpose & Location | Criticality & Loading Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Core Framework** | React | `19.2.3` | UI component tree (`src/App.tsx`, `src/pages/`) | Production-Critical (Synchronous core bundle) |
| **DOM Renderer** | React DOM | `19.2.3` | Client hydration & SSR HTML rendering | Production-Critical (`src/main.tsx`, `src/entry-server.tsx`) |
| **Language** | TypeScript | `5.9.3` | Strict type checking (`tsconfig.json`) | Development Build Safety |
| **Build Tool & Server** | Vite | `7.2.4` | Dev server & production bundler (`vite.config.ts`) | Production-Critical (Build pipeline) |
| **Routing** | React Router | `^7.18.1` | Client MemoryRouter & SSR static routing (`src/App.tsx`) | Production-Critical |
| **Styling** | Tailwind CSS | `4.1.17` | Utility-first CSS (`@tailwindcss/vite` 4.1.17) | Production-Critical (`src/index.css`) |
| **Animations** | Framer Motion | `^12.38.0` | Motion transitions (`src/sections/`, `src/components/`) | Code-split into `framer-motion` chunk |
| **Animations** | GSAP | `^3.15.0` | High-performance micro-interactions | Loaded as needed for scroll interactions |
| **Icons** | Lucide React | `^0.577.0` | SVG iconography across all components | Tree-shakeable, code-split into `lucide` chunk |
| **PDF Viewer** | React-PDF / PDF.js | `^10.4.1` | In-app Resume PDF modal (`src/components/ResumeViewer.tsx`) | Code-split into `react-pdf` chunk (Lazy loaded on modal open) |
| **Media Streaming** | HLS.js | `^1.6.15` | Hero background video streaming (`src/components/HlsVideo.tsx`) | Code-split into `hls` chunk (Lazy loaded via IntersectionObserver) |
| **WebGL Graphics** | OGL | `^1.0.11` | Interactive Galaxy WebGL background | Code-split into `ogl` chunk (Lazy loaded when visible) |
| **SEO Head Management** | React Helmet Async | `^3.0.0` | Head tag management (`src/components/SEOHead.tsx`) | Production-Critical for SSR & hydration |
| **Hosting Platform** | Firebase Hosting | CDN Edge | Global static CDN hosting (`firebase.json`, `.firebaserc`) | Production-Critical Deployment Target |

---

## 4. Build System & Static Pre-rendering Pipeline

### Build Command
```bash
npm run build
```
Under the hood, `npm run build` executes:
```bash
vite build && node scripts/prerender-seo.js
```

### Vite Build Configuration Highlights (`vite.config.ts`)
- **Minification**: `esbuild` for fast, compact bundle generation.
- **Sourcemaps**: Disabled in production (`sourcemap: false`), reducing bundle size by ~30%.
- **Target Target**: `['es2022', 'chrome105', 'firefox104', 'safari16']` (enables native optional chaining and nullish coalescing).
- **Chunk Size Limit**: `1200 KB` limit (accommodates heavy PDF worker and HLS modules).
- **Manual Chunking (`rollupOptions.output.manualChunks`)**:
  - `react-pdf`: `react-pdf`, `pdfjs-dist`
  - `framer-motion`: `framer-motion`
  - `hls`: `hls.js`
  - `ogl`: `ogl` (WebGL rendering engine)
  - `lucide`: `lucide-react`
  - `sections`: `src/sections/*`
  - `react-vendor`: `react`, `react-dom`
- **Compression Note**: `vite-plugin-compression` was intentionally removed because Firebase Hosting automatically applies Brotli/Gzip compression at the CDN edge. The plugin also had a Windows pathing bug (`dist/D:/...`).

### Static Pre-rendering Mechanics (`scripts/prerender-seo.js` & `src/entry-server.tsx`)
1. Vite compiles `src/entry-server.tsx` into a temporary SSR module `.tmp-server/entry-server.js`.
2. The script iterates over all **9 public routes** and invokes `render(route.path)`.
3. `render()` executes React SSR `renderToString()` within `<HelmetProvider>` and `<MemoryRouter initialEntries={[url]}>`.
4. Duplicate Helmet head tags (`<title>`, `<meta>`, `<link rel="canonical">`, `<script type="application/ld+json">`) are extracted from the body HTML and injected cleanly into `<head>` with `data-rh="true"`.
5. Pre-rendered HTML is injected into `<div id="root">${appHtml}</div>`.
6. Output HTML files are written to `dist/index.html` and `dist/<route>/index.html`.
7. `scripts/prerender-seo.js` automatically generates `dist/sitemap.xml` containing all 9 active routes.
8. `.tmp-server` temporary build directory is cleaned up.

---

## 5. Active Production Routes Matrix

| Route | Component Page | Prerender Target Output | Role & Indexation Status |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage.tsx` | `dist/index.html` | Homepage & Primary Brand Entity Hub (`index, follow`) |
| `/projects` | `ProjectsPage.tsx` | `dist/projects/index.html` | Interactive Projects Catalog (`index, follow`) |
| `/resume` | `ResumePage.tsx` | `dist/resume/index.html` | Curriculum Vitae & In-App PDF Viewer (`index, follow`) |
| `/blog` | `BlogPage.tsx` | `dist/blog/index.html` | Engineering Articles & Published Writings (`index, follow`) |
| `/recruiter` | `RecruiterMode.tsx` | `dist/recruiter/index.html` | ATS Candidate Overview & Quick Summary (`index, follow`) |
| `/ai` | `AskSahayaAI.tsx` | `dist/ai/index.html` | Interactive Portfolio Assistant Showcase (`index, follow`) |
| `/projects/prepmind-ai` | `ProjectDetails.tsx` | `dist/projects/prepmind-ai/index.html` | Detailed Case Study: PrepMind AI (`index, follow`) |
| `/projects/daily-spark` | `ProjectDetails.tsx` | `dist/projects/daily-spark/index.html` | Detailed Case Study: Daily Spark (`index, follow`) |
| `/projects/portfolio-website` | `ProjectDetails.tsx` | `dist/projects/portfolio-website/index.html` | Detailed Case Study: Portfolio Website (`index, follow`) |

### Archived & Removed Routes
- `/projects/neobeat`: Intentionally purged and removed. **MUST NOT be restored** as an active route unless requested by the user.

---

## 6. Portfolio Projects Overview

### Active Case Studies

1. **Daily Spark** (`/projects/daily-spark`)
   - **Type**: Minimalist Offline-First Habit Tracker (PWA & Mobile)
   - **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, IndexedDB, Capacitor Android
   - **Live Application**: [https://daily-spark-app-da74b.web.app](https://daily-spark-app-da74b.web.app)
   - **Source Repository**: [https://github.com/sahaya-savari/daily-spark](https://github.com/sahaya-savari/daily-spark)
   - **Description**: Offline-first habit tracking PWA with IndexedDB local persistence and Capacitor native Android bridge integration.

2. **PrepMind AI** (`/projects/prepmind-ai`)
   - **Type**: AI Education & Interview Preparation Platform
   - **Tech Stack**: Python, LLMs, OpenAI API, React, Tailwind CSS
   - **Status**: In Development
   - **Description**: Intelligent study companion using Python LLM pipelines to generate dynamic quizzes, flashcards, and concept summaries from uploaded study materials.

3. **Portfolio Website** (`/projects/portfolio-website`)
   - **Type**: Web Engineering & High-Performance SPA Architecture
   - **Tech Stack**: React 19, TypeScript, Vite 7, Framer Motion, Tailwind CSS v4, Static Pre-rendering, Firebase Hosting
   - **Live Site**: [https://sahayasavari.me](https://sahayasavari.me)
   - **Source Repository**: [https://github.com/sahaya-savari/portfolio](https://github.com/sahaya-savari/portfolio)
   - **Description**: Modern portfolio featuring glassmorphism design, hardware-accelerated animations, HLS video streaming, static HTML pre-rendering across 9 routes, and global Firebase Hosting CDN deployment.

---

## 7. Source Code Structure & Directory Guide

```text
portfolio/
├── public/                 # Static public assets, sitemap, robots, llms.txt, fonts, favicons
│   ├── fonts/              # Self-hosted woff2 web fonts
│   ├── favicon.png         # Site favicon
│   ├── manifest.json       # Web app manifest
│   ├── robots.txt          # Origin crawler access control rules
│   ├── sitemap.xml         # Production XML sitemap (9 active routes)
│   ├── llms.txt            # Machine-readable LLM summary (5.8 KB)
│   └── llms-full.txt       # Machine-readable LLM full documentation (10.2 KB)
├── scripts/
│   └── prerender-seo.js    # SSR static HTML pre-rendering build script
├── src/
│   ├── components/         # Reusable UI components (SEOHead, IntersectionLazy, HlsVideo, ResumeViewer, CommandPalette, etc.)
│   ├── data/               # Centralized data sources (data.ts, caseStudies.ts)
│   ├── layouts/            # RootLayout with glass navigation bar & footer
│   ├── pages/              # Route components (HomePage, ProjectsPage, BlogPage, ResumePage, RecruiterMode, AskSahayaAI, ProjectDetails, NotFound)
│   ├── sections/           # Homepage section components (HeroSection, AboutSection, SkillsSection, ProjectsSection, BlogSection, etc.)
│   ├── App.tsx             # React Router v7 routes configuration & suspense fallbacks
│   ├── entry-server.tsx    # React SSR server rendering entry point
│   ├── main.tsx            # React client hydration entry point
│   ├── index.css           # Global styles & Tailwind CSS v4 directives
│   └── seo.ts              # Schema.org JSON-LD graph nodes & SEO constants
├── firebase.json           # Firebase Hosting headers, rewrites, and cache rules
├── .firebaserc             # Firebase project targets mapping (my-portfolio-fss -> sahayasavari)
├── package.json            # Node.js dependencies, scripts, and type specifications
├── tsconfig.json           # TypeScript strict configuration
├── vite.config.ts          # Vite build config & manual chunk splitting
├── README.md               # Public GitHub repository documentation
├── PROJECT.md              # System context reference document
└── AI_PROJECT_CONTEXT.md   # THIS FILE — Master AI Context & Architecture Document
```

---

## 8. SEO, AEO & GEO Architecture

### SEO Infrastructure (`src/seo.ts` & `src/components/SEOHead.tsx`)
- **Default Title**: `Sahaya Savari F | AI Engineer & M.Sc. AI Student`
- **Default Meta Description**: `Portfolio of Sahaya Savari F, an M.Sc. Artificial Intelligence student, AI Engineer, and Full Stack Developer building Machine Learning solutions, Python APIs, and React web applications.`
- **Canonical URL**: `https://sahayasavari.me` (Strictly enforced without trailing slashes).
- **Meta Robots**: `index, follow` across all pre-rendered routes.
- **Open Graph & Twitter Cards**: Full `og:title`, `og:description`, `og:image`, `og:url`, `og:type="profile"`, `twitter:card="summary_large_image"`.
- **Identity Links**: `<link rel="me">` tags connecting the domain to GitHub and LinkedIn profiles.

### Schema.org JSON-LD Graph Architecture
- **Person Identity Node Anchor**: `@id: "https://sahayasavari.me/#person"`
  - `name`: Sahaya Savari F
  - `alternateName`: Sahaya Savari
  - `url`: `https://sahayasavari.me`
  - `jobTitle`: AI/ML & Full Stack Developer
  - `affiliation`: `{ "@type": "EducationalOrganization", "name": "St. Joseph's College (Autonomous), Tiruchirappalli" }` (M.Sc. AI degree ongoing)
  - `hasOccupation`: `{ "@type": "Occupation", "name": "AI Engineer & Full Stack Developer", "occupationLocation": { "@type": "Country", "name": "India" } }`
  - `sameAs`: `["https://www.linkedin.com/in/sahaya-savari", "https://github.com/sahaya-savari", "https://blog.sahayasavari.me", "https://leetcode.com/u/sahaya_savari/"]`
  - `knowsAbout`: 23 verified expertise terms.
- **WebSite Graph Node**: `@id: "https://sahayasavari.me/#website"` (`author`: `{ "@id": "https://sahayasavari.me/#person" }`)
- **ProfilePage Graph Node**: `@id: "https://sahayasavari.me/#profilepage"` (`mainEntity`: `{ "@id": "https://sahayasavari.me/#person" }`)
- **TechArticle Nodes**: 4 tech article schema nodes linked to published writings on `blog.sahayasavari.me`.
- **SoftwareApplication Node**: Interactive showcase schema on `/ai` for Ask Sahaya AI.

### AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization)
- Structured machine-readable `/llms.txt` and `/llms-full.txt` files provide concise identity, skills, project architecture, Q&A, and social links for LLM indexing agents.
- *Note on AEO/GEO Visibility*: Providing structured data and machine-readable text establishes technical readiness but does not guarantee ranking in proprietary AI search engines.

---

## 9. Robots.txt & Cloudflare Edge Signals

### Origin File (`public/robots.txt`)
```text
# robots.txt — sahayasavari.me
# Portfolio of Sahaya Savari F

User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Slurp
Allow: /

# AI crawlers intentionally blocked from AI training
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

Sitemap: https://sahayasavari.me/sitemap.xml
```

### Cloudflare Edge Behavior
When accessed via the custom domain (`https://sahayasavari.me/robots.txt`), Cloudflare automatically prepends its Managed Content Signals and AI Scraper block directives:
```text
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /
... [Cloudflare Managed Bot Blocks] ...
```
Followed by the appended origin `public/robots.txt`. This edge behavior is expected and operates correctly.

---

## 10. Sitemap Architecture

- **Sitemap URL**: `https://sahayasavari.me/sitemap.xml`
- **Generation Method**: Automatically generated during `npm run build` by `scripts/prerender-seo.js`.
- **Active URLs**: Exactly 9 canonical routes (`/`, `/projects`, `/resume`, `/blog`, `/recruiter`, `/ai`, `/projects/prepmind-ai`, `/projects/daily-spark`, `/projects/portfolio-website`).
- **Exclusions**: Archived `/projects/neobeat` is strictly excluded.

---

## 11. Firebase Configuration, Security Headers & Caching Strategy

### Firebase Setup (`firebase.json` & `.firebaserc`)
- **Hosting Target**: `sahayasavari`
- **Firebase Project**: `my-portfolio-fss`
- **Public Directory**: `dist`
- **Clean URLs**: `true` | **Trailing Slash**: `false`
- **SPA Fallback Rewrite**: `{ "source": "**", "destination": "/index.html" }` (Static pre-rendered HTML files take precedence over rewrite).

### Security Headers Configured (`firebase.json`)
- `Strict-Transport-Security`: `max-age=31536000; includeSubDomains`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `geolocation=(), microphone=(), camera=()`
- `Content-Security-Policy`: Restricts scripts, styles, fonts, workers, and connects to allowed origins (Self, Mux CDN, Unsplash, Microsoft Clarity, Cloudflare Insights).

### Cache-Control Strategy
- `**/*.@(js|css|woff2|png|jpg|jpeg|webp|svg|ico)`: `public,max-age=31536000,immutable` (1 year CDN & browser caching for version-hashed assets).
- `**/index.html`: `no-cache, no-store, must-revalidate` (Ensures clients immediately receive updated HTML).
- `robots.txt`, `sitemap.xml`, `**/*.txt`: `public,max-age=3600,s-maxage=3600` (1 hour CDN caching).
- `**/*.pdf`: `public,max-age=86400` (1 day caching).

---

## 12. Git, Version Control & Security Hygiene

### Current Git Baseline
- **Current Branch**: `main`
- **Latest Verified Commit**: `0662fe7`
- **Commit Message**: `seo: strengthen personal entity signals and sync Person schema`
- **Remote Branch**: `origin/main` (`https://github.com/sahaya-savari/portfolio.git`)

### .gitignore Architecture
Items intentionally excluded from version control:
- `node_modules/`, `.npm-cache/`
- `dist/`, `dist-ssr/`, `.tmp-*`
- `.env`, `.env.local`, `.env.production.local`
- `.firebase/`
- `portfolio.md`, `PLAN.md`

> [!IMPORTANT]  
> **Security Rule**: NEVER commit secrets, API keys, private tokens, credentials, or `.env` files containing secrets. `AI_PROJECT_CONTEXT.md` is committed as a permanent repository context file and must **NOT** be added to `.gitignore`.

---

## 13. Production Baseline & Search Engine Status

### Production Endpoints Health
- `https://sahayasavari.me/` — `HTTP 200 OK` (Pre-rendered static HTML with updated metadata & Person schema).
- `https://sahayasavari.me/robots.txt` — `HTTP 200 OK` (Search crawlers allowed, AI-training restricted).
- `https://sahayasavari.me/sitemap.xml` — `HTTP 200 OK` (9 active routes, valid XML).

### Search Engine Crawling vs. Indexing Status
- **Googlebot**: Explicitly allowed in `robots.txt`. Meta robots `index, follow`.
- **Bingbot**: Explicitly allowed in `robots.txt`.
- **Bing Webmaster Tools Baseline**: Site is technically crawlable. Previous Bing status reported *"Discovered but not crawled"*; indexing request was submitted. Successful indexation must be verified via Bing Webmaster Tools before declaring indexed.

---

## 14. Architectural Decisions — DO NOT REVERSE WITHOUT USER APPROVAL

Future AI agents working on this repository **MUST NOT** alter or violate the following rules without explicit approval:

1. **Firebase Hosting is the Website Host**: Firebase Hosting is the hosting platform. Do not describe Namecheap or Cloudflare as website hosting providers.
2. **Namecheap is Registrar Only**: Namecheap manages domain registration (`sahayasavari.me`). It is NOT website hosting.
3. **Cloudflare is DNS Edge & Proxy Only**: Cloudflare provides DNS, SSL/TLS proxying, analytics, and Email Routing.
4. **Cloudflare Email Routing is Decoupled**: `contact@sahayasavari.me` email routing is separate from website hosting.
5. **Canonical Domain**: `https://sahayasavari.me` is the single canonical domain.
6. **Main Git Branch**: `main` is the production branch.
7. **NeoBeat Project is Archived**: `/projects/neobeat` was intentionally purged. Do NOT restore it.
8. **Preserve Static Pre-rendering**: Do not remove `scripts/prerender-seo.js` or `src/entry-server.tsx`.
9. **Preserve Security Headers**: Do not relax CSP, HSTS, or X-Frame-Options headers in `firebase.json`.
10. **Do Not Touch Cloudflare Proxy / DNS Settings**: Do not alter orange proxy settings or DNS records.
11. **Do Not Alter Cloudflare Managed Robots.txt**: Do not attempt to disable edge content signals.
12. **Do Not Expose Secrets**: Never hardcode API keys or credentials in source code.
13. **Do Not Add Fake Information**: Never invent fake backlinks, social accounts, or unverified `sameAs` profiles.
14. **No Speculative SEO Changes**: Only implement verified, targeted SEO improvements.
15. **Verify Before Claiming Resolved**: Always run `npm run build`, inspect `dist/`, and test live HTTP status before declaring a task complete.

---

## 15. Rules for Future AI Agents

When working on this repository, any AI assistant MUST adhere to the following workflow:

1. **Read `AI_PROJECT_CONTEXT.md` First**: Treat this document as the master context reference before proposing code changes.
2. **Inspect Source Files**: Use code search and viewing tools to verify source logic before making edits.
3. **Preserve Single Source of Truth**: React components in `src/` are the ground truth for content; do not hardcode HTML strings in pre-render scripts.
4. **Minimal, Targeted Edits**: Prefer small, surgical edits over large refactors.
5. **Execute Build Validation**: Run `npm run build` after modifying source files to ensure SSR pre-rendering succeeds.
6. **Review Git Diff**: Check `git status`, `git diff`, and `git diff --check` before committing.
7. **Document & Deploy**: Update `PROJECT.md` or `AI_PROJECT_CONTEXT.md` when architectural facts change, then deploy to Firebase Hosting when authorized.

---

## 16. How to Maintain This Document

This document must be updated whenever any of the following changes occur in the project:
- Hosting provider or Firebase target configuration
- Domain name, DNS provider, or Cloudflare edge setup
- Email routing configuration
- Framework or major dependency version upgrades
- Active production route matrix additions or removals
- Adding or archiving portfolio projects
- SEO title, meta description, or Schema.org Person entity changes
- Cache-Control, Security Headers, or CSP policies
- Deployment workflows or CI/CD scripts

*Do not update this document for trivial code style changes or minor bug fixes. Always verify repository facts before editing.*
