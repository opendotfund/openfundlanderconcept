
import React from 'react';
import { UserPlus, ArrowDownToLine, BarChart2, ArrowUpCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-10 h-10 text-openfund-green" />,
      title: "Create Account",
      description: "Sign up in minutes with our easy onboarding process and verify your identity"
    },
    {
      icon: <ArrowDownToLine className="w-10 h-10 text-openfund-green" />,
      title: "Deposit Funds",
      description: "Fund your account with cryptocurrency, bank transfer, or credit/debit card"
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-openfund-green" />,
      title: "Choose Investment",
      description: "Select from commodities, stocks, or cryptocurrencies based on your strategy"
    },
    {
      icon: <ArrowUpCircle className="w-10 h-10 text-openfund-green" />,
      title: "Start Trading",
      description: "Execute trades with our intuitive platform and monitor performance in real-time"
    },
  ];

  return (
    <section className="py-20 bg-openfund-gray-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-openfund-green">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get started with OpenFund in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-openfund-green flex items-center justify-center text-black font-bold">
                {index + 1}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-openfund-green/30 -z-10"></div>
              )}
              
              <div className="card-gradient p-6 rounded-xl border border-openfund-gray-light h-full">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="text-openfund-green font-medium hover:underline inline-flex items-center"
          >
            View detailed documentation
            <ArrowDownToLine className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
