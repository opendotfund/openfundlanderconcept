
import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FundShareSwapProps {
  fundName: string;
  fundId: string;
  onClose: () => void;
}

export const FundShareSwap = ({ fundName, fundId, onClose }: FundShareSwapProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>('');
  const [shares, setShares] = useState<string>('');
  
  // Simple calculation of shares based on USDC amount (1 USDC = 0.01 shares in this example)
  const calculateShares = (usdcAmount: string): string => {
    if (!usdcAmount || isNaN(parseFloat(usdcAmount))) return '0';
    return (parseFloat(usdcAmount) * 0.01).toFixed(4);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setShares(calculateShares(value));
  };

  const handleSwap = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid USDC amount",
        variant: "destructive"
      });
      return;
    }

    // Show fund investment confirmation toast notification with auto-dismiss after 5 seconds
    toast({
      title: "Investment Confirmed",
      description: `Successfully invested ${amount} USDC for ${shares} shares in ${fundName}`,
      variant: "default",
      duration: 5000
    });
    
    // Close the swap widget after successful transaction
    onClose();
  };

  return (
    <Card className="bg-card border-border p-4 mt-4 fund-share-widget">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Invest in {fundName}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* From (USDC) */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <label className="text-muted-foreground text-sm">From (USDC)</label>
            <span className="text-muted-foreground text-sm">Balance: 1,000 USDC</span>
          </div>
          <Input 
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            className="bg-background border-input"
          />
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-muted" 
            disabled
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To (Fund Shares) */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <label className="text-muted-foreground text-sm">To (Fund Shares)</label>
            <span className="text-muted-foreground text-sm">Balance: 0.00 Shares</span>
          </div>
          <Input 
            type="text"
            placeholder="0.00"
            value={shares}
            readOnly
            className="bg-background border-input"
          />
        </div>

        {/* Exchange rate */}
        <div className="text-sm text-muted-foreground flex justify-between items-center">
          <span>Exchange Rate</span>
          <span>1 USDC ≈ 0.01 {fundName} Shares</span>
        </div>

        {/* Invest button */}
        <Button 
          className="w-full fund-invest-button"
          onClick={handleSwap}
        >
          Confirm Investment
        </Button>
      </div>
    </Card>
  );
};
