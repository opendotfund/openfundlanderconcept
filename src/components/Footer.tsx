
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Twitter, Github, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-openfund-gray-medium pt-16 pb-8 border-t border-openfund-gray-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-gray-400 mt-4">
              The next generation platform for commodities, stocks, and crypto trading.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/OpendotFund" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-openfund-green"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-openfund-green">
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/opendotfund" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-openfund-green"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-openfund-green">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link to="/trade?type=commodities" className="text-gray-400 hover:text-openfund-green">Commodities</Link></li>
              <li><Link to="/trade?type=stocks" className="text-gray-400 hover:text-openfund-green">Stocks</Link></li>
              <li><Link to="/trade?type=crypto" className="text-gray-400 hover:text-openfund-green">Cryptocurrencies</Link></li>
              <li><Link to="/fund-manager" className="text-gray-400 hover:text-openfund-green">Fund Management</Link></li>
              <li><Link to="/coming-soon" className="text-gray-400 hover:text-openfund-green">Tokenization</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-openfund-green">About Us</a></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-openfund-green">Careers</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-openfund-green">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-openfund-green">Press</a></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-openfund-green">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="https://openfund.gitbook.io/openfund-docs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-openfund-green">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-openfund-green">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-openfund-green">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-openfund-green">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-openfund-green">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-openfund-gray-light flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} OpenFund. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-openfund-green">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-openfund-green">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-openfund-green">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
