import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/home/HomePage";
import { AboutPage } from "./pages/about/AboutPage";
import QuotePage from "./pages/quote/QuotePage";
import BlogPage from "./pages/blog/BlogPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { trackPageView } from "./services/analytics";

// Component to scroll to top on route change and track page views
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Track page view in Google Analytics
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/build-your-app" element={<QuotePage />} />
        <Route path="/quote" element={<Navigate to="/build-your-app" replace />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
