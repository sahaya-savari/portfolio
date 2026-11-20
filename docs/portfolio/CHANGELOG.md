# Changelog

All notable changes to the **Sahaya Savari F Portfolio** project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2026-11-20] — Web3Forms Integration, INP Performance Tuning & Mobile UX Realignment

### Added

- **Web3Forms Contact Delivery**: Integrated direct API submission via Web3Forms (`https://api.web3forms.com/submit`) with spam honeypot (`botcheck`), custom subject formatting, and graceful `mailto:` fallback.
- **React Bits `<SwarmCursor />` Integration**: Added WebGL2-powered instanced particle swarm cursor effect (`SwarmCursor.tsx` and `SwarmCursor.css`) in `src/components/reactbits/` with lazy desktop-only initialization.
- **Universal Floating AI Chat Action Button**: Replaced the bulky mobile bottom dock with a sleek, responsive floating AI action button on the bottom right with safe-area insets.
- **Enhanced Footer Layout**: Added balanced copyright and portfolio engineering terms notices to `ContactSection.tsx`.

### Changed

- **INP (Interaction to Next Paint) Optimization**: Eliminated forced synchronous reflows and 1.7s input delay by caching target element computed styles, throttling `findTarget()` to pointer/scroll events, reducing Jacobi fluid pressure iterations from 12 to 4, and scaling particle count to 150.
- **Contact Form Cleanup**: Replaced placeholder Turnstile container with transparent honeypot spam protection.
- **Hero Name Responsiveness**: Fixed mobile font scaling and orphan letter initial wrapping (`"F"`) by adjusting fluid clamp to `clamp(1.75rem, 7vw, 6.5rem)` and grouping trailing initials in `Text3DFlip.tsx`.
- **Mobile Navigation Drawer**: Realigned and centered navigation drawer items with consistent typography, balanced vertical padding, and styled resume download action button.
- **Sections Streamlined**: Removed Skills Evidence Matrix and Open Source & GitHub sections to focus content and optimize mobile DOM and bundle weight.
- **Contact Footer Cleanup**: Removed mobile phone pill and dead spacing in the footer.

---

## [2026-11-06] — Performance Optimization, Font Modernization & UI Realignment

### Added

- **Core Web Vitals Optimizations**: 96/100 Desktop Lighthouse performance score with 0ms TBT and 1,135ms LCP through deferred interactive WebGL/canvas effect mounting and ambient video deferral.
- **Unified Contact Pill**: Redesigned contact capsule integrating direct mailto link, arrow indicator, and inline clipboard copy button.

### Changed

- **Modern Typography**: Replaced serif and italic headlines with Outfit and Inter bold roman typography across hero name, dynamic focus text, and section badges.
- **Credential Alignment**: Balanced featured credential cards with verified metadata, eliminating broken image placeholders and empty category tabs.
- **Accurate Honors & Metrics**: Grounded Snapshot metrics in verified symposium victories and event leadership, removing unverified client audit claims.

---

## [2026-08-26] — Secondary Domain Migration (Email & Blog) to sahayasavari.dev

### Changed

- **Contact Email Migration**: Updated the primary contact email to `contact@sahayasavari.dev` across application UI, JSON-LD schemas, recruiter portal, `llms.txt`, and security policies.
- **Engineering Blog Migration**: Migrated primary blog showcase and Schema.org `TechArticle` article URLs to `https://blog.sahayasavari.dev`.
- **Infrastructure Configuration**: Cleaned `.firebaserc` and `firebase.json` to retain solely the active `sahaya-savari-portfolio` project and `sahayasavari-dev` hosting target.

---

## [2026-08-26] — Production Domain Migration to sahayasavari.dev

### Changed

- **Canonical Domain Migration**: Migrated primary production website identity and canonical SEO baseline to `https://sahayasavari.dev`.
- **Infrastructure Deployment**: Configured deployment in `firebase.json` and `.firebaserc` targeting new Firebase project `sahaya-savari-portfolio` (`sahayasavari-dev`).
- **Structured Data & SEO**: Updated Person URI anchor (`https://sahayasavari.dev/#person`), `WebSite`, `ProfilePage`, `sitemap.xml`, and `robots.txt` to `https://sahayasavari.dev`.
- **Preserved Subsystems**: Intentionally preserved email routing (`the previous contact address`) and engineering blog (`https://blog.sahayasavari.dev`) during initial website rollout (subsequently migrated to `.dev` — see entry above).

---

## [2026-08-22] — Documentation & SEO Baseline

### Added

- **Core Application**: Single Page Application built with React 19 (`19.2.3`), TypeScript 5.9 (`5.9.3`), Vite 7 (`7.2.4`), Tailwind CSS v4 (`4.1.17`), Framer Motion (`12.38.0`), GSAP (`3.15.0`), and Lucide React.
- **Static Pre-rendering Pipeline**: SSR pre-rendering build script (`scripts/prerender-seo.js` and `src/entry-server.tsx`) that generates static HTML files for all 9 public canonical routes (`/`, `/projects`, `/resume`, `/blog`, `/recruiter`, `/ai`, `/projects/prepmind-ai`, `/projects/daily-spark`, `/projects/portfolio-website`).
- **SEO & Schema.org Graph**: Structured JSON-LD graph architecture centered on Person URI anchor (`https://sahayasavari.dev/#person`), including `WebSite`, `ProfilePage`, `TechArticle`, and `SoftwareApplication` graph nodes.
- **AI Discoverability**: Machine-readable `/llms.txt` and `/llms-full.txt` context documents.
- **Media & Document Features**: In-app PDF resume viewer (`src/components/ResumeViewer.tsx`), HLS video background streaming (`src/components/HlsVideo.tsx`), and WebGL background graphics (`OGL`).
- **Security & Caching Rules**: Security headers (CSP, HSTS, X-Frame-Options) and Cache-Control rules configured in `firebase.json` for Firebase Hosting CDN deployment.
- **Repository Documentation**: Proprietary `LICENSE` notice and public repository documentation (`README.md`, `PROJECT.md`).

### Changed

- **Person Entity Signals**: Updated Person entity `name: "Sahaya Savari F"` and `alternateName: "Sahaya Savari"`, updated homepage title tag to `Sahaya Savari F | AI Engineer & M.Sc. AI Student`, and added verified LeetCode profile (`https://leetcode.com/u/sahaya_savari/`) to `sameAs`.
- **Metadata Synchronization**: Unified `<title>`, `<meta description>`, canonical URLs, Open Graph, and Twitter metadata across all pre-rendered HTML targets.
- **Gitignore Hardening**: Updated `.gitignore` to protect local tool directories and temporary files.
