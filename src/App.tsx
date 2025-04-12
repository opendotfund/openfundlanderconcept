
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import Index from './pages/Index';
import Account from './pages/Account';
import Assets from './pages/Assets';
import MyAssets from './pages/MyAssets';
import NotFound from './pages/NotFound';
import Trade from './pages/Trade';
import ExploreFunds from './pages/ExploreFunds';
import Fund from './pages/Fund';
import FundDetail from './pages/FundDetail';
import FundManager from './pages/FundManager';
import ComingSoon from './pages/ComingSoon';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';

import './App.css';

function App() {
  useEffect(() => {
    // Add a transition class to the html element for smoother theme changes
    document.documentElement.classList.add('transition-colors');
    document.documentElement.style.transitionDuration = '500ms';
    
    // Check saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      // Set dark mode as default if no preference
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    // Listen for theme changes
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/account" element={<Account />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/my-assets" element={<MyAssets />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/explore" element={<ExploreFunds />} />
            <Route path="/explore-funds" element={<ExploreFunds />} />
            <Route path="/fund" element={<Fund />} />
            <Route path="/fund-detail/:type/:fundId" element={<FundDetail />} />
            <Route path="/fund-manager" element={<FundManager />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </HelmetProvider>
  );
}

export default App;
