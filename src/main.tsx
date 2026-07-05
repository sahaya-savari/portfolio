import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";

// Dynamically import domAnimation to eliminate TBT during hydration
const loadFeatures = () => import("framer-motion").then(res => res.domAnimation);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LazyMotion features={loadFeatures}>
          <App />
        </LazyMotion>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
