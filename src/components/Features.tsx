import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  GanttChartSquare 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Commodities",
      description: "Trade gold, silver, oil, and more with competitive spreads and high liquidity.",
      link: "/trade?view=chart&asset=GC"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Stocks",
      description: "Access global markets with fractional shares and zero commission trading.",
      link: "/trade?asset=tesla"
    },
    {
      icon: <GanttChartSquare className="w-12 h-12 text-primary" />,
      title: "Crypto",
      description: "Buy, sell, and store cryptocurrencies with security and ease.",
      link: "/trade?asset=bitcoin"
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Security",
      description: "Your funds are secured with advanced encryption and multi-layer protection.",
      link: "https://github.com/opendotfund/OpenFund",
      isExternal: true
    }
  ];

  return (
    <section className="py-20 bg-card transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary transition-colors duration-300">Multiple Markets</span>, One Platform
          </h2>
          <p className="text-xl text-muted-foreground transition-colors duration-300">
            Take advantage of opportunities across all asset classes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            feature.isExternal ? (
              <a 
                key={index}
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-gradient p-6 rounded-xl border border-border hover:border-primary transition-all duration-300 block"
              >
                <div className="mb-4 transition-colors duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground transition-colors duration-300">{feature.description}</p>
              </a>
            ) : (
              <Link 
                key={index}
                to={feature.link}
                className="card-gradient p-6 rounded-xl border border-border hover:border-primary transition-all duration-300 block"
              >
                <div className="mb-4 transition-colors duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground transition-colors duration-300">{feature.description}</p>
              </Link>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
