
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  ChevronDown, 
  AlertCircle, 
  Clock, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  FileText,
  FileMinus,
  FilePlus
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AssetChart } from '@/components/AssetChart';
import { SwapWidget } from '@/components/SwapWidget';
import { TimeframeSelector } from '@/components/TimeframeSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const FundManager = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [selectedAsset, setSelectedAsset] = useState('bitcoin');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const fundData = {
    name: "Alpha Seekers #1",
    manager: "0x7a...3fe1",
    aum: "$1,500,000",
    performance: "+24.7%",
    performanceIsPositive: true,
    withdrawalsPending: "$53,500",
    withdrawalsCount: 3,
    nextWithdrawalWindow: "04/21/2025",
    timeUntilWithdrawal: "10 days",
    holdings: [
      { name: "Bitcoin", symbol: "BTC", amount: "7.94", value: "$521,400", change: "+7.8%", allocation: 34.8, isUp: true },
      { name: "Ethereum", symbol: "ETH", amount: "62.5", value: "$216,250", change: "+5.2%", allocation: 14.4, isUp: true },
      { name: "Solana", symbol: "SOL", amount: "870", value: "$135,720", change: "+8.5%", allocation: 9.1, isUp: true },
      { name: "USDC", symbol: "USDC", amount: "180,000", value: "$180,000", change: "0.0%", allocation: 12.0, isUp: true },
      { name: "Apple", symbol: "AAPL", amount: "420", value: "$88,200", change: "+3.2%", allocation: 5.9, isUp: true },
      { name: "Tesla", symbol: "TSLA", amount: "185", value: "$44,770", change: "+2.1%", allocation: 3.0, isUp: true },
      { name: "Gold", symbol: "GOLD", amount: "28.5", value: "$67,830", change: "+0.8%", allocation: 4.5, isUp: true },
      { name: "Other", symbol: "", amount: "", value: "$246,030", change: "", allocation: 16.3, isUp: true }
    ],
    recentTransactions: [
      { type: "Buy", asset: "Bitcoin", amount: "1.45 BTC", value: "$95,120", time: "1h ago" },
      { type: "Sell", asset: "Tesla", amount: "25 TSLA", value: "$6,050", time: "6h ago" },
      { type: "Withdrawal", asset: "USDC", amount: "12,000 USDC", value: "$12,000", time: "1d ago" },
      { type: "Deposit", asset: "USDC", amount: "50,000 USDC", value: "$50,000", time: "3d ago" },
      { type: "Buy", asset: "Ethereum", amount: "8.2 ETH", value: "$28,290", time: "5d ago" }
    ],
    pendingWithdrawals: [
      { investor: "0x45...9a3d", amount: "$32,000", requested: "2d ago", status: "Pending", processingDate: "04/21/2025" },
      { investor: "0x92...7b5c", amount: "$18,500", requested: "4d ago", status: "Pending", processingDate: "04/21/2025" },
      { investor: "0x3f...0e4f", amount: "$3,000", requested: "5d ago", status: "Pending", processingDate: "04/21/2025" }
    ]
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={() => navigate('/fund')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fund Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Fund Manager Trading Terminal</h1>
            <p className="text-muted-foreground mt-1">
              {fundData.name} • Managed by {fundData.manager}
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="bg-muted px-4 py-2 rounded-lg">
              <div className={`flex items-center ${fundData.performanceIsPositive ? 'text-green-600 dark:text-openfund-green' : 'text-red-500'} mb-1`}>
                <TrendingUp size={16} className="mr-1" />
                <span className="font-semibold text-xl">{fundData.performance}</span>
              </div>
              <div className="text-sm text-muted-foreground">Fund Performance</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Wallet size={16} className="mr-2 text-primary" />
                    <span className="text-muted-foreground text-sm">Total Balance</span>
                  </div>
                  <div className="text-xl font-bold">{fundData.aum}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <FileText size={16} className="mr-2 text-blue-400" />
                    <span className="text-muted-foreground text-sm">Holdings</span>
                  </div>
                  <div className="text-xl font-bold">{fundData.holdings.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <FileMinus size={16} className="mr-2 text-amber-400" />
                    <span className="text-muted-foreground text-sm">Withdrawals</span>
                  </div>
                  <div className="text-xl font-bold">{fundData.withdrawalsCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Clock size={16} className="mr-2 text-purple-400" />
                    <span className="text-muted-foreground text-sm">Next Window</span>
                  </div>
                  <div className="text-xl font-bold">{fundData.timeUntilWithdrawal}</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-2">
                <CardTitle>Fund Performance</CardTitle>
                <TimeframeSelector 
                  timeframe={timeframe} 
                  onChange={setTimeframe}
                />
              </CardHeader>
              <CardContent>
                <div className="h-[380px]">
                  <AssetChart 
                    timeframe={timeframe}
                    isPortfolio={true}
                    portfolioName={fundData.name} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Tabs defaultValue="holdings">
                <TabsList className="mb-2">
                  <TabsTrigger value="holdings">Portfolio Holdings</TabsTrigger>
                  <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
                  <TabsTrigger value="withdrawals">Pending Withdrawals</TabsTrigger>
                </TabsList>
                
                <TabsContent value="holdings">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>Current Holdings</CardTitle>
                        <div className="relative w-64">
                          <Input
                            placeholder="Search assets..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-8 w-full"
                          />
                          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-muted-foreground text-sm border-b">
                              <th className="text-left font-medium py-2">Asset</th>
                              <th className="text-right font-medium py-2">Amount</th>
                              <th className="text-right font-medium py-2">Value</th>
                              <th className="text-right font-medium py-2">Change</th>
                              <th className="text-left font-medium py-2 pl-4">Allocation</th>
                              <th className="text-right font-medium py-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fundData.holdings
                              .filter(holding => 
                                holding.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                holding.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((holding, index) => (
                              <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                                      {holding.symbol ? holding.symbol[0] : "?"}
                                    </div>
                                    <div>
                                      <div className="font-medium">{holding.name}</div>
                                      <div className="text-muted-foreground text-sm">{holding.symbol}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-right py-3">
                                  {holding.amount}
                                </td>
                                <td className="text-right py-3">
                                  {holding.value}
                                </td>
                                <td className="text-right py-3">
                                  {holding.change && (
                                    <span className={holding.isUp ? "text-green-600 dark:text-openfund-green" : "text-red-500"}>
                                      {holding.change}
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 pl-4">
                                  <div className="flex items-center">
                                    <Progress className="h-2 mr-2" value={holding.allocation} />
                                    <span className="text-sm">{formatNumber(holding.allocation)}%</span>
                                  </div>
                                </td>
                                <td className="text-right py-3">
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedAsset(holding.name.toLowerCase())}>
                                    Trade
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="transactions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {fundData.recentTransactions.map((tx, index) => (
                          <div key={index} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                tx.type === 'Buy' ? 'bg-green-500/20 text-green-500' :
                                tx.type === 'Sell' ? 'bg-red-500/20 text-red-500' :
                                tx.type === 'Withdrawal' ? 'bg-amber-500/20 text-amber-500' :
                                'bg-blue-500/20 text-blue-500'
                              }`}>
                                {tx.type === 'Buy' ? <ArrowUpRight size={16} /> :
                                 tx.type === 'Sell' ? <ArrowDownRight size={16} /> :
                                 tx.type === 'Withdrawal' ? <FileMinus size={16} /> :
                                 <FilePlus size={16} />}
                              </div>
                              <div>
                                <div className="font-medium">{tx.type} {tx.asset}</div>
                                <div className="text-muted-foreground text-sm">{tx.amount}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{tx.value}</div>
                              <div className="text-muted-foreground text-sm">{tx.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="withdrawals">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Pending Withdrawals</CardTitle>
                        <div className="flex items-center bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">
                          <Clock size={14} className="mr-1.5" />
                          <span>Total: {fundData.withdrawalsPending}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {fundData.pendingWithdrawals.map((withdrawal, index) => (
                          <div key={index} className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <div className="font-medium text-sm text-muted-foreground">Investor</div>
                                <div>{withdrawal.investor}</div>
                              </div>
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-400/20">
                                {withdrawal.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="font-medium text-sm text-muted-foreground">Amount</div>
                                <div className="font-bold">{withdrawal.amount}</div>
                              </div>
                              <div>
                                <div className="font-medium text-sm text-muted-foreground">Requested</div>
                                <div>{withdrawal.requested}</div>
                              </div>
                              <div>
                                <div className="font-medium text-sm text-muted-foreground">Processing</div>
                                <div>{withdrawal.processingDate}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <SwapWidget selectedAsset={selectedAsset} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fund Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Management Fee</span>
                    <span>2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Performance Fee</span>
                    <span>20%</span>
                  </div>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Withdrawal Window</span>
                    <span>{fundData.nextWithdrawalWindow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Left</span>
                    <span>{fundData.timeUntilWithdrawal}</span>
                  </div>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Smart Contract</span>
                    <Badge variant="outline">Audited</Badge>
                  </div>
                  <div className="text-sm font-mono bg-card p-2 rounded overflow-x-auto">
                    0x7a3f691e57cf22cb21c01b80421e9f
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Fund Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {fundData.withdrawalsCount > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 dark:bg-amber-950/30">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-400">Pending Withdrawals</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      There are {fundData.withdrawalsCount} pending withdrawal requests totaling {fundData.withdrawalsPending}. 
                      These will be processed on {fundData.nextWithdrawalWindow}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FundManager;
