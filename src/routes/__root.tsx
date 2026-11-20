import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
import { SITE_NAME } from "../seo";

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">This page didn't load</h1>
        <p className="mt-2 text-sm text-white/60">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#000000" },
      { name: "google-site-verification", content: "40dmjhvZ5HG8_rYlLkardDTyX1fC0Ux2UPGyko6eHgQ" },
      { name: "author", content: "Sahaya Savari" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg?v=2` },
      { rel: "icon", type: "image/png", href: `${import.meta.env.BASE_URL}favicon.png?v=2` },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}favicon.png?v=2` },
      { rel: "manifest", href: `${import.meta.env.BASE_URL}manifest.json` },
      { rel: "me", href: "https://github.com/sahaya-savari" },
      { rel: "me", href: "https://gitlab.com/sahaya-savari" },
      { rel: "me", href: "https://www.linkedin.com/in/sahaya-savari" },
      {
        rel: "preload",
        as: "image",
        href: `${import.meta.env.BASE_URL}hero-ambient-poster.webp`,
        type: "image/webp",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: `${import.meta.env.BASE_URL}profile.webp`,
        type: "image/webp",
        fetchPriority: "high",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
        {children}
        <noscript>
          <style>{`.astral-preloader { display: none !important; }`}</style>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "#fff",
              background: "#000",
              fontFamily: "sans-serif",
            }}
          >
            <p style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 1rem" }}>
              Sahaya Savari - AI/ML &amp; Full Stack Developer
            </p>
            <p>
              This portfolio requires JavaScript to display interactive content. Please enable
              JavaScript or visit my{" "}
              <a href="https://www.linkedin.com/in/sahaya-savari" style={{ color: "#93c5fd" }}>
                LinkedIn profile
              </a>
              .
            </p>
          </div>
        </noscript>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout />
    </QueryClientProvider>
  );
}
