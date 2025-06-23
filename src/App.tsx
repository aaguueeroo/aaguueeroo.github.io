import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/home/HomePage";
import { AboutPage } from "./pages/about/AboutPage";
import QuotePage from "./pages/quote/QuotePage";
import BlogPage from "./pages/blog/BlogPage";

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </>
  );
}

export default App;
