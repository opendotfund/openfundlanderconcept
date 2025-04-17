import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Briefcase, 
  LineChart, 
  Bitcoin, 
  DollarSign, 
  BarChart4, 
  User, 
  Wallet, 
  Settings, 
  FileCheck, 
  CircleDollarSign, 
  Copy, 
  Share, 
  Link, 
  Users, 
  Mail, 
  Edit, 
  Camera,
  CheckCircle,
  Shield,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KYCForm } from '@/components/KYCForm';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type ProfileType = {
  id: string;
  full_name?: string | null;
  phone_number?: string | null;
  preferred_language?: string | null;
  email?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

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
  },
  referralStats: {
    totalReferrals: 127,
    earnedRewards: 3875.42,
    airdropPoints: 4250,
    level: 4,
    pointsToNextLevel: 750,
    nextLevelPoints: 5000,
    progress: 85 // percentage to next level
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

const Account = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const referralCode = 'OF' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+1 555-123-4567',
    language: 'English',
    timezone: 'GMT-4 (Eastern Time)'
  });

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
      
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error fetching profile:', error.message);
            return;
          }
          
          if (data) {
            const profile = data as unknown as ProfileType;
            setFormData(prev => ({
              ...prev,
              name: profile.full_name || '',
              phone: profile.phone_number || '+1 555-123-4567',
              language: profile.preferred_language || 'English'
            }));
          }
        } catch (error) {
          console.error('Error in profile fetch:', error);
        }
      };
      
      fetchProfile();
    }
  }, [user]);

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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name,
          phone_number: formData.phone,
          preferred_language: formData.language
        } as any)
        .eq('id', user.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating profile",
          description: error.message,
        });
      } else {
        toast({
          title: "Profile updated!",
          description: "Your profile information has been saved successfully.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: error.message || "An unknown error occurred",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Sign in to access your account</h1>
            <p className="text-muted-foreground mb-8">
              Create an account or sign in to view your portfolio, manage your assets, and more.
            </p>
            <div className="space-y-4">
              <Button 
                className="w-full" 
                onClick={() => navigate('/auth')}
              >
                Sign Up
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/auth')}
              >
                Login
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold">
                    JD
                  </div>
                  <div className="text-xl font-medium text-center">{portfolioData.user.name}</div>
                  <div className="text-sm text-muted-foreground text-center">{portfolioData.user.email}</div>
                  <div className="text-xs text-muted-foreground">Member since {new Date(portfolioData.user.joined).toLocaleDateString()}</div>
                </div>
                
                <div className="space-y-2 border-t border-border pt-4">
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 transition-colors duration-300 ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 transition-colors duration-300 ${activeTab === 'portfolio' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
                    onClick={() => setActiveTab('portfolio')}
                  >
                    <Wallet size={18} />
                    <span>Portfolio</span>
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 transition-colors duration-300 ${activeTab === 'kyc' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
                    onClick={() => setActiveTab('kyc')}
                  >
                    <CheckCircle size={18} />
                    <span>KYC</span>
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 transition-colors duration-300 ${activeTab === 'referral' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
                    onClick={() => setActiveTab('referral')}
                  >
                    <Star size={18} />
                    <span>Referrals</span>
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-3 transition-colors duration-300 ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
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
              <TabsList className="grid w-full grid-cols-5 mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="kyc">KYC</TabsTrigger>
                <TabsTrigger value="referral">Referrals</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User size={20} className="mr-2 text-primary" />
                      Edit Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-32 h-32 relative mb-4">
                          <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-4xl font-bold">
                            JD
                          </div>
                          <button 
                            type="button"
                            className="absolute bottom-0 right-0 bg-primary rounded-full p-2 text-white dark:text-black"
                          >
                            <Camera size={18} />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground">Click the icon to upload a new profile picture</p>
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
                              className="pl-10"
                            />
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
                              readOnly
                              className="pl-10 bg-secondary/40"
                            />
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleProfileFormChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="language">Preferred Language</Label>
                          <Input 
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleProfileFormChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Input 
                            id="timezone"
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleProfileFormChange}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button 
                          type="submit"
                          className="transition-colors duration-300"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield size={20} className="mr-2 text-primary" />
                      Account Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="text-left">
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div className="text-left">
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">Enhance your account security</p>
                        </div>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div className="text-left">
                          <h3 className="font-medium">Login Sessions</h3>
                          <p className="text-sm text-muted-foreground">Manage active sessions</p>
                        </div>
                        <Button variant="outline">View Sessions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="portfolio" className="space-y-6">
                <Card>
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
                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
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
                  
                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
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
                  
                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
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
                  
                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
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
              </TabsContent>
              
              <TabsContent value="kyc">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle size={20} className="mr-2 text-primary" />
                      Verification Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <h3 className="text-lg font-medium">Identity Verification</h3>
                          <p className="text-sm text-muted-foreground">Government ID and proof of address</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm">
                          Pending
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <h3 className="text-lg font-medium">Tax Information</h3>
                          <p className="text-sm text-muted-foreground">Tax residency and reporting</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-sm">
                          Not Submitted
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <h3 className="text-lg font-medium">Account Access Level</h3>
                          <p className="text-sm text-muted-foreground">Current trading limits and capabilities</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm">
                          Basic
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileCheck size={20} className="mr-2 text-primary" />
                      Submit KYC Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <KYCForm />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="referral">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star size={20} className="mr-2 text-primary" />
                      Referral Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-2">Earn with your network</h3>
                        <p className="text-foreground/80">
                          Share your referral code with friends and earn rewards when they join OpenFund:
                        </p>
                        <ul className="list-disc ml-5 mt-3 space-y-1 text-foreground/80">
                          <li>Earn <span className="text-primary font-medium">10%</span> of trading fees from referred users</li>
                          <li>Boost your <span className="text-primary font-medium">$OF Airdrop</span> allocation points</li>
                          <li>Both you and your referral receive <span className="text-primary font-medium">$25 USDC</span> trading credit</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-medium">Referral Level {portfolioData.referralStats.level}</h4>
                          <span className="text-sm text-muted-foreground">{portfolioData.referralStats.airdropPoints}/{portfolioData.referralStats.nextLevelPoints} points to Level {portfolioData.referralStats.level + 1}</span>
                        </div>
                        <div className="space-y-2">
                          <Progress value={portfolioData.referralStats.progress} className="h-2" />
                          <p className="text-sm text-muted-foreground text-right">
                            {portfolioData.referralStats.pointsToNextLevel} more points needed
                          </p>
                        </div>
                      </div>

                      <div className="bg-secondary/50 p-5 rounded-lg">
                        <h4 className="text-lg font-medium mb-3">Your Referral Code</h4>
                        <div className="flex items-center space-x-2">
                          <div className="bg-background rounded px-4 py-2 flex-1 font-mono text-center text-xl">
                            {referralCode}
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="hover:bg-secondary"
                            onClick={handleCopyReferralCode}
                          >
                            <Copy size={18} />
                          </Button>
                        </div>
                        
                        <div className="mt-4">
                          <Button 
                            className="w-full transition-colors duration-300 flex items-center justify-center space-x-2"
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
                          <div className="bg-secondary/50 p-4 rounded-lg text-center">
                            <p className="text-xl font-bold text-primary mb-1">{portfolioData.referralStats.totalReferrals}</p>
                            <p className="text-muted-foreground text-sm">Total Referrals</p>
                          </div>
                          <div className="bg-secondary/50 p-4 rounded-lg text-center">
                            <p className="text-xl font-bold text-primary mb-1">{portfolioData.referralStats.earnedRewards.toFixed(2)} USDC</p>
                            <p className="text-muted-foreground text-sm">Earned Rewards</p>
                          </div>
                          <div className="bg-secondary/50 p-4 rounded-lg text-center">
                            <p className="text-xl font-bold text-primary mb-1">{portfolioData.referralStats.airdropPoints}</p>
                            <p className="text-muted-foreground text-sm">Airdrop Points</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium mb-3">Recent Referrals</h4>
                        <div className="space-y-3">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-secondary/50 p-3 rounded-lg flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold mr-3">
                                  {["AB", "CD", "EF", "GH", "IJ"][i]}
                                </div>
                                <div className="text-left">
                                  <p className="font-medium">{["Alex Brown", "Chris Davis", "Emma Fischer", "George Hansen", "Isabella Jones"][i]}</p>
                                  <p className="text-xs text-muted-foreground">Joined {[3, 5, 7, 10, 14][i]} days ago</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-primary">{[125, 87, 105, 134, 98][i]} points</p>
                                <p className="text-xs text-muted-foreground">{[(125*0.75).toFixed(2), (87*0.75).toFixed(2), (105*0.75).toFixed(2), (134*0.75).toFixed(2), (98*0.75).toFixed(2)][i]} USDC</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">View All Referrals</Button>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium mb-3">How It Works</h4>
                        <ol className="space-y-3 text-foreground/80 ml-5 list-decimal">
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
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Account settings and preferences will appear here.</p>
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
