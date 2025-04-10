
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Users,
  BarChart3,
  Percent
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Sample fund data
const traditionalFunds = [
  {
    id: 1,
    name: 'Berkshire Hathaway',
    manager: 'Warren Buffett',
    aum: '$700B',
    returns: '20.1%',
    focus: 'Value Investing',
    minInvestment: '$400,000',
    year: '1965',
    description: 'American multinational conglomerate holding company led by Warren Buffett, known for its long-term value investing approach.',
    performance: '+18.2%'
  },
  {
    id: 2,
    name: 'ARK Innovation ETF',
    manager: 'Cathie Wood',
    aum: '$16.1B',
    returns: '39.1%',
    focus: 'Disruptive Innovation',
    minInvestment: '$100',
    year: '2014',
    description: 'Actively managed ETF that invests in companies relevant to the theme of disruptive innovation.',
    performance: '+15.7%'
  },
  {
    id: 3,
    name: 'Bridgewater Associates',
    manager: 'Ray Dalio (Founder)',
    aum: '$140B',
    returns: '12%',
    focus: 'Global Macro',
    minInvestment: '$10M',
    year: '1975',
    description: 'World\'s largest hedge fund specializing in global macro investing strategies.',
    performance: '+7.8%'
  },
  {
    id: 4,
    name: 'Renaissance Technologies',
    manager: 'Jim Simons (Founder)',
    aum: '$110B',
    returns: '66%',
    focus: 'Quantitative Trading',
    minInvestment: '$25M',
    year: '1982',
    description: 'Highly quantitative hedge fund that relies on mathematical models to identify trading opportunities.',
    performance: '+21.6%'
  },
  {
    id: 5,
    name: 'Two Sigma Investments',
    manager: 'John Overdeck & David Siegel',
    aum: '$58B',
    returns: '29%',
    focus: 'Algorithmic Trading',
    minInvestment: '$5M',
    year: '2001',
    description: 'Hedge fund that uses machine learning, distributed computing, and other technologies for trading.',
    performance: '+14.3%'
  },
  {
    id: 6,
    name: 'Elliott Management',
    manager: 'Paul Singer',
    aum: '$48B',
    returns: '14%',
    focus: 'Activist Investing',
    minInvestment: '$5M',
    year: '1977',
    description: 'Hedge fund known for its activist investment style and focus on distressed securities.',
    performance: '+9.2%'
  }
];

const cryptoFunds = [
  {
    id: 1,
    name: 'Grayscale Bitcoin Trust',
    manager: 'Grayscale Investments',
    aum: '$30.3B',
    returns: '154%',
    focus: 'Bitcoin',
    minInvestment: '$50,000',
    year: '2013',
    description: 'The first publicly quoted Bitcoin investment vehicle offering exposure to Bitcoin.',
    performance: '+65.2%'
  },
  {
    id: 2,
    name: 'Pantera Capital',
    manager: 'Dan Morehead',
    aum: '$4.7B',
    returns: '86.5%',
    focus: 'Blockchain & Crypto',
    minInvestment: '$100,000',
    year: '2013',
    description: 'One of the first U.S. Bitcoin investment firms and blockchain investment funds.',
    performance: '+42.8%'
  },
  {
    id: 3,
    name: 'Polychain Capital',
    manager: 'Olaf Carlson-Wee',
    aum: '$1B',
    returns: '94.7%',
    focus: 'Protocol Tokens',
    minInvestment: '$250,000',
    year: '2016',
    description: 'Crypto fund investing in blockchain protocols and early-stage projects.',
    performance: '+38.6%'
  },
  {
    id: 4,
    name: '3 Arrows Capital',
    manager: 'Su Zhu & Kyle Davies',
    aum: '$2.8B',
    returns: '112%',
    focus: 'Crypto Trading',
    minInvestment: '$500,000',
    year: '2012',
    description: 'Trading firm focused on emerging cryptocurrencies and blockchain companies.',
    performance: '+49.7%'
  }
];

const ExploreFunds = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('traditional');
  
  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Explore <span className="text-openfund-green">Investment Funds</span>
        </h1>
        
        <p className="text-gray-300 text-lg mb-8 max-w-3xl">
          Discover traditional hedge funds and crypto investment vehicles with proven track records. Compare performance, strategies, and minimum investments to find the right opportunity for your portfolio.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex mb-4 sm:mb-0 w-full sm:w-auto">
            <Input
              placeholder="Search funds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-openfund-gray-dark mr-2 w-full sm:w-64"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Sort By
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="traditional" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="w-full mb-8 bg-openfund-gray-medium">
            <TabsTrigger value="traditional" className="flex-1">Traditional Hedge Funds</TabsTrigger>
            <TabsTrigger value="crypto" className="flex-1">Crypto Funds</TabsTrigger>
            <TabsTrigger value="openfund" className="flex-1">OpenFund DeFi Funds</TabsTrigger>
            <TabsTrigger value="my-investments" className="flex-1">My Investments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="traditional">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {traditionalFunds.map((fund) => (
                <Card key={fund.id} className="bg-openfund-gray-medium border-openfund-gray-light hover:border-openfund-green/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{fund.name}</CardTitle>
                        <CardDescription className="text-gray-400">Founded: {fund.year} • Manager: {fund.manager}</CardDescription>
                      </div>
                      <div className="bg-openfund-green/10 text-openfund-green px-2 py-1 rounded">
                        <div className="flex items-center">
                          <TrendingUp size={14} className="mr-1" />
                          <span>{fund.performance}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4">{fund.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Assets Under Management</span>
                        <span className="font-medium">{fund.aum}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Annual Return</span>
                        <span className="font-medium">{fund.returns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Investment Focus</span>
                        <span className="font-medium">{fund.focus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Investment</span>
                        <span className="font-medium">{fund.minInvestment}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="crypto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cryptoFunds.map((fund) => (
                <Card key={fund.id} className="bg-openfund-gray-medium border-openfund-gray-light hover:border-openfund-green/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{fund.name}</CardTitle>
                        <CardDescription className="text-gray-400">Founded: {fund.year} • Manager: {fund.manager}</CardDescription>
                      </div>
                      <div className="bg-openfund-green/10 text-openfund-green px-2 py-1 rounded">
                        <div className="flex items-center">
                          <TrendingUp size={14} className="mr-1" />
                          <span>{fund.performance}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4">{fund.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Assets Under Management</span>
                        <span className="font-medium">{fund.aum}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Annual Return</span>
                        <span className="font-medium">{fund.returns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Investment Focus</span>
                        <span className="font-medium">{fund.focus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Investment</span>
                        <span className="font-medium">{fund.minInvestment}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="openfund">
            <div className="bg-openfund-gray-medium rounded-lg p-6 mb-6 text-center">
              <div className="mx-auto w-16 h-16 bg-openfund-gray-light rounded-full flex items-center justify-center mb-4">
                <BarChart3 size={32} className="text-openfund-green" />
              </div>
              <h2 className="text-xl font-bold mb-2">OpenFund DeFi Investment Funds</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Discover decentralized hedge funds powered by OpenFund's advanced trading infrastructure. 
                Share profits, build a track record, and grow your portfolio together.
              </p>
              <Button className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark">
                Explore OpenFund DeFi Funds
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((fund) => (
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
                    <div className="flex mb-3">
                      <Badge className="mr-2 bg-openfund-gray-light text-openfund-green border-openfund-green">DeFi</Badge>
                      <Badge className="bg-openfund-gray-light text-blue-400 border-blue-400">Layer 1</Badge>
                    </div>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default ExploreFunds;
