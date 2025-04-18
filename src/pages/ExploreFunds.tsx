import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
  Clock,
  Scale
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Slider } from "../components/ui/slider";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Toggle, toggleVariants } from "../components/ui/toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssetChart } from '../components/AssetChart';
import { useIsMobile } from '@/hooks/use-mobile';

// Types
type Fund = {
  id: string;
  name: string;
  manager: string;
  description: string;
  aum: string;
  returns: string;
  minInvestment: string;
  year: string;
  assetTypes?: string[];
  type?: string;
  yearValue?: number;
  minInvestmentValue?: number;
  performanceValue?: number;
  volatilityValue?: number;
};

type SortOption = 
  | 'performance-high'
  | 'performance-low'
  | 'year-old'
  | 'year-new'
  | 'volatility-high'
  | 'volatility-low';

const traditionalFunds: Fund[] = [
  {
    id: '1',
    name: 'Berkshire Hathaway',
    manager: 'Warren Buffett',
    aum: '$700B',
    returns: '20.1%',
    minInvestment: '$400,000',
    year: '1965',
    description: 'American multinational conglomerate holding company led by Warren Buffett, known for its long-term value investing approach.',
    type: 'TradFi Fund',
    yearValue: 1965,
    minInvestmentValue: 400000,
    performanceValue: 20.1,
    volatilityValue: 15,
    assetTypes: ['Stocks', 'Insurance', 'Energy']
  },
  {
    id: '2',
    name: 'Renaissance Technologies',
    manager: 'James Simons',
    aum: '$130B',
    returns: '66.1%',
    minInvestment: '$25,000,000',
    year: '1982',
    description: 'Quantitative investment management company founded by mathematician James Simons, known for its highly successful Medallion Fund.',
    type: 'TradFi Fund',
    yearValue: 1982,
    minInvestmentValue: 25000000,
    performanceValue: 66.1,
    volatilityValue: 25,
    assetTypes: ['Stocks', 'Futures', 'Forex']
  },
  {
    id: '3',
    name: 'Bridgewater Associates',
    manager: 'Ray Dalio',
    aum: '$235B',
    returns: '12.5%',
    minInvestment: '$100,000,000',
    year: '1975',
    description: 'Global investment management firm founded by Ray Dalio, focusing on global macro investing strategies.',
    type: 'TradFi Fund',
    yearValue: 1975,
    minInvestmentValue: 100000000,
    performanceValue: 12.5,
    volatilityValue: 20,
    assetTypes: ['Stocks', 'Bonds', 'Commodities']
  },
  {
    id: '4',
    name: 'BlackRock Global Allocation',
    manager: 'Rick Rieder',
    aum: '$50B',
    returns: '15.3%',
    minInvestment: '$1,000',
    year: '1989',
    description: 'Flexible portfolio that invests in stocks, bonds and money market instruments around the world, managed by BlackRock.',
    type: 'TradFi Fund',
    yearValue: 1989,
    minInvestmentValue: 1000,
    performanceValue: 15.3,
    volatilityValue: 12,
    assetTypes: ['Stocks', 'Bonds', 'Money Market']
  },
  {
    id: '5',
    name: 'Vanguard 500 Index Fund',
    manager: 'Vanguard Group',
    aum: '$800B',
    returns: '10.5%',
    minInvestment: '$3,000',
    year: '1976',
    description: 'The first index mutual fund available to individual investors, tracking the S&P 500 index.',
    type: 'TradFi Fund',
    yearValue: 1976,
    minInvestmentValue: 3000,
    performanceValue: 10.5,
    volatilityValue: 18,
    assetTypes: ['Stocks']
  }
];

