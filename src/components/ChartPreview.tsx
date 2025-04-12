import React from 'react';
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

// Berkshire Hathaway Class A accurate sample data for the chart (BRK.A)
const data = [{
  date: '1 Jan',
  price: 542000
}, {
  date: '15 Jan',
  price: 547000
}, {
  date: '1 Feb',
  price: 551200
}, {
  date: '15 Feb',
  price: 558500
}, {
  date: '1 Mar',
  price: 562100
}, {
  date: '15 Mar',
  price: 564300
}, {
  date: '1 Apr',
  price: 566400
}, {
  date: '15 Apr',
  price: 567800
}, {
  date: '1 May',
  price: 568500
}, {
  date: '15 May',
  price: 569200
}, {
  date: '1 Jun',
  price: 570100
}, {
  date: '15 Jun',
  price: 570900
}, {
  date: '1 Jul',
  price: 572000
}, {
  date: '15 Jul',
  price: 567870
}, {
  date: '1 Aug',
  price: 567870
}];
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="bg-card p-3 border border-border rounded-md">
        <p className="text-sm">{`${label}: $${payload[0].value.toLocaleString()}`}</p>
      </div>;
  }
  return null;
};
const ChartPreview = () => {
  const isMobile = useIsMobile();
  return <section className="py-10 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Advanced <span className="text-primary">Trading Tools</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Access professional-grade charts, analysis tools and the industries leading trading tools. OpenFund allows fund managers to use their favourite trading tools when managing a fund.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="green-glow order-2 lg:order-1">
            <Card className="bg-card border-primary/20 overflow-hidden h-[250px] md:h-[320px]">
              <div className="p-3 md:p-4 h-full">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="h-2 md:h-3 w-2 md:w-3 rounded-full bg-primary mr-2"></div>
                    <span className="font-bold text-sm md:text-base">BRK.A</span>
                  </div>
                  <span className="text-primary text-sm md:text-base">+4.8%</span>
                </div>
                <ResponsiveContainer width="100%" height="90%">
                  <AreaChart data={data} margin={isMobile ? {
                  top: 5,
                  right: 5,
                  left: 0,
                  bottom: 5
                } : {
                  top: 5,
                  right: 20,
                  left: 0,
                  bottom: 25
                }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{
                    fill: 'var(--color-text-subdued)',
                    fontSize: isMobile ? 9 : 11
                  }} dy={isMobile ? 5 : 15} height={isMobile ? 25 : 40} tickMargin={isMobile ? 2 : 8} interval={isMobile ? 2 : 1} />
                    <YAxis tick={{
                    fill: 'var(--color-text-subdued)',
                    fontSize: isMobile ? 10 : 12
                  }} tickFormatter={value => `$${value / 1000}k`} width={isMobile ? 40 : 50} tickCount={6} domain={[540000, 575000]} />
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="price" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            <div className="bg-card p-4 md:p-6 rounded-xl border border-border">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Dominate Every Market</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                Get instant access to every major market.
              </p>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
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
                  <span className="text-primary">$2,380 <span className="text-xs">+0.5%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>BRK.A</span>
                  <span className="text-primary">$567,870 <span className="text-xs">+4.8%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>AAPL</span>
                  <span className="text-primary">$192.75 <span className="text-xs">+1.2%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>TSLA</span>
                  <span className="text-primary">$180.05 <span className="text-xs">+3.7%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>SPY</span>
                  <span className="text-primary">$515.30 <span className="text-xs">+0.8%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>OIL</span>
                  <span className="text-primary">$78.65 <span className="text-xs">-0.3%</span></span>
                </li>
                <li className="flex justify-between">
                  <span>EUR/USD</span>
                  <span className="text-primary">1.0740 <span className="text-xs">+0.1%</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ChartPreview;
