# Changelog

All notable changes to the **Sahaya Savari F Portfolio** project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2026-08-22] — Documentation & SEO Baseline

### Added
- **Core Application**: Single Page Application built with React 19 (`19.2.3`), TypeScript 5.9 (`5.9.3`), Vite 7 (`7.2.4`), Tailwind CSS v4 (`4.1.17`), Framer Motion (`12.38.0`), GSAP (`3.15.0`), and Lucide React.
- **Static Pre-rendering Pipeline**: SSR pre-rendering build script (`scripts/prerender-seo.js` and `src/entry-server.tsx`) that generates static HTML files for all 9 public canonical routes (`/`, `/projects`, `/resume`, `/blog`, `/recruiter`, `/ai`, `/projects/prepmind-ai`, `/projects/daily-spark`, `/projects/portfolio-website`).
- **SEO & Schema.org Graph**: Structured JSON-LD graph architecture centered on Person URI anchor (`https://sahayasavari.me/#person`), including `WebSite`, `ProfilePage`, `TechArticle`, and `SoftwareApplication` graph nodes.
- **AI Discoverability**: Machine-readable `/llms.txt` and `/llms-full.txt` context documents.
- **Media & Document Features**: In-app PDF resume viewer (`src/components/ResumeViewer.tsx`), HLS video background streaming (`src/components/HlsVideo.tsx`), and WebGL background graphics (`OGL`).
- **Security & Caching Rules**: Security headers (CSP, HSTS, X-Frame-Options) and Cache-Control rules configured in `firebase.json` for Firebase Hosting CDN deployment.
- **Repository Documentation**: Proprietary `LICENSE` notice and public repository documentation (`README.md`, `PROJECT.md`).

### Changed
- **Person Entity Signals**: Updated Person entity `name: "Sahaya Savari F"` and `alternateName: "Sahaya Savari"`, updated homepage title tag to `Sahaya Savari F | AI Engineer & M.Sc. AI Student`, and added verified LeetCode profile (`https://leetcode.com/u/sahaya_savari/`) to `sameAs`.
- **Metadata Synchronization**: Unified `<title>`, `<meta description>`, canonical URLs, Open Graph, and Twitter metadata across all pre-rendered HTML targets.
- **Gitignore Hardening**: Updated `.gitignore` to protect local tool directories and temporary files.
