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
import { traditionalFunds, cryptoFunds, openfundFunds, getAllFunds, Fund as FundType } from '@/data/funds';

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

const generateComparisonData = (fundData: FundType) => {
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
  const [fund, setFund] = useState<FundType | null>(null);
  const [timeframe, setTimeframe] = useState('12m');
  const [activeTab, setActiveTab] = useState('overview');
  const [showSwapWidget, setShowSwapWidget] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    if (fundId) {
      const numericId = parseInt(fundId);
      let foundFund = null;
      
      if (type === 'traditional') {
        foundFund = traditionalFunds.find(f => f.id === numericId);
      } else if (type === 'crypto') {
        foundFund = cryptoFunds.find(f => f.id === numericId);
      } else if (type === 'openfund') {
        foundFund = openfundFunds.find(f => f.id === numericId);
      } else {
        // If no specific type is provided, search through all funds
        foundFund = getAllFunds().find(f => f.id === numericId);
      }
      
      setFund(foundFund || null);
    }
  }, [fundId, type]);
  
  if (!fund) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Fund not found</h1>
          <p className="mb-6 text-muted-foreground">
            The fund you're looking for doesn't exist or may have been removed.
          </p>
          <Button onClick={() => navigate('/explore-funds')}>
            Back to Funds
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const isDefiFund = fund.type === 'Decentralized Fund';
  // Generate historical price data specific to the fund
  const chartData = Array.isArray(fund.holdingsBreakdown) ? 
    fund.holdingsBreakdown.map(item => ({
      date: new Date().toISOString().split('T')[0],
      value: item.value
    })) : [];

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
              <CardHeader>
                <div className="flex flex-col space-y-2">
                  <CardTitle>Performance History</CardTitle>
                  <TimeframeSelector 
                    timeframe={timeframe} 
                    onChange={setTimeframe}
                  />
                </div>
              </CardHeader>
              <CardContent className="w-full overflow-hidden p-4">
                <div className="h-[350px] w-full rounded-lg overflow-hidden">
                  <AssetChart 
                    asset={fund.name.toLowerCase().replace(' ', '-')} 
                    timeframe={timeframe}
                    isPortfolio={true}
                    portfolioName={fund.name}
                    portfolioData={chartData}
                    className="w-full h-full p-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="mb-6">
              <Tabs 
                defaultValue="overview" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="relative"
              >
                <TabsList className="w-full bg-card mb-8">
                  <TabsTrigger 
                    className="flex-1 z-10" 
                    value="overview"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    className="flex-1 z-10" 
                    value="strategy"
                  >
                    Strategy
                  </TabsTrigger>
                  <TabsTrigger 
                    className="flex-1 z-10" 
                    value="holdings"
                  >
                    Holdings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
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
                
                <TabsContent value="strategy" className="mt-0">
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
                              parseFloat(fund.benchmarkPerformance?.replace('+', '').replace('%', '') || '0') ?
                              'text-openfund-green' : 'text-red-500'
                            }`}>
                              {`${(parseFloat(fund.performance.replace('+', '').replace('%', '')) - 
                                parseFloat(fund.benchmarkPerformance?.replace('+', '').replace('%', '') || '0')).toFixed(1)}%`}
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
                
                <TabsContent value="holdings" className="mt-0">
                  <Card className="bg-card border-card">
                    <CardHeader>
                      <CardTitle>Holdings Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {fund.holdingsBreakdown ? (
                        <div className={isDefiFund ? "" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
                          <FundHoldingsPieChart 
                            holdings={fund.holdingsBreakdown}
                            title="Asset Allocation"
                            isDeFiFund={isDefiFund}
                          />
                          
                          {!isDefiFund && (
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
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400">Detailed holdings information is not available for this fund.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
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
