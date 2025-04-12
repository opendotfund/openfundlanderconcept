
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Index from '@/pages/Index';
import Trade from '@/pages/Trade';
import ExploreFunds from '@/pages/ExploreFunds';
import FundDetail from '@/pages/FundDetail';
import Fund from '@/pages/Fund';
import FundManager from '@/pages/FundManager';
import Assets from '@/pages/Assets';
import MyAssets from '@/pages/MyAssets';
import Blog from '@/pages/Blog';
import AboutUs from '@/pages/AboutUs';
import Careers from '@/pages/Careers';
import ComingSoon from '@/pages/ComingSoon';
import Legal from '@/pages/Legal';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import HowDefiFundsWork from '@/pages/HowDefiFundsWork';

import Account from '@/pages/Account';

function App() {
  const [themePreference, setThemePreference] = useState('dark');

  useEffect(() => {
    // Check for user theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setThemePreference(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemePreference('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/explore-funds" element={<ExploreFunds />} />
        <Route path="/fund-detail/:type/:id" element={<FundDetail />} />
        <Route path="/fund/:id" element={<Fund />} />
        <Route path="/fund-manager" element={<FundManager />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/my-assets" element={<MyAssets />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/account" element={<Account />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-defi-funds-work" element={<HowDefiFundsWork />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
