
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  getAssetPrice, 
  subscribeToAssetUpdates, 
  unsubscribeFromAssetUpdates,
  formatPrice,
  AssetPrice
} from '@/services/assetService';

interface Asset {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
}

// Generate list of assets based on type
const getAssetsByType = (type: string): string[] => {
  if (type === 'crypto') {
    return [
      'bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot', 
      'avalanche', 'polygon', 'dogecoin', 'shiba inu', 'chainlink',
      'uniswap', 'aave', 'litecoin', 'cosmos', 'algorand',
      'stellar', 'filecoin', 'eos', 'monero', 'tezos'
    ];
  } else if (type === 'stocks') {
    return [
      'apple', 'tesla', 'microsoft', 'amazon', 'nvidia', 
      'google', 'meta', 'netflix', 'disney', 'paypal',
      'adobe', 'salesforce', 'amd', 'intel', 'walmart',
      'jpmorgan', 'visa', 'boeing', 'johnson', 'coca cola'
    ];
  } else if (type === 'commodities') {
    return [
      'gold', 'silver', 'crude oil', 'natural gas', 'copper',
      'platinum', 'palladium', 'wheat', 'corn', 'coffee',
      'sugar', 'cotton', 'rice', 'soybeans', 'cocoa',
      'live cattle', 'lumber', 'rubber', 'nickel', 'zinc'
    ];
  }
  return [];
};

interface AssetListProps {
  type: 'crypto' | 'stocks' | 'commodities';
  onSelect: (asset: string) => void;
  selectedAsset: string;
  limit?: number;
  searchQuery?: string;
}

export const AssetList = ({ type, onSelect, selectedAsset, limit, searchQuery = '' }: AssetListProps) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [subscriptionIds, setSubscriptionIds] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check theme on mount and when it changes
  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      setIsDark(savedTheme === 'dark');
    };
    
    checkTheme();
    
    // Set up event listener for theme changes
    window.addEventListener('storage', checkTheme);
    
    return () => {
      window.removeEventListener('storage', checkTheme);
    };
  }, []);
  
  // Initial load of assets
  useEffect(() => {
    const loadAssets = async () => {
      setIsLoading(true);
      
      try {
        // Get list of assets for the selected type
        const assetNames = getAssetsByType(type);
        const limitedAssetNames = limit ? assetNames.slice(0, limit) : assetNames;
        
        // Fetch initial price data for each asset
        const assetPromises = limitedAssetNames.map(async (assetName, index) => {
          try {
            const priceData = await getAssetPrice(assetName);
            return {
              id: index + 1,
              name: assetName,
              symbol: assetName.slice(0, 3).toUpperCase(),
              price: formatPrice(priceData.price),
              change: priceData.change24h.toFixed(2),
              volume: priceData.volume24h.toLocaleString()
            };
          } catch (error) {
            console.error(`Error fetching price for ${assetName}:`, error);
            return {
              id: index + 1,
              name: assetName,
              symbol: assetName.slice(0, 3).toUpperCase(),
              price: '0.00',
              change: '0.00',
              volume: '0'
            };
          }
        });
        
        const fetchedAssets = await Promise.all(assetPromises);
        setAssets(fetchedAssets);
      } catch (error) {
        console.error("Error loading assets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAssets();
  }, [type, limit]);
  
  // Set up real-time price updates
  useEffect(() => {
    // Clean up any existing subscriptions
    subscriptionIds.forEach(id => unsubscribeFromAssetUpdates(id));
    setSubscriptionIds([]);
    
    // Only subscribe if we have assets
    if (assets.length > 0) {
      const newSubscriptionIds = assets.map(asset => {
        const subscriptionId = subscribeToAssetUpdates(asset.name, (priceData) => {
          // Update the asset price in the list
          setAssets(currentAssets => 
            currentAssets.map(item => 
              item.name === asset.name 
                ? { 
                    ...item, 
                    price: formatPrice(priceData.price),
                    change: priceData.change24h.toFixed(2) 
                  } 
                : item
            )
          );
        });
        
        return subscriptionId;
      });
      
      setSubscriptionIds(newSubscriptionIds);
    }
    
    // Cleanup subscriptions on unmount or when assets change
    return () => {
      subscriptionIds.forEach(id => unsubscribeFromAssetUpdates(id));
    };
  }, [assets.length]); // Only re-run when the number of assets changes
  
  useEffect(() => {
    // Filter assets based on search query
    if (searchQuery.trim() === '') {
      setFilteredAssets(assets);
    } else {
      const filtered = assets.filter(
        asset => asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAssets(filtered);
    }
  }, [assets, searchQuery]);
  
  return (
    <ScrollArea className={limit ? 'h-[300px]' : 'h-[500px]'}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[60px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <TableRow 
                key={asset.id}
                onClick={() => onSelect(asset.name)}
                className={`cursor-pointer ${selectedAsset === asset.name ? 'bg-primary/10 border-l-2 border-primary' : ''}`}
              >
                <TableCell className="font-medium">{asset.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-2">
                      {asset.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium capitalize">{asset.name}</div>
                      <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">${asset.price}</TableCell>
                <TableCell className={`text-right ${parseFloat(asset.change) >= 0 ? 'text-primary' : 'text-red-500'}`}>
                  {parseFloat(asset.change) >= 0 ? `+${asset.change}%` : `${asset.change}%`}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No assets found matching "{searchQuery}"
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
