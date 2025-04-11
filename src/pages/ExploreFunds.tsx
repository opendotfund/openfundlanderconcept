import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Percent,
  Calendar,
  ChevronDown,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const traditionalFunds = [
  {
    id: 1,
    name: 'Berkshire Hathaway',
    manager: 'Warren Buffett',
    aum: '$700B',
    returns: '20.1%',
    returnsValue: 20.1,
    focus: 'Value Investing',
    minInvestment: '$400,000',
    minInvestmentValue: 400000,
    year: '1965',
    yearValue: 1965,
    description: 'American multinational conglomerate holding company led by Warren Buffett, known for its long-term value investing approach.',
    performance: '+18.2%',
    performanceValue: 18.2,
    type: 'TradFi Fund',
    volatility: 'Low',
    volatilityValue: 15,
  },
  {
    id: 2,
    name: 'ARK Innovation ETF',
    manager: 'Cathie Wood',
    aum: '$16.1B',
    returns: '39.1%',
    returnsValue: 39.1,
    focus: 'Disruptive Innovation',
    minInvestment: '$100',
    minInvestmentValue: 100,
    year: '2014',
    yearValue: 2014,
    description: 'Actively managed ETF that invests in companies relevant to the theme of disruptive innovation.',
    performance: '+15.7%',
    performanceValue: 15.7,
    type: 'TradFi Fund',
    volatility: 'High',
    volatilityValue: 65,
  },
  {
    id: 3,
    name: 'Bridgewater Associates',
    manager: 'Ray Dalio (Founder)',
    aum: '$140B',
    returns: '12%',
    returnsValue: 12,
    focus: 'Global Macro',
    minInvestment: '$10M',
    minInvestmentValue: 10000000,
    year: '1975',
    yearValue: 1975,
    description: 'World\'s largest hedge fund specializing in global macro investing strategies.',
    performance: '+7.8%',
    performanceValue: 7.8,
    type: 'TradFi Fund',
    volatility: 'Medium',
    volatilityValue: 35,
  },
  {
    id: 4,
    name: 'Renaissance Technologies',
    manager: 'Jim Simons (Founder)',
    aum: '$110B',
    returns: '66%',
    returnsValue: 66,
    focus: 'Quantitative Trading',
    minInvestment: '$25M',
    minInvestmentValue: 25000000,
    year: '1982',
    yearValue: 1982,
    description: 'Highly quantitative hedge fund that relies on mathematical models to identify trading opportunities.',
    performance: '+21.6%',
    performanceValue: 21.6,
    type: 'TradFi Fund',
    volatility: 'Medium-High',
    volatilityValue: 52,
  },
  {
    id: 5,
    name: 'Two Sigma Investments',
    manager: 'John Overdeck & David Siegel',
    aum: '$58B',
    returns: '29%',
    returnsValue: 29,
    focus: 'Algorithmic Trading',
    minInvestment: '$5M',
    minInvestmentValue: 5000000,
    year: '2001',
    yearValue: 2001,
    description: 'Hedge fund that uses machine learning, distributed computing, and other technologies for trading.',
    performance: '+14.3%',
    performanceValue: 14.3,
    type: 'TradFi Fund',
    volatility: 'Medium',
    volatilityValue: 45,
  },
  {
    id: 6,
    name: 'Elliott Management',
    manager: 'Paul Singer',
    aum: '$48B',
    returns: '14%',
    returnsValue: 14,
    focus: 'Activist Investing',
    minInvestment: '$5M',
    minInvestmentValue: 5000000,
    year: '1977',
    yearValue: 1977,
    description: 'Hedge fund known for its activist investment style and focus on distressed securities.',
    performance: '+9.2%',
    performanceValue: 9.2,
    type: 'TradFi Fund',
    volatility: 'Medium-Low',
    volatilityValue: 28,
  }
];

