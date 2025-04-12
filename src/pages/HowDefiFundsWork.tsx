
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Users, BarChart3, DollarSign, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const HowDefiFundsWork = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when component mounts or location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            How <span className="text-primary">OpenFund DeFi Funds</span> Work
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8">
            Discover how our decentralized investment funds operate, bringing together the benefits of traditional hedge funds with the transparency and accessibility of DeFi.
          </p>
          
          <Separator className="mb-10" />
          
          <div className="space-y-10">
            {/* Core DeFi Fund Concepts */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Core DeFi Fund Concepts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Pooled Capital</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Investors combine their assets into a shared investment pool, enabling access to opportunities that might be out of reach individually. This collective approach increases buying power and reduces individual transaction costs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Track Record</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      All trading activity and performance are recorded on-chain, creating an immutable and verifiable track record. This transparency allows investors to make informed decisions based on historical performance data.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Smart Contracts</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Fund rules are encoded in smart contracts that automatically handle deposits, withdrawals, fee calculations, and profit distribution. This removes the need for intermediaries and ensures that terms are executed exactly as programmed.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Decentralized Governance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Fund token holders can participate in key decisions like trading strategy adjustments, risk parameters, and fee structures. This democratic approach gives investors a voice in fund management.</p>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            {/* How to Invest */}
            <section>
              <h2 className="text-2xl font-bold mb-6">How to Invest in DeFi Funds</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Choose a Fund</h3>
                    <p className="text-muted-foreground">
                      Browse OpenFund's curated selection of DeFi funds and review their strategy, past performance, risk level, and manager credentials. Each fund has a transparent on-chain record of all activities.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Connect Wallet</h3>
                    <p className="text-muted-foreground">
                      Connect your Web3 wallet to OpenFund. We support MetaMask, WalletConnect, Coinbase Wallet, and other popular options for a seamless investment experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Deposit Assets</h3>
                    <p className="text-muted-foreground">
                      Contribute to your chosen fund by depositing supported cryptocurrencies. The smart contract automatically mints fund tokens representing your proportional ownership of the pool.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Track Performance</h3>
                    <p className="text-muted-foreground">
                      Monitor your investment through OpenFund's dashboard, which provides real-time updates on fund performance, holdings, and transaction history.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Withdraw Anytime</h3>
                    <p className="text-muted-foreground">
                      Redeem your fund tokens for the underlying assets at any time, subject to the fund's specific liquidity conditions. The smart contract calculates your share including any profits earned.</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Benefits of OpenFund DeFi Funds</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p>Lower minimum investments compared to traditional hedge funds.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p>Complete transparency with all transactions visible on-chain.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p>Automated compliance and fee calculations through smart contracts.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p>No intermediaries, reducing costs and eliminating counterparty risk.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p>Participate in fund governance through decentralized voting.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p>Global access without geographical restrictions.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p>Enhanced liquidity compared to traditional investment vehicles.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p>Potential for higher returns through innovative DeFi strategies.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-6">Create Your Own DeFi Fund</h2>
              <p className="mb-6">
                Are you a skilled trader looking to build a track record and manage assets for others? Apply to become an OpenFund manager and launch your own DeFi fund.
              </p>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2">Ready to start your fund?</h3>
                      <p className="text-muted-foreground">Launch your own DeFi fund and build your on-chain track record.</p>
                    </div>
                    <div className="flex items-center gap-2 font-medium text-primary">
                      Apply to become a fund manager
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowDefiFundsWork;
