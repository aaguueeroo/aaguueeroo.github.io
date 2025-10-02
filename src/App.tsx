import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/home/HomePage";
import { AboutPage } from "./pages/about/AboutPage";
import QuotePage from "./pages/quote/QuotePage";
import BlogPage from "./pages/blog/BlogPage";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import ProjectPage from "./pages/portfolio/ProjectPage";
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
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