const cryptoFunds: Fund[] = [
  {
    id: '1',
    name: 'Grayscale Bitcoin Trust',
    manager: 'Grayscale Investments',
    aum: '$30.3B',
    returns: '154%',
    minInvestment: '$50,000',
    year: '2013',
    description: 'The first publicly quoted Bitcoin investment vehicle offering exposure to Bitcoin.',
    type: 'Crypto Fund',
    yearValue: 2013,
    minInvestmentValue: 50000,
    performanceValue: 154,
    volatilityValue: 85,
    assetTypes: ['Crypto']
  },
  {
    id: '2',
    name: 'Pantera Bitcoin Fund',
    manager: 'Pantera Capital',
    aum: '$5.1B',
    returns: '98.2%',
    minInvestment: '$100,000',
    year: '2013',
    description: 'One of the first investment firms focused exclusively on digital currency and blockchain technology.',
    type: 'Crypto Fund',
    yearValue: 2013,
    minInvestmentValue: 100000,
    performanceValue: 98.2,
    volatilityValue: 75,
    assetTypes: ['Crypto']
  },
  {
    id: '3',
    name: 'Galaxy Digital Holdings',
    manager: 'Mike Novogratz',
    aum: '$2.5B',
    returns: '84.7%',
    minInvestment: '$25,000',
    year: '2018',
    description: 'A diversified financial services and investment management company focused on the digital asset and blockchain technology sector.',
    type: 'Crypto Fund',
    yearValue: 2018,
    minInvestmentValue: 25000,
    performanceValue: 84.7,
    volatilityValue: 90,
    assetTypes: ['Crypto', 'DeFi']
  },
  {
    id: '4',
    name: 'Bitwise 10 Crypto Index Fund',
    manager: 'Bitwise Asset Management',
    aum: '$1.2B',
    returns: '67.3%',
    minInvestment: '$10,000',
    year: '2017',
    description: 'The first cryptocurrency index fund, providing diversified exposure to the top 10 cryptocurrencies by market cap.',
    type: 'Crypto Fund',
    yearValue: 2017,
    minInvestmentValue: 10000,
    performanceValue: 67.3,
    volatilityValue: 80,
    assetTypes: ['Crypto']
  },
  {
    id: '5',
    name: 'a16z Crypto Fund',
    manager: 'Andreessen Horowitz',
    aum: '$3.1B',
    returns: '121.5%',
    minInvestment: '$1,000,000',
    year: '2018',
    description: 'Venture capital fund focused on crypto and Web3 investments from early-stage protocols to later-stage networks.',
    type: 'Crypto Fund',
    yearValue: 2018,
    minInvestmentValue: 1000000,
    performanceValue: 121.5,
    volatilityValue: 70,
    assetTypes: ['Crypto', 'Web3']
  }
];

const openfundFunds: Fund[] = [1, 2, 3, 4, 5].map((fund) => ({
  id: fund.toString(),
  name: `Alpha Seekers #${fund}`,
  manager: `0x7a...3fe${fund}`,
  aum: `$${(342000 + fund * 25000).toLocaleString()}`,
  returns: `${22 + fund * 3}%`,
  minInvestment: '$1,000',
  year: `202${fund}`,
  description: `Decentralized fund specializing in ${fund % 2 === 0 ? 'Layer 1 protocols' : 'DeFi investments'} with a focus on growth and yield opportunities.`,
}));

