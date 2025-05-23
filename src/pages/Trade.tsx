import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { AssetChart } from '@/components/AssetChart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { SwapWidget } from '@/components/SwapWidget';
import { AssetList } from '@/components/AssetList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradeHistory } from '@/components/TradeHistory';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from "@/components/ui/toaster";
import { AssetSearch } from '@/components/AssetSearch';

const Trade = () => {
  const [selectedAsset, setSelectedAsset] = useState('bitcoin');
  const [timeframe, setTimeframe] = useState('24h');
  const [assetType, setAssetType] = useState<'crypto' | 'stocks' | 'commodities'>('crypto');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const assetParam = params.get('asset');
    const typeParam = params.get('type') as 'crypto' | 'stocks' | 'commodities';
    
    if (assetParam) {
      setSelectedAsset(assetParam);
    }
    
    if (typeParam === 'crypto' || typeParam === 'stocks' || typeParam === 'commodities') {
      setAssetType(typeParam);
    }

    window.scrollTo(0, 0);
  }, [location]);

  const handleAssetTypeChange = (value: string) => {
    if (value === 'crypto' || value === 'stocks' || value === 'commodities') {
      setAssetType(value);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAssetSelect = (asset: string) => {
    setSelectedAsset(asset);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Trade - OpenFund"
        description="Trade cryptocurrencies, stocks, commodities and more on OpenFund. Access global markets with transparent fees and live charts."
        canonicalUrl="https://openfund.io/trade" 
      />
      <Navbar />
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border shadow-sm p-3 md:p-4 rounded-lg mb-8">
              <div className="flex flex-col mb-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-1">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto mb-2 sm:mb-0">
                    <h2 className="text-lg md:text-xl font-bold mx-auto sm:mx-0">
                      {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)} Price Chart
                    </h2>
                    <AssetSearch 
                      assetType="all"
                      onSelect={handleAssetSelect}
                      currentAsset={selectedAsset}
                    />
                  </div>
                  <TimeframeSelector 
                    timeframe={timeframe} 
                    onChange={setTimeframe}
                  />
                </div>
              </div>
              <div className={`w-full flex justify-center items-center ${isMobile ? 'h-[250px]' : 'h-[400px]'}`}>
                <AssetChart asset={selectedAsset} timeframe={timeframe} />
              </div>
            </div>
            
            <div className="bg-card border border-border shadow-sm p-3 md:p-6 rounded-lg overflow-x-auto">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Trade History</h2>
              <TradeHistory asset={selectedAsset} />
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <div className="bg-card border border-border shadow-sm p-3 md:p-6 rounded-lg">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Trade</h2>
              <SwapWidget selectedAsset={selectedAsset} />
            </div>
            
            <div className="bg-card border border-border shadow-sm p-3 md:p-6 rounded-lg">
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
