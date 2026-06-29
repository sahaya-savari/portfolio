import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Note: vite-plugin-compression removed — Firebase Hosting automatically
    // applies Brotli/Gzip compression at the CDN edge, making pre-compression
    // redundant. The plugin also had a Windows path bug that produced broken
    // output paths (dist/D:/...) so compressed files were never served.
  ],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Disable sourcemaps in production — reduces bundle size ~30%
    sourcemap: false,
    // Raise chunk size warning limit (pdf.worker.min and hls are legitimately large)
    chunkSizeWarningLimit: 1200,
    // Use esbuild for fast, small output
    minify: 'esbuild',
    // Target modern browsers — enables more aggressive dead-code elimination
    // Raised from es2020/chrome90 to es2022/chrome105 for smaller output
    // (class fields, nullish coalescing, optional chaining emit natively)
    target: ['es2022', 'chrome105', 'firefox104', 'safari16'],
    // Disable modulepreload polyfill — all target browsers support it natively
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // PDF viewer — only loads when resume modal is opened
          if (id.includes('react-pdf') || id.includes('pdfjs-dist')) {
            return 'react-pdf';
          }
          // framer-motion — loads async via LazyMotion in main.tsx
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          // HLS — lazily initialized per-section via IntersectionObserver
          if (id.includes('hls.js') || id.includes('hls/')) {
            return 'hls';
          }
          // GSAP — only loads when TargetCursor lazy-imports
          if (id.includes('gsap')) {
            return 'gsap';
          }
          // OGL (Galaxy WebGL) — only loads when Skills/hero section is visible
          if (id.includes('ogl')) {
            return 'ogl';
          }
          // lucide-react — tree-shakeable icon library
          if (id.includes('lucide-react')) {
            return 'lucide';
          }
          // React core — stable, long-lived cache entry
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});