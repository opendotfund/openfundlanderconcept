import React, { useState, useEffect } from 'react';
import { ArrowDown, Settings, Search } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface SwapWidgetProps {
  selectedAsset?: string;
}

interface Asset {
  value: string;
  label: string;
  category: 'crypto' | 'stocks' | 'commodities';
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
  const [fromSearchQuery, setFromSearchQuery] = useState<string>('');
  const [toSearchQuery, setToSearchQuery] = useState<string>('');
  const [fromAssetCategory, setFromAssetCategory] = useState<'all' | 'crypto' | 'stocks' | 'commodities'>('all');
  const [toAssetCategory, setToAssetCategory] = useState<'all' | 'crypto' | 'stocks' | 'commodities'>('all');
  const [fromAssetPopoverOpen, setFromAssetPopoverOpen] = useState<boolean>(false);
  const [toAssetPopoverOpen, setToAssetPopoverOpen] = useState<boolean>(false);

  const calculateExchangeRate = (from: string, to: string, amount: string): string => {
    const rates: Record<string, number> = {
      'bitcoin': 80000,
      'ethereum': 1600,
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
    setFromAssetPopoverOpen(false);
  };

  const handleToAssetChange = (value: string) => {
    setToAsset(value);
    setToAmount(calculateExchangeRate(fromAsset, value, fromAmount));
    setToAssetPopoverOpen(false);
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
      orderDetails.push(`Market order: ${fromAmount} ${fromAsset.toUpperCase()} for ${toAmount} ${toAsset.toUpperCase()}`);
    } else {
      orderDetails.push(`Limit order: ${fromAmount} ${fromAsset.toUpperCase()} for ${toAmount} ${toAsset.toUpperCase()} at ${limitPrice} ${toAsset.toUpperCase()}`);
    }
    
    if (showTakeProfit && takeProfitPrice && parseFloat(takeProfitPrice) > 0) {
      orderDetails.push(`Take Profit at: ${takeProfitPrice}`);
    }
    
    if (showStopLoss && stopLossPrice && parseFloat(stopLossPrice) > 0) {
      orderDetails.push(`Stop Loss at: ${stopLossPrice}`);
    }

    toast({
      title: "Order Placed Successfully",
      description: orderDetails.join('\n'),
      variant: "default",
    });
  };

  const handleAssetSelect = (value: string) => {
    if (fromAssetPopoverOpen) {
      handleFromAssetChange(value);
    } else if (toAssetPopoverOpen) {
      handleToAssetChange(value);
    }
  };

  const assets: Asset[] = [
    { value: 'usdt', label: 'USDT', category: 'crypto' },
    { value: 'bitcoin', label: 'BTC', category: 'crypto' },
    { value: 'ethereum', label: 'ETH', category: 'crypto' },
    { value: 'solana', label: 'SOL', category: 'crypto' },
    { value: 'cardano', label: 'ADA', category: 'crypto' },
    { value: 'polkadot', label: 'DOT', category: 'crypto' },
    { value: 'avalanche', label: 'AVAX', category: 'crypto' },
    { value: 'polygon', label: 'MATIC', category: 'crypto' },
    { value: 'dogecoin', label: 'DOGE', category: 'crypto' },
    { value: 'shiba inu', label: 'SHIB', category: 'crypto' },
    { value: 'chainlink', label: 'LINK', category: 'crypto' },
    { value: 'uniswap', label: 'UNI', category: 'crypto' },
    { value: 'aave', label: 'AAVE', category: 'crypto' },
    { value: 'litecoin', label: 'LTC', category: 'crypto' },
    { value: 'cosmos', label: 'ATOM', category: 'crypto' },
    
    { value: 'apple', label: 'AAPL', category: 'stocks' },
    { value: 'tesla', label: 'TSLA', category: 'stocks' },
    { value: 'microsoft', label: 'MSFT', category: 'stocks' },
    { value: 'amazon', label: 'AMZN', category: 'stocks' },
    { value: 'nvidia', label: 'NVDA', category: 'stocks' },
    { value: 'google', label: 'GOOGL', category: 'stocks' },
    { value: 'meta', label: 'META', category: 'stocks' },
    { value: 'netflix', label: 'NFLX', category: 'stocks' },
    { value: 'disney', label: 'DIS', category: 'stocks' },
    { value: 'paypal', label: 'PYPL', category: 'stocks' },
    { value: 'adobe', label: 'ADBE', category: 'stocks' },
    { value: 'salesforce', label: 'CRM', category: 'stocks' },
    { value: 'amd', label: 'AMD', category: 'stocks' },
    { value: 'intel', label: 'INTC', category: 'stocks' },
    { value: 'walmart', label: 'WMT', category: 'stocks' },
    
    { value: 'gold', label: 'GOLD', category: 'commodities' },
    { value: 'silver', label: 'SLV', category: 'commodities' },
    { value: 'crude oil', label: 'OIL', category: 'commodities' },
    { value: 'natural gas', label: 'GAS', category: 'commodities' },
    { value: 'copper', label: 'COPP', category: 'commodities' },
    { value: 'platinum', label: 'PLAT', category: 'commodities' },
    { value: 'palladium', label: 'PALL', category: 'commodities' },
    { value: 'wheat', label: 'WHEA', category: 'commodities' },
    { value: 'corn', label: 'CORN', category: 'commodities' },
    { value: 'coffee', label: 'COFF', category: 'commodities' }
  ];

