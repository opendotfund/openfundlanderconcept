
import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Generate sample assets for the search
const generateAssets = (type: string): { value: string; label: string }[] => {
  const assetTypes: Record<string, { examples: string[] }> = {
    crypto: { 
      examples: [
        'bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot', 
        'avalanche', 'polygon', 'dogecoin', 'shiba inu', 'chainlink',
        'uniswap', 'aave', 'litecoin', 'cosmos', 'algorand',
        'stellar', 'filecoin', 'eos', 'monero', 'tezos'
      ] 
    },
    stocks: { 
      examples: [
        'apple', 'tesla', 'microsoft', 'amazon', 'nvidia', 
        'google', 'meta', 'netflix', 'disney', 'paypal',
        'adobe', 'salesforce', 'amd', 'intel', 'walmart',
        'jpmorgan', 'visa', 'boeing', 'johnson', 'coca cola'
      ] 
    },
    commodities: { 
      examples: [
        'gold', 'silver', 'crude oil', 'natural gas', 'copper',
        'platinum', 'palladium', 'wheat', 'corn', 'coffee',
        'sugar', 'cotton', 'rice', 'soybeans', 'cocoa',
        'live cattle', 'lumber', 'rubber', 'nickel', 'zinc'
      ] 
    },
  };

  const { examples } = assetTypes[type] || assetTypes.crypto;
  
  return examples.map((name) => ({
    value: name,
    label: name.charAt(0).toUpperCase() + name.slice(1)
  }));
};

interface AssetSearchProps {
  assetType: 'crypto' | 'stocks' | 'commodities';
  onSelect: (asset: string) => void;
  currentAsset: string;
}

export const AssetSearch = ({ assetType, onSelect, currentAsset }: AssetSearchProps) => {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<{ value: string; label: string }[]>([]);
  
  useEffect(() => {
    setAssets(generateAssets(assetType));
  }, [assetType]);

  const currentAssetLabel = assets.find(asset => asset.value === currentAsset)?.label || 
    (currentAsset.charAt(0).toUpperCase() + currentAsset.slice(1));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[180px] justify-between"
        >
          <div className="truncate">{currentAssetLabel}</div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] sm:w-[240px] p-0">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput placeholder="Search assets..." />
          </div>
          <CommandList>
            <CommandEmpty>No assets found.</CommandEmpty>
            <CommandGroup>
              {assets.map((asset) => (
                <CommandItem
                  key={asset.value}
                  value={asset.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentAsset === asset.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {asset.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
