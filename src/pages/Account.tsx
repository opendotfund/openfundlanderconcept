
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownRight, Briefcase, LineChart, Bitcoin, DollarSign, BarChart4, User, Wallet, Settings, FileCheck, CircleDollarSign, Copy, Share, Link, Users, Mail, Edit, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KYCForm } from '@/components/KYCForm';
import { useToast } from '@/hooks/use-toast';

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
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();

  const referralCode = 'OF' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const [formData, setFormData] = useState({
    name: portfolioData.user.name,
    email: portfolioData.user.email,
    phone: '+1 555-123-4567',
    language: 'English',
    timezone: 'GMT-4 (Eastern Time)'
  });

  useEffect(() => {
    if (tabParam === 'portfolio' || tabParam === 'profile' || 
        tabParam === 'kyc' || tabParam === 'settings' || tabParam === 'referral') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied to clipboard!",
      description: "Referral code copied. Share it with your friends.",
    });
  };

  const handleShareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on OpenFund',
        text: `Use my referral code ${referralCode} to join OpenFund and we both earn rewards!`,
        url: 'https://openfund.io',
      })
      .catch(() => {
        handleCopyReferralCode();
      });
    } else {
      handleCopyReferralCode();
    }
  };

  const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 ${activeTab === 'profile' ? 'bg-openfund-gray-light/20 text-openfund-green' : 'hover:bg-openfund-gray-light/20'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 ${activeTab === 'portfolio' ? 'bg-openfund-gray-light/20 text-openfund-green' : 'hover:bg-openfund-gray-light/20'}`}
                    onClick={() => setActiveTab('portfolio')}
                  >
                    <Wallet size={18} />
                    <span>Portfolio</span>
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 ${activeTab === 'kyc' ? 'bg-openfund-gray-light/20 text-openfund-green' : 'hover:bg-openfund-gray-light/20'}`}
                    onClick={() => setActiveTab('kyc')}
                  >
                    <BadgeCheck size={18} />
                    <span>KYC</span>
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 ${activeTab === 'referral' ? 'bg-openfund-gray-light/20 text-openfund-green' : 'hover:bg-openfund-gray-light/20'}`}
                    onClick={() => setActiveTab('referral')}
                  >
                    <Share size={18} />
                    <span>Referrals</span>
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 ${activeTab === 'settings' ? 'bg-openfund-gray-light/20 text-openfund-green' : 'hover:bg-openfund-gray-light/20'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-openfund-gray-medium">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="kyc">KYC</TabsTrigger>
                <TabsTrigger value="referral">Referrals</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User size={20} className="mr-2 text-openfund-green" />
                      Edit Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-32 h-32 relative mb-4">
                          <div className="w-full h-full rounded-full bg-openfund-gray-light flex items-center justify-center text-4xl font-bold">
                            JD
                          </div>
                          <button 
                            type="button"
                            className="absolute bottom-0 right-0 bg-openfund-green rounded-full p-2"
                          >
                            <Camera size={18} className="text-openfund-gray-dark" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-400">Click the icon to upload a new profile picture</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <Input 
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleProfileFormChange}
                              className="bg-openfund-gray-dark border-openfund-gray-light pl-10"
                            />
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Input 
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleProfileFormChange}
                              className="bg-openfund-gray-dark border-openfund-gray-light pl-10"
                            />
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleProfileFormChange}
                            className="bg-openfund-gray-dark border-openfund-gray-light"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="language">Preferred Language</Label>
                          <Input 
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleProfileFormChange}
                            className="bg-openfund-gray-dark border-openfund-gray-light"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Input 
                            id="timezone"
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleProfileFormChange}
                            className="bg-openfund-gray-dark border-openfund-gray-light"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button 
                          type="submit"
                          className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShieldCheck size={20} className="mr-2 text-openfund-green" />
                      Account Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-gray-400">Last changed 30 days ago</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-400">Enhance your account security</p>
                        </div>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Login Sessions</h3>
                          <p className="text-sm text-gray-400">Manage active sessions</p>
                        </div>
                        <Button variant="outline">View Sessions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="portfolio" className="space-y-6">
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
                
                <div className="space-y-6">
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
              
              <TabsContent value="referral">
                <Card className="bg-openfund-gray-medium border-openfund-gray-light mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users size={20} className="mr-2 text-openfund-green" />
                      Referral Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-2">Earn with your network</h3>
                        <p className="text-gray-300">
                          Share your referral code with friends and earn rewards when they join OpenFund:
                        </p>
                        <ul className="list-disc ml-5 mt-3 space-y-1 text-gray-300">
                          <li>Earn <span className="text-openfund-green font-medium">10%</span> of trading fees from referred users</li>
                          <li>Boost your <span className="text-openfund-green font-medium">$OF Airdrop</span> allocation points</li>
                          <li>Both you and your referral receive <span className="text-openfund-green font-medium">$25 USDC</span> trading credit</li>
                        </ul>
                      </div>

                      <div className="bg-openfund-gray-dark p-5 rounded-lg">
                        <h4 className="text-lg font-medium mb-3">Your Referral Code</h4>
                        <div className="flex items-center space-x-2">
                          <div className="bg-openfund-gray-light/20 rounded px-4 py-2 flex-1 font-mono text-center text-xl">
                            {referralCode}
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="hover:bg-openfund-gray-light/30"
                            onClick={handleCopyReferralCode}
                          >
                            <Copy size={18} />
                          </Button>
                        </div>
                        
                        <div className="mt-4">
                          <Button 
                            className="w-full bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark flex items-center justify-center space-x-2"
                            onClick={handleShareReferral}
                          >
                            <Share className="h-4 w-4" />
                            <span>Share Your Referral Link</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Your Referral Stats</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-openfund-gray-dark p-4 rounded-lg text-center">
                            <p className="text-xl font-bold text-openfund-green mb-1">0</p>
                            <p className="text-gray-400 text-sm">Total Referrals</p>
                          </div>
                          <div className="bg-openfund-gray-dark p-4 rounded-lg text-center">
                            <p className="text-xl font-bold text-openfund-green mb-1">0 USDC</p>
                            <p className="text-gray-400 text-sm">Earned Rewards</p>
                          </div>
                          <div className="bg-openfund-gray-dark p-4 rounded-lg text-center">
                            <p className="text-xl font-bold text-openfund-green mb-1">0</p>
                            <p className="text-gray-400 text-sm">Airdrop Points</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium mb-3">How It Works</h4>
                        <ol className="space-y-3 text-gray-300 ml-5 list-decimal">
                          <li>Share your unique referral code with friends and colleagues</li>
                          <li>They sign up using your code during registration</li>
                          <li>Both you and your referral receive $25 USDC trading credit</li>
                          <li>You earn 10% of their trading fees automatically</li>
                          <li>Both accounts receive additional $OF airdrop points</li>
                        </ol>
                      </div>
                    </div>
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
