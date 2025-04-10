
import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Sample data - in a real app this would come from an API
const generateChartData = (asset: string, timeframe: string) => {
  // Different patterns based on timeframe
  const dataPoints = 
    timeframe === '1h' ? 60 : 
    timeframe === '24h' ? 24 : 
    timeframe === '7d' ? 7 : 
    timeframe === '30d' ? 30 : 
    timeframe === '90d' ? 90 : 
    365;
  
  let baseValue = 0;
  switch(asset) {
    case 'bitcoin': baseValue = 29000; break;
    case 'ethereum': baseValue = 2000; break;
    case 'tesla': baseValue = 235; break;
    case 'apple': baseValue = 185; break;
    case 'gold': baseValue = 2100; break;
    default: baseValue = 100;
  }
  
  // Generate random-ish data with a general trend based on asset name hash
  let lastValue = baseValue;
  const variance = baseValue * 0.1; // 10% variance
  const seedValue = asset.charCodeAt(0) + asset.charCodeAt(asset.length - 1);
  const trend = (seedValue % 3) - 1; // -1, 0, or 1 (down, sideways, or up)
  
  const data = [];
  for (let i = 0; i < dataPoints; i++) {
    // Random movement with slight trend bias
    const change = (Math.random() - 0.5 + trend * 0.1) * variance;
    lastValue = Math.max(1, lastValue + change);
    
    let label = '';
    if (timeframe === '1h') {
      label = `${i}m`;
    } else if (timeframe === '24h') {
      label = `${i}h`;
    } else if (timeframe === '7d') {
      label = `Day ${i+1}`;
    } else {
      label = `Week ${i+1}`;
    }
    
    data.push({
      name: label,
      value: parseFloat(lastValue.toFixed(2)),
      volume: Math.floor(Math.random() * baseValue * 100)
    });
  }
  
  return data;
};

interface AssetChartProps {
  asset: string;
  timeframe: string;
}

export const AssetChart = ({ asset, timeframe }: AssetChartProps) => {
  const chartData = generateChartData(asset, timeframe);

  return (
    <div className="w-full h-[400px]">
      <ChartContainer
        config={{
          value: {
            label: "Price",
            color: "#00FF00",
          },
          volume: {
            label: "Volume",
            color: "#404040",
          }
        }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FF00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name"
              tickLine={false}
              axisLine={false}
              dy={10}
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#888', fontSize: 12 }}
              domain={['auto', 'auto']}
              dx={-10}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Area 
              type="monotone"
              dataKey="value"
              stroke="#00FF00"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{ r: 6, fill: "#00FF00", strokeWidth: 0 }}
            />
            <Bar 
              dataKey="volume" 
              fill="#404040"
              opacity={0.3}
              barSize={20}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
