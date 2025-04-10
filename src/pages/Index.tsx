
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ChartPreview from '@/components/ChartPreview';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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
                <Link to="/assets">
                  Explore Assets
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
      
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
