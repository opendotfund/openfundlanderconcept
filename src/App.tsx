import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useEffect, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import MobileBanner from './components/MobileBanner';
import Auth from './components/Auth';
import { AuthProvider } from './components/AuthContext';
import { SEO } from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
import ApiDocs from './pages/ApiDocs';

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
      updateThemeColors(false);
    } else {
      // Set dark mode as default if no preference
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      updateThemeColors(true);
    }

    // Listen for theme changes
    const handleStorageChange = (event) => {
      if (event.key === 'theme') {
        const currentTheme = event.newValue;
        if (currentTheme === 'light') {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
          updateThemeColors(false);
        } else if (currentTheme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
          updateThemeColors(true);
        }
      }
    };
    
    // Also listen for custom theme-change event (for in-app changes)
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        updateThemeColors(false);
      } else if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        updateThemeColors(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('theme-change', handleThemeChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, []);
  
  // Function to update theme-related CSS variables
  const updateThemeColors = (isDark) => {
    if (isDark) {
      document.documentElement.style.setProperty('--color-primary', 'var(--color-green)');
      document.documentElement.style.setProperty('--color-primary-light', 'var(--color-green-light)');
      document.documentElement.style.setProperty('--color-primary-dark', 'var(--color-green-dark)');
      document.documentElement.style.setProperty('--color-text-subdued', '#888888');
      document.documentElement.style.setProperty('--color-border', '#333333');
      document.documentElement.style.setProperty('--logo-color', '#00FF00');
      document.documentElement.style.setProperty('--logo-dot-color', '#00FF00');
      document.documentElement.style.setProperty('--glow-color', 'rgba(0, 255, 0, 0.7)');
    } else {
      document.documentElement.style.setProperty('--color-primary', 'var(--color-blue)');
      document.documentElement.style.setProperty('--color-primary-light', 'var(--color-blue-light)');
      document.documentElement.style.setProperty('--color-primary-dark', 'var(--color-blue-dark)');
      document.documentElement.style.setProperty('--color-text-subdued', '#666666');
      document.documentElement.style.setProperty('--color-border', '#E5E7EB');
      document.documentElement.style.setProperty('--logo-color', '#3B82F6');
      document.documentElement.style.setProperty('--logo-dot-color', '#3B82F6');
      document.documentElement.style.setProperty('--glow-color', 'rgba(59, 130, 246, 0.7)');
    }
  };

  return (
    <HelmetProvider>
      <ThirdwebProvider
        activeChain="ethereum"
        clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
        secretKey={import.meta.env.VITE_THIRDWEB_SECRET_KEY}
      >
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/assets" element={<Assets />} />
                  <Route path="/my-assets" element={<MyAssets />} />
                  <Route path="/trade" element={<Trade />} />
                  <Route path="/explore" element={<ExploreFunds />} />
                  <Route path="/fund" element={<Fund />} />
                  <Route path="/fund/:id" element={<FundDetail />} />
                  <Route path="/fund-manager" element={<FundManager />} />
                  <Route path="/coming-soon" element={<ComingSoon />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/legal" element={<Legal />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/api-docs" element={<ApiDocs />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </ThirdwebProvider>
    </HelmetProvider>
  );
}

export default App;
