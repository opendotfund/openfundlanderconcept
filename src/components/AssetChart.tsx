
import React, { useEffect, useState } from 'react';
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

interface PriceData {
  name: string;
  value: number;
  volume: number;
}

// Updated function to generate more accurate and consistent price data
const generateChartData = (asset: string, timeframe: string): PriceData[] => {
  // Different patterns based on timeframe
  const dataPoints = 
    timeframe === '1h' ? 60 : 
    timeframe === '24h' ? 24 : 
    timeframe === '7d' ? 7 : 
    timeframe === '30d' ? 30 : 
    timeframe === '90d' ? 90 : 
    365;
  
  // More accurate base prices as of April 2025 (using more realistic values)
  const baseValues: Record<string, number> = {
    'bitcoin': 67250.45,
    'ethereum': 3245.80,
    'solana': 147.25,
    'apple': 182.40,
    'tesla': 178.32,
    'gold': 2312.75
  };
  
  const baseValue = baseValues[asset.toLowerCase()] || 100;
  
  // Generate random-ish data with a general trend based on asset name
  let lastValue = baseValue;
  // Reduce variance for more realistic charts - smaller percentage of price
  const variance = baseValue * 0.02; // 2% variance
  const seedValue = asset.charCodeAt(0) + asset.charCodeAt(asset.length - 1);
  const trend = (seedValue % 3) - 1; // -1, 0, or 1 (down, sideways, or up)
  
  const data: PriceData[] = [];
  for (let i = 0; i < dataPoints; i++) {
    // Random movement with slight trend bias
    const change = (Math.random() - 0.5 + trend * 0.1) * variance;
    lastValue = Math.max(1, lastValue + change);
    
    let label = '';
    if (timeframe === '1h') {
      label = `${59-i}m`;
    } else if (timeframe === '24h') {
      label = `${23-i}h`;
    } else if (timeframe === '7d') {
      label = `Day ${7-i}`;
    } else if (timeframe === '30d') {
      label = `Week ${Math.ceil((30-i)/7)}`;
    } else {
      label = `Week ${Math.ceil((90-i)/7)}`;
    }
    
    data.push({
      name: label,
      value: parseFloat(lastValue.toFixed(2)),
      volume: Math.floor(Math.random() * baseValue * 100)
    });
  }
  
  // Reverse the data so it displays in chronological order
  return data.reverse();
};

interface AssetChartProps {
  asset: string;
  timeframe: string;
}

export const AssetChart = ({ asset, timeframe }: AssetChartProps) => {
  const [chartData, setChartData] = useState<PriceData[]>([]);
  
  useEffect(() => {
    setChartData(generateChartData(asset, timeframe));
    
    // Update chart data every 30 seconds to simulate real-time updates
    const intervalId = setInterval(() => {
      setChartData(generateChartData(asset, timeframe));
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [asset, timeframe]);

  return (
    <div className="w-full h-[400px]"> {/* Increased height from 300px to 400px */}
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
        <ResponsiveContainer width="100%" height={400}> {/* Increased height from 300px to 400px */}
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 50, bottom: 40 }} {/* Increased left margin from 30 to 50, bottom from 20 to 40 */}
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
              dy={20} {/* Increased from 10 to 20 for better spacing */}
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#888', fontSize: 12 }}
              domain={['auto', 'auto']}
              dx={-15} {/* Adjusted from -10 to -15 */}
              width={70} {/* Increased from 60 to 70 */}
              tickFormatter={(value) => `$${value.toLocaleString()}`} {/* Format with dollar sign and commas */}
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
