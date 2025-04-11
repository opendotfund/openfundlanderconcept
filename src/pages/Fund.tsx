
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  LineChart,
  Scale,
  Wallet,
  CreditCard,
  UserPlus,
  Percent,
  Settings,
  Sliders,
  BarChart,
  Hexagon
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FundForm } from '@/components/FundForm';

const Fund = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('tab') || 'explore');
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();
  
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
    <div className={`min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300`}>
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary">Decentralized</span> Hedge Funds
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8">
            Create or invest in community-managed funds powered by OpenFund's advanced trading infrastructure. Share profits, build a track record, and grow your portfolio together.
          </p>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-8 bg-secondary">
              <TabsTrigger value="explore" className="flex-1">Explore Funds</TabsTrigger>
              <TabsTrigger value="create" className="flex-1">Create Fund</TabsTrigger>
              <TabsTrigger value="my-fund" className="flex-1">My Fund</TabsTrigger>
            </TabsList>
            
            <TabsContent value="explore">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((fund) => (
                  <Card key={fund} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Alpha Seekers #{fund}</CardTitle>
                          <CardDescription className="text-muted-foreground">Created by 0x7a...3fe9</CardDescription>
                        </div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded">
                          <div className="flex items-center">
                            <TrendingUp size={14} className="mr-1" />
                            <span>+{12 + fund * 2}%</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">AUM</span>
                          <span className="font-medium">${(342000 + fund * 25000).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investors</span>
                          <span className="font-medium">{75 + fund * 12}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Focus</span>
                          <span className="font-medium">DeFi & Layer 1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Min Investment</span>
                          <span className="font-medium">$1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Performance Fee</span>
                          <span className="font-medium">2/20</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Invest Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-primary text-primary">
                  Load More Funds
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Create a New Fund</CardTitle>
                  <CardDescription>
                    Define your fund's parameters, strategy, and fee structure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FundForm />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="my-fund">
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Fund Manager Dashboard</CardTitle>
                    <CardDescription>Manage your fund's investments and settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-secondary p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Briefcase size={16} className="mr-2 text-primary" />
                          <span className="text-muted-foreground">AUM</span>
                        </div>
                        <div className="text-xl font-bold">$1,250,500</div>
                      </div>
                      <div className="bg-secondary p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Users size={16} className="mr-2 text-primary" />
                          <span className="text-muted-foreground">Investors</span>
                        </div>
                        <div className="text-xl font-bold">124</div>
                      </div>
                      <div className="bg-secondary p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Percent size={16} className="mr-2 text-primary" />
                          <span className="text-muted-foreground">Performance</span>
                        </div>
                        <div className="text-xl font-bold text-primary">+17.5%</div>
                      </div>
                      <div className="bg-secondary p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CreditCard size={16} className="mr-2 text-primary" />
                          <span className="text-muted-foreground">Fees Earned</span>
                        </div>
                        <div className="text-xl font-bold">$35,750</div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Fund Portfolio Allocation</h3>
                      <div className="bg-secondary rounded-lg p-6">
                        <div className="flex flex-wrap gap-4">
                          {["Bitcoin", "Ethereum", "Apple", "Tesla", "Gold"].map((asset, index) => (
                            <div key={asset} className="flex-1 min-w-[180px] bg-card p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span>{asset}</span>
                                <span className="text-primary">{15 - index * 2}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${15 - index * 2}%` }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Fund Management</h3>
                        <div className="space-y-4">
                          <Button className="w-full flex justify-between items-center bg-secondary hover:bg-muted text-foreground">
                            <div className="flex items-center">
                              <BarChart size={16} className="mr-2 text-foreground" />
                              <span>Rebalance Portfolio</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Last: 7d ago</span>
                          </Button>
                          <Button className="w-full flex justify-between items-center bg-secondary hover:bg-muted text-foreground">
                            <div className="flex items-center">
                              <Sliders size={16} className="mr-2 text-foreground" />
                              <span>Update Strategy</span>
                            </div>
                            <span className="text-xs text-muted-foreground">DeFi Focus</span>
                          </Button>
                          <Button className="w-full flex justify-between items-center bg-secondary hover:bg-muted text-foreground">
                            <div className="flex items-center">
                              <Settings size={16} className="mr-2 text-foreground" />
                              <span>Fund Settings</span>
                            </div>
                            <span className="text-xs text-muted-foreground">2/20 fee structure</span>
                          </Button>
                          <Button 
                            className="w-full flex justify-between items-center bg-primary hover:bg-primary/90"
                            onClick={() => navigate('/fund-manager')}
                          >
                            <div className="flex items-center">
                              <Hexagon size={16} className="mr-2" />
                              <span>Launch Fund Manager DApp</span>
                            </div>
                            <span className="text-xs">Connect</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
                        <div className="space-y-2">
                          {[
                            { type: "New Investor", amount: "$15,000", time: "2h ago" },
                            { type: "Bought ETH", amount: "$25,000", time: "1d ago" },
                            { type: "Sold TSLA", amount: "$12,500", time: "3d ago" },
                            { type: "Fee Collection", amount: "$3,250", time: "7d ago" },
                          ].map((activity, i) => (
                            <div key={i} className="flex justify-between items-center bg-secondary p-3 rounded-lg">
                              <span>{activity.type}</span>
                              <div className="text-right">
                                <div className="font-medium">{activity.amount}</div>
                                <div className="text-xs text-muted-foreground">{activity.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose <span className="text-primary">OpenFund</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Our platform combines the best of DeFi with traditional finance expertise
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <Scale className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transparent</h3>
                <p className="text-muted-foreground">All trades and fund allocations are recorded on-chain for complete transparency</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <Wallet className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure</h3>
                <p className="text-muted-foreground">Non-custodial design with multi-sig protection for all fund assets</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <LineChart className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Performance</h3>
                <p className="text-muted-foreground">Track record and analytics for all funds help you make informed decisions</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Fund;