const cryptoFunds = [
  {
    id: 1,
    name: 'Grayscale Bitcoin Trust',
    manager: 'Grayscale Investments',
    aum: '$30.3B',
    returns: '154%',
    returnsValue: 154,
    focus: 'Bitcoin',
    minInvestment: '$50,000',
    minInvestmentValue: 50000,
    year: '2013',
    yearValue: 2013,
    description: 'The first publicly quoted Bitcoin investment vehicle offering exposure to Bitcoin.',
    performance: '+65.2%',
    performanceValue: 65.2,
    type: 'Crypto Fund',
    volatility: 'Very High',
    volatilityValue: 85,
  },
  {
    id: 2,
    name: 'Pantera Capital',
    manager: 'Dan Morehead',
    aum: '$4.7B',
    returns: '86.5%',
    returnsValue: 86.5,
    focus: 'Blockchain & Crypto',
    minInvestment: '$100,000',
    minInvestmentValue: 100000,
    year: '2013',
    yearValue: 2013,
    description: 'One of the first U.S. Bitcoin investment firms and blockchain investment funds.',
    performance: '+42.8%',
    performanceValue: 42.8,
    type: 'Crypto Fund',
    volatility: 'High',
    volatilityValue: 70,
  },
  {
    id: 3,
    name: 'Polychain Capital',
    manager: 'Olaf Carlson-Wee',
    aum: '$1B',
    returns: '94.7%',
    returnsValue: 94.7,
    focus: 'Protocol Tokens',
    minInvestment: '$250,000',
    minInvestmentValue: 250000,
    year: '2016',
    yearValue: 2016,
    description: 'Crypto fund investing in blockchain protocols and early-stage projects.',
    performance: '+38.6%',
    performanceValue: 38.6,
    type: 'Crypto Fund',
    volatility: 'High',
    volatilityValue: 75,
  },
  {
    id: 4,
    name: '3 Arrows Capital',
    manager: 'Su Zhu & Kyle Davies',
    aum: '$2.8B',
    returns: '112%',
    returnsValue: 112,
    focus: 'Crypto Trading',
    minInvestment: '$500,000',
    minInvestmentValue: 500000,
    year: '2012',
    yearValue: 2012,
    description: 'Trading firm focused on emerging cryptocurrencies and blockchain companies.',
    performance: '+49.7%',
    performanceValue: 49.7,
    type: 'Crypto Fund',
    volatility: 'Very High',
    volatilityValue: 90,
  }
];

const openfundFunds = [1, 2, 3, 4, 5].map((fund) => ({
  id: fund,
  name: `Alpha Seekers #${fund}`,
  manager: `0x7a...3fe${fund}`,
  aum: `$${(342000 + fund * 25000).toLocaleString()}`,
  aumValue: 342000 + fund * 25000,
  returns: `${22 + fund * 3}%`,
  returnsValue: 22 + fund * 3,
  focus: fund % 2 === 0 ? 'Layer 1' : 'DeFi',
  minInvestment: '$1,000',
  minInvestmentValue: 1000,
  year: `202${fund}`,
  yearValue: 2020 + fund,
  description: `Decentralized fund specializing in ${fund % 2 === 0 ? 'Layer 1 protocols' : 'DeFi investments'} with a focus on growth and yield opportunities.`,
  performance: `+${12 + fund * 2}%`,
  performanceValue: 12 + fund * 2,
  type: 'Decentralized Fund',
  investors: 75 + fund * 12,
  volatility: fund % 2 === 0 ? 'High' : 'Medium-High',
  volatilityValue: 55 + fund * 5,
  assetTypes: fund % 3 === 0 ? ['Crypto'] : fund % 3 === 1 ? ['Crypto', 'Stock'] : ['Crypto', 'Commodity']
}));

type Fund = {
  id: number;
  name: string;
  manager: string;
  aum: string;
  returns: string;
  returnsValue: number;
  focus: string;
  minInvestment: string;
  minInvestmentValue: number;
  year: string;
  yearValue: number;
  description: string;
  performance: string;
  performanceValue: number;
  type: string;
  volatility: string;
  volatilityValue: number;
  investors?: number;
  assetTypes?: string[];
  aumValue?: number;
};

type SortOption = 'performance-high' | 'performance-low' | 'year-old' | 'year-new' | 'volatility-high' | 'volatility-low';

