# Architecture Overview

This document describes the software architecture, build pipeline, static pre-rendering system, SEO graph, and hosting infrastructure of the **Sahaya Savari F Portfolio** website (`sahayasavari.dev`).

---

## 1. High-Level Architecture

```text
React 19 Application Source (src/)
        ↓
Vite Production Bundle (`npm run build`)
        ↓
Vite SSR Module (.tmp-server/entry-server.js)
        ↓
Static HTML Pre-renderer (scripts/prerender-seo.js)
        ↓
9 Route-Specific Static HTML Files (dist/<route>/index.html)
        ↓
Firebase Hosting CDN Edge (Global CDN Edge Caching & Security Headers)
        ↓
Browser Request → Fast Static HTML Load → React 19 Client Hydration
```

---

## 2. Core Technology Stack

| Component Layer | Technology | Version | Architectural Role |
| :--- | :--- | :--- | :--- |
| **UI Framework** | React | `19.2.3` | Component-based view tree (`src/App.tsx`, `src/pages/`) |
| **Language** | TypeScript | `5.9.3` | Type safety and contract enforcement (`tsconfig.json`) |
| **Build Tooling** | Vite | `7.2.4` | Client bundle compilation & SSR module building (`vite.config.ts`) |
| **Routing** | React Router | `^7.18.1` | Client MemoryRouter & SSR static routing (`src/App.tsx`) |
| **Styling** | Tailwind CSS | `4.1.17` | Utility-first styling (`@tailwindcss/vite` 4.1.17) |
| **Animations** | Framer Motion & GSAP | `^12.38.0` / `^3.15.0` | Declarative page transitions and micro-interactions |
| **Media & WebGL** | HLS.js & OGL | `^1.6.15` / `^1.0.11` | Video stream handling (`HlsVideo.tsx`) & WebGL background graphics |
| **Document Viewer** | React-PDF | `^10.4.1` | Lazy-loaded in-app PDF resume viewer modal (`ResumeViewer.tsx`) |
| **SEO Head** | React Helmet Async | `^3.0.0` | Dynamic `<head>` metadata management (`SEOHead.tsx`) |
| **Website Hosting** | Firebase Hosting | CDN Edge | Global static hosting and security headers (`firebase.json`) |

---

## 3. Static Pre-rendering Pipeline

The portfolio uses an automated Server-Side Rendering (SSR) pre-rendering pipeline to serve pre-rendered HTML to search engines and visitors before JavaScript hydrates.

### Pre-rendering Process (`scripts/prerender-seo.js` & `src/entry-server.tsx`)

1. **Vite SSR Compilation**: Vite compiles `src/entry-server.tsx` into a temporary SSR bundle `.tmp-server/entry-server.js`.
2. **Route Iteration**: The pre-render script iterates across all **9 public canonical routes**:
   - `/` (Homepage)
   - `/projects` (Projects Directory)
   - `/resume` (Resume & CV Viewer)
   - `/blog` (Technical Articles)
   - `/recruiter` (ATS Candidate Summary)
   - `/ai` (Ask Sahaya AI Showcase)
   - `/projects/prepmind-ai` (Case Study)
   - `/projects/daily-spark` (Case Study)
   - `/projects/portfolio-website` (Case Study)
3. **HTML & Metadata Extraction**: `renderToString()` renders the React component tree inside `<HelmetProvider>` and `<MemoryRouter>`. Duplicate helmet head tags (`<title>`, `<meta>`, `<link rel="canonical">`, `<script type="application/ld+json">`) are extracted from the body string and injected cleanly into `<head>` with `data-rh="true"`.
4. **Output Generation**: Pre-rendered HTML is written to `dist/index.html` or `dist/<route>/index.html`.
5. **Sitemap Generation**: `dist/sitemap.xml` is automatically generated with priority and modification timestamps for all 9 routes.

---

## 4. Code Splitting & Performance Architecture

To achieve fast First Contentful Paint (FCP) and Largest Contentful Paint (LCP), asset loading is optimized in `vite.config.ts`:

- **Target Target**: Built for modern browsers (`['es2022', 'chrome105', 'firefox104', 'safari16']`).
- **Manual Chunks (`rollupOptions.output.manualChunks`)**:
  - `react-pdf`: `react-pdf`, `pdfjs-dist` (Lazy loaded only when resume modal opens)
  - `framer-motion`: Motion animation runtime
  - `hls`: `hls.js` (Lazy loaded via IntersectionObserver when video section is in view)
  - `ogl`: WebGL background engine
  - `lucide`: SVG icon library
  - `sections`: Portfolio page section modules
  - `react-vendor`: React core runtime (Stable long-term cache entry)
- **CDN Edge Compression**: Pre-compression plugins are omitted because Firebase Hosting automatically compresses static assets at the CDN edge.

---

## 5. SEO & Structured Data Architecture

- **Person URI Anchor (`@id: "https://sahayasavari.dev/#person"`)**: Stable Schema.org node representing **Sahaya Savari F**, linking `name`, `alternateName`, `affiliation`, `hasOccupation`, and verified `sameAs` profiles (LinkedIn, GitHub, Blog, LeetCode).
- **Graph Node Linkages**: Secondary route schemas (`CollectionPage`, `Blog`, `WebPage`, `AboutPage`) reference `#person` as author/mainEntity.
- **Canonical Enforcements**: Single canonical domain `https://sahayasavari.dev` enforced across all routes.
- **Machine-Readable Context**: `/llms.txt` and `/llms-full.txt` provide concise structured background for LLM search indexing agents.

---

## 6. Hosting Infrastructure & Edge Security

- **Website Hosting Provider**: Firebase Hosting (`firebase.json`, `.firebaserc`) serves static output files from `dist/` across a global CDN.
- **DNS & Edge Services**: Domain DNS resolution and edge proxying are managed upstream of Firebase Hosting.
- **Security Headers**: Configured in `firebase.json`:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Content-Security-Policy`: Restricts scripts, styles, fonts, workers, and connects to allowed origins (Self, Mux, Unsplash, Clarity, Cloudflare Insights).
- **Caching Policies**:
  - Version-hashed static assets (`js`, `css`, `woff2`, images): `public,max-age=31536000,immutable` (1 year)
  - `index.html`: `no-cache, no-store, must-revalidate`
  - `robots.txt`, `sitemap.xml`, `txt`: `public,max-age=3600,s-maxage=3600` (1 hour)
