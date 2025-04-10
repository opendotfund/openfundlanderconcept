
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  LineChart,
  Scale,
  Wallet,
  CreditCard,
  UserPlus,
  Percent
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
  
  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-openfund-green">Decentralized</span> Hedge Funds
          </h1>
          
          <p className="text-gray-300 text-lg mb-8">
            Create or invest in community-managed funds powered by OpenFund's advanced trading infrastructure. Share profits, build a track record, and grow your portfolio together.
          </p>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-8 bg-openfund-gray-medium">
              <TabsTrigger value="explore" className="flex-1">Explore Funds</TabsTrigger>
              <TabsTrigger value="create" className="flex-1">Create Fund</TabsTrigger>
              <TabsTrigger value="my-investments" className="flex-1">My Investments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="explore">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Popular Fund Cards */}
                {[1, 2, 3, 4].map((fund) => (
                  <Card key={fund} className="bg-openfund-gray-medium border-openfund-gray-light hover:border-openfund-green/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Alpha Seekers #{fund}</CardTitle>
                          <CardDescription className="text-gray-400">Created by 0x7a...3fe9</CardDescription>
                        </div>
                        <div className="bg-openfund-green/10 text-openfund-green px-2 py-1 rounded">
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
                          <span className="text-gray-400">AUM</span>
                          <span className="font-medium">${(342000 + fund * 25000).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Investors</span>
                          <span className="font-medium">{75 + fund * 12}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Focus</span>
                          <span className="font-medium">DeFi & Layer 1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Min Investment</span>
                          <span className="font-medium">$1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Performance Fee</span>
                          <span className="font-medium">2/20</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark">
                        Invest Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-openfund-green text-openfund-green">
                  Load More Funds
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <Card className="bg-openfund-gray-medium border-openfund-gray-light">
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
            
            <TabsContent value="my-investments">
              <div className="space-y-6">
                <Card className="bg-openfund-gray-medium border-openfund-gray-light">
                  <CardHeader>
                    <CardTitle>Your Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-openfund-gray-dark p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Briefcase size={16} className="mr-2 text-openfund-green" />
                          <span className="text-gray-400">Total Invested</span>
                        </div>
                        <div className="text-xl font-bold">$12,500</div>
                      </div>
                      <div className="bg-openfund-gray-dark p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <TrendingUp size={16} className="mr-2 text-openfund-green" />
                          <span className="text-gray-400">Current Value</span>
                        </div>
                        <div className="text-xl font-bold">$14,250</div>
                      </div>
                      <div className="bg-openfund-gray-dark p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Percent size={16} className="mr-2 text-openfund-green" />
                          <span className="text-gray-400">Total Return</span>
                        </div>
                        <div className="text-xl font-bold text-openfund-green">+14%</div>
                      </div>
                      <div className="bg-openfund-gray-dark p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Briefcase size={16} className="mr-2 text-openfund-green" />
                          <span className="text-gray-400">Active Funds</span>
                        </div>
                        <div className="text-xl font-bold">3</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Your Active Investments</h3>
                      <div className="space-y-4">
                        {[1, 2, 3].map((investment) => (
                          <div 
                            key={investment}
                            className="bg-openfund-gray-dark p-4 rounded-lg flex justify-between items-center"
                          >
                            <div>
                              <div className="font-medium">Alpha Seekers #{investment}</div>
                              <div className="text-sm text-gray-400">Invested: $4,{investment}00</div>
                            </div>
                            <div className="text-right">
                              <div className="text-openfund-green font-medium">+{12 + investment * 4}%</div>
                              <div className="text-sm text-gray-400">Current: ${(4000 + investment * 400 + investment * 200).toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <section className="py-16 bg-openfund-gray-medium relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose <span className="text-openfund-green">OpenFund</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Our platform combines the best of DeFi with traditional finance expertise
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-openfund-gray-dark p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-openfund-green/20 flex items-center justify-center mb-4 mx-auto">
                  <Scale className="text-openfund-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transparent</h3>
                <p className="text-gray-400">All trades and fund allocations are recorded on-chain for complete transparency</p>
              </div>
              
              <div className="bg-openfund-gray-dark p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-openfund-green/20 flex items-center justify-center mb-4 mx-auto">
                  <Wallet className="text-openfund-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure</h3>
                <p className="text-gray-400">Non-custodial design with multi-sig protection for all fund assets</p>
              </div>
              
              <div className="bg-openfund-gray-dark p-6 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-openfund-green/20 flex items-center justify-center mb-4 mx-auto">
                  <LineChart className="text-openfund-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Performance</h3>
                <p className="text-gray-400">Track record and analytics for all funds help you make informed decisions</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-openfund-green/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-openfund-green/5 rounded-full blur-3xl -z-0"></div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Fund;
