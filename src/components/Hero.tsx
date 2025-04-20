import React, { useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Check } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { AssetCarousel } from '@/components/AssetCarousel';
import { SwapWidget } from '@/components/SwapWidget';

const Hero = () => {
  const [selectedAsset, setSelectedAsset] = useState('bitcoin');

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
                Featured Assets
              </div>
              
              {/* Asset Carousel */}
              <div className="mb-6">
                <AssetCarousel onAssetChange={setSelectedAsset} />
              </div>
              
              {/* Swap Widget */}
              <div className="mt-6">
                <SwapWidget selectedAsset={selectedAsset} />
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
