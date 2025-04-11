import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fetchAssetPrices = async () => {
  try {
    const baseValues = {
      bitcoin: 62450.75,
      ethereum: 3042.30,
      solana: 135.80,
      apple: 182.40,
      tesla: 178.32,
    };
    
    const fluctuate = (base: number) => {
      const variance = base * 0.0005;
      return base + (Math.random() - 0.5) * variance;
    };

    return {
      bitcoin: `$${fluctuate(baseValues.bitcoin).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      ethereum: `$${fluctuate(baseValues.ethereum).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      solana: `$${fluctuate(baseValues.solana).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      apple: `$${fluctuate(baseValues.apple).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      tesla: `$${fluctuate(baseValues.tesla).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    };
  } catch (error) {
    console.error("Error fetching asset prices:", error);
    return {
      bitcoin: "$62,450.75",
      ethereum: "$3,042.30",
      solana: "$135.80",
      apple: "$182.40",
      tesla: "$178.32",
    };
  }
};

const Hero = () => {
  const [prices, setPrices] = useState({
    bitcoin: "$62,450.75",
    ethereum: "$3,042.30",
    solana: "$135.80",
    apple: "$182.40",
    tesla: "$178.32",
  });

  useEffect(() => {
    const getInitialPrices = async () => {
      const initialPrices = await fetchAssetPrices();
      setPrices(initialPrices);
    };
    
    getInitialPrices();
    
    const interval = setInterval(async () => {
      const updatedPrices = await fetchAssetPrices();
      setPrices(updatedPrices);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[80vh] bg-hero-pattern bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center scale-125 transform-gpu -z-10"></div>
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
            <span className="text-openfund-green">Trade Smarter</span> with OpenFund.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            The next generation platform for commodities, stocks, and crypto trading, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark text-lg px-8 py-6" asChild>
              <Link to="/assets">Start Trading</Link>
            </Button>
            <Button variant="outline" className="border-openfund-green text-openfund-green hover:bg-openfund-green/10 text-lg px-8 py-6" asChild>
              <Link to="/explore">
                Explore Funds <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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
          
          <div className="mt-10 p-4 bg-black/30 backdrop-blur-md rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Live Market Prices</h3>
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <span className="text-gray-400">BTC</span>
                <p className="font-bold text-openfund-green">{prices.bitcoin}</p>
              </div>
              <div>
                <span className="text-gray-400">ETH</span>
                <p className="font-bold text-openfund-green">{prices.ethereum}</p>
              </div>
              <div>
                <span className="text-gray-400">SOL</span>
                <p className="font-bold text-openfund-green">{prices.solana}</p>
              </div>
              <div>
                <span className="text-gray-400">AAPL</span>
                <p className="font-bold text-openfund-green">{prices.apple}</p>
              </div>
              <div>
                <span className="text-gray-400">TSLA</span>
                <p className="font-bold text-openfund-green">{prices.tesla}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
