
import React, { useState } from 'react';
import { ArrowDown, Settings, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SwapWidgetProps {
  selectedAsset?: string;
}

export const SwapWidget = ({ selectedAsset = 'bitcoin' }: SwapWidgetProps) => {
  const { toast } = useToast();
  const [fromAmount, setFromAmount] = useState<string>('');
  const [fromAsset, setFromAsset] = useState<string>('usdt');
  const [toAmount, setToAmount] = useState<string>('');
  const [toAsset, setToAsset] = useState<string>(selectedAsset);
  const [swapMode, setSwapMode] = useState<'market' | 'limit'>('market');

  // Sample exchange rate calculation
  const calculateExchangeRate = (from: string, to: string, amount: string): string => {
    const rates: Record<string, number> = {
      'bitcoin': 30000,
      'ethereum': 2000,
      'solana': 100,
      'apple': 180,
      'tesla': 250,
      'gold': 2000
    };

    if (!amount || isNaN(parseFloat(amount))) {
      return '0';
    }

    if (from === 'usdt') {
      const toRate = rates[to] || 1;
      return (parseFloat(amount) / toRate).toString();
    } else if (to === 'usdt') {
      const fromRate = rates[from] || 1;
      return (parseFloat(amount) * fromRate).toString();
    } else {
      const fromRate = rates[from] || 1;
      const toRate = rates[to] || 1;
      return ((parseFloat(amount) * fromRate) / toRate).toString();
    }
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    setToAmount(calculateExchangeRate(fromAsset, toAsset, value));
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToAmount(value);
    setFromAmount(calculateExchangeRate(toAsset, fromAsset, value));
  };

  const handleFromAssetChange = (value: string) => {
    setFromAsset(value);
    setToAmount(calculateExchangeRate(value, toAsset, fromAmount));
  };

  const handleToAssetChange = (value: string) => {
    setToAsset(value);
    setToAmount(calculateExchangeRate(fromAsset, value, fromAmount));
  };

  const handleSwapClick = () => {
    // Swap the assets and amounts
    const tempAsset = fromAsset;
    const tempAmount = fromAmount;
    
    setFromAsset(toAsset);
    setFromAmount(toAmount);
    setToAsset(tempAsset);
    setToAmount(tempAmount);
  };

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Swap Initiated",
      description: `Swapping ${fromAmount} ${fromAsset.toUpperCase()} for ${toAmount} ${toAsset.toUpperCase()}`,
      variant: "default"
    });
  };

  const assets = [
    { value: 'usdt', label: 'USDT' },
    { value: 'bitcoin', label: 'BTC' },
    { value: 'ethereum', label: 'ETH' },
    { value: 'solana', label: 'SOL' },
    { value: 'apple', label: 'AAPL' },
    { value: 'tesla', label: 'TSLA' },
    { value: 'gold', label: 'GOLD' }
  ];

  return (
    <Card className="bg-openfund-gray-dark border-openfund-gray-light p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button 
            variant={swapMode === 'market' ? 'secondary' : 'outline'} 
            size="sm"
            onClick={() => setSwapMode('market')}
          >
            Market
          </Button>
          <Button 
            variant={swapMode === 'limit' ? 'secondary' : 'outline'} 
            size="sm"
            onClick={() => setSwapMode('limit')}
          >
            Limit
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* From */}
        <div className="bg-openfund-gray-medium p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm">From</label>
            <span className="text-gray-400 text-sm">Balance: 1,000 USDT</span>
          </div>
          <div className="flex space-x-2">
            <Input 
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={handleFromAmountChange}
              className="bg-openfund-gray-dark border-openfund-gray-light"
            />
            <Select value={fromAsset} onValueChange={handleFromAssetChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem key={asset.value} value={asset.value}>
                    {asset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-openfund-gray-light" 
            onClick={handleSwapClick}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To */}
        <div className="bg-openfund-gray-medium p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm">To</label>
            <span className="text-gray-400 text-sm">Balance: 0.00 {toAsset.toUpperCase()}</span>
          </div>
          <div className="flex space-x-2">
            <Input 
              type="number"
              placeholder="0.00"
              value={toAmount}
              onChange={handleToAmountChange}
              className="bg-openfund-gray-dark border-openfund-gray-light"
            />
            <Select value={toAsset} onValueChange={handleToAssetChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem key={asset.value} value={asset.value}>
                    {asset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Exchange rate */}
        <div className="text-sm text-gray-400 flex justify-between items-center">
          <span>Exchange Rate</span>
          <span>1 {fromAsset.toUpperCase()} ≈ {calculateExchangeRate(fromAsset, toAsset, '1')} {toAsset.toUpperCase()}</span>
        </div>

        {/* Swap button */}
        <Button 
          className="w-full bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark"
          onClick={handleSwap}
        >
          Swap
        </Button>
      </div>
    </Card>
  );
};
