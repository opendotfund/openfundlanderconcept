
import React, { useState, useEffect } from 'react';
import { ArrowDown, Settings, Check } from 'lucide-react';
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [showTakeProfit, setShowTakeProfit] = useState<boolean>(false);
  const [showStopLoss, setShowStopLoss] = useState<boolean>(false);

  const assets = [
    { value: 'usdt', label: 'USDT' },
    { value: 'bitcoin', label: 'BTC' },
    { value: 'ethereum', label: 'ETH' },
    { value: 'solana', label: 'SOL' },
    { value: 'apple', label: 'AAPL' },
    { value: 'tesla', label: 'TSLA' },
    { value: 'gold', label: 'GOLD' },
    { value: 'silver', label: 'SILVER' },
    { value: 'oil', label: 'OIL' },
    { value: 'amazon', label: 'AMZN' },
    { value: 'microsoft', label: 'MSFT' },
    { value: 'google', label: 'GOOGL' },
    { value: 'cardano', label: 'ADA' },
    { value: 'polkadot', label: 'DOT' }
  ];

  const getAssetLabel = (value: string): string => {
    const asset = assets.find(a => a.value === value);
    return asset ? asset.label : value.toUpperCase();
  };

  const calculateExchangeRate = (from: string, to: string, amount: string): string => {
    const rates: Record<string, number> = {
      'bitcoin': 80000,
      'ethereum': 1600,
      'solana': 156,
      'apple': 210,
      'tesla': 242,
      'gold': 2380,
      'silver': 30,
      'oil': 75,
      'amazon': 3500,
      'microsoft': 420,
      'google': 2100,
      'cardano': 0.45,
      'polkadot': 7.50,
      'usdt': 1
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

  useEffect(() => {
    if (toAmount && parseFloat(toAmount) > 0) {
      const tpSuggestion = (parseFloat(toAmount) * 1.05).toFixed(6);
      const slSuggestion = (parseFloat(toAmount) * 0.95).toFixed(6);
      
      setTakeProfitPrice(tpSuggestion);
      setStopLossPrice(slSuggestion);
    }
  }, [toAmount]);

  useEffect(() => {
    if (swapMode === 'limit') {
      const currentPrice = calculateExchangeRate(fromAsset, toAsset, '1');
      setLimitPrice(currentPrice);
    }
  }, [swapMode, fromAsset, toAsset]);

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

  const handleLimitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimitPrice(e.target.value);
  };

  const handleSwapClick = () => {
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
    if (swapMode === 'market') {
      orderDetails.push(`Market order: ${fromAmount} ${getAssetLabel(fromAsset)} for ${toAmount} ${getAssetLabel(toAsset)}`);
    } else {
      orderDetails.push(`Limit order: ${fromAmount} ${getAssetLabel(fromAsset)} for ${toAmount} ${getAssetLabel(toAsset)} at ${limitPrice} ${getAssetLabel(toAsset)}`);
    }
    
    if (showTakeProfit && takeProfitPrice && parseFloat(takeProfitPrice) > 0) {
      orderDetails.push(`Take Profit at: ${takeProfitPrice}`);
    }
    
    if (showStopLoss && stopLossPrice && parseFloat(stopLossPrice) > 0) {
      orderDetails.push(`Stop Loss at: ${stopLossPrice}`);
    }

    toast({
      title: "Trade Confirmed",
      description: orderDetails.join('\n'),
      variant: "default",
      duration: 5000,
      className: "animate-fade-in"
    });
  };

  const getGasFee = () => {
    switch (gasOption) {
      case 'rapid': return '0.00500 ETH ($8.00)';
      case 'fast': return '0.00300 ETH ($4.80)';
      default: return '0.00150 ETH ($2.40)';
    }
  };

  const toggleTakeProfit = () => {
    setShowTakeProfit(!showTakeProfit);
  };

  const toggleStopLoss = () => {
    setShowStopLoss(!showStopLoss);
  };

  useEffect(() => {
    if (selectedAsset && selectedAsset !== toAsset) {
      setToAsset(selectedAsset);
    }
  }, [selectedAsset]);

  return (
    <Card className="bg-background border-border p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button 
            variant={swapMode === 'market' ? 'secondary' : 'outline'} 
            size="sm"
            onClick={() => setSwapMode('market')}
            className="rounded-full px-4"
          >
            Market
          </Button>
          <Button 
            variant={swapMode === 'limit' ? 'secondary' : 'outline'} 
            size="sm"
            onClick={() => setSwapMode('limit')}
            className="rounded-full px-4"
          >
            Limit
          </Button>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-popover border-border w-80 rounded-xl p-4">
            <div className="space-y-5">
              <h4 className="font-medium">Transaction Settings</h4>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-muted-foreground">Slippage Tolerance</label>
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
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0.1%</span>
                  <span>5%</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Gas Price</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <Button 
                    variant={gasOption === 'standard' ? 'secondary' : 'outline'} 
                    size="sm" 
                    onClick={() => handleGasOptionChange('standard')}
                    className="rounded-full"
                  >
                    Standard
                  </Button>
                  <Button 
                    variant={gasOption === 'fast' ? 'secondary' : 'outline'} 
                    size="sm" 
                    onClick={() => handleGasOptionChange('fast')}
                    className="rounded-full"
                  >
                    Fast
                  </Button>
                  <Button 
                    variant={gasOption === 'rapid' ? 'secondary' : 'outline'} 
                    size="sm" 
                    onClick={() => handleGasOptionChange('rapid')}
                    className="rounded-full"
                  >
                    Rapid
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Estimated Fee: {getGasFee()}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-5">
        <div className="bg-secondary p-5 rounded-xl">
          <div className="flex justify-between mb-2">
            <label className="text-muted-foreground text-sm">From</label>
            <span className="text-muted-foreground text-sm">Balance: 1,000 {getAssetLabel(fromAsset)}</span>
          </div>
          <div className="flex space-x-2">
            <Input 
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={handleFromAmountChange}
              className="bg-background border-border rounded-xl"
            />
            <Select value={fromAsset} onValueChange={handleFromAssetChange}>
              <SelectTrigger className="w-[120px] rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {assets.map((asset) => (
                  <SelectItem key={asset.value} value={asset.value}>
                    {asset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-secondary shadow-sm" 
            onClick={handleSwapClick}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-secondary p-5 rounded-xl">
          <div className="flex justify-between mb-2">
            <label className="text-muted-foreground text-sm">To</label>
            <span className="text-muted-foreground text-sm">Balance: 0.00 {getAssetLabel(toAsset)}</span>
          </div>
          <div className="flex space-x-2">
            <Input 
              type="number"
              placeholder="0.00"
              value={toAmount}
              onChange={handleToAmountChange}
              className="bg-background border-border rounded-xl"
            />
            <Select value={toAsset} onValueChange={handleToAssetChange}>
              <SelectTrigger className="w-[120px] rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {assets.map((asset) => (
                  <SelectItem key={asset.value} value={asset.value}>
                    {asset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {swapMode === 'limit' && (
          <div className="bg-secondary p-5 rounded-xl">
            <div className="mb-2">
              <label className="text-muted-foreground text-sm">Limit Price</label>
            </div>
            <Input
              type="number"
              placeholder="Set price"
              value={limitPrice}
              onChange={handleLimitPriceChange}
              className="bg-background border-border rounded-xl"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between bg-secondary p-4 rounded-xl">
            <div className="flex items-center space-x-2">
              <Label htmlFor="take-profit" className="text-muted-foreground text-sm">Take Profit</Label>
              <Switch
                id="take-profit"
                checked={showTakeProfit}
                onCheckedChange={toggleTakeProfit}
                className="transition-all duration-300 data-[state=checked]:shadow-glow dark:data-[state=checked]:bg-openfund-green dark:data-[state=checked]:border-openfund-green-light dark:data-[state=unchecked]:bg-muted/30 dark:data-[state=unchecked]:border-muted-foreground"
              />
            </div>
          </div>

          {showTakeProfit && (
            <div className="bg-secondary p-4 rounded-xl">
              <div className="mb-2">
                <label className="text-muted-foreground text-sm">Take Profit Price</label>
              </div>
              <Input
                type="number"
                placeholder="Price"
                value={takeProfitPrice}
                onChange={handleTakeProfitChange}
                className="bg-background border-border rounded-xl"
              />
            </div>
          )}

          <div className="flex items-center justify-between bg-secondary p-4 rounded-xl">
            <div className="flex items-center space-x-2">
              <Label htmlFor="stop-loss" className="text-muted-foreground text-sm">Stop Loss</Label>
              <Switch
                id="stop-loss"
                checked={showStopLoss}
                onCheckedChange={toggleStopLoss}
                className="transition-all duration-300 data-[state=checked]:shadow-glow dark:data-[state=checked]:bg-openfund-green dark:data-[state=checked]:border-openfund-green-light dark:data-[state=unchecked]:bg-muted/30 dark:data-[state=unchecked]:border-muted-foreground"
              />
            </div>
          </div>

          {showStopLoss && (
            <div className="bg-secondary p-4 rounded-xl">
              <div className="mb-2">
                <label className="text-muted-foreground text-sm">Stop Loss Price</label>
              </div>
              <Input
                type="number"
                placeholder="Price"
                onChange={handleStopLossChange}
                value={stopLossPrice}
                className="bg-background border-border rounded-xl"
              />
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground flex justify-between items-center">
          <span>Exchange Rate</span>
          <span>1 {getAssetLabel(fromAsset)} ≈ {calculateExchangeRate(fromAsset, toAsset, '1')} {getAssetLabel(toAsset)}</span>
        </div>

        <Button 
          className="w-full rounded-xl"
          onClick={handleSwap}
        >
          {swapMode === 'market' ? 'Swap' : 'Place Limit Order'}
        </Button>
      </div>
    </Card>
  );
};