const ExploreFunds = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('traditional');
  const [isDark, setIsDark] = useState(true);
  
  const [fundTypeFilter, setFundTypeFilter] = useState<string[]>([]);
  const [minDepositFilter, setMinDepositFilter] = useState<number>(0);
  const [minPerformanceFilter, setMinPerformanceFilter] = useState<number>(0);
  const [minYearsFilter, setMinYearsFilter] = useState<number>(0);
  const [maxVolatilityFilter, setMaxVolatilityFilter] = useState<number>(100);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  const [sortOption, setSortOption] = useState<SortOption>('performance-high');
  
  const [displayFunds, setDisplayFunds] = useState<Fund[]>([]);
  
  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      setIsDark(savedTheme === 'dark');
    };
    
    checkTheme();
    
    window.addEventListener('storage', checkTheme);
    
    return () => {
      window.removeEventListener('storage', checkTheme);
    };
  }, []);
  
  useEffect(() => {
    let funds: Fund[] = [];
    
    if (activeTab === 'traditional') funds = [...traditionalFunds];
    else if (activeTab === 'crypto') funds = [...cryptoFunds]; 
    else if (activeTab === 'openfund') funds = [...openfundFunds];
    else if (activeTab === 'my-investments') funds = [];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      funds = funds.filter(fund => 
        fund.name.toLowerCase().includes(query) || 
        fund.focus.toLowerCase().includes(query) ||
        fund.manager.toLowerCase().includes(query)
      );
    }
    
    if (fundTypeFilter.length > 0) {
      funds = funds.filter(fund => fundTypeFilter.includes(fund.type));
    }
    
    if (minDepositFilter > 0) {
      funds = funds.filter(fund => fund.minInvestmentValue >= minDepositFilter);
    }
    
    if (minPerformanceFilter > 0) {
      funds = funds.filter(fund => fund.performanceValue >= minPerformanceFilter);
    }
    
    const currentYear = new Date().getFullYear();
    if (minYearsFilter > 0) {
      funds = funds.filter(fund => (currentYear - fund.yearValue) >= minYearsFilter);
    }
    
    if (maxVolatilityFilter < 100) {
      funds = funds.filter(fund => fund.volatilityValue <= maxVolatilityFilter);
    }
    
    switch (sortOption) {
      case 'performance-high':
        funds.sort((a, b) => b.performanceValue - a.performanceValue);
        break;
      case 'performance-low':
        funds.sort((a, b) => a.performanceValue - b.performanceValue);
        break;
      case 'year-old':
        funds.sort((a, b) => a.yearValue - b.yearValue);
        break;
      case 'year-new':
        funds.sort((a, b) => b.yearValue - a.yearValue);
        break;
      case 'volatility-high':
        funds.sort((a, b) => b.volatilityValue - a.volatilityValue);
        break;
      case 'volatility-low':
        funds.sort((a, b) => a.volatilityValue - b.volatilityValue);
        break;
      default:
        funds.sort((a, b) => b.performanceValue - a.performanceValue);
    }
    
    setDisplayFunds(funds);
  }, [activeTab, searchQuery, fundTypeFilter, minDepositFilter, minPerformanceFilter, minYearsFilter, maxVolatilityFilter, sortOption]);
  
  const resetFilters = () => {
    setFundTypeFilter([]);
    setMinDepositFilter(0);
    setMinPerformanceFilter(0);
    setMinYearsFilter(0);
    setMaxVolatilityFilter(100);
    setFilterMenuOpen(false);
  };
  
  const toggleFundTypeFilter = (type: string) => {
    if (fundTypeFilter.includes(type)) {
      setFundTypeFilter(fundTypeFilter.filter(t => t !== type));
    } else {
      setFundTypeFilter([...fundTypeFilter, type]);
    }
  };
  
  const handleViewDetails = (fund: Fund) => {
    let fundType = '';
    
    switch (activeTab) {
      case 'traditional':
        fundType = 'traditional';
        break;
      case 'crypto':
        fundType = 'crypto';
        break;
      case 'openfund':
        fundType = 'openfund';
        break;
      default:
        if (fund.type === 'TradFi Fund') {
          fundType = 'traditional';
        } else if (fund.type === 'Crypto Fund') {
          fundType = 'crypto';
        } else if (fund.type === 'Decentralized Fund') {
          fundType = 'openfund';
        } else {
          fundType = 'traditional';
        }
    }
    
    navigate(`/fund-detail/${fundType}/${fund.id}`);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Explore <span className="text-primary">Investment Funds</span>
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
          Discover traditional hedge funds and crypto investment vehicles with proven track records. Compare performance, strategies, and minimum investments to find the right opportunity for your portfolio.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex mb-4 sm:mb-0 w-full sm:w-auto">
            <Input
              placeholder="Search funds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card mr-2 w-full sm:w-64"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <Popover open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                  {(fundTypeFilter.length > 0 || minDepositFilter > 0 || minPerformanceFilter > 0 || 
                    minYearsFilter > 0 || maxVolatilityFilter < 100) && 
                    <Badge className="ml-1 bg-primary text-primary-foreground">Active</Badge>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-card border-border p-4">
                <div className="space-y-4">
                  <h3 className="font-medium mb-2">Filter Funds</h3>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium mb-1">Fund Type</h4>
                    <div className="flex flex-wrap gap-2">
                      <Toggle 
                        variant="outline" 
                        size="sm" 
                        pressed={fundTypeFilter.includes('TradFi Fund')}
                        onPressedChange={() => toggleFundTypeFilter('TradFi Fund')}
                      >
                        TradFi Fund
                      </Toggle>
                      <Toggle 
                        variant="outline" 
                        size="sm"
                        pressed={fundTypeFilter.includes('Crypto Fund')}
                        onPressedChange={() => toggleFundTypeFilter('Crypto Fund')}
                      >
                        Crypto Fund
                      </Toggle>
                      <Toggle 
                        variant="outline" 
                        size="sm"
                        pressed={fundTypeFilter.includes('Decentralized Fund')}
                        onPressedChange={() => toggleFundTypeFilter('Decentralized Fund')}
                      >
                        Decentralized Fund
                      </Toggle>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Min Deposit</h4>
                      <span className="text-sm">
                        {minDepositFilter === 0 ? 'No minimum' : 
                          `$${minDepositFilter.toLocaleString()}`}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0]}
                      max={1000000}
                      step={10000}
                      value={[minDepositFilter]}
                      onValueChange={(vals) => setMinDepositFilter(vals[0])}
                      className="py-4"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Min Performance</h4>
                      <span className="text-sm">{minPerformanceFilter}%</span>
                    </div>
                    <Slider
                      defaultValue={[0]}
                      max={50}
                      step={1}
                      value={[minPerformanceFilter]}
                      onValueChange={(vals) => setMinPerformanceFilter(vals[0])}
                      className="py-4"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Min Years Established</h4>
                      <span className="text-sm">{minYearsFilter} years</span>
                    </div>
                    <Slider
                      defaultValue={[0]}
                      max={30}
                      step={1}
                      value={[minYearsFilter]}
                      onValueChange={(vals) => setMinYearsFilter(vals[0])}
                      className="py-4"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Max Volatility</h4>
                      <span className="text-sm">{maxVolatilityFilter === 100 ? 'Any' : `${maxVolatilityFilter}%`}</span>
                    </div>
                    <Slider
                      defaultValue={[100]}
                      max={100}
                      step={5}
                      value={[maxVolatilityFilter]}
                      onValueChange={(vals) => setMaxVolatilityFilter(vals[0])}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset All
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" size="sm" onClick={() => setFilterMenuOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  {sortOption === 'performance-high' && "Highest Performance"}
                  {sortOption === 'performance-low' && "Lowest Performance"}
                  {sortOption === 'year-old' && "Oldest First"}
                  {sortOption === 'year-new' && "Newest First"}
                  {sortOption === 'volatility-high' && "Most Volatile"}
                  {sortOption === 'volatility-low' && "Least Volatility"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                <DropdownMenuItem onClick={() => setSortOption('performance-high')}>
                  Highest Performance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('performance-low')}>
                  Lowest Performance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('year-old')}>
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('year-new')}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('volatility-high')}>
                  Most Volatile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('volatility-low')}>
                  Least Volatile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs defaultValue="traditional" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="w-full mb-8 bg-secondary">
            <TabsTrigger value="traditional" className="flex-1">Traditional Hedge Funds</TabsTrigger>
            <TabsTrigger value="crypto" className="flex-1">Crypto Funds</TabsTrigger>
            <TabsTrigger value="openfund" className="flex-1">OpenFund DeFi Funds</TabsTrigger>
            <TabsTrigger value="my-investments" className="flex-1">My Investments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="traditional">
            {displayFunds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayFunds.map((fund) => (
                  <Card key={fund.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{fund.name}</CardTitle>
                          <CardDescription className="text-muted-foreground">Founded: {fund.year} • Manager: {fund.manager}</CardDescription>
                        </div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded">
                          <div className="flex items-center">
                            <TrendingUp size={14} className="mr-1" />
                            <span>{fund.performance}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{fund.description}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Assets Under Management</span>
                          <span className="font-medium">{fund.aum}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average Annual Return</span>
                          <span className="font-medium">{fund.returns}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investment Focus</span>
                          <span className="font-medium">{fund.focus}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Min Investment</span>
                          <span className="font-medium">{fund.minInvestment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Volatility</span>
                          <span className="font-medium">{fund.volatility}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full fund-invest-button"
                        variant="default"
                        onClick={() => handleViewDetails(fund)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No funds match your search criteria</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="crypto">
            {displayFunds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayFunds.map((fund) => (
                  <Card key={fund.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{fund.name}</CardTitle>
                          <CardDescription className="text-muted-foreground">Founded: {fund.year} • Manager: {fund.manager}</CardDescription>
                        </div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded">
                          <div className="flex items-center">
                            <TrendingUp size={14} className="mr-1" />
                            <span>{fund.performance}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{fund.description}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Assets Under Management</span>
                          <span className="font-medium">{fund.aum}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average Annual Return</span>
                          <span className="font-medium">{fund.returns}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investment Focus</span>
                          <span className="font-medium">{fund.focus}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Min Investment</span>
                          <span className="font-medium">{fund.minInvestment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Volatility</span>
                          <span className="font-medium">{fund.volatility}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full fund-invest-button"
                        variant="default"
                        onClick={() => handleViewDetails(fund)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No funds match your search criteria</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="openfund">
            <div className="bg-card rounded-lg p-6 mb-6 text-center">
              <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <BarChart3 size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">OpenFund DeFi Investment Funds</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover decentralized hedge funds powered by OpenFund's advanced trading infrastructure. 
                Share profits, build a track record, and grow your portfolio together.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore OpenFund DeFi Funds
              </Button>
            </div>
            
            {displayFunds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayFunds.map((fund) => (
                  <Card key={fund.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{fund.name}</CardTitle>
                          <CardDescription className="text-muted-foreground">Created by {fund.manager}</CardDescription>
                        </div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded">
                          <div className="flex items-center">
                            <TrendingUp size={14} className="mr-1" />
                            <span>{fund.performance}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex mb-3">
                        {"assetTypes" in fund && fund.assetTypes.map((type) => (
                          <Badge key={type} className="mr-2 bg-secondary text-primary border-primary">
                            {type}
                          </Badge>
                        ))}
                        <Badge className="bg-secondary text-blue-500 border-blue-500">{fund.focus}</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">AUM</span>
                          <span className="font-medium">{fund.aum}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investors</span>
                          <span className="font-medium">{fund.investors || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Min Investment</span>
                          <span className="font-medium">{fund.minInvestment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Performance Fee</span>
                          <span className="font-medium">2/20</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Volatility</span>
                          <span className="font-medium">{fund.volatility}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full fund-invest-button"
                        variant="default"
                        onClick={() => handleViewDetails(fund)}
                      >
                        Invest Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No funds match your search criteria</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="my-investments">
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Your Portfolio Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-secondary p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Briefcase size={16} className="mr-2 text-primary" />
                        <span className="text-muted-foreground">Total Invested</span>
                      </div>
                      <div className="text-xl font-bold">$12,500</div>
                    </div>
                    <div className="bg-secondary p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <TrendingUp size={16} className="mr-2 text-primary" />
                        <span className="text-muted-foreground">Current Value</span>
                      </div>
                      <div className="text-xl font-bold">$14,250</div>
                    </div>
                    <div className="bg-secondary p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Percent size={16} className="mr-2 text-primary" />
                        <span className="text-muted-foreground">Total Return</span>
                      </div>
                      <div className="text-xl font-bold text-primary">+14%</div>
                    </div>
                    <div className="bg-secondary p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Briefcase size={16} className="mr-2 text-primary" />
                        <span className="text-muted-foreground">Active Funds</span>
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
                          className="bg-secondary p-4 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">Alpha Seekers #{investment}</div>
                            <div className="text-sm text-muted-foreground">Invested: $4,{investment}00</div>
                          </div>
                          <div className="text-right">
                            <div className="text-primary font-medium">+{12 + investment * 4}%</div>
                            <div className="text-sm text-muted-foreground">Current: $4,{investment + 5}50</div>
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
