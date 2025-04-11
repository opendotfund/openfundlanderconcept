
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// S&P 500 sample data for the chart
const data = [
  { date: '1 Jan', price: 4769 },
  { date: '15 Jan', price: 4783 },
  { date: '1 Feb', price: 4958 },
  { date: '15 Feb', price: 5029 },
  { date: '1 Mar', price: 5123 },
  { date: '15 Mar', price: 5234 },
  { date: '1 Apr', price: 5202 },
  { date: '15 Apr', price: 5010 },
  { date: '1 May', price: 5035 },
  { date: '15 May', price: 5145 },
  { date: '1 Jun', price: 5218 },
  { date: '15 Jun', price: 5431 },
  { date: '1 Jul', price: 5472 },
  { date: '15 Jul', price: 5555 },
  { date: '1 Aug', price: 5628 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border rounded-md">
        <p className="text-sm">{`${label}: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ChartPreview = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced <span className="text-primary">Trading Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access professional-grade charts, analysis tools, and real-time market data to make informed decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="green-glow">
            <Card className="bg-card border-primary/20 overflow-hidden h-80">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                    <span className="font-bold">S&P 500</span>
                  </div>
                  <span className="text-primary">+18.2%</span>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart
                    data={data}
                    margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
                  >
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: 'var(--color-text-subdued)' }} 
                      dy={10} // Move the x-axis labels down
                    />
                    <YAxis tick={{ fill: 'var(--color-text-subdued)' }} />
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="var(--color-primary)" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-2xl font-bold mb-4">Dominate Every Market</h3>
              <p className="text-muted-foreground mb-4">
                Get instant access to every major market with millisecond-precision data feeds
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span>BTC/USD</span>
                  <span className="text-primary">$80,000 <span className="text-xs">+2.4%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>ETH/USD</span>
                  <span className="text-primary">$1,600 <span className="text-xs">+1.8%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>GOLD</span>
                  <span className="text-primary">$2,331 <span className="text-xs">+0.5%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>S&P 500</span>
                  <span className="text-primary">$5,628 <span className="text-xs">+18.2%</span></span>
                </li>
              </ul>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-xl border border-border">
                <h4 className="font-medium">Trading Volume</h4>
                <p className="text-primary text-xl font-bold">$12.4B</p>
                <p className="text-xs text-muted-foreground">24h change</p>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border">
                <h4 className="font-medium">Active Traders</h4>
                <p className="text-primary text-xl font-bold">241K+</p>
                <p className="text-xs text-muted-foreground">Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartPreview;
