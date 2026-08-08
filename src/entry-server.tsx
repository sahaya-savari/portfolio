import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';
import BlogPage from './pages/BlogPage';
import ResumePage from './pages/ResumePage';
import RecruiterMode from './pages/RecruiterMode';
import AskSahayaAI from './pages/AskSahayaAI';
import NotFound from './pages/NotFound';

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:projectId" element={<ProjectDetails />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="recruiter" element={<RecruiterMode />} />
            <Route path="ai" element={<AskSahayaAI />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
