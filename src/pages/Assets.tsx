
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
import { SwapWidget } from '@/components/SwapWidget';
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  getAssetPrice,
  subscribeToAssetUpdates,
  unsubscribeFromAssetUpdates,
  formatPrice,
  formatLargeNumber,
  AssetPrice
} from '@/services/assetService';

// Type definition for asset type
type AssetType = "crypto" | "stocks" | "commodities";

const Assets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAsset, setSelectedAsset] = useState<string>("bitcoin");
  const [timeframe, setTimeframe] = useState<string>("24h");
  const [assetType, setAssetType] = useState<AssetType>("crypto");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [assetPrice, setAssetPrice] = useState<AssetPrice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const isMobile = useIsMobile();

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
    if (typeParam === 'crypto' || typeParam === 'stocks' || typeParam === 'commodities') {
      setAssetType(typeParam);
    }
  }, [searchParams]);
  
  // Fetch asset price data and subscribe to updates
  useEffect(() => {
    const fetchAssetData = async () => {
      setIsLoading(true);
      try {
        const priceData = await getAssetPrice(selectedAsset);
        setAssetPrice(priceData);
      } catch (error) {
        console.error(`Error fetching data for ${selectedAsset}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssetData();
    
    // Clean up previous subscription if exists
    if (subscriptionId) {
      unsubscribeFromAssetUpdates(subscriptionId);
    }
    
    // Subscribe to real-time price updates
    const newSubscriptionId = subscribeToAssetUpdates(selectedAsset, (data) => {
      setAssetPrice(data);
    });
    
    setSubscriptionId(newSubscriptionId);
    
    return () => {
      if (subscriptionId) {
        unsubscribeFromAssetUpdates(subscriptionId);
      }
    };
  }, [selectedAsset]);

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

  const handleAssetTypeChange = (type: AssetType) => {
    setAssetType(type);
    // Update URL params
    searchParams.set('type', type);
    setSearchParams(searchParams);
    setExpandedCategory(null); // Reset expanded category when changing asset type
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  const handleSeeMore = (category: "crypto" | "stocks" | "commodities") => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getCategoryTitle = (category: string) => {
    switch(category) {
      case 'crypto': return 'Cryptocurrencies';
      case 'stocks': return 'Stocks';
      case 'commodities': return 'Commodities';
      default: return 'Assets';
    }
  };

  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-3 md:px-4 py-4 md:py-8">
        {expandedCategory ? (
          // Expanded category view
          <div>
            <div className="flex flex-wrap justify-between items-center gap-2 md:gap-4 mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold">All {getCategoryTitle(expandedCategory)}</h1>
              <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={() => setExpandedCategory(null)}>
                Back to Overview
              </Button>
            </div>
            
            <div className="mb-4 md:mb-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder={`Search ${expandedCategory}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-openfund-gray-dark"
                />
                <Button type="submit" variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <Card className="bg-openfund-gray-dark border-openfund-gray-light">
              <CardContent className="p-3 md:p-6">
                <AssetList 
                  type={expandedCategory as AssetType} 
                  onSelect={handleAssetSelect}
                  selectedAsset={selectedAsset}
                  searchQuery={searchQuery}
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          // Regular asset detail view
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Left Section - Asset Chart and Swap */}
            <div className="lg:col-span-2">
              <div className="bg-openfund-gray-medium rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-6">
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold">{selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}</h1>
                    {assetPrice && (
                      <div className="flex items-center mt-2">
                        <span className="text-lg sm:text-xl font-bold text-openfund-green mr-2">
                          ${formatPrice(assetPrice.price)}
                        </span>
                        <span className={`${assetPrice.change24h >= 0 ? 'bg-openfund-green/20 text-openfund-green' : 'bg-red-500/20 text-red-500'} px-2 py-1 rounded-md text-xs sm:text-sm flex items-center`}>
                          {assetPrice.change24h >= 0 ? (
                            <ChevronUp size={14} className="mr-0.5" />
                          ) : (
                            <ChevronDown size={14} className="mr-0.5" />
                          )}
                          {Math.abs(assetPrice.change24h).toFixed(2)}%
                        </span>
                      </div>
                    )}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 sm:mb-6">
                {/* Swap Widget */}
                <div className="bg-openfund-gray-medium rounded-lg p-3 sm:p-6">
                  <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Trade {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}</h2>
                  <SwapWidget selectedAsset={selectedAsset} />
                </div>

                {/* Asset Info */}
                <div className="bg-openfund-gray-medium rounded-lg p-3 sm:p-6">
                  <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4">About {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}</h2>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-base">
                    This is a placeholder description for {selectedAsset}. The actual content would contain relevant information about the asset.
                  </p>
                  {assetPrice ? (
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <div>
                        <p className="text-gray-400 text-xs sm:text-sm">Market Cap</p>
                        <p className="text-sm sm:text-lg font-medium">
                          {formatLargeNumber(assetPrice.marketCap)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs sm:text-sm">Volume (24h)</p>
                        <p className="text-sm sm:text-lg font-medium">
                          {formatLargeNumber(assetPrice.volume24h)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs sm:text-sm">Circulating Supply</p>
                        <p className="text-sm sm:text-lg font-medium">
                          {assetPrice.supply}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Asset Categories */}
            <div className="lg:col-span-1">
              <div className="bg-openfund-gray-medium rounded-lg p-3 sm:p-6">
                <div className="mb-3 sm:mb-6">
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
                
                <div className="space-y-3 sm:space-y-6">
                  {/* Crypto Section */}
                  <Card className="bg-openfund-gray-dark border-openfund-gray-light">
                    <CardHeader className="pb-1 p-2 sm:p-4">
                      <CardTitle className="text-sm sm:text-lg flex justify-between items-center">
                        <span>Top Cryptocurrencies</span>
                        <Button variant="ghost" size="sm" className="text-openfund-green text-xs" onClick={() => handleSeeMore("crypto")}>
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4">
                      <AssetList 
                        type="crypto" 
                        onSelect={handleAssetSelect}
                        selectedAsset={selectedAsset}
                        limit={isMobile ? 5 : 10}
                        searchQuery={searchQuery}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Stocks Section */}
                  <Card className="bg-openfund-gray-dark border-openfund-gray-light">
                    <CardHeader className="pb-1 p-2 sm:p-4">
                      <CardTitle className="text-sm sm:text-lg flex justify-between items-center">
                        <span>Top Stocks</span>
                        <Button variant="ghost" size="sm" className="text-openfund-green text-xs" onClick={() => handleSeeMore("stocks")}>
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4">
                      <AssetList 
                        type="stocks" 
                        onSelect={handleAssetSelect}
                        selectedAsset={selectedAsset}
                        limit={isMobile ? 5 : 10}
                        searchQuery={searchQuery}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Commodities Section */}
                  <Card className="bg-openfund-gray-dark border-openfund-gray-light">
                    <CardHeader className="pb-1 p-2 sm:p-4">
                      <CardTitle className="text-sm sm:text-lg flex justify-between items-center">
                        <span>Top Commodities</span>
                        <Button variant="ghost" size="sm" className="text-openfund-green text-xs" onClick={() => handleSeeMore("commodities")}>
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4">
                      <AssetList 
                        type="commodities" 
                        onSelect={handleAssetSelect}
                        selectedAsset={selectedAsset}
                        limit={isMobile ? 5 : 10}
                        searchQuery={searchQuery}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Assets;
