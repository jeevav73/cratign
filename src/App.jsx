import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CursorProvider } from './context/CursorContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

const WorkPage = lazy(() => import('./pages/WorkPage.jsx'));
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'));
const StudioPage = lazy(() => import('./pages/StudioPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));

function PageFallback() {
  return <div className="min-h-screen bg-ink" aria-hidden="true" />;
}

export default function App() {
  return (
    <CursorProvider>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:id" element={<ProjectPage />} />
              <Route path="/studio" element={<StudioPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CursorProvider>
  );
}
