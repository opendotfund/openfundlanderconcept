
import React, { useState, useEffect } from 'react';
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

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
  const [takeProfitPrice, setTakeProfitPrice] = useState<string>('');
  const [stopLossPrice, setStopLossPrice] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [gasOption, setGasOption] = useState<'standard' | 'fast' | 'rapid'>('standard');

  // Sample exchange rate calculation
  const calculateExchangeRate = (from: string, to: string, amount: string): string => {
    const rates: Record<string, number> = {
      'bitcoin': 69000,
      'ethereum': 3900,
      'solana': 156,
      'apple': 210,
      'tesla': 242,
      'gold': 2380
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

  // Function to suggest TP and SL based on current price
  useEffect(() => {
    if (toAmount && parseFloat(toAmount) > 0) {
      // Suggest 5% higher for take profit
      const tpSuggestion = (parseFloat(toAmount) * 1.05).toFixed(6);
      // Suggest 5% lower for stop loss
      const slSuggestion = (parseFloat(toAmount) * 0.95).toFixed(6);
      
      setTakeProfitPrice(tpSuggestion);
      setStopLossPrice(slSuggestion);
    }
  }, [toAmount]);

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

  const handleTakeProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTakeProfitPrice(e.target.value);
  };

  const handleStopLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStopLossPrice(e.target.value);
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

  const handleSlippageChange = (value: number[]) => {
    setSlippage(value[0]);
  };

  const handleGasOptionChange = (value: string) => {
    setGasOption(value as 'standard' | 'fast' | 'rapid');
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

    const orderDetails = [];
    orderDetails.push(`Swapping ${fromAmount} ${fromAsset.toUpperCase()} for ${toAmount} ${toAsset.toUpperCase()}`);
    
    if (takeProfitPrice && parseFloat(takeProfitPrice) > 0) {
      orderDetails.push(`Take Profit at: ${takeProfitPrice}`);
    }
    
    if (stopLossPrice && parseFloat(stopLossPrice) > 0) {
      orderDetails.push(`Stop Loss at: ${stopLossPrice}`);
    }

    toast({
      title: "Swap Initiated",
      description: orderDetails.join('\n'),
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

  const getGasFee = () => {
    switch (gasOption) {
      case 'rapid': return '0.00500 ETH ($19.50)';
      case 'fast': return '0.00300 ETH ($11.70)';
      default: return '0.00150 ETH ($5.85)';
    }
  };

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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-openfund-gray-medium border-openfund-gray-light w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Transaction Settings</h4>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Slippage Tolerance</label>
                  <span className="text-sm font-medium">{slippage}%</span>
                </div>
                <Slider
                  defaultValue={[slippage]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  onValueChange={handleSlippageChange}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.1%</span>
                  <span>5%</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Gas Price</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <Button 
                    variant={gasOption === 'standard' ? 'secondary' : 'outline'} 
                    size="sm" 
                    onClick={() => handleGasOptionChange('standard')}
                  >
                    Standard
                  </Button>
                  <Button 
                    variant={gasOption === 'fast' ? 'secondary' : 'outline'} 
                    size="sm" 
                    onClick={() => handleGasOptionChange('fast')}
                  >
                    Fast
                  </Button>
                  <Button 
                    variant={gasOption === 'rapid' ? 'secondary' : 'outline'} 
                    size="sm" 
                    onClick={() => handleGasOptionChange('rapid')}
                  >
                    Rapid
                  </Button>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Estimated Fee: {getGasFee()}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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

        {/* Take Profit and Stop Loss */}
        {swapMode === 'market' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-openfund-gray-medium p-3 rounded-lg">
              <div className="mb-2">
                <label className="text-gray-400 text-sm">Take Profit (TP)</label>
              </div>
              <Input
                type="number"
                placeholder="Price"
                value={takeProfitPrice}
                onChange={handleTakeProfitChange}
                className="bg-openfund-gray-dark border-openfund-gray-light"
              />
            </div>
            <div className="bg-openfund-gray-medium p-3 rounded-lg">
              <div className="mb-2">
                <label className="text-gray-400 text-sm">Stop Loss (SL)</label>
              </div>
              <Input
                type="number"
                placeholder="Price"
                onChange={handleStopLossChange}
                value={stopLossPrice}
                className="bg-openfund-gray-dark border-openfund-gray-light"
              />
            </div>
          </div>
        )}

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
