
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-12 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-300">
              The Modern Platform for <span className="text-primary transition-colors duration-300">Global Investments</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 transition-colors duration-300">
              Trade stocks, crypto, commodities and more on a single platform. 
              Create or join community-managed funds with transparent performance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 transition-colors duration-300"
                asChild
              >
                <Link to="/trade">
                  Start Trading
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-foreground text-foreground hover:bg-foreground/10 text-lg px-8 py-3 transition-colors duration-300"
                asChild
              >
                <Link to="/explore">
                  Explore Funds
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-card p-8 rounded-xl shadow-lg relative transition-colors duration-300">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold transition-colors duration-300">
                Featured Investment
              </div>
              <h3 className="text-2xl font-bold mb-2 transition-colors duration-300">Berkshire Hathaway</h3>
              <p className="text-muted-foreground mb-6 transition-colors duration-300">World-class conglomerate with a long history of exceptional returns led by Warren Buffett.</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground transition-colors duration-300">Year-to-date return</span>
                <span className="text-primary font-bold text-xl transition-colors duration-300">+15.3%</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground transition-colors duration-300">Share price</span>
                <span className="font-bold transition-colors duration-300">$567,870</span>
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-300"
                asChild
              >
                <Link to="/fund-detail/traditional/1">
                  View Details
                </Link>
              </Button>
              
              {/* Trade Widget Preview */}
              <div className="mt-6 p-4 bg-background border border-border rounded-lg transition-colors duration-300">
                <div className="text-sm font-medium mb-2 flex justify-between items-center">
                  <span>Quick Trade</span>
                  <Link to="/trade" className="text-primary text-xs hover:underline">Open full trader →</Link>
                </div>
                <div className="flex items-center justify-between p-2 bg-card border border-border rounded-lg mb-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">From</span>
                    <span className="font-semibold">$850,000</span>
                  </div>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">USDC</span>
                </div>
                <div className="flex justify-center my-1">
                  <div className="bg-muted rounded-full p-1">
                    <ArrowDown size={14} className="text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-card border border-border rounded-lg mb-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">To</span>
                    <span className="font-semibold">1.49 shares</span>
                  </div>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">BRK.A</span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
                  asChild
                >
                  <Link to="/trade?from=usdc&to=brk-a&amount=850000">
                    Swap Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-0 transition-colors duration-300"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-0 transition-colors duration-300"></div>
    </section>
  );
};

export default Hero;
