import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';

const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const RecruiterMode = lazy(() => import('./pages/RecruiterMode'));
const AskSahayaAI = lazy(() => import('./pages/AskSahayaAI'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects/:projectId" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" /></div>}>
            <ProjectDetails />
          </Suspense>
        } />
        <Route path="recruiter" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" /></div>}>
            <RecruiterMode />
          </Suspense>
        } />
        <Route path="ai" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50" /></div>}>
            <AskSahayaAI />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}
