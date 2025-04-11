
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Briefcase, 
  Calendar, 
  Clock, 
  Info, 
  DollarSign, 
  FileText,
  AlertTriangle,
  Users,
  BarChart3,
  Percent,
  ArrowDownToLine,
  PieChart
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AssetChart } from '@/components/AssetChart';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { FundShareSwap } from '@/components/FundShareSwap';
import { FundHoldingsPieChart } from '@/components/FundHoldingsPieChart';

const traditionalFunds = [
  {
    id: 1,
    name: 'Berkshire Hathaway',
    manager: 'Warren Buffett',
    aum: '$700B',
    aumValue: 700000000000,
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
    managementFee: '1%',
    performanceFee: '20%',
    lockupPeriod: '1 year',
    redemptionFrequency: 'Quarterly',
    redemptionNotice: '90 days',
    minimumHoldingPeriod: '12 months',
    fundStrategy: 'Long-term value investing across diverse industries with focus on quality businesses with strong competitive advantages.',
    riskLevel: 'Medium',
    inceptionDate: 'May 1, 1965',
    benchmarkIndex: 'S&P 500',
    benchmarkPerformance: '+10.5%',
    topHoldings: ['Apple', 'Bank of America', 'American Express', 'Coca-Cola', 'Chevron'],
    holdingsBreakdown: [
      { name: 'Tech Stocks', value: 35, color: '#2563eb' },
      { name: 'Financial Services', value: 30, color: '#9333ea' },
      { name: 'Consumer Goods', value: 20, color: '#16a34a' },
      { name: 'Energy', value: 10, color: '#d97706' },
      { name: 'Healthcare', value: 5, color: '#dc2626' }
    ]
  },
  // ... other traditional funds would be defined here
];

