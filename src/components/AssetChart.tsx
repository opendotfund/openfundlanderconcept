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

interface ChartDataPoint {
  date: string;
  value: number;
}

interface AssetChartProps {
  asset?: string;
  timeframe: string;
  isPortfolio?: boolean;
  portfolioName?: string;
  portfolioData?: ChartDataPoint[];
}

// Function to fetch price data for assets or portfolio
const fetchPriceData = async (asset: string, timeframe: string, isPortfolio: boolean = false, portfolioName: string = '', portfolioData?: ChartDataPoint[]): Promise<PriceData[]> => {
  try {
    // In a production environment, this would be a real API call
    // For now we're simulating accurate price data as of April 2025
    
    // Accurate base prices (simulated real-time data)
    const baseValues: Record<string, number> = {
      'bitcoin': 80000.00,
      'ethereum': 1600.00,
      'solana': 135.80,
      'apple': 182.40,
      'tesla': 178.32,
      'gold': 2312.75
    };
    
    // For portfolio data
    if (isPortfolio) {
      // If portfolio data is provided, use that instead of generating random data
      if (portfolioData && portfolioData.length > 0) {
        return portfolioData.map((dataPoint, index) => ({
          name: dataPoint.date,
          value: dataPoint.value,
          volume: Math.floor(Math.random() * dataPoint.value * 0.05) // Generate random volume based on value
        }));
      }
      
      // Portfolio starting value based on portfolio name for consistency
      const portfolioBaseValue = portfolioName === "Alpha Seekers #1" ? 1577892 : 250000;
      
      // Generate data points based on timeframe
      const dataPoints = 
        timeframe === '1h' ? 60 : 
        timeframe === '24h' ? 24 : 
        timeframe === '7d' ? 7 : 
        timeframe === '30d' ? 30 : 
        timeframe === '90d' ? 90 : 
        365;
      
      // Generate realistic portfolio performance data
      let lastValue = portfolioBaseValue;
      // For fund performance, we use a smaller variance
      const variance = portfolioBaseValue * 0.005; // 0.5% variance
      // Seed value for consistent random generation
      const seedValue = portfolioName.length;
      // Slightly trending up for the Alpha Seekers portfolio
      const trend = 0.15; 
      
      const data: PriceData[] = [];
      for (let i = 0; i < dataPoints; i++) {
        const change = (Math.random() - 0.4 + trend) * variance;
        lastValue = Math.max(portfolioBaseValue * 0.85, lastValue + change);
        
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
          volume: Math.floor(Math.random() * portfolioBaseValue * 0.05)
        });
      }
      
      // Reverse the data so it displays in chronological order
      return data.reverse();
    } else {
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
    }
  } catch (error) {
    console.error("Error fetching price data:", error);
    return [];
  }
};

export const AssetChart = ({ asset = 'bitcoin', timeframe, isPortfolio = false, portfolioName = '', portfolioData }: AssetChartProps) => {
  const [chartData, setChartData] = useState<PriceData[]>([]);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if we're in light or dark mode
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsLightMode(!isDark);
    };
    
    // Initial check
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    // Fetch initial data
    const getInitialData = async () => {
      const data = await fetchPriceData(asset, timeframe, isPortfolio, portfolioName, portfolioData);
      setChartData(data);
    };
    
    getInitialData();
    
    // Update chart data every 30 seconds to simulate real-time updates
    const intervalId = setInterval(async () => {
      const data = await fetchPriceData(asset, timeframe, isPortfolio, portfolioName, portfolioData);
      setChartData(data);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [asset, timeframe, isPortfolio, portfolioName, portfolioData]);

  // Calculate if the performance is positive by comparing first and last value
  const isPositive = chartData.length >= 2 && 
    chartData[chartData.length - 1].value > chartData[0].value;
  
  // Calculate percentage change
  const percentChange = chartData.length >= 2 ? 
    ((chartData[chartData.length - 1].value - chartData[0].value) / chartData[0].value) * 100 : 0;
  
  // Format percentage with + sign for positive values
  const formattedPercent = percentChange >= 0 ? 
    `+${percentChange.toFixed(2)}%` : `${percentChange.toFixed(2)}%`;

  const displayName = isPortfolio ? 'Portfolio Value' : `${asset.charAt(0).toUpperCase() + asset.slice(1)} Price`;
  
  // Colors based on theme and trend
  const chartColor = isLightMode 
    ? (isPositive ? "#0EA5E9" : "#FF4545") // blue for up, red for down in light mode
    : (isPositive ? "#00FF00" : "#FF4545"); // green for up, red for down in dark mode
    
  return (
    <div className="w-full h-full">
      {chartData.length > 0 && (
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-medium">
            {displayName}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              ${chartData[chartData.length - 1].value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
            <span className={`text-sm font-medium ${isPositive ? 'text-primary' : 'text-red-500'}`}>
              {formattedPercent}
            </span>
          </div>
        </div>
      )}
      
      <div className="h-[380px]">
        <ChartContainer
          config={{
            value: {
              label: isPortfolio ? "Portfolio Value" : "Price",
              color: chartColor
            },
            volume: {
              label: "Volume",
              color: isLightMode ? "#D1D5DB" : "#404040" // lighter color in light mode
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 50, bottom: 60 }} // Increased bottom margin to fix X-axis labels
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name"
                tickLine={false}
                axisLine={false}
                dy={30} // Move labels further down from the axis
                tick={{ fill: isLightMode ? '#666' : '#888', fontSize: 12 }}
                height={50}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: isLightMode ? '#666' : '#888', fontSize: 12 }}
                domain={['auto', 'auto']}
                dx={-10}
                width={60}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                content={<ChartTooltipContent />} 
                cursor={{ stroke: isLightMode ? '#999' : '#666', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Area 
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
                activeDot={{ r: 6, fill: chartColor, strokeWidth: 0 }}
              />
              <Bar 
                dataKey="volume" 
                fill={isLightMode ? "#D1D5DB" : "#404040"} // lighter color in light mode
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