  const getFilteredAssets = (category: 'all' | 'crypto' | 'stocks' | 'commodities', query: string) => {
    return assets.filter(asset => 
      (category === 'all' || asset.category === category) && 
      (asset.label.toLowerCase().includes(query.toLowerCase()) || asset.value.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filteredFromAssets = getFilteredAssets(fromAssetCategory, fromSearchQuery);
  const filteredToAssets = getFilteredAssets(toAssetCategory, toSearchQuery);

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

  const getAssetLabel = (assetValue: string) => {
    const asset = assets.find(a => a.value === assetValue);
    return asset ? asset.label : assetValue.toUpperCase();
  };

  return (
    <Card className="bg-background border-border p-4">
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
          <PopoverContent className="bg-popover border-border w-80">
            <div className="space-y-4">
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
                <div className="text-xs text-muted-foreground mt-2">
                  Estimated Fee: {getGasFee()}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        <div className="bg-secondary p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <label className="text-muted-foreground text-sm">From</label>
            <span className="text-muted-foreground text-sm">Balance: 1,000 USDT</span>
          </div>
          <div className="flex space-x-2">
            <Input 
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={handleFromAmountChange}
              className="bg-background border-border"
            />
            <Popover open={fromAssetPopoverOpen} onOpenChange={setFromAssetPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-between">
                  {getAssetLabel(fromAsset)}
                  <span className="sr-only">Select asset</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="end">
                <Command>
                  <CommandInput 
                    placeholder="Search assets..." 
                    value={fromSearchQuery} 
                    onValueChange={setFromSearchQuery} 
                  />
                  <div className="border-t">
                    <Tabs 
                      defaultValue="all" 
                      value={fromAssetCategory} 
                      onValueChange={(value) => setFromAssetCategory(value as any)}
                    >
                      <div className="p-1">
                        <TabsList className="grid grid-cols-4">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="crypto">Crypto</TabsTrigger>
                          <TabsTrigger value="stocks">Stocks</TabsTrigger>
                          <TabsTrigger value="commodities">Commodities</TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="all" className="mt-0">
                        <ScrollArea className="h-[300px]">
                          <CommandEmpty>No asset found.</CommandEmpty>
                          <CommandGroup>
                            {filteredFromAssets.map((asset) => (
                              <CommandItem
                                key={asset.value}
                                value={asset.value}
                                onSelect={handleFromAssetChange}
                              >
                                {asset.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="crypto" className="mt-0">
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {filteredFromAssets.map((asset) => (
                              <CommandItem
                                key={asset.value}
                                value={asset.value}
                                onSelect={handleFromAssetChange}
                              >
                                {asset.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="stocks" className="mt-0">
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {filteredFromAssets.map((asset) => (
                              <CommandItem
                                key={asset.value}
                                value={asset.value}
                                onSelect={handleFromAssetChange}
                              >
                                {asset.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="commodities" className="mt-0">
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {filteredFromAssets.map((asset) => (
                              <CommandItem
                                key={asset.value}
                                value={asset.value}
                                onSelect={handleFromAssetChange}
                              >
                                {asset.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </div>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-secondary" 
            onClick={handleSwapClick}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-secondary p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <label className="text-muted-foreground text-sm">To</label>
            <span className="text-muted-foreground text-sm">Balance: 0.00 {toAsset.toUpperCase()}</span>
          </div>
          <div className="flex space-x-2">
            <Input 
              type="number"
              placeholder="0.00"
              value={toAmount}
              onChange={handleToAmountChange}
              className="bg-background border-border"
            />
            <Popover open={toAssetPopoverOpen} onOpenChange={setToAssetPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-between">
                  {getAssetLabel(toAsset)}
                  <span className="sr-only">Select asset</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="end">
                <Command>
                  <CommandInput 
                    placeholder="Search assets..." 
                    value={toSearchQuery} 
                    onValueChange={setToSearchQuery} 
                  />
                  <div className="border-t">
                    <Tabs 
                      defaultValue="all" 
                      value={toAssetCategory} 
                      onValueChange={(value) => setToAssetCategory(value as any)}
                    >
                      <div className="p-1">
                        <TabsList className="grid grid-cols-4">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="crypto">Crypto</TabsTrigger>
                          <TabsTrigger value="stocks">Stocks</TabsTrigger>
                          <TabsTrigger value="commodities">Commodities</TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="all" className="mt-0">
                        <ScrollArea className="h-[300px]">
                          <CommandEmpty>No asset found.</CommandEmpty>
                          <CommandGroup>
                            {filteredToAssets.map((asset) => (
                              <CommandItem
                                key={asset.value}
                                value={asset.value}
                                onSelect={handleToAssetChange}
                              >
                                {asset.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="crypto" className="mt-0">
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {filteredToAssets.map((asset) => (
                              <CommandItem
                                key={asset.value}
                                value={asset.value}
                                onSelect={handleToAssetChange}
                              >
                                {asset.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="stocks" className="mt-0">
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {filteredToAssets.map((asset) => (
                              <CommandItem
                                key={asset.value}
                                value={asset.value}
                                onSelect={handleToAssetChange}
                              >
                                {asset.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="commodities" className="mt-0">
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {filteredToAssets.map((asset) => (
                              <CommandItem
                                key={asset.value}
                                value={asset.value}
                                onSelect={handleToAssetChange}
                              >
                                {asset.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </div>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {swapMode === 'limit' && (
          <div className="bg-secondary p-4 rounded-lg">
            <div className="mb-2">
              <label className="text-muted-foreground text-sm">Limit Price</label>
            </div>
            <Input
              type="number"
              placeholder="Set price"
              value={limitPrice}
              onChange={handleLimitPriceChange}
              className="bg-background border-border"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between bg-secondary p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Label htmlFor="take-profit" className="text-muted-foreground text-sm">Take Profit</Label>
              <Switch
                id="take-profit"
                checked={showTakeProfit}
                onCheckedChange={toggleTakeProfit}
              />
            </div>
          </div>

          {showTakeProfit && (
            <div className="bg-secondary p-3 rounded-lg">
              <div className="mb-2">
                <label className="text-muted-foreground text-sm">Take Profit Price</label>
              </div>
              <Input
                type="number"
                placeholder="Price"
                value={takeProfitPrice}
                onChange={handleTakeProfitChange}
                className="bg-background border-border"
              />
            </div>
          )}

          <div className="flex items-center justify-between bg-secondary p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Label htmlFor="stop-loss" className="text-muted-foreground text-sm">Stop Loss</Label>
              <Switch
                id="stop-loss"
                checked={showStopLoss}
                onCheckedChange={toggleStopLoss}
              />
            </div>
          </div>

          {showStopLoss && (
            <div className="bg-secondary p-3 rounded-lg">
              <div className="mb-2">
                <label className="text-muted-foreground text-sm">Stop Loss Price</label>
              </div>
              <Input
                type="number"
                placeholder="Price"
                onChange={handleStopLossChange}
                value={stopLossPrice}
                className="bg-background border-border"
              />
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground flex justify-between items-center">
          <span>Exchange Rate</span>
          <span>1 {fromAsset.toUpperCase()} ≈ {calculateExchangeRate(fromAsset, toAsset, '1')} {toAsset.toUpperCase()}</span>
        </div>

        <Button 
          className="w-full"
          onClick={handleSwap}
        >
          {swapMode === 'market' ? 'Swap' : 'Place Limit Order'}
        </Button>
      </div>
    </Card>
  );
};
