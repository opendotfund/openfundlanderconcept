
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, Briefcase, LineChart, Bitcoin, DollarSign, BarChart4 } from 'lucide-react';

// Mock data for portfolio overview
const portfolioData = {
  totalValue: 248536.42,
  dailyChange: 1243.21,
  dailyChangePercent: 0.5,
  allocation: {
    stocks: 35,
    crypto: 25,
    commodities: 15,
    funds: 25
  },
  assets: {
    stocks: [
      { name: 'Apple Inc.', symbol: 'AAPL', value: 32450.20, shares: 178, price: 182.30, change: 1.2 },
      { name: 'Tesla Inc.', symbol: 'TSLA', value: 17832.00, shares: 100, price: 178.32, change: -0.4 },
      { name: 'Microsoft Corp.', symbol: 'MSFT', value: 21546.80, shares: 60, price: 359.11, change: 0.8 },
      { name: 'Amazon.com Inc.', symbol: 'AMZN', value: 15240.60, shares: 85, price: 179.30, change: 0.3 }
    ],
    crypto: [
      { name: 'Bitcoin', symbol: 'BTC', value: 31225.38, amount: 0.5, price: 62450.75, change: 2.1 },
      { name: 'Ethereum', symbol: 'ETH', value: 15211.50, amount: 5, price: 3042.30, change: 1.5 },
      { name: 'Solana', symbol: 'SOL', value: 6790.00, amount: 50, price: 135.80, change: 3.2 },
      { name: 'Cardano', symbol: 'ADA', value: 3240.75, amount: 8000, price: 0.41, change: -0.7 }
    ],
    commodities: [
      { name: 'Gold', symbol: 'XAU', value: 23127.50, amount: 10, price: 2312.75, change: 0.4 },
      { name: 'Silver', symbol: 'XAG', value: 8325.30, amount: 300, price: 27.75, change: 0.2 },
      { name: 'Crude Oil', symbol: 'OIL', value: 5500.00, amount: 75, price: 73.33, change: -1.1 }
    ],
    funds: [
      { name: 'OpenFund Tech Growth', value: 35000.00, shares: 35, price: 1000.00, change: 1.3 },
      { name: 'OpenFund DeFi Index', value: 18500.00, shares: 20, price: 925.00, change: 2.2 },
      { name: 'OpenFund Green Energy', value: 8545.00, shares: 10, price: 854.50, change: 0.6 }
    ]
  }
};

const AssetRow = ({ asset, type }: { asset: any, type: string }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border">
      <div className="text-left flex-1">
        <div className="font-medium">{asset.name}</div>
        <div className="text-sm text-muted-foreground">
          {type === 'funds' ? 
            `${asset.shares} shares` : 
            type === 'commodities' ? 
              `${asset.amount} units` : 
              type === 'crypto' ? 
                `${asset.amount} ${asset.symbol}` : 
                `${asset.shares} shares`
          }
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">${asset.value.toLocaleString()}</div>
        <div className={`text-sm flex items-center justify-end ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {asset.change >= 0 ? 
            <ArrowUpRight size={14} className="mr-1" /> : 
            <ArrowDownRight size={14} className="mr-1" />
          }
          {Math.abs(asset.change)}%
        </div>
      </div>
    </div>
  );
};

const MyAssets = () => {
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
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>
        
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
                <div className={`flex items-center text-sm ${portfolioData.dailyChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {portfolioData.dailyChangePercent >= 0 ? 
                    <ArrowUpRight size={16} className="mr-1" /> : 
                    <ArrowDownRight size={16} className="mr-1" />
                  }
                  ${portfolioData.dailyChange.toLocaleString()} ({portfolioData.dailyChangePercent}%)
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BarChart4 size={16} className="text-blue-500" />
                        <span>Stocks</span>
                      </div>
                      <span>{portfolioData.allocation.stocks}%</span>
                    </div>
                    <Progress value={portfolioData.allocation.stocks} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Bitcoin size={16} className="text-orange-500" />
                        <span>Crypto</span>
                      </div>
                      <span>{portfolioData.allocation.crypto}%</span>
                    </div>
                    <Progress value={portfolioData.allocation.crypto} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-yellow-500" />
                        <span>Commodities</span>
                      </div>
                      <span>{portfolioData.allocation.commodities}%</span>
                    </div>
                    <Progress value={portfolioData.allocation.commodities} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-green-500" />
                        <span>Funds</span>
                      </div>
                      <span>{portfolioData.allocation.funds}%</span>
                    </div>
                    <Progress value={portfolioData.allocation.funds} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-md font-medium transition-colors duration-300">
                  Deposit Funds
                </button>
                <button className="w-full bg-transparent border border-border hover:bg-secondary py-2 rounded-md font-medium transition-colors duration-300">
                  Withdraw Funds
                </button>
                <button className="w-full bg-transparent border border-border hover:bg-secondary py-2 rounded-md font-medium transition-colors duration-300">
                  Trade Assets
                </button>
                <button className="w-full bg-transparent border border-border hover:bg-secondary py-2 rounded-md font-medium transition-colors duration-300">
                  Rebalance Portfolio
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Asset Sections */}
        <div className="space-y-8">
          {/* Stocks Section */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <BarChart4 size={20} className="text-blue-500" />
                <CardTitle>Stocks</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                ${portfolioData.assets.stocks.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {portfolioData.assets.stocks.map((asset, index) => (
                  <AssetRow key={`stock-${index}`} asset={asset} type="stocks" />
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Crypto Section */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <Bitcoin size={20} className="text-orange-500" />
                <CardTitle>Crypto</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                ${portfolioData.assets.crypto.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {portfolioData.assets.crypto.map((asset, index) => (
                  <AssetRow key={`crypto-${index}`} asset={asset} type="crypto" />
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Commodities Section */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-yellow-500" />
                <CardTitle>Commodities</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                ${portfolioData.assets.commodities.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {portfolioData.assets.commodities.map((asset, index) => (
                  <AssetRow key={`commodity-${index}`} asset={asset} type="commodities" />
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Funds Section */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <Briefcase size={20} className="text-green-500" />
                <CardTitle>Funds</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                ${portfolioData.assets.funds.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {portfolioData.assets.funds.map((asset, index) => (
                  <AssetRow key={`fund-${index}`} asset={asset} type="funds" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyAssets;
