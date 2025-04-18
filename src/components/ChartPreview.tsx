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

  return (
    <Card className="bg-card border-primary/20 overflow-hidden h-[200px] md:h-[320px]">
      <div className="p-2 md:p-4 h-full">
        <div className="flex justify-between items-center mb-1 md:mb-2">
          <div className="flex items-center">
            <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-primary mr-1 md:mr-2"></div>
            <span className="font-bold text-xs md:text-base">BRK.A</span>
          </div>
          <span className="text-primary text-xs md:text-base">+4.8%</span>
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
            <XAxis 
              dataKey="date" 
              tick={{
                fill: 'var(--color-text-subdued)',
                fontSize: isMobile ? 8 : 11
              }} 
              dy={isMobile ? 3 : 15} 
              height={isMobile ? 20 : 40} 
              tickMargin={isMobile ? 2 : 8} 
              interval={isMobile ? 3 : 1} 
            />
            <YAxis 
              tick={{
                fill: 'var(--color-text-subdued)',
                fontSize: isMobile ? 8 : 12
              }} 
              tickFormatter={value => `$${value / 1000}k`} 
              width={isMobile ? 35 : 50} 
              tickCount={isMobile ? 4 : 6} 
              domain={[540000, 575000]} 
            />
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--color-border)" 
              vertical={!isMobile}
            />
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
  );
};
export default ChartPreview;
