
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search,
  Filter, 
  ArrowUpDown,
  Star,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AssetChart } from '@/components/AssetChart';
import { AssetList } from '@/components/AssetList';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Assets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAsset, setSelectedAsset] = useState<string>("bitcoin");
  const [timeframe, setTimeframe] = useState<string>("24h");
  const [assetType, setAssetType] = useState<string>("crypto");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Get asset from URL or use default
    const assetParam = searchParams.get('asset');
    if (assetParam) {
      setSelectedAsset(assetParam);
    }

    // Get timeframe from URL or use default
    const timeframeParam = searchParams.get('timeframe');
    if (timeframeParam) {
      setTimeframe(timeframeParam);
    }

    // Get asset type from URL or use default
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setAssetType(typeParam);
    }
  }, [searchParams]);

  const handleAssetSelect = (asset: string) => {
    setSelectedAsset(asset);
    // Update URL params
    searchParams.set('asset', asset);
    setSearchParams(searchParams);
  };

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    // Update URL params
    searchParams.set('timeframe', newTimeframe);
    setSearchParams(searchParams);
  };

  const handleAssetTypeChange = (type: string) => {
    setAssetType(type);
    // Update URL params
    searchParams.set('type', type);
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // We'll implement search functionality here
  };

  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chart Section - 2/3 width on large screens */}
          <div className="lg:w-2/3">
            <div className="bg-openfund-gray-medium rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}</h1>
                  <div className="flex items-center mt-2">
                    <span className="text-xl font-bold text-openfund-green mr-2">$29,245.32</span>
                    <span className="bg-openfund-green/20 text-openfund-green px-2 py-1 rounded-md text-sm flex items-center">
                      <ChevronUp size={14} />
                      2.45%
                    </span>
                  </div>
                </div>

                <TimeframeSelector 
                  timeframe={timeframe} 
                  onChange={handleTimeframeChange} 
                />
              </div>

              <AssetChart 
                asset={selectedAsset} 
                timeframe={timeframe} 
              />
            </div>

            <div className="bg-openfund-gray-medium rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}</h2>
              <p className="text-gray-300 mb-4">
                This is a placeholder description for {selectedAsset}. The actual content would contain relevant information about the asset, its history, use cases, and other important details that investors might be interested in.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400">Market Cap</p>
                  <p className="text-lg font-medium">$564.2B</p>
                </div>
                <div>
                  <p className="text-gray-400">Volume (24h)</p>
                  <p className="text-lg font-medium">$25.8B</p>
                </div>
                <div>
                  <p className="text-gray-400">Circulating Supply</p>
                  <p className="text-lg font-medium">19.5M</p>
                </div>
              </div>
            </div>
          </div>

          {/* Asset List Section - 1/3 width on large screens */}
          <div className="lg:w-1/3">
            <div className="bg-openfund-gray-medium rounded-lg p-6">
              <div className="mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-openfund-gray-dark"
                  />
                  <Button type="submit" variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
              
              <Tabs defaultValue="crypto" onValueChange={handleAssetTypeChange} value={assetType}>
                <TabsList className="w-full mb-4 bg-openfund-gray-dark">
                  <TabsTrigger value="crypto" className="flex-1">Crypto</TabsTrigger>
                  <TabsTrigger value="stocks" className="flex-1">Stocks</TabsTrigger>
                  <TabsTrigger value="commodities" className="flex-1">Commodities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="crypto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Top Cryptocurrencies</h2>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ArrowUpDown className="h-4 w-4 mr-1" />
                        Sort
                      </Button>
                    </div>
                  </div>
                  <AssetList 
                    type="crypto" 
                    onSelect={handleAssetSelect}
                    selectedAsset={selectedAsset}
                  />
                </TabsContent>
                
                <TabsContent value="stocks">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Top Stocks</h2>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ArrowUpDown className="h-4 w-4 mr-1" />
                        Sort
                      </Button>
                    </div>
                  </div>
                  <AssetList 
                    type="stocks" 
                    onSelect={handleAssetSelect}
                    selectedAsset={selectedAsset}
                  />
                </TabsContent>
                
                <TabsContent value="commodities">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Top Commodities</h2>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ArrowUpDown className="h-4 w-4 mr-1" />
                        Sort
                      </Button>
                    </div>
                  </div>
                  <AssetList 
                    type="commodities" 
                    onSelect={handleAssetSelect}
                    selectedAsset={selectedAsset}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Assets;
