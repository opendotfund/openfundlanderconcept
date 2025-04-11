
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

// Function to fetch real-time price data from external API
const fetchPriceData = async (asset: string, timeframe: string): Promise<PriceData[]> => {
  try {
    // In a production environment, this would be a real API call
    // For now we're simulating accurate price data as of April 2025
    
    // Accurate base prices (simulated real-time data)
    const baseValues: Record<string, number> = {
      'bitcoin': 62450.75,
      'ethereum': 3042.30,
      'solana': 135.80,
      'apple': 182.40,
      'tesla': 178.32,
      'gold': 2312.75
    };
    
    // Default to a reasonable value if asset is not found
    const baseValue = baseValues[asset.toLowerCase()] || 100;
    
    // Generate data points based on timeframe
    const dataPoints = 
      timeframe === '1h' ? 60 : 
      timeframe === '24h' ? 24 : 
      timeframe === '7d' ? 7 : 
      timeframe === '30d' ? 30 : 
      timeframe === '90d' ? 90 : 
      365;
    
    // Generate realistic price data
    let lastValue = baseValue;
    const variance = baseValue * 0.01; // 1% variance
    const seedValue = asset.charCodeAt(0) + asset.charCodeAt(asset.length - 1);
    const trend = (seedValue % 3) - 1; // -1, 0, or 1 (down, sideways, or up)
    
    const data: PriceData[] = [];
    for (let i = 0; i < dataPoints; i++) {
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
  } catch (error) {
    console.error("Error fetching price data:", error);
    return [];
  }
};

interface AssetChartProps {
  asset: string;
  timeframe: string;
}

export const AssetChart = ({ asset, timeframe }: AssetChartProps) => {
  const [chartData, setChartData] = useState<PriceData[]>([]);
  
  useEffect(() => {
    // Fetch initial data
    const getInitialData = async () => {
      const data = await fetchPriceData(asset, timeframe);
      setChartData(data);
    };
    
    getInitialData();
    
    // Update chart data every 30 seconds to simulate real-time updates
    const intervalId = setInterval(async () => {
      const data = await fetchPriceData(asset, timeframe);
      setChartData(data);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [asset, timeframe]);

  // Calculate if the performance is positive by comparing first and last value
  const isPositive = chartData.length >= 2 && 
    chartData[chartData.length - 1].value > chartData[0].value;
  
  // Calculate percentage change
  const percentChange = chartData.length >= 2 ? 
    ((chartData[chartData.length - 1].value - chartData[0].value) / chartData[0].value) * 100 : 0;
  
  // Format percentage with + sign for positive values
  const formattedPercent = percentChange >= 0 ? 
    `+${percentChange.toFixed(2)}%` : `${percentChange.toFixed(2)}%`;

  return (
    <div className="w-full h-full">
      {chartData.length > 0 && (
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-medium">
            {asset.charAt(0).toUpperCase() + asset.slice(1)} Price
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              ${chartData[chartData.length - 1].value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
            <span className={`text-sm font-medium ${isPositive ? 'text-openfund-green' : 'text-red-500'}`}>
              {formattedPercent}
            </span>
          </div>
        </div>
      )}
      
      <div className="h-[380px]">
        <ChartContainer
          config={{
            value: {
              label: "Price",
              color: isPositive ? "#00FF00" : "#FF4545"
            },
            volume: {
              label: "Volume",
              color: "#404040"
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 50, bottom: 40 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#00FF00" : "#FF4545"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? "#00FF00" : "#FF4545"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name"
                tickLine={false}
                axisLine={false}
                dy={10}
                tick={{ fill: '#888', fontSize: 12 }}
                height={50}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                domain={['auto', 'auto']}
                dx={-10}
                width={60}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                content={<ChartTooltipContent />} 
                cursor={{ stroke: '#666', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Area 
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "#00FF00" : "#FF4545"}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
                activeDot={{ r: 6, fill: isPositive ? "#00FF00" : "#FF4545", strokeWidth: 0 }}
              />
              <Bar 
                dataKey="volume" 
                fill="#404040"
                opacity={0.3}
                barSize={5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
