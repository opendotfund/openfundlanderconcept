
import React, { useState } from 'react';
import { AssetChart } from '@/components/AssetChart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { SwapWidget } from '@/components/SwapWidget';
import { AssetList } from '@/components/AssetList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradeHistory } from '@/components/TradeHistory';

const Trade = () => {
  const [selectedAsset, setSelectedAsset] = useState('bitcoin');
  const [timeframe, setTimeframe] = useState('24h');
  const [assetType, setAssetType] = useState<'crypto' | 'stocks' | 'commodities'>('crypto');

  const handleAssetTypeChange = (value: string) => {
    if (value === 'crypto' || value === 'stocks' || value === 'commodities') {
      setAssetType(value);
    }
  };

  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Trade Assets</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-openfund-gray-medium p-6 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)} Price Chart
                </h2>
                <TimeframeSelector 
                  timeframe={timeframe} 
                  onChange={setTimeframe}
                />
              </div>
              <AssetChart asset={selectedAsset} timeframe={timeframe} />
            </div>
            
            <div className="bg-openfund-gray-medium p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Trade History</h2>
              <TradeHistory asset={selectedAsset} />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-openfund-gray-medium p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Trade</h2>
              <SwapWidget selectedAsset={selectedAsset} />
            </div>
            
            <div className="bg-openfund-gray-medium p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Popular Assets</h2>
              
              <Tabs defaultValue="crypto" value={assetType} onValueChange={handleAssetTypeChange} className="mb-4">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="stocks">Stocks</TabsTrigger>
                  <TabsTrigger value="commodities">Commodities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="crypto">
                  <AssetList 
                    type="crypto" 
                    onSelect={setSelectedAsset} 
                    selectedAsset={selectedAsset} 
                  />
                </TabsContent>
                
                <TabsContent value="stocks">
                  <AssetList 
                    type="stocks" 
                    onSelect={setSelectedAsset} 
                    selectedAsset={selectedAsset} 
                  />
                </TabsContent>
                
                <TabsContent value="commodities">
                  <AssetList 
                    type="commodities" 
                    onSelect={setSelectedAsset} 
                    selectedAsset={selectedAsset} 
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Trade;
