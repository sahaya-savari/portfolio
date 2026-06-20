import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portfolio/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // LH-5: Disable sourcemaps in production — reduces bundle size ~30%
    sourcemap: false,
    // LH-5: Raise chunk size warning limit (pdf.worker.min is legitimately large)
    chunkSizeWarningLimit: 1200,
    // LH-5: Use esbuild for faster, smaller output
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Keep PDF viewer isolated — only loads when resume is opened
          if (id.includes('react-pdf') || id.includes('pdfjs-dist')) {
            return 'react-pdf';
          }
          // Keep framer-motion isolated — loads async via LazyMotion
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          // Keep HLS isolated — loads lazily per-section
          if (id.includes('hls.js') || id.includes('hls/')) {
            return 'hls';
          }
          // Vendor: lucide-react (icon library — tree-shakeable but still large)
          if (id.includes('lucide-react')) {
            return 'lucide';
          }
          // Vendor: React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});