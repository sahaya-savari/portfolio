# 🚀 Sahaya Savari F — Portfolio & System Documentation

Personal portfolio and technical showcase of **Sahaya Savari F** — AI Engineer, Python Developer, Full Stack Developer, and M.Sc. Artificial Intelligence student at St. Joseph's College (Autonomous), Trichy.

<p align="center">
  <a href="https://sahayasavari.me">🌐 Portfolio</a> •
  <a href="https://blog.sahayasavari.me">✍️ Engineering Blog</a> •
  <a href="https://github.com/sahaya-savari">💻 GitHub</a> •
  <a href="https://www.linkedin.com/in/sahaya-savari">💼 LinkedIn</a>
</p>

---

## 📌 Production Links & Identity

- **Production Site**: [https://sahayasavari.me](https://sahayasavari.me)
- **Technical Blog**: [https://blog.sahayasavari.me](https://blog.sahayasavari.me)
- **GitHub**: [https://github.com/sahaya-savari](https://github.com/sahaya-savari)
- **LinkedIn**: [https://www.linkedin.com/in/sahaya-savari](https://www.linkedin.com/in/sahaya-savari)
- **Contact Email**: [contact@sahayasavari.me](mailto:contact@sahayasavari.me)
- **Primary Search Entity**: Sahaya Savari F (`Sahaya Savari`)

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Core Framework** | React 19 (`19.2.3`), TypeScript 5.9 (`5.9.3`) |
| **Build Tooling** | Vite 7 (`7.2.4`), Node ES Modules |
| **Routing** | React Router v7 (`^7.18.1`) |
| **Styling** | Tailwind CSS v4 (`4.1.17`) |
| **Animations & UI** | Framer Motion (`^12.38.0`), GSAP (`^3.15.0`), Lucide React |
| **Media & Audio** | HLS.js (`^1.6.15`), Web Audio API, OGL WebGL |
| **Documents** | PDF.js / React-PDF (`^10.4.1`) |
| **Hosting & Infra** | Firebase Hosting, Cloudflare CDN Edge |

---

## 🏗️ Pre-rendering & System Architecture

The application uses static pre-rendering built on React 19 server rendering (`react-dom/server`). During production build, Vite compiles an SSR module that renders full semantic HTML body content into `<div id="root">` for every public route before client-side hydration.

```text
React Application (Single Source of Truth)
        ↓
Vite Client Build (dist/)
        ↓
Vite SSR Build (.tmp-server/entry-server.js)
        ↓
Static HTML Pre-renderer (scripts/prerender-seo.js)
        ↓
10 Route-Specific HTML Files (dist/<route>/index.html)
        ↓
Firebase Hosting CDN
        ↓
Browser Load → React 19 Client Hydration
```

---

## 🌐 Public Pre-rendered Routes

The following 10 routes are statically pre-rendered during build:

1. `/` — Portfolio Homepage (Hero, About, Skills, Projects, Blog, Open Source, Certifications, Contact)
2. `/projects` — Projects Directory
3. `/resume` — Curriculum Vitae & Resume Viewer
4. `/blog` — Technical Articles & Engineering Notes
5. `/recruiter` — ATS-Friendly Candidate Summary
6. `/ai` — Ask Sahaya AI Assistant
7. `/projects/prepmind-ai` — PrepMind AI Case Study
8. `/projects/daily-spark` — Daily Spark Case Study
9. `/projects/portfolio-website` — Portfolio Website Case Study

---

## 🎯 SEO, AEO & Entity Architecture

- **Stable Person `@id` Node**: URI anchor `https://sahayasavari.me/#person` unifies identity across `Person` (`name: "Sahaya Savari"`, `alternateName: "Sahaya Savari F"`, `affiliation: St. Joseph's College (Autonomous), Trichy`), `WebSite`, and `ProfilePage` JSON-LD schemas.
- **Secondary Route `@graph` Linkages**: Unified route schemas on `/projects`, `/blog`, `/resume`, `/recruiter`, and `/ai` link content author/mainEntity to `@id: https://sahayasavari.me/#person`.
- **Case Study & Blog Cross-Links**: Project case studies link directly to published engineering articles on `blog.sahayasavari.me`.
- **Clean Metadata**: All `<title>`, `<meta description>`, `canonical`, Open Graph, and Twitter metadata tags exist strictly inside `<head>` (duplicate tags inside body `#root` are automatically stripped during static pre-rendering).
- **Crawlability & Indexing**: Includes `sitemap.xml`, `robots.txt`, and canonical host enforcement.
- **AI Discoverability (AEO/GEO)**: Includes `/llms.txt` and `/llms-full.txt` for LLM search indexing agents.

---

## 📂 Project Structure

```text
portfolio/
├── public/                 # Static assets, sitemap.xml, robots.txt, llms.txt
├── scripts/
│   └── prerender-seo.js   # Static pre-rendering build script
├── src/
│   ├── components/        # Reusable UI components & SEOHead
│   ├── data/              # Case studies & static article data
│   ├── layouts/           # RootLayout with navigation & footer
│   ├── pages/             # Route page components
│   ├── sections/          # Portfolio homepage sections
│   ├── App.tsx            # React Router v7 routes configuration
│   ├── entry-server.tsx   # React SSR server rendering entry point
│   ├── main.tsx           # Client hydration entry point
│   └── seo.ts             # Schema.org JSON-LD definitions & metadata constants
├── firebase.json          # Firebase Hosting configuration & security headers
├── package.json           # Dependencies & build scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite build configuration & chunk splitting
```

---

## ⚡ Development & Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Build
Runs Vite client build, builds SSR bundle, and executes static pre-rendering for all routes:
```bash
npm run build
```

### Local Production Preview
```bash
npm run preview
```

### Deployment
Deploy pre-rendered build output to Firebase Hosting:
```bash
npx firebase deploy --only hosting
```

---

## 📄 License

Copyright © 2026 Sahaya Savari F. All Rights Reserved.
