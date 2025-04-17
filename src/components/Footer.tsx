import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Twitter, Github, Linkedin, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background pt-16 pb-8 border-t border-gray-200 dark:border-openfund-gray-light transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4 flex flex-col items-center text-center">
            <Logo size="lg" />
            <p className="text-gray-700 dark:text-gray-400 mt-4 transition-colors duration-300">
              The next generation platform for commodities, stocks, and crypto trading.
            </p>
            <div className="flex space-x-4 justify-center">
              <a 
                href="https://x.com/OpendotFund" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/opendotfund" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Products</h3>
            <ul className="space-y-3">
              <li><Link to="/trade?type=commodities&asset=gold" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Commodities</Link></li>
              <li><Link to="/trade?type=stocks&asset=apple" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Stocks</Link></li>
              <li><Link to="/trade?type=crypto" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Cryptocurrencies</Link></li>
              <li><Link to="/fund-manager" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Fund Management</Link></li>
              <li><Link to="/coming-soon" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Tokenization</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about-us" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Blog</Link></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Press</a></li>
              <li><Link to="/contact" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Contact</Link></li>
              <li><Link to="/legal" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Legal</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Resources</h3>
            <ul className="space-y-3">
              <li><a href="https://openfund.gitbook.io/openfund-docs" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Documentation</a></li>
              <li><Link to="/contact" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Help Center</Link></li>
              <li><Link to="/api" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">API</Link></li>
              <li><a href="https://t.me/opendotfund" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Community</a></li>
              <li><a href="https://sol.openfund.online" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Issuance Ledger</a></li>
              <li><a 
                  href="https://sol.openfund.online" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300"
                >
                  Status <span className="testnet-badge">Testnet</span>
                </a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="pt-8 mt-8 border-t border-gray-200 dark:border-openfund-gray-light flex flex-col md:flex-row justify-between items-center transition-colors duration-300">
        <div className="mb-4 md:mb-0 text-gray-700 dark:text-gray-400 text-sm transition-colors duration-300">
          &copy; {new Date().getFullYear()} OpenFund. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm">
          <Link to="/legal?tab=privacy" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Privacy Policy</Link>
          <Link to="/legal?tab=terms" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Terms of Service</Link>
          <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-openfund-blue dark:hover:text-openfund-green transition-colors duration-300">Legal</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
