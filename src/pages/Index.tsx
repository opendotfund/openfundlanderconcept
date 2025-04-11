
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ChartPreview from '@/components/ChartPreview';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Hexagon, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white">
      <Navbar />
      <Hero />
      <Features />
      <ChartPreview />
      
      {/* CTA Section */}
      <section className="py-20 bg-openfund-gray-dark relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-openfund-green">Start Trading</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of traders worldwide using OpenFund to access global markets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark text-lg px-8 py-6"
                asChild
              >
                <Link to="/trade">
                  Trade Now
                </Link>
              </Button>
              <Button 
                className="bg-transparent border-2 border-openfund-green text-openfund-green hover:bg-openfund-green/10 text-lg px-8 py-6"
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
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-openfund-green/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-openfund-green/5 rounded-full blur-3xl -z-0"></div>
      </section>
      
      {/* Tokenization Platform Section */}
      <section className="py-20 bg-openfund-gray-medium relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <div className="mb-4 inline-flex">
                  <div className="w-12 h-12 bg-openfund-green/20 rounded-full flex items-center justify-center">
                    <Hexagon size={24} className="text-openfund-green" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Asset <span className="text-openfund-green">Tokenization</span> Platform
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Convert real-world assets into tradable digital tokens with our revolutionary tokenization platform.
                  Unlock liquidity, fractional ownership, and 24/7 market access.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-openfund-green/20 p-1">
                      <div className="w-2 h-2 bg-openfund-green rounded-full"></div>
                    </div>
                    <span className="text-gray-300">Real Estate Tokens</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-openfund-green/20 p-1">
                      <div className="w-2 h-2 bg-openfund-green rounded-full"></div>
                    </div>
                    <span className="text-gray-300">Art & Collectibles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-openfund-green/20 p-1">
                      <div className="w-2 h-2 bg-openfund-green rounded-full"></div>
                    </div>
                    <span className="text-gray-300">Traditional Securities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-openfund-green/20 p-1">
                      <div className="w-2 h-2 bg-openfund-green rounded-full"></div>
                    </div>
                    <span className="text-gray-300">Physical Commodities</span>
                  </div>
                </div>
                <Button 
                  className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark flex items-center"
                  asChild
                >
                  <Link to="/coming-soon">
                    Join Waitlist <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-64 h-64 bg-openfund-green/10 rounded-full blur-3xl -z-0"></div>
                  <div className="relative z-10 bg-openfund-gray-dark p-6 rounded-lg border border-openfund-gray-light">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-openfund-gray-medium p-4 rounded-md flex flex-col items-center justify-center text-center">
                        <div className="text-2xl font-bold text-openfund-green mb-1">$5M+</div>
                        <p className="text-sm text-gray-400">Assets Tokenized</p>
                      </div>
                      <div className="bg-openfund-gray-medium p-4 rounded-md flex flex-col items-center justify-center text-center">
                        <div className="text-2xl font-bold text-openfund-green mb-1">10k+</div>
                        <p className="text-sm text-gray-400">Token Holders</p>
                      </div>
                      <div className="bg-openfund-gray-medium p-4 rounded-md flex flex-col items-center justify-center text-center">
                        <div className="text-2xl font-bold text-openfund-green mb-1">24/7</div>
                        <p className="text-sm text-gray-400">Market Access</p>
                      </div>
                      <div className="bg-openfund-gray-medium p-4 rounded-md flex flex-col items-center justify-center text-center">
                        <div className="text-2xl font-bold text-openfund-green mb-1">100%</div>
                        <p className="text-sm text-gray-400">Regulatory Compliant</p>
                      </div>
                    </div>
                    <div className="mt-6 bg-openfund-gray-medium p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-2">Launch Timeline</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Private Beta</span>
                          <span className="text-openfund-green">Live Now</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Public Beta</span>
                          <span className="text-gray-400">Q2 2025</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Full Launch</span>
                          <span className="text-gray-400">Q4 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-openfund-green/5 rounded-full blur-3xl -z-0"></div>
      </section>
      
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
