import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Gzip for wide compatibility
    viteCompression({ algorithm: "gzip", ext: ".gz" }),
    // Brotli for modern browsers (smaller by ~15–25%)
    viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
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
    target: ['es2020', 'chrome90', 'firefox90', 'safari14'],
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