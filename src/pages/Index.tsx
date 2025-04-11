import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ChartPreview from '@/components/ChartPreview';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import { Button } from '@/components/ui/button';
import { Hexagon, ArrowRight, Users, TrendingUp, Shield, DollarSign } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ChartPreview />
      
      {/* Decentralized Funds Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-primary">Decentralized</span> Fund Management
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Crowdsource capital for your trading strategies or invest in top-performing traders
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-background p-6 rounded-xl border border-border hover:border-primary transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Pooled Capital</h3>
                <p className="text-muted-foreground mb-4">
                  Raise funds from hundreds of investors to execute your trading strategy at scale
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">Active funds</span>
                  <span className="text-primary font-bold">324</span>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-xl border border-border hover:border-primary transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Track Record</h3>
                <p className="text-muted-foreground mb-4">
                  Build a verifiable on-chain performance history to attract more investors
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">Average ROI</span>
                  <span className="text-primary font-bold">+32.7%</span>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-xl border border-border hover:border-primary transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Shield className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Contracts</h3>
                <p className="text-muted-foreground mb-4">
                  Secure, transparent fund management with automated performance fees
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">Total locked value</span>
                  <span className="text-primary font-bold">$43.2M</span>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-xl border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-0"></div>
              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Top Performing Strategies</h3>
                  <p className="text-muted-foreground mb-6">
                    Browse through verified trading strategies across cryptocurrencies, stocks, and commodities. Invest in funds that match your risk profile.
                  </p>
                  <Button asChild>
                    <Link to="/explore">
                      Explore Strategies <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Crypto Momentum", return: "+47.3%", aum: "$3.2M", traders: 1876 },
                    { name: "Commodity Futures", return: "+31.8%", aum: "$5.7M", traders: 2341 },
                    { name: "Global Stock Index", return: "+22.5%", aum: "$8.1M", traders: 3502 }
                  ].map((fund, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                      <div>
                        <div className="font-medium">{fund.name}</div>
                        <div className="text-xs text-muted-foreground">{fund.traders} traders</div>
                      </div>
                      <div className="text-right">
                        <div className="text-primary font-bold">{fund.return}</div>
                        <div className="text-xs text-muted-foreground">AUM: {fund.aum}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-10">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <Link to="/fund-manager">
                  Manage Your Own Fund <DollarSign size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-primary">Start Trading</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of traders worldwide using OpenFund to access global markets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="text-lg px-8 py-3 h-auto"
                asChild
              >
                <Link to="/trade">
                  Trade Now
                </Link>
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg px-8 py-3 h-auto"
                asChild
              >
                <Link to="/fund">
                  Start a Fund
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      </section>
      
      {/* Tokenization Platform Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <div className="mb-4 inline-flex">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Hexagon size={24} className="text-primary" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Asset <span className="text-primary">Tokenization</span> Platform
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Convert real-world assets into tradable digital tokens with our revolutionary tokenization platform.
                  Unlock liquidity, fractional ownership, and 24/7 market access.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-muted-foreground">Real Estate Tokens</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-muted-foreground">Art & Collectibles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-muted-foreground">Traditional Securities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-muted-foreground">Physical Commodities</span>
                  </div>
                </div>
                <div className="mb-8 p-6 rounded-lg bg-background border border-border text-center">
                  <p className="text-2xl font-semibold text-primary mb-1">Coming Soon!</p>
                  <p className="text-muted-foreground">Join our waitlist to be notified when we launch.</p>
                </div>
                <Button 
                  asChild
                >
                  <Link to="/coming-soon">
                    Join Waitlist <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
                  <div className="relative z-10 bg-background p-6 rounded-lg border border-border">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-card p-4 rounded-md flex flex-col items-center justify-center text-center">
                        <div className="text-2xl font-bold text-primary mb-1">$5M+</div>
                        <p className="text-sm text-muted-foreground">Assets Tokenized</p>
                      </div>
                      <div className="bg-card p-4 rounded-md flex flex-col items-center justify-center text-center">
                        <div className="text-2xl font-bold text-primary mb-1">10k+</div>
                        <p className="text-sm text-muted-foreground">Token Holders</p>
                      </div>
                      <div className="bg-card p-4 rounded-md flex flex-col items-center justify-center text-center">
                        <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                        <p className="text-sm text-muted-foreground">Market Access</p>
                      </div>
                      <div className="bg-card p-4 rounded-md flex flex-col items-center justify-center text-center">
                        <div className="text-2xl font-bold text-primary mb-1">100%</div>
                        <p className="text-sm text-muted-foreground">Regulatory Compliant</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
