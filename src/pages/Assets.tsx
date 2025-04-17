
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
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
import PageMeta from '@/components/PageMeta';
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
import { useLocation } from 'react-router-dom';

// Type definition for asset type
type AssetType = "crypto" | "stocks" | "commodities";

const Assets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAsset, setSelectedAsset] = useState<string>("bitcoin");
  const [timeframe, setTimeframe] = useState<string>("24h");
  const [assetType, setAssetType] = useState<AssetType>("crypto");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when component mounts or location changes
    window.scrollTo(0, 0);
  }, [location]);

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

  const handleAssetSelect = (asset: string) => {
    setSelectedAsset(asset);
    // Update URL params
    searchParams.set('asset', asset);
    setSearchParams(searchParams);
    // Scroll to top when selecting an asset
    window.scrollTo(0, 0);
  };

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    // Update URL params
    searchParams.set('timeframe', newTimeframe);
    setSearchParams(searchParams);
    // Scroll to top when changing timeframe
    window.scrollTo(0, 0);
  };

  const handleAssetTypeChange = (type: AssetType) => {
    setAssetType(type);
    // Update URL params
    searchParams.set('type', type);
    setSearchParams(searchParams);
    setExpandedCategory(null); // Reset expanded category when changing asset type
    // Scroll to top when changing asset type
    window.scrollTo(0, 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    // Scroll to top when searching
    window.scrollTo(0, 0);
  };

  const handleSeeMore = (category: "crypto" | "stocks" | "commodities") => {
    setExpandedCategory(expandedCategory === category ? null : category);
    // Scroll to top when expanding/collapsing category
    window.scrollTo(0, 0);
  };

  const getCategoryTitle = (category: string) => {
    switch(category) {
      case 'crypto': return 'Cryptocurrencies';
      case 'stocks': return 'Stocks';
      case 'commodities': return 'Commodities';
      default: return 'Assets';
    }
  };

  // Get accurate price for selected asset
  const getAssetPrice = (asset: string): string => {
    const prices: Record<string, string> = {
      'bitcoin': '$67,250.45',
      'ethereum': '$3,245.80',
      'solana': '$147.25',
      'apple': '$182.40',
      'tesla': '$178.32',
      'gold': '$2,312.75'
    };
    
    return prices[asset.toLowerCase()] || '$100.00';
  };

  // Get market cap for selected asset
  const getMarketCap = (asset: string): string => {
    const marketCaps: Record<string, string> = {
      'bitcoin': '$1.32T',
      'ethereum': '$389.5B',
      'solana': '$64.2B',
      'apple': '$2.87T',
      'tesla': '$568.3B',
      'gold': '$14.2T'
    };
    
    return marketCaps[asset.toLowerCase()] || '$100M';
  };

  // Get 24h volume for selected asset
  const get24hVolume = (asset: string): string => {
    const volumes: Record<string, string> = {
      'bitcoin': '$35.7B',
      'ethereum': '$18.4B',
      'solana': '$2.8B',
      'apple': '$6.5B',
      'tesla': '$12.3B',
      'gold': '$78.6B'
    };
    
    return volumes[asset.toLowerCase()] || '$10M';
  };

  // Get circulating supply for selected asset
  const getCirculatingSupply = (asset: string): string => {
    const supplies: Record<string, string> = {
      'bitcoin': '19.5M BTC',
      'ethereum': '120.2M ETH',
      'solana': '445.8M SOL',
      'apple': '15.7B shares',
      'tesla': '3.2B shares',
      'gold': '205.5K tonnes'
    };
    
    return supplies[asset.toLowerCase()] || 'N/A';
  };

  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white flex flex-col">
      <PageMeta 
        title="Assets - OpenFund"
        description="Browse and analyze crypto, stocks, and commodities on OpenFund. Get real-time price data, charts, and market insights."
        canonicalUrl="https://openfund.io/assets" 
      />
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
                    <div className="flex items-center mt-2">
                      <span className="text-lg sm:text-xl font-bold text-openfund-green mr-2">
                        {getAssetPrice(selectedAsset)}
                      </span>
                      <span className="bg-openfund-green/20 text-openfund-green px-2 py-1 rounded-md text-xs sm:text-sm flex items-center">
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
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">Market Cap</p>
                      <p className="text-sm sm:text-lg font-medium">{getMarketCap(selectedAsset)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">Volume (24h)</p>
                      <p className="text-sm sm:text-lg font-medium">{get24hVolume(selectedAsset)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">Circulating Supply</p>
                      <p className="text-sm sm:text-lg font-medium">{getCirculatingSupply(selectedAsset)}</p>
                    </div>
                  </div>
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
