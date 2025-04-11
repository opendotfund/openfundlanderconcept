
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              The Modern Platform for <span className="text-openfund-green">Global Investments</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Trade stocks, crypto, commodities and more on a single platform. 
              Create or join community-managed funds with transparent performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark text-lg px-8 py-6"
                asChild
              >
                <Link to="/trade">
                  Start Trading
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-lg px-8 py-6"
                asChild
              >
                <Link to="/explore">
                  Explore Funds
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-openfund-gray-light p-8 rounded-xl shadow-lg relative">
              <div className="absolute -top-4 -right-4 bg-openfund-green text-openfund-gray-dark px-4 py-2 rounded-lg font-bold">
                Featured Investment
              </div>
              <h3 className="text-2xl font-bold mb-2">Berkshire Hathaway</h3>
              <p className="text-gray-300 mb-6">World-class conglomerate with a long history of exceptional returns led by Warren Buffett.</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Year-to-date return</span>
                <span className="text-openfund-green font-bold text-xl">+15.3%</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400">Share Price</span>
                <span className="font-bold">$567,870</span>
              </div>
              <Button className="w-full bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-openfund-green/10 rounded-full blur-[100px] -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-openfund-green/5 rounded-full blur-[80px] -z-0"></div>
    </section>
  );
};

export default Hero;
