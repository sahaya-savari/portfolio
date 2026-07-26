import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const RecruiterMode = lazy(() => import('./pages/RecruiterMode'));
const AskSahayaAI = lazy(() => import('./pages/AskSahayaAI'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const loadingFallback = (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={
          <Suspense fallback={loadingFallback}>
            <ProjectsPage />
          </Suspense>
        } />
        <Route path="projects/:projectId" element={
          <Suspense fallback={loadingFallback}>
            <ProjectDetails />
          </Suspense>
        } />
        <Route path="blog" element={
          <Suspense fallback={loadingFallback}>
            <BlogPage />
          </Suspense>
        } />
        <Route path="resume" element={
          <Suspense fallback={loadingFallback}>
            <ResumePage />
          </Suspense>
        } />
        <Route path="recruiter" element={
          <Suspense fallback={loadingFallback}>
            <RecruiterMode />
          </Suspense>
        } />
        <Route path="ai" element={
          <Suspense fallback={loadingFallback}>
            <AskSahayaAI />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={loadingFallback}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}
