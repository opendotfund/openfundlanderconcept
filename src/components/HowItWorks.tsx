import React from 'react';
import { Wallet, ShieldCheck, BarChart2, ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const HowItWorks = () => {
  const steps = [{
    icon: <Wallet className="w-10 h-10 text-primary transition-colors duration-300" />,
    title: "Connect Wallet",
    description: "Connect your crypto wallet for immediate decentralized access to DeFi funds and tokenized assets."
  }, {
    icon: <ShieldCheck className="w-10 h-10 text-primary transition-colors duration-300" />,
    title: "Optional KYC",
    description: "Verify your identity to unlock TradFi funds, partner funds, fund creation and bank transfer deposits."
  }, {
    icon: <BarChart2 className="w-10 h-10 text-primary transition-colors duration-300" />,
    title: "Choose Assets",
    description: "Select from DeFi funds, tokenized stocks, and commodities based on your verification level."
  }, {
    icon: <ArrowUpCircle className="w-10 h-10 text-primary transition-colors duration-300" />,
    title: "Start Trading",
    description: "Execute trades with our intuitive platform and monitor performance in real-time."
  }];
  return <section className="py-20 bg-card transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-primary transition-colors duration-300">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground transition-colors duration-300 max-w-2xl mx-auto">
            Get started with OpenFund in just a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => <div key={index} className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold transition-colors duration-300">
                {index + 1}
              </div>
              
              {index < steps.length - 1 && <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-primary/30 -z-10 transition-colors duration-300"></div>}
              
              <div className="card-gradient p-6 rounded-xl border border-border hover:border-primary h-full transition-all duration-300">
                <div className="mb-4 transition-colors duration-300">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300">{step.title}</h3>
                <p className="text-muted-foreground transition-colors duration-300">{step.description}</p>
              </div>
            </div>)}
        </div>
        
        <div className="mt-16 bg-background p-8 rounded-xl border border-border transition-colors duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 transition-colors duration-300">Decentralized Access</h3>
              <ul className="space-y-3 flex flex-col items-center">
                <li className="flex items-start gap-2 w-full max-w-md">
                  <div className="rounded-full bg-primary/20 p-1 mt-1 transition-colors duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full transition-colors duration-300"></div>
                  </div>
                  <span className="text-muted-foreground transition-colors duration-300">Instant access to DeFi funds with wallet connection.</span>
                </li>
                <li className="flex items-start gap-2 w-full max-w-md">
                  <div className="rounded-full bg-primary/20 p-1 mt-1 transition-colors duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full transition-colors duration-300"></div>
                  </div>
                  <span className="text-muted-foreground transition-colors duration-300">Trade tokenized stocks and commodities.</span>
                </li>
                <li className="flex items-start gap-2 w-full max-w-md">
                  <div className="rounded-full bg-primary/20 p-1 mt-1 transition-colors duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full transition-colors duration-300"></div>
                  </div>
                  <span className="text-muted-foreground transition-colors duration-300">Deposit using any cryptocurrency.</span>
                </li>
              </ul>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 mt-6 transition-colors duration-300 block mx-auto" asChild>
                <Link to="/trade">
                  Connect Wallet
                </Link>
              </Button>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 transition-colors duration-300">KYC Verified Benefits</h3>
              <ul className="space-y-3 flex flex-col items-center">
                <li className="flex items-start gap-2 w-full max-w-md">
                  <div className="rounded-full bg-primary/20 p-1 mt-1 transition-colors duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full transition-colors duration-300"></div>
                  </div>
                  <span className="text-muted-foreground transition-colors duration-300">Access to TradFi and partner funds.</span>
                </li>
                <li className="flex items-start gap-2 w-full max-w-md">
                  <div className="rounded-full bg-primary/20 p-1 mt-1 transition-colors duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full transition-colors duration-300"></div>
                  </div>
                  <span className="text-muted-foreground transition-colors duration-300">Create your own managed funds*.</span>
                </li>
                <li className="flex items-start gap-2 w-full max-w-md">
                  <div className="rounded-full bg-primary/20 p-1 mt-1 transition-colors duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full transition-colors duration-300"></div>
                  </div>
                  <span className="text-muted-foreground transition-colors duration-300">Deposit via bank transfer and cryptocurrencies.</span>
                </li>
              </ul>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6 transition-colors duration-300 block mx-auto" asChild>
                <Link to="/account">
                  Complete KYC
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HowItWorks;