
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Check } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

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
            <div className="bg-card p-6 rounded-xl shadow-lg relative transition-colors duration-300">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold transition-colors duration-300">
                Featured Investment
              </div>
              <h3 className="text-2xl font-bold mb-2 transition-colors duration-300">Berkshire Hathaway</h3>
              <p className="text-muted-foreground mb-4 transition-colors duration-300">World-class conglomerate with a long history of exceptional returns led by Warren Buffett.</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground transition-colors duration-300">Year-to-date return</span>
                <span className="text-primary font-bold text-xl transition-colors duration-300">+15.3%</span>
              </div>
              <div className="flex justify-between items-center mb-4">
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
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-lg">Quick Trade</h4>
                  <Link to="/trade?from=usdt&amount=850000&to=brkA" className="text-primary text-sm hover:underline">
                    Full Trade View
                  </Link>
                </div>
                
                {/* From Amount */}
                <div className="bg-secondary rounded-lg p-3 mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">From</span>
                    <span className="text-sm text-muted-foreground">Balance: 1,000,000 USDC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">850,000</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-full text-primary font-medium">USDC</span>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="flex justify-center my-2">
                  <div className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center">
                    <ArrowDown size={16} className="text-muted-foreground" />
                  </div>
                </div>
                
                {/* To Amount */}
                <div className="bg-secondary rounded-lg p-3 mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">To</span>
                    <span className="text-sm text-muted-foreground">Est. Shares: 1.497</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">~1.497 shares</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-full text-primary font-medium">BRK.A</span>
                  </div>
                </div>
                
                {/* Trade Options */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between bg-secondary p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="home-take-profit" className="text-xs text-muted-foreground">Take Profit</Label>
                      <Switch
                        id="home-take-profit"
                        className="transition-all duration-300 data-[state=checked]:shadow-glow dark:data-[state=checked]:bg-openfund-green dark:data-[state=checked]:border-openfund-green-light dark:data-[state=unchecked]:bg-muted/30 dark:data-[state=unchecked]:border-muted-foreground"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">$596,263 (+5%)</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-secondary p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="home-stop-loss" className="text-xs text-muted-foreground">Stop Loss</Label>
                      <Switch
                        id="home-stop-loss"
                        className="transition-all duration-300 data-[state=checked]:shadow-glow dark:data-[state=checked]:bg-openfund-green dark:data-[state=checked]:border-openfund-green-light dark:data-[state=unchecked]:bg-muted/30 dark:data-[state=unchecked]:border-muted-foreground"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">$539,476 (-5%)</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  size="sm"
                  asChild
                >
                  <Link to="/trade?from=usdt&amount=850000&to=brkA">
                    Place Order
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
