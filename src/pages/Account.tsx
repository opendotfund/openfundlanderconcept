
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownRight, Briefcase, LineChart, Bitcoin, DollarSign, BarChart4, User, Wallet, Settings, Bell, FileCheck, FileText, BadgeCheck, ShieldCheck, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KYCForm } from '@/components/KYCForm';

// Mock data for portfolio overview (using the same data from MyAssets page)
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
  },
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joined: '2023-05-15'
  }
};

const AssetRow = ({ asset, type }: { asset: any, type: string }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-openfund-gray-light">
      <div>
        <div className="font-medium">{asset.name}</div>
        <div className="text-sm text-gray-400">
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

const Account = () => {
  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="bg-openfund-gray-medium border-openfund-gray-light">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <div className="w-24 h-24 rounded-full bg-openfund-gray-light flex items-center justify-center text-3xl font-bold">
                    JD
                  </div>
                  <div className="text-xl font-medium text-center">{portfolioData.user.name}</div>
                  <div className="text-sm text-gray-400 text-center">{portfolioData.user.email}</div>
                  <div className="text-xs text-gray-500">Member since {new Date(portfolioData.user.joined).toLocaleDateString()}</div>
                </div>
                
                <div className="space-y-2 border-t border-openfund-gray-light pt-4">
                  <button className="w-full text-left px-3 py-2 rounded flex items-center space-x-3 bg-openfund-gray-light/20 text-openfund-green">
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded flex items-center space-x-3 hover:bg-openfund-gray-light/20">
                    <Wallet size={18} />
                    <span>Portfolio</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded flex items-center space-x-3 hover:bg-openfund-gray-light/20">
                    <BadgeCheck size={18} />
                    <span>KYC</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded flex items-center space-x-3 hover:bg-openfund-gray-light/20">
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded flex items-center space-x-3 hover:bg-openfund-gray-light/20">
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="portfolio" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-openfund-gray-medium">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="kyc">KYC</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="portfolio" className="space-y-6">
                {/* Portfolio Overview */}
                <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                  <CardHeader className="pb-2">
                    <CardTitle>Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-2 mb-4">
                      <div className="text-3xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
                      <div className={`flex items-center text-sm ${portfolioData.dailyChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {portfolioData.dailyChangePercent >= 0 ? 
                          <ArrowUpRight size={16} className="mr-1" /> : 
                          <ArrowDownRight size={16} className="mr-1" />
                        }
                        ${portfolioData.dailyChange.toLocaleString()} ({portfolioData.dailyChangePercent}%)
                      </div>
                    </div>
                    
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
                  </CardContent>
                </Card>
                
                {/* Assets */}
                <div className="space-y-6">
                  {/* Stocks */}
                  <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <div className="flex items-center gap-2">
                        <BarChart4 size={20} className="text-blue-500" />
                        <CardTitle>Stocks</CardTitle>
                      </div>
                      <div className="text-sm text-gray-400">
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
                  
                  {/* Crypto */}
                  <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <div className="flex items-center gap-2">
                        <Bitcoin size={20} className="text-orange-500" />
                        <CardTitle>Crypto</CardTitle>
                      </div>
                      <div className="text-sm text-gray-400">
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
                  
                  {/* Commodities */}
                  <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign size={20} className="text-yellow-500" />
                        <CardTitle>Commodities</CardTitle>
                      </div>
                      <div className="text-sm text-gray-400">
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
                  
                  {/* Funds */}
                  <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                      <div className="flex items-center gap-2">
                        <Briefcase size={20} className="text-green-500" />
                        <CardTitle>Funds</CardTitle>
                      </div>
                      <div className="text-sm text-gray-400">
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
              </TabsContent>
              
              <TabsContent value="activity">
                <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Your recent transactions and activities will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="kyc">
                <Card className="bg-openfund-gray-medium border-openfund-gray-light mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BadgeCheck size={20} className="mr-2 text-openfund-green" />
                      Verification Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Identity Verification</h3>
                          <p className="text-sm text-gray-400">Government ID and proof of address</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm">
                          Pending
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Tax Information</h3>
                          <p className="text-sm text-gray-400">Tax residency and reporting</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-sm">
                          Not Submitted
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Account Access Level</h3>
                          <p className="text-sm text-gray-400">Current trading limits and capabilities</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-openfund-gray-light/20 text-gray-400 text-sm">
                          Basic
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileCheck size={20} className="mr-2 text-openfund-green" />
                      Submit KYC Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <KYCForm />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Account settings and preferences will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
