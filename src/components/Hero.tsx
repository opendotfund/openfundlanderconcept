import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SwapWidget } from '@/components/SwapWidget';

// Add CSS animation for the progress bar
const progressAnimation = `
  @keyframes progress {
    0% { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }
`;

const Hero = () => {
  const isMobile = useIsMobile();
  const [selectedAsset, setSelectedAsset] = useState('bitcoin');
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  
  // Sample asset data with performance
  const assets = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$42,350', change: '+3.2%', isPositive: true },
    { name: 'Ethereum', symbol: 'ETH', price: '$2,850', change: '+1.8%', isPositive: true },
    { name: 'Solana', symbol: 'SOL', price: '$98.75', change: '+5.4%', isPositive: true },
    { name: 'Apple', symbol: 'AAPL', price: '$178.50', change: '-0.5%', isPositive: false },
    { name: 'Tesla', symbol: 'TSLA', price: '$242.30', change: '+2.1%', isPositive: true },
    { name: 'Gold', symbol: 'XAU', price: '$2,380', change: '+0.8%', isPositive: true },
    { name: 'Oil', symbol: 'OIL', price: '$75.20', change: '-1.2%', isPositive: false },
    { name: 'Amazon', symbol: 'AMZN', price: '$3,500', change: '+1.5%', isPositive: true },
  ];
  
  // Auto-scroll through assets
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAssetIndex((prevIndex) => (prevIndex + 1) % assets.length);
    }, 3000); // Change asset every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Add the animation to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = progressAnimation;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                A <span className="text-primary">Modern Platform</span> for Global Investment
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto md:mx-0">
                Access decentralized funds, trade with confidence, and earn rewards through our innovative platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8 md:mb-0">
                <Button size="lg" className="text-base md:text-lg px-6 py-3 h-auto" asChild>
                  <Link to="/explore">
                    Explore Funds <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-base md:text-lg px-6 py-3 h-auto border-2" asChild>
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className={`w-full md:w-1/2 ${isMobile ? 'ml-0 -mr-4' : ''}`}>
              {isMobile ? (
                <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                      <span className="font-medium">Quick Trade</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Powered by OpenFund</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-3 border border-border">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">From</span>
                        <span className="text-xs text-muted-foreground">Balance: 1,234.56 USDC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                            <span className="text-xs font-medium">$</span>
                          </div>
                          <span className="font-medium">USDC</span>
                        </div>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          className="bg-transparent border-none outline-none text-right w-24 font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <path d="M12 5v14M5 12l7-7 7 7"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="bg-background rounded-lg p-3 border border-border">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">To</span>
                        <span className="text-xs text-muted-foreground">Balance: 0.00 ETH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                            <span className="text-xs font-medium">Ξ</span>
                          </div>
                          <span className="font-medium">ETH</span>
                        </div>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          className="bg-transparent border-none outline-none text-right w-24 font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Rate: 1 USDC = 0.00045 ETH</span>
                      <span>Fee: 0.3%</span>
                    </div>
                    
                    <Button className="w-full">Swap</Button>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                      <span className="font-medium">Quick Trade</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Powered by OpenFund</div>
                  </div>
                  <SwapWidget selectedAsset={selectedAsset} />
                </div>
              )}
              
              {/* Asset Performance Banner */}
              <div className="mt-4 bg-card/50 border border-border rounded-lg p-3 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium">{assets[currentAssetIndex].symbol}</span>
                    </div>
                    <div>
                      <div className="font-medium">{assets[currentAssetIndex].name}</div>
                      <div className="text-sm text-muted-foreground">{assets[currentAssetIndex].price}</div>
                    </div>
                  </div>
                  <div className={`flex items-center ${assets[currentAssetIndex].isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {assets[currentAssetIndex].isPositive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="font-medium">{assets[currentAssetIndex].change}</span>
                  </div>
                </div>
                <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${assets[currentAssetIndex].isPositive ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ 
                      width: '100%',
                      animation: 'progress 3s linear infinite',
                      transformOrigin: 'left'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
