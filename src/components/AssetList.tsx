
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

interface Asset {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
}

// Updated function to generate more accurate asset data
const generateAssets = (type: string): Asset[] => {
  const assetTypes: Record<string, { prefix: string, basePrice: number, examples: string[] }> = {
    crypto: { 
      prefix: '', 
      basePrice: 1000, 
      examples: [
        'bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot', 
        'avalanche', 'polygon', 'dogecoin', 'shiba inu', 'chainlink',
        'uniswap', 'aave', 'litecoin', 'cosmos', 'algorand',
        'stellar', 'filecoin', 'eos', 'monero', 'tezos'
      ] 
    },
    stocks: { 
      prefix: '', 
      basePrice: 100, 
      examples: [
        'apple', 'tesla', 'microsoft', 'amazon', 'nvidia', 
        'google', 'meta', 'netflix', 'disney', 'paypal',
        'adobe', 'salesforce', 'amd', 'intel', 'walmart',
        'jpmorgan', 'visa', 'boeing', 'johnson', 'coca cola'
      ] 
    },
    commodities: { 
      prefix: '', 
      basePrice: 50, 
      examples: [
        'gold', 'silver', 'crude oil', 'natural gas', 'copper',
        'platinum', 'palladium', 'wheat', 'corn', 'coffee',
        'sugar', 'cotton', 'rice', 'soybeans', 'cocoa',
        'live cattle', 'lumber', 'rubber', 'nickel', 'zinc'
      ] 
    },
  };

  // Updated accurate price points
  const basePrices: Record<string, number> = {
    'bitcoin': 80000,
    'ethereum': 1600,
    'solana': 156,
    'cardano': 0.58,
    'polkadot': 7.45,
    'apple': 210,
    'tesla': 242,
    'microsoft': 415,
    'amazon': 187,
    'nvidia': 920,
    'gold': 2380,
    'silver': 29.5,
    'crude oil': 76.8,
    'natural gas': 2.15,
    'copper': 4.35
  };

  const { examples } = assetTypes[type] || assetTypes.crypto;
  
  return examples.map((name, index) => {
    // Use specific price if available, otherwise calculate based on position
    const basePrice = basePrices[name] || assetTypes[type].basePrice * (1 + (index * 0.5));
    const seedValue = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    const change = (((seedValue % 21) - 10) / 10) * 5; // Between -5% and +5%
    
    return {
      id: index + 1,
      name,
      symbol: name.slice(0, 3).toUpperCase(),
      price: basePrice.toFixed(2),
      change: change.toFixed(2),
      volume: (basePrice * (1000000 + (index * 50000))).toFixed(0)
    };
  });
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
  const [isDark, setIsDark] = useState(true);
  
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
  
  useEffect(() => {
    const assetData = generateAssets(type);
    setAssets(limit ? assetData.slice(0, limit) : assetData);
    
    // Update asset data every minute to simulate real-time price updates
    const intervalId = setInterval(() => {
      const updatedData = generateAssets(type);
      setAssets(limit ? updatedData.slice(0, limit) : updatedData);
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [type, limit]);
  
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
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <TableRow 
                key={asset.id}
                onClick={() => onSelect(asset.name)}
                className={`cursor-pointer ${selectedAsset === asset.name ? 'bg-primary/10 border-l-2 border-primary' : ''}`}
              >
                <TableCell className="font-medium">{asset.id}</TableCell>
                <TableCell className="pl-0">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-2">
                      {asset.symbol.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium capitalize">{asset.name}</div>
                      <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">${asset.price}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6">
                No assets found matching "{searchQuery}"
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
