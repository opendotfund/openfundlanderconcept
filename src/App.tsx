
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";

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

import './App.css';

function App() {
  return (
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