export default function ExploreFunds() {
  const [selectedTab, setSelectedTab] = useState(() => {
    // Get the saved tab from localStorage or default to 'traditional'
    return localStorage.getItem('exploreFundsTab') || 'traditional';
  });
  const [sortOption, setSortOption] = useState<SortOption>('performance-high');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isDark, setIsDark] = useState(true);
  
  const [fundTypeFilter, setFundTypeFilter] = useState<string[]>([]);
  const [minDepositFilter, setMinDepositFilter] = useState<number>(0);
  const [minPerformanceFilter, setMinPerformanceFilter] = useState<number>(0);
  const [minYearsFilter, setMinYearsFilter] = useState<number>(0);
  const [maxVolatilityFilter, setMaxVolatilityFilter] = useState<number>(100);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
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
    
    if (selectedTab === 'traditional') funds = [...traditionalFunds];
    else if (selectedTab === 'crypto') funds = [...cryptoFunds]; 
    else if (selectedTab === 'openfund') funds = [...openfundFunds];
    else if (selectedTab === 'my-investments') funds = [];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      funds = funds.filter(fund => 
        fund.name.toLowerCase().includes(query) || 
        fund.description.toLowerCase().includes(query) ||
        fund.manager.toLowerCase().includes(query)
      );
    }
    
    if (fundTypeFilter.length > 0) {
      funds = funds.filter(fund => fund.type && fundTypeFilter.includes(fund.type));
    }
    
    if (minDepositFilter > 0) {
      funds = funds.filter(fund => fund.minInvestmentValue && fund.minInvestmentValue >= minDepositFilter);
    }
    
    if (minPerformanceFilter > 0) {
      funds = funds.filter(fund => fund.performanceValue && fund.performanceValue >= minPerformanceFilter);
    }
    
    const currentYear = new Date().getFullYear();
    if (minYearsFilter > 0) {
      funds = funds.filter(fund => fund.yearValue && (currentYear - fund.yearValue) >= minYearsFilter);
    }
    
    if (maxVolatilityFilter < 100) {
      funds = funds.filter(fund => fund.volatilityValue && fund.volatilityValue <= maxVolatilityFilter);
    }
    
    switch (sortOption) {
      case 'performance-high':
        funds.sort((a, b) => (b.performanceValue || 0) - (a.performanceValue || 0));
        break;
      case 'performance-low':
        funds.sort((a, b) => (a.performanceValue || 0) - (b.performanceValue || 0));
        break;
      case 'year-old':
        funds.sort((a, b) => (a.yearValue || 0) - (b.yearValue || 0));
        break;
      case 'year-new':
        funds.sort((a, b) => (b.yearValue || 0) - (a.yearValue || 0));
        break;
      case 'volatility-high':
        funds.sort((a, b) => (b.volatilityValue || 0) - (a.volatilityValue || 0));
        break;
      case 'volatility-low':
        funds.sort((a, b) => (a.volatilityValue || 0) - (b.volatilityValue || 0));
        break;
      default:
        funds.sort((a, b) => (b.performanceValue || 0) - (a.performanceValue || 0));
    }
    
    setDisplayFunds(funds);
  }, [selectedTab, searchQuery, fundTypeFilter, minDepositFilter, minPerformanceFilter, minYearsFilter, maxVolatilityFilter, sortOption]);
  
  useEffect(() => {
    localStorage.setItem('exploreFundsTab', selectedTab);
  }, [selectedTab]);
  
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
    
    switch (selectedTab) {
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
    <>
      <SEO 
        title="Explore Funds | OpenFUND - Discover Top Performing Investment Strategies"
        description="Browse and invest in verified trading strategies across cryptocurrencies, stocks, and commodities. Find funds that match your risk profile and investment goals."
        keywords="investment strategies, crypto funds, trading strategies, decentralized funds, portfolio management, asset management"
      />
      <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-4xl font-bold">Explore Funds</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search funds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[300px]"
                  />
                </div>
                <Popover open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Fund Type</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Equity', 'Fixed Income', 'Mixed', 'Crypto', 'Commodity'].map((type) => (
                            <Toggle
                              key={type}
                              pressed={fundTypeFilter.includes(type)}
                              onPressedChange={() => toggleFundTypeFilter(type)}
                              size="sm"
                            >
                              {type}
                            </Toggle>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Minimum Investment</h4>
                        <Slider
                          value={[minDepositFilter]}
                          onValueChange={(value) => setMinDepositFilter(value[0])}
                          max={100000}
                          step={1000}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Min: ${minDepositFilter.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Performance</h4>
                        <Slider
                          value={[minPerformanceFilter]}
                          onValueChange={(value) => setMinPerformanceFilter(value[0])}
                          max={100}
                          step={1}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Min: {minPerformanceFilter}%
                        </p>
                      </div>
                      <Button onClick={resetFilters} variant="outline" className="w-full">
                        Reset Filters
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortOption('performance-high')}>
                      Performance (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('performance-low')}>
                      Performance (Low to High)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('year-old')}>
                      Year (Oldest First)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('year-new')}>
                      Year (Newest First)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="traditional">Traditional</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="openfund">OpenFUND</TabsTrigger>
              </TabsList>

              {['traditional', 'crypto', 'openfund'].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  {displayFunds.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground mb-4">
                        No funds match your search criteria
                      </p>
                      <Button onClick={resetFilters} variant="outline">
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayFunds.map((fund) => (
                        <Card key={fund.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle>{fund.name}</CardTitle>
                            <CardDescription>{fund.manager}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="performance">Performance</TabsTrigger>
                              </TabsList>
                              <TabsContent value="overview" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{fund.aum}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{fund.returns}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{fund.minInvestment}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{fund.year}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {fund.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {fund.assetTypes?.map((type) => (
                                    <Badge key={type} variant="secondary">
                                      {type}
                                    </Badge>
                                  ))}
                                </div>
                              </TabsContent>
                              <TabsContent value="performance" className="space-y-4">
                                <div className="h-[200px] w-full">
                                  <AssetChart 
                                    asset={fund.name.toLowerCase().replace(/\s+/g, '-')} 
                                    timeframe="90d"
                                    isPortfolio={true}
                                    portfolioName={fund.name}
                                    className="w-full h-full"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                    <span>90d Return: {fund.returns}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Scale className="h-4 w-4 text-muted-foreground" />
                                    <span>Volatility: {fund.volatilityValue || 'Medium'}</span>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              onClick={() => handleViewDetails(fund)}
                              className="w-full"
                            >
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}