const cryptoFunds = [
  {
    id: 1,
    name: 'Grayscale Bitcoin Trust',
    manager: 'Grayscale Investments',
    aum: '$30.3B',
    aumValue: 30300000000,
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
    managementFee: '2%',
    performanceFee: '0%',
    lockupPeriod: '6 months',
    redemptionFrequency: 'Daily',
    redemptionNotice: '1 day',
    minimumHoldingPeriod: '6 months',
    fundStrategy: '100% allocation to Bitcoin, with secure cold storage custody solution.',
    riskLevel: 'High',
    inceptionDate: 'September 25, 2013',
    benchmarkIndex: 'Bitcoin Price',
    benchmarkPerformance: '+60.8%',
    topHoldings: ['Bitcoin'],
    holdingsBreakdown: [
      { name: 'Bitcoin', value: 100, color: '#f7931a' }
    ]
  },
  // ... other crypto funds would be defined here
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
  assetTypes: fund % 3 === 0 ? ['Crypto'] : fund % 3 === 1 ? ['Crypto', 'Stock'] : ['Crypto', 'Commodity'],
  managementFee: '2%',
  performanceFee: '20%', 
  depositFee: '0.5%',
  withdrawalFee: '1%',
  lockupPeriod: '30 days',
  nextWithdrawalWindow: `${new Date().getDate() + 10}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
  timeUntilWithdrawal: `${10 - (fund % 10)} days`,
  fundStrategy: `Smart contract-based strategy focusing on ${fund % 2 === 0 ? 'Layer 1 protocols with staking yield' : 'DeFi liquidity mining and yield farming'}`,
  riskLevel: fund % 2 === 0 ? 'High' : 'Medium-High',
  inceptionDate: `February ${10 + fund}, 202${fund}`,
  governanceToken: 'AST',
  votingRights: 'Pro-rata based on investment',
  topHoldings: fund % 2 === 0 ? ['Ethereum', 'Solana', 'Avalanche', 'Cardano', 'Polkadot'] : ['Uniswap', 'Aave', 'Compound', 'MakerDAO', 'Curve'],
  holdingsBreakdown: fund % 2 === 0 
    ? [
        { name: 'Major Coins', value: 45, color: '#3b82f6' },  // blue
        { name: 'Alt Coins', value: 40, color: '#8b5cf6' },    // purple
        { name: 'Meme Coins', value: 15, color: '#f97316' }    // orange
      ]
    : [
        { name: 'Major Coins', value: 30, color: '#3b82f6' },  // blue 
        { name: 'Alt Coins', value: 60, color: '#8b5cf6' },    // purple
        { name: 'Meme Coins', value: 10, color: '#f97316' }    // orange
      ]
}));

const allFunds = [...traditionalFunds, ...cryptoFunds, ...openfundFunds];

const generateHistoricalData = (baseValue: number, volatility: number, uptrend: boolean) => {
  const data = [];
  let currentValue = baseValue;
  
  for (let i = 0; i < 12; i++) { // 12 months of data
    const change = (Math.random() * volatility * 0.01) * (uptrend ? 1.2 : 0.8);
    currentValue = uptrend ? 
      currentValue * (1 + change) : 
      Math.max(currentValue * (1 - change), baseValue * 0.5);
    
    data.push({
      month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
      value: parseFloat(currentValue.toFixed(2))
    });
  }
  
  return data;
};

const generateComparisonData = (fundData: any) => {
  const baseValue = 100;
  const fundVolatility = fundData.volatilityValue / 100;
  const marketVolatility = 0.2;
  
  const fundPerformance = generateHistoricalData(baseValue, fundVolatility, fundData.performanceValue > 0);
  const marketPerformance = generateHistoricalData(baseValue, marketVolatility, true);
  
  return fundPerformance.map((item, index) => ({
    month: item.month,
    fund: item.value,
    market: marketPerformance[index].value
  }));
};

const FundDetail = () => {
  const { fundId, type } = useParams<{ fundId: string, type: string }>();
  const [fund, setFund] = useState<any>(null);
  const [timeframe, setTimeframe] = useState('12m');
  const [activeTab, setActiveTab] = useState('overview');
  const [showSwapWidget, setShowSwapWidget] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    if (fundId) {
      const numericId = parseInt(fundId);
      
      if (type === 'traditional') {
        setFund(traditionalFunds.find(f => f.id === numericId));
      } else if (type === 'crypto') {
        setFund(cryptoFunds.find(f => f.id === numericId));
      } else if (type === 'openfund') {
        setFund(openfundFunds.find(f => f.id === numericId));
      } else {
        setFund(allFunds.find(f => f.id === numericId));
      }
    }
  }, [fundId, type]);
  
  if (!fund) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Fund not found</h1>
          <Button onClick={() => navigate('/explore-funds')}>
            Back to Funds
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const isDefiFund = fund.type === 'Decentralized Fund';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={() => navigate('/explore-funds')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Funds
            </Button>
            <h1 className="text-3xl font-bold">
              {fund.name}
              {isDefiFund && (
                <Badge className="ml-3 bg-primary/20 text-primary">
                  DeFi Fund
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isDefiFund ? 
                `Created by ${fund.manager}` : 
                `${fund.type} • Manager: ${fund.manager}`}
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="bg-card px-4 py-2 rounded-lg">
              <div className="flex items-center text-primary mb-1">
                <TrendingUp size={16} className="mr-1" />
                <span className="font-semibold text-xl">{fund.performance}</span>
              </div>
              <div className="text-sm text-muted-foreground">Annual Return</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Performance History</CardTitle>
                <TimeframeSelector 
                  timeframe={timeframe} 
                  onChange={setTimeframe}
                />
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <AssetChart 
                    asset={fund.name.toLowerCase().replace(' ', '-')} 
                    timeframe={timeframe} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-card mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
                {!isDefiFund && <TabsTrigger value="holdings">Holdings</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="overview">
                <Card className="bg-card border-card">
                  <CardHeader>
                    <CardTitle>Fund Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200 mb-6">{fund.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Assets Under Management</span>
                        <span className="font-medium">{fund.aum}</span>
                      </div>
                      {fund.investors && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Active Investors</span>
                          <span className="font-medium">{fund.investors}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Focus</span>
                        <span className="font-medium">{fund.focus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Inception Date</span>
                        <span className="font-medium">{fund.inceptionDate || fund.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Investment</span>
                        <span className="font-medium">{fund.minInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Level</span>
                        <span className="font-medium">{fund.riskLevel || fund.volatility}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="strategy">
                <Card className="bg-card border-card">
                  <CardHeader>
                    <CardTitle>Investment Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200 mb-6">
                      {fund.fundStrategy || 
                        `${fund.name} employs a ${fund.focus.toLowerCase()} approach, focusing on ${
                          fund.type === 'Crypto Fund' ? 
                          'digital assets and blockchain technologies' : 
                          fund.type === 'Decentralized Fund' ? 
                          'decentralized finance protocols and yield opportunities' : 
                          'identifying undervalued companies with strong fundamentals'
                        }.`}
                    </p>
                    
                    {isDefiFund && (
                      <div className="bg-card p-4 rounded-lg mb-6 border border-card">
                        <h3 className="font-medium mb-3 text-lg">Action Plan Summary</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="bg-primary/20 text-primary rounded-full p-1 mr-3 mt-0.5">
                              <TrendingUp size={16} />
                            </div>
                            <div>
                              <span className="font-medium block mb-1">Growth Strategy</span>
                              <span className="text-sm text-gray-400">
                                {fund.focus === 'Layer 1' ? 
                                  'Strategic allocation across major Layer 1 protocols with staking for passive yield generation' : 
                                  'Position in established DeFi protocols with focus on liquidity mining and yield farming'}
                              </span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-primary/20 text-primary rounded-full p-1 mr-3 mt-0.5">
                              <Briefcase size={16} />
                            </div>
                            <div>
                              <span className="font-medium block mb-1">Risk Management</span>
                              <span className="text-sm text-gray-400">
                                Portfolio diversification across multiple protocols with automatic rebalancing based on market conditions
                              </span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-primary/20 text-primary rounded-full p-1 mr-3 mt-0.5">
                              <BarChart3 size={16} />
                            </div>
                            <div>
                              <span className="font-medium block mb-1">Performance Targets</span>
                              <span className="text-sm text-gray-400">
                                Targeted annual return of {fund.returns} with quarterly portfolio rebalancing and active monitoring
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    {fund.benchmarkIndex && (
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Benchmark</span>
                          <span className="font-medium">{fund.benchmarkIndex}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Benchmark Performance</span>
                          <span className="font-medium">{fund.benchmarkPerformance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Alpha</span>
                          <span className={`font-medium ${
                            parseFloat(fund.performance.replace('+', '').replace('%', '')) > 
                            parseFloat(fund.benchmarkPerformance.replace('+', '').replace('%', '')) ?
                            'text-openfund-green' : 'text-red-500'
                          }`}>
                            {`${(parseFloat(fund.performance.replace('+', '').replace('%', '')) - 
                              parseFloat(fund.benchmarkPerformance.replace('+', '').replace('%', ''))).toFixed(1)}%`}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Management Style</span>
                        <span className="font-medium">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Investment Horizon</span>
                        <span className="font-medium">
                          {fund.type === 'TradFi Fund' ? 'Long Term' : 
                           fund.type === 'Crypto Fund' ? 'Medium Term' : 'Variable'}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-card p-4 rounded-lg">
                        <div className="flex items-center mb-1">
                          <TrendingUp size={18} className="mr-2 text-openfund-green" />
                          <span className="text-gray-400">Annual Return</span>
                        </div>
                        <div className="text-xl font-semibold">{fund.returns}</div>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <div className="flex items-center mb-1">
                          <BarChart3 size={18} className="mr-2 text-blue-400" />
                          <span className="text-gray-400">Volatility</span>
                        </div>
                        <div className="text-xl font-semibold">{fund.volatility}</div>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <div className="flex items-center mb-1">
                          <Percent size={18} className="mr-2 text-purple-400" />
                          <span className="text-gray-400">Sharpe Ratio</span>
                        </div>
                        <div className="text-xl font-semibold">
                          {(fund.returnsValue / (fund.volatilityValue * 0.1)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="holdings">
                <Card className="bg-card border-card">
                  <CardHeader>
                    <CardTitle>Holdings Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {fund.holdingsBreakdown ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FundHoldingsPieChart 
                          holdings={fund.holdingsBreakdown}
                          title="Asset Allocation"
                        />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium mb-3">Top Holdings</h3>
                          {fund.topHoldings && fund.topHoldings.map((holding: string, index: number) => (
                            <div key={index} className="flex items-center justify-between bg-card p-4 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center mr-3">
                                  {holding.charAt(0)}
                                </div>
                                <span className="font-medium">{holding}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{(20 - index * 3).toFixed(1)}%</div>
                                <div className="text-xs text-gray-400">
                                  ${((fund.aumValue || 1000000) * (20 - index * 3) / 100).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">Detailed holdings information is not available for this fund.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="flex items-center text-sm font-medium text-gray-400 mb-2">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Fee Structure
                    </h3>
                    <div className="bg-card p-3 rounded-md grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-400">Management Fee</div>
                        <div className="font-medium">{fund.managementFee || "2%"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Performance Fee</div>
                        <div className="font-medium">{fund.performanceFee || "20%"}</div>
                      </div>
                      {fund.depositFee && (
                        <div>
                          <div className="text-sm text-gray-400">Deposit Fee</div>
                          <div className="font-medium">{fund.depositFee}</div>
                        </div>
                      )}
                      {fund.withdrawalFee && (
                        <div>
                          <div className="text-sm text-gray-400">Withdrawal Fee</div>
                          <div className="font-medium">{fund.withdrawalFee}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center text-sm font-medium text-gray-400 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      Withdrawal Terms
                    </h3>
                    <div className="bg-card p-3 rounded-md">
                      <div className="mb-2">
                        <div className="text-sm text-gray-400">Lock-up Period</div>
                        <div className="font-medium">{fund.lockupPeriod || "N/A"}</div>
                      </div>
                      {fund.redemptionFrequency && (
                        <div className="mb-2">
                          <div className="text-sm text-gray-400">Redemption Frequency</div>
                          <div className="font-medium">{fund.redemptionFrequency}</div>
                        </div>
                      )}
                      {fund.redemptionNotice && (
                        <div>
                          <div className="text-sm text-gray-400">Notice Period</div>
                          <div className="font-medium">{fund.redemptionNotice}</div>
                        </div>
                      )}
                      {fund.nextWithdrawalWindow && (
                        <div className="mt-2 pt-2 border-t border-card">
                          <div className="text-sm text-gray-400">Next Withdrawal Window</div>
                          <div className="font-medium">{fund.nextWithdrawalWindow}</div>
                        </div>
                      )}
                      {fund.timeUntilWithdrawal && (
                        <div className="flex items-center mt-2">
                          <Clock className="h-4 w-4 mr-1 text-openfund-green" />
                          <div className="text-sm">{fund.timeUntilWithdrawal} until next withdrawal</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {fund.assetTypes && (
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-400 mb-2">
                        <Briefcase className="h-4 w-4 mr-1" />
                        Asset Classes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {fund.assetTypes.map((type: string) => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="flex items-center text-sm font-medium text-gray-400 mb-2">
                      <Info className="h-4 w-4 mr-1" />
                      Additional Information
                    </h3>
                    <div className="bg-card p-3 rounded-md space-y-2">
                      {isDefiFund ? (
                        <>
                          <div>
                            <div className="text-sm text-gray-400">Smart Contract</div>
                            <div className="font-medium truncate">0x7a3f691e57cf22cb21c01b8042{fund.id}e9f</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Audited By</div>
                            <div className="font-medium">OpenZeppelin & Certik</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <div className="text-sm text-gray-400">Regulator</div>
                            <div className="font-medium">
                              {fund.type === 'TradFi Fund' ? 'SEC' : 'FINRA'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Fund Structure</div>
                            <div className="font-medium">
                              {fund.type === 'TradFi Fund' ? 'Limited Partnership' : 'Private Fund'}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  {isDefiFund ? (
                    <>
                      <Button 
                        className="w-full fund-detail-invest-button"
                        onClick={() => setShowSwapWidget(!showSwapWidget)}
                      >
                        {showSwapWidget ? 'Cancel' : 'Invest Now'}
                      </Button>
                      
                      {showSwapWidget && (
                        <FundShareSwap 
                          fundName={fund.name}
                          fundId={fundId || ''}
                          onClose={() => setShowSwapWidget(false)}
                        />
                      )}
                    </>
                  ) : (
                    <Button className="w-full fund-detail-request-button">
                      Request Investment
                    </Button>
                  )}
                </div>
                
                {!isDefiFund && (
                  <div className="text-center text-xs text-gray-400">
                    Contact the fund manager for detailed investment information
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  <span className="font-medium text-gray-300 block mb-1">Risk Disclaimer</span>
                  Past performance is not indicative of future results. Investments involve risk and may result in loss of principal. 
                  {fund.type === 'Crypto Fund' || isDefiFund ? 
                    ' Cryptocurrency investments are highly volatile and unregulated in some jurisdictions.' : 
                    ' Please read all fund documents before investing.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FundDetail;
