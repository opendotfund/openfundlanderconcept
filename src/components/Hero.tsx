
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-[80vh] bg-hero-pattern bg-cover bg-center bg-no-repeat relative overflow-hidden">
      {/* Background image with zoom effect */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center scale-150 transform-gpu -z-10"></div>
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
            <span className="text-openfund-green">Trade Smarter</span> with OpenFund.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            The next generation platform for commodities, stocks, and crypto trading, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark text-lg px-8 py-6">
              Start Trading
            </Button>
            <Button variant="outline" className="border-openfund-green text-openfund-green hover:bg-openfund-green/10 text-lg px-8 py-6">
              Explore Funds <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-openfund-green text-3xl font-bold">24/7</p>
              <p className="text-gray-400">Market Access</p>
            </div>
            <div className="p-4">
              <p className="text-openfund-green text-3xl font-bold">$0</p>
              <p className="text-gray-400">Commission Fees</p>
            </div>
            <div className="p-4">
              <p className="text-openfund-green text-3xl font-bold">100+</p>
              <p className="text-gray-400">Trading Pairs</p>
            </div>
            <div className="p-4">
              <p className="text-openfund-green text-3xl font-bold">0.1%</p>
              <p className="text-gray-400">Low Spreads</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
