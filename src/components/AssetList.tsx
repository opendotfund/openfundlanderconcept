
import React from 'react';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';
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

// Sample asset data - in a real app this would come from an API
const generateAssets = (type: string) => {
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

  const { examples, basePrice } = assetTypes[type] || assetTypes.crypto;
  
  return examples.map((name, index) => {
    const seedValue = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    const price = basePrice * (1 + (index * 0.5) + (seedValue % 10) / 10);
    const change = (((seedValue % 21) - 10) / 10) * 5; // Between -5% and +5%
    
    return {
      id: index + 1,
      name,
      symbol: name.slice(0, 3).toUpperCase(),
      price: price.toFixed(2),
      change: change.toFixed(2),
      volume: (price * (1000000 + (index * 50000))).toFixed(0)
    };
  });
};

interface AssetListProps {
  type: 'crypto' | 'stocks' | 'commodities';
  onSelect: (asset: string) => void;
  selectedAsset: string;
}

export const AssetList = ({ type, onSelect, selectedAsset }: AssetListProps) => {
  const assets = generateAssets(type);
  
  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[60px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow 
              key={asset.id}
              onClick={() => onSelect(asset.name)}
              className={`cursor-pointer ${selectedAsset === asset.name ? 'bg-openfund-green/10 border-l-2 border-openfund-green' : ''}`}
            >
              <TableCell className="font-medium">{asset.id}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-openfund-gray-light flex items-center justify-center mr-2">
                    {asset.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium capitalize">{asset.name}</div>
                    <div className="text-xs text-gray-400">{asset.symbol}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">${asset.price}</TableCell>
              <TableCell className="text-right">
                <span className={`flex items-center justify-end ${parseFloat(asset.change) < 0 ? 'text-red-500' : 'text-openfund-green'}`}>
                  {parseFloat(asset.change) < 0 ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronUp size={16} />
                  )}
                  {Math.abs(parseFloat(asset.change))}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
