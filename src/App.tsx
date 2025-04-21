import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import MobileBanner from './components/MobileBanner';
import Auth from './components/Auth';
import { AuthProvider } from './components/AuthContext';
import { SEO } from './components/SEO';

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
      document.documentElement.style.setProperty('--color-text-subdued', '#555555');
      document.documentElement.style.setProperty('--color-border', '#e5e5e5');
      document.documentElement.style.setProperty('--logo-color', '#0EA5E9');
      document.documentElement.style.setProperty('--logo-dot-color', '#0EA5E9');
      document.documentElement.style.setProperty('--glow-color', 'rgba(14, 165, 233, 0.7)');
    }
  };
  
  return (
    <HelmetProvider>
      <ThirdwebProvider
        activeChain="sepolia"
        clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
      >
        <AuthProvider>
          <Router>
            <div className="app">
              <SEO 
                title="OpenFund - Modern Investment Platform"
                description="Trade stocks, crypto, commodities and more on a single platform with OpenFund. Create or join community-managed funds with transparent performance."
                keywords="OpenFund, crypto trading, investment platform, community funds, transparent investing"
                canonicalUrl="https://openfund.com"
              />
              
              <MobileBanner />
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
                <Route path="/api" element={<ApiDocs />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </ThirdwebProvider>
    </HelmetProvider>
  );
}

export default App;
