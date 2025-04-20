import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const assets = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$65,432',
    change: '+5.2%',
    isUp: true,
    value: 'bitcoin'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$3,456',
    change: '+3.8%',
    isUp: true,
    value: 'ethereum'
  },
  {
    name: 'Gold',
    symbol: 'XAU',
    price: '$2,345',
    change: '+1.2%',
    isUp: true,
    value: 'gold'
  },
  {
    name: 'Apple',
    symbol: 'AAPL',
    price: '$210',
    change: '+2.5%',
    isUp: true,
    value: 'apple'
  },
  {
    name: 'Tesla',
    symbol: 'TSLA',
    price: '$180',
    change: '-1.3%',
    isUp: false,
    value: 'tesla'
  }
];

interface AssetCarouselProps {
  onAssetChange?: (asset: string) => void;
}

export const AssetCarousel = ({ onAssetChange }: AssetCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setDirection('right');
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % assets.length);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  useEffect(() => {
    if (onAssetChange) {
      onAssetChange(assets[currentIndex].value);
    }
  }, [currentIndex, onAssetChange]);

  const handlePrev = () => {
    if (!isTransitioning) {
      setDirection('left');
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + assets.length) % assets.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setDirection('right');
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % assets.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const getNextIndex = (current: number, dir: 'left' | 'right') => {
    if (dir === 'right') {
      return (current + 1) % assets.length;
    } else {
      return (current - 1 + assets.length) % assets.length;
    }
  };

  return (
    <div className="relative">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="relative h-[120px] overflow-hidden">
            {/* Current Asset */}
            <div 
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                isTransitioning 
                  ? direction === 'right' 
                    ? '-translate-x-full' 
                    : 'translate-x-full'
                  : 'translate-x-0'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{assets[currentIndex].name}</h3>
                <span className="text-muted-foreground">{assets[currentIndex].symbol}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{assets[currentIndex].price}</span>
                <span className={`text-lg font-medium ${assets[currentIndex].isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {assets[currentIndex].change}
                </span>
              </div>
            </div>

            {/* Next Asset */}
            <div 
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                isTransitioning 
                  ? direction === 'right' 
                    ? 'translate-x-0' 
                    : '-translate-x-full'
                  : direction === 'right'
                    ? 'translate-x-full'
                    : '-translate-x-full'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{assets[getNextIndex(currentIndex, direction)].name}</h3>
                <span className="text-muted-foreground">{assets[getNextIndex(currentIndex, direction)].symbol}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{assets[getNextIndex(currentIndex, direction)].price}</span>
                <span className={`text-lg font-medium ${assets[getNextIndex(currentIndex, direction)].isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {assets[getNextIndex(currentIndex, direction)].change}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between -mx-8">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="rounded-full h-10 w-10 bg-background/90 hover:bg-background border-2 border-border/50 hover:border-primary transition-all duration-200 shadow-lg"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full h-10 w-10 bg-background/90 hover:bg-background border-2 border-border/50 hover:border-primary transition-all duration-200 shadow-lg"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}; 