
import React, { useState, useEffect } from 'react';
import { AssetChart } from '@/components/AssetChart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { SwapWidget } from '@/components/SwapWidget';
import { AssetList } from '@/components/AssetList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradeHistory } from '@/components/TradeHistory';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from 'react-router-dom';

const Trade = () => {
  const [selectedAsset, setSelectedAsset] = useState('bitcoin');
  const [timeframe, setTimeframe] = useState('24h');
  const [assetType, setAssetType] = useState<'crypto' | 'stocks' | 'commodities'>('crypto');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when component mounts or location changes
    window.scrollTo(0, 0);
  }, [location]);

  const handleAssetTypeChange = (value: string) => {
    if (value === 'crypto' || value === 'stocks' || value === 'commodities') {
      setAssetType(value);
      // Scroll to top when changing tabs
      window.scrollTo(0, 0);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Scroll to top when selecting a new asset
  const handleAssetSelect = (asset: string) => {
    setSelectedAsset(asset);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-3 md:p-6 rounded-lg mb-4 md:mb-6">
              <div className="flex flex-col mb-3 md:mb-4 gap-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                  <h2 className="text-lg md:text-xl font-bold">
                    {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)} Price Chart
                  </h2>
                </div>
                <TimeframeSelector 
                  timeframe={timeframe} 
                  onChange={setTimeframe}
                />
              </div>
              {/* Chart container with fixed height to properly fill the space */}
              <div className="w-full flex justify-center items-center" style={{ height: isMobile ? '320px' : '360px' }}>
                <AssetChart asset={selectedAsset} timeframe={timeframe} />
              </div>
            </div>
            
            <div className="bg-card border border-border p-3 md:p-6 rounded-lg">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Trade History</h2>
              <TradeHistory asset={selectedAsset} />
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <div className="bg-card border border-border p-3 md:p-6 rounded-lg">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Trade</h2>
              <SwapWidget selectedAsset={selectedAsset} />
            </div>
            
            <div className="bg-card border border-border p-3 md:p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 md:mb-4 gap-2">
                <h2 className="text-lg md:text-xl font-bold">Popular Assets</h2>
                <div className="relative w-full sm:w-auto">
                  <Input
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-8 w-full"
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <Tabs defaultValue="crypto" value={assetType} onValueChange={handleAssetTypeChange} className="mb-3 md:mb-4">
                <TabsList className="grid grid-cols-3 mb-3 md:mb-4">
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="stocks">Stocks</TabsTrigger>
                  <TabsTrigger value="commodities">Commodities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="crypto">
                  <AssetList 
                    type="crypto" 
                    onSelect={handleAssetSelect} 
                    selectedAsset={selectedAsset}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
                
                <TabsContent value="stocks">
                  <AssetList 
                    type="stocks" 
                    onSelect={handleAssetSelect} 
                    selectedAsset={selectedAsset}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
                
                <TabsContent value="commodities">
                  <AssetList 
                    type="commodities" 
                    onSelect={handleAssetSelect} 
                    selectedAsset={selectedAsset}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Trade;
