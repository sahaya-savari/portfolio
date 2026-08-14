# PROJECT.md — Production Portfolio Source of Truth

> **System & Context Reference Document**  
> This file is the primary, single source of truth for **Sahaya Savari F's** production portfolio repository (`sahayasavari.me`). It documents the codebase architecture, technology stack, static pre-rendering pipeline, SEO/schema graph, AI discoverability assets, deployment configuration, and guidelines for AI coding assistants.

---

## 1. Project Facts & Identity Baseline

- **Full Professional Name**: Sahaya Savari F
- **Common Public Name**: Sahaya Savari
- **Primary Positioning**: AI Engineer, Python Developer, Full Stack Developer, M.Sc. Artificial Intelligence Student
- **Education**: M.Sc. Artificial Intelligence — St. Joseph's College (Autonomous), Tiruchirappalli (Trichy), India
- **Location**: Madurai / Tiruchirappalli, Tamil Nadu, India
- **Official Identity URLs**:
  - **Portfolio**: [https://sahayasavari.me](https://sahayasavari.me)
  - **Technical Blog**: [https://blog.sahayasavari.me](https://blog.sahayasavari.me)
  - **GitHub**: [https://github.com/sahaya-savari](https://github.com/sahaya-savari)
  - **LinkedIn**: [https://www.linkedin.com/in/sahaya-savari](https://www.linkedin.com/in/sahaya-savari)
  - **Contact Email**: [contact@sahayasavari.me](mailto:contact@sahayasavari.me)
- **Primary Search Entity Target**: `Sahaya Savari` / `Sahaya Savari F`

---

## 2. Project Purpose

The portfolio serves four primary functions:
1. **Recruiter & Career Hub**: Presenting an ATS-friendly candidate summary, interactive resume viewer, and technical background for AI/ML, Python, and Full-Stack internship/full-time opportunities (Summer/Fall 2026).
2. **Technical Showcase**: Displaying production case studies, system architecture details, interactive demos, and GitHub source repositories for major projects.
3. **Thought Leadership**: Linking to published engineering articles on Python AI agent design, Pydantic V2, Tailwind CSS v4, and DevOps CI/CD pipelines.
4. **Machine & Search Discoverability**: Providing pre-rendered server HTML for web crawlers, Schema.org JSON-LD graph nodes for search engines, and structured `/llms.txt` documentation for LLM indexing agents.

---

## 3. Technology Baseline

Verified from `package.json`, `vite.config.ts`, and project dependencies:

| Category | Technology | Exact Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Core Framework** | React | `19.2.3` | UI Component Tree |
| **Language** | TypeScript | `5.9.3` | Type Safety |
| **Build Tool** | Vite | `7.2.4` | Development & SSR Bundle Build |
| **Routing** | React Router | `^7.18.1` | Client & Server Memory Routing |
| **Styling** | Tailwind CSS | `4.1.17` | Utility-First Styling System |
| **Animations** | Framer Motion | `^12.38.0` | Motion Animations |
| **Animations** | GSAP | `^3.15.0` | Micro-interactions |
| **Icons** | Lucide React | `^0.577.0` | Tree-shakeable SVG Icons |
| **PDF Viewer** | React-PDF / PDF.js | `^10.4.1` | In-App Resume PDF Viewer |
| **Media Streaming** | HLS.js | `^1.6.15` | Hero Video HLS Stream |
| **WebGL Graphics** | OGL | `^1.0.11` | Interactive Background Effects |
| **SEO Head** | React Helmet Async | `^3.0.0` | Dynamic Title & Meta Tag Management |
| **Hosting** | Firebase Hosting | CDN Edge | Global Static Hosting |

---

## 4. Architecture & Static Pre-rendering Pipeline

### System Architecture Diagram

```text
React Application (Single Source of Truth in src/)
        ↓
Vite Client Build (`npm run build` -> dist/)
        ↓
Vite SSR Build (.tmp-server/entry-server.js)
        ↓
Static Pre-renderer (scripts/prerender-seo.js via react-dom/server)
        ↓
10 Route-Specific Static HTML Files (dist/<route>/index.html)
        ↓
Firebase Hosting CDN Edge
        ↓
Browser Load (Server HTML served instantly) → React 19 Client Hydration
```

### Pre-rendering Implementation Mechanics
1. **Server Entry (`src/entry-server.tsx`)**: Imports all route components synchronously and exposes a `render(url: string)` function wrapping the React tree in `<HelmetProvider>`, `<MemoryRouter initialEntries={[url]}>`, and `<Routes>`.
2. **Build Integration (`scripts/prerender-seo.js`)**:
   - Compiles `src/entry-server.tsx` into `.tmp-server/entry-server.js`.
   - Loops over all 10 public routes and calls `render(route.path)`.
   - Strips duplicate helmet metadata tags (`<title>`, `<meta>`, `<link rel="canonical">`) from the rendered React body string so metadata exists **ONLY in `<head>`**.
   - Injects clean rendered HTML into `<div id="root">${cleanHtml}</div>`.
   - Updates `<head>` title, description, canonical, Open Graph, Twitter Card, and JSON-LD schema.
   - Writes `dist/index.html` or `dist/<route>/index.html`.
   - Cleans up `.tmp-server`.

---

## 5. Public Pre-rendered Routes Matrix

| Route | Page Component | Prerender Target | Indexable Role |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage.tsx` | `dist/index.html` | Homepage & Brand Identity Hub |
| `/projects` | `ProjectsPage.tsx` | `dist/projects/index.html` | Projects Catalog |
| `/resume` | `ResumePage.tsx` | `dist/resume/index.html` | Curriculum Vitae & Resume Viewer |
| `/blog` | `BlogPage.tsx` | `dist/blog/index.html` | Technical Articles & Writings |
| `/recruiter` | `RecruiterMode.tsx` | `dist/recruiter/index.html` | Recruiter Overview & Quick View |
| `/ai` | `AskSahayaAI.tsx` | `dist/ai/index.html` | Interactive AI Assistant Showcase |
| `/projects/prepmind-ai` | `ProjectDetails.tsx` | `dist/projects/prepmind-ai/index.html` | Case Study: PrepMind AI |
| `/projects/daily-spark` | `ProjectDetails.tsx` | `dist/projects/daily-spark/index.html` | Case Study: Daily Spark |
| `/projects/portfolio-website` | `ProjectDetails.tsx` | `dist/projects/portfolio-website/index.html` | Case Study: Portfolio Website |

---

## 6. Project Case Studies

1. **Daily Spark** (`/projects/daily-spark`):
   - **Type**: Offline-First Habit Tracking Application
   - **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, IndexedDB, Capacitor Android
   - **Live App**: [https://daily-spark-app-da74b.web.app](https://daily-spark-app-da74b.web.app)
   - **Source Code**: [https://github.com/sahaya-savari/daily-spark](https://github.com/sahaya-savari/daily-spark)
2. **PrepMind AI** (`/projects/prepmind-ai`):
   - **Type**: AI Education & Interview Preparation Platform
   - **Tech Stack**: Python, LLMs, React, Tailwind CSS
   - **Status**: In Development
3. **Portfolio Website** (`/projects/portfolio-website`):
   - **Type**: Web Engineering & SPA Architecture
   - **Tech Stack**: React 19, TypeScript, Vite 7, Framer Motion, Tailwind CSS v4, Static Pre-rendering, Firebase Hosting
   - **Live Site**: [https://sahayasavari.me](https://sahayasavari.me)
   - **Source Code**: [https://github.com/sahaya-savari/portfolio](https://github.com/sahaya-savari/portfolio)

---

## 7. Technical Blog & Published Articles

- **Blog Domain**: [https://blog.sahayasavari.me](https://blog.sahayasavari.me)
- **Published Articles**:
  1. *Building AI Agents from Scratch in Python* ([Read Article](https://blog.sahayasavari.me/blog/ai-agents-from-scratch))
  2. *Pydantic V2: High-Performance Data Validation* ([Read Article](https://blog.sahayasavari.me/blog/pydantic-v2-guide))
  3. *Tailwind CSS v4 Migration & Performance* ([Read Article](https://blog.sahayasavari.me/blog/tailwind-css-v4-guide))
  4. *Production CI/CD Pipelines with GitHub Actions* ([Read Article](https://blog.sahayasavari.me/blog/github-actions-ci-cd))

---

## 8. SEO, Schema & Entity Architecture

### Implementation Source Files
- [`src/seo.ts`](file:///d:/GITHUB/portfolio/src/seo.ts) — Schema.org JSON-LD definitions and site constants.
- [`src/components/SEOHead.tsx`](file:///d:/GITHUB/portfolio/src/components/SEOHead.tsx) — React Helmet component for page metadata.
- [`scripts/prerender-seo.js`](file:///d:/GITHUB/portfolio/scripts/prerender-seo.js) — Post-build static pre-rendering script.

### Schema.org Graph Architecture
- **Person URI Node Anchor**: `@id: "https://sahayasavari.me/#person"`
  - `name`: Sahaya Savari
  - `alternateName`: Sahaya Savari F
  - `url`: `https://sahayasavari.me`
  - `jobTitle`: AI/ML & Full Stack Developer
  - `affiliation`: `{ "@type": "EducationalOrganization", "name": "St. Joseph's College (Autonomous), Trichy" }` (Current M.Sc. AI student status; no `alumniOf`, no physical address)
  - `sameAs`: `["https://www.linkedin.com/in/sahaya-savari", "https://github.com/sahaya-savari", "https://blog.sahayasavari.me"]`
- **WebSite Graph Node**: `@id: "https://sahayasavari.me/#website"`
  - `author`: `{ "@id": "https://sahayasavari.me/#person" }`
- **ProfilePage Graph Node**: `@id: "https://sahayasavari.me/#profilepage"`
  - `mainEntity`: `{ "@id": "https://sahayasavari.me/#person" }`
- **Secondary Route Graph Nodes**: Unified `@graph` objects on `/projects` (`CollectionPage`), `/blog` (`Blog`), `/resume` (`WebPage`), `/recruiter` (`AboutPage`), and `/ai` (`WebPage`) linking `author`/`mainEntity` to `{ "@id": "https://sahayasavari.me/#person" }`.
- **Case Studies**: `SoftwareSourceCode` & `BreadcrumbList` schemas with contextual cross-links to published technical writing on `blog.sahayasavari.me`.

### AI Discoverability (AEO & GEO)
- `/llms.txt` (2,808 bytes): Structured markdown reference for LLM search agents.
- `/llms-full.txt` (4,765 bytes): Extended technical documentation for LLM indexing.

---

## 9. Firebase Hosting & Security Infrastructure

- **Firebase Configuration (`firebase.json`)**:
  - `public`: `dist`
  - `cleanUrls`: `true`
  - `trailingSlash`: `false`
  - `rewrites`: `[ { "source": "**", "destination": "/index.html" } ]` (Static prerendered HTML files are served before this fallback).
- **Security Headers**:
  - `Strict-Transport-Security`: `max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options`: `nosniff`
  - `X-Frame-Options`: `DENY`
  - `Referrer-Policy`: `strict-origin-when-cross-origin`
  - `Content-Security-Policy`: Full CSP allowing self-hosted fonts, Cloudflare Insights, Mux CDN, Unsplash imagery.
- **Cache-Control Headers**:
  - `index.html`: `no-cache, no-store, must-revalidate`
  - `*.js`, `*.css`, `*.woff2`, images: `public,max-age=31536000,immutable`

---

## 10. Repository Directory Structure

```text
portfolio/
├── public/                 # Static assets, sitemap.xml, robots.txt, llms.txt, llms-full.txt
├── scripts/
│   └── prerender-seo.js   # SSR Static Pre-rendering build script
├── src/
│   ├── components/        # Reusable UI components (SEOHead, IntersectionLazy, BlurText, etc.)
│   ├── data/              # Static project data & case studies
│   ├── layouts/           # RootLayout with glass navigation bar & footer
│   ├── pages/             # Route components (HomePage, ProjectsPage, BlogPage, etc.)
│   ├── sections/          # Portfolio homepage section components
│   ├── App.tsx            # React Router v7 routes definition
│   ├── entry-server.tsx   # React SSR server rendering entry point
│   ├── main.tsx           # React client hydration entry point
│   ├── index.css          # Global styles & Tailwind CSS v4 directives
│   └── seo.ts             # Schema.org JSON-LD graph & SEO constants
├── firebase.json          # Firebase Hosting configuration & security headers
├── package.json           # Dependencies & build scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build config & manual chunk splitting
├── README.md              # Project documentation
└── PROJECT.md             # Single source of truth context file (THIS FILE)
```

---

## 11. Development & Deployment Workflows

### Commands
```bash
# Install dependencies
npm install

# Start local development server (Vite dev server)
npm run dev

# Build production bundle & run static pre-rendering
npm run build

# Preview production build locally
npm run preview

# Deploy to Firebase Hosting production
npx firebase deploy --only hosting
```

---

## 12. Production Baseline & Status Matrix

- **SEO + AEO + GEO Entity Architecture**: **COMPLETED & VERIFIED** (Commit `fc07811` strengthens Person entity `@id`, `alternateName`, student `affiliation`, secondary route `@graph` author linkages, and project-article cross-links).
- **Firebase Hosting Production Deployment**: **COMPLETED & VERIFIED** (Deployed 62 static dist files to production target `sahayasavari` at `https://sahayasavari.me`).
- **SSR Static Pre-rendering**: **COMPLETED & VERIFIED** (All 10 routes return 10KB–32KB rendered HTML in `#root`).
- **Metadata Deduplication**: **COMPLETED & VERIFIED** (Metadata tags exist strictly in `<head>`).
- **Person `@id` & `ProfilePage` Schema**: **COMPLETED & VERIFIED** (Live JSON-LD graph verified).
- **Repository Cleanup**: **COMPLETED & VERIFIED** (Clean working tree, `.gitignore` updated).
- **Documentation Synchronization**: **COMPLETED & VERIFIED** (Accurate stack, architecture, routes & deployment status documented).

---

## 13. AI Assistant Instructions

When working on this repository, any AI assistant (Claude, Antigravity, Gemini, etc.) MUST adhere to the following rules:

1. **Read `PROJECT.md` First**: Treat `PROJECT.md` as the primary context document before proposing architectural changes.
2. **Inspect Codebase First**: Use search and view tools to inspect source files before making assumptions.
3. **Source of Truth Hierarchy**:
   - `src/` source code is the ground truth for application implementation.
   - `package.json` is the ground truth for dependencies and build scripts.
   - `firebase.json` is the ground truth for hosting headers and rewrites.
   - `PROJECT.md` is the human/AI readable context reference.
   - Live URL `https://sahayasavari.me` is the ground truth for deployed behavior.
4. **Preserve Single Source of Truth for Content**: NEVER create hardcoded duplicate HTML content strings in `prerender-seo.js`. All rendered page content MUST originate from the React components in `src/`.
5. **Preserve Static Pre-rendering**: Do not remove or disable `src/entry-server.tsx` or `scripts/prerender-seo.js`.
6. **Preserve Hydration Safety**: Ensure any JSX modification remains SSR-safe (`typeof window === 'undefined'` checks for browser APIs).
7. **Verify Production After Changes**: Always run `npm run build` to verify pre-rendering, inspect output HTML, test with `curl`, and verify Firebase Hosting deployments when source code changes.
8. **Minimal, Maintainable Changes**: Prefer targeted, clean edits over broad refactorings.
