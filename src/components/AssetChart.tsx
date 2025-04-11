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
import { useIsMobile } from '@/hooks/use-mobile';

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

const fetchPriceData = async (asset: string, timeframe: string, isPortfolio: boolean = false, portfolioName: string = '', portfolioData?: ChartDataPoint[]): Promise<PriceData[]> => {
  try {
    const baseValues: Record<string, number> = {
      'bitcoin': 80000.00,
      'ethereum': 1600.00,
      'solana': 135.80,
      'apple': 182.40,
      'tesla': 178.32,
      'gold': 2312.75
    };
    
    if (isPortfolio) {
      if (portfolioData && portfolioData.length > 0 && timeframe === '90d') {
        return portfolioData.map((dataPoint, index) => ({
          name: dataPoint.date,
          value: dataPoint.value,
          volume: Math.floor(Math.random() * dataPoint.value * 0.05)
        }));
      }
      
      const portfolioBaseValue = portfolioName === "Alpha Seekers #1" ? 1577892 : 250000;
      const endValue = portfolioBaseValue;
      
      const dataPoints = 
        timeframe === '1h' ? 60 : 
        timeframe === '24h' ? 24 : 
        timeframe === '7d' ? 7 : 
        timeframe === '30d' ? 30 : 
        timeframe === '90d' ? 90 : 
        365;
      
      let lastValue = portfolioBaseValue * 0.8;
      const targetValue = portfolioBaseValue;
      
      const getVolatilityFactor = () => {
        if (timeframe === '1h') return 0.0005;
        if (timeframe === '24h') return 0.001;
        if (timeframe === '7d') return 0.003;
        if (timeframe === '30d') return 0.004;
        if (timeframe === '90d') return 0.005;
        return 0.006;
      };
      
      const volatilityFactor = getVolatilityFactor();
      const variance = portfolioBaseValue * volatilityFactor;
      
      const seedValue = portfolioName.length;
      
      const getTrendFactor = () => {
        if (timeframe === '1h') {
          return [0.4, -0.1, 0.3, -0.1, 0.3];
        } else if (timeframe === '24h') {
          return [0.4, 0.3, -0.1, 0.2, -0.1, 0.2];
        } else if (timeframe === '7d') {
          return [0.2, 0.4, 0.3, -0.1, 0.2, -0.1, 0.3];
        } else {
          return [0.25, 0.2, -0.1, 0.15, -0.05, 0.2];
        }
      };
      
      const trendFactors = getTrendFactor();
      
      const growthNeeded = targetValue - lastValue;
      const averageGrowthPerPoint = growthNeeded / dataPoints;
      
      const data: PriceData[] = [];
      for (let i = 0; i < dataPoints; i++) {
        const trendIndex = i % trendFactors.length;
        const trendFactor = trendFactors[trendIndex];
        
        const cycle = Math.sin(i / (dataPoints * 0.2)) * 0.1;
        
        const baseChange = averageGrowthPerPoint * (1 + (Math.random() * 0.5));
        
        const change = baseChange + (Math.random() - 0.4 + trendFactor + cycle) * variance;
        
        const finalChange = Math.random() > 0.3 ? Math.abs(change) : -Math.abs(change) * 0.5;
        
        lastValue = Math.max(portfolioBaseValue * 0.7, lastValue + finalChange);
        
        if (i === dataPoints - 1) {
          lastValue = endValue;
        }
        
        let label = '';
        if (timeframe === '1h') {
          label = `${59-i}m`;
        } else if (timeframe === '24h') {
          label = `${23-i}h`;
        } else if (timeframe === '7d') {
          label = `D${7-i}`;
        } else if (timeframe === '30d') {
          label = `W${Math.ceil((30-i)/7)}`;
        } else if (timeframe === '90d') {
          const weekNum = Math.floor((90-i)/7);
          if (i % 7 === 0) {
            label = `W${weekNum}`;
          } else {
            label = '';
          }
        } else {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const monthNum = Math.floor((365-i)/30) % 12;
          if (i % 30 === 0) {
            label = monthNames[monthNum];
          } else {
            label = '';
          }
        }
        
        data.push({
          name: label,
          value: parseFloat(lastValue.toFixed(2)),
          volume: Math.floor(Math.random() * portfolioBaseValue * 0.05)
        });
      }
      
      return data.reverse();
    } else {
      const baseValue = baseValues[asset.toLowerCase()] || 100;
      
      const dataPoints = 
        timeframe === '1h' ? 60 : 
        timeframe === '24h' ? 24 : 
        timeframe === '7d' ? 7 : 
        timeframe === '30d' ? 30 : 
        timeframe === '90d' ? 90 : 
        365;
      
      let lastValue = baseValue;
      
      const getVolatilityFactor = () => {
        if (timeframe === '1h') return 0.0008;
        if (timeframe === '24h') return 0.002;
        if (timeframe === '7d') return 0.004;
        if (timeframe === '30d') return 0.006;
        if (timeframe === '90d') return 0.008;
        return 0.01;
      };
      
      const volatilityFactor = getVolatilityFactor();
      const variance = baseValue * volatilityFactor;
      
      const assetTrend = () => {
        if (asset.toLowerCase() === 'bitcoin') return 0.08;
        if (asset.toLowerCase() === 'ethereum') return 0.05;
        if (asset.toLowerCase() === 'solana') return 0.1;
        if (asset.toLowerCase() === 'tesla') return -0.02;
        return 0;
      };
      
      const trend = assetTrend() / dataPoints;
      
      const data: PriceData[] = [];
      for (let i = 0; i < dataPoints; i++) {
        const dailyCycle = Math.sin(i / 12) * 0.3;
        const weeklyCycle = Math.sin(i / 30) * 0.2;
        
        const cycleEffect = (timeframe === '1h' || timeframe === '24h') ? dailyCycle : weeklyCycle;
        const change = (Math.random() - 0.5 + trend + cycleEffect * volatilityFactor) * variance;
        lastValue = Math.max(1, lastValue + change);
        
        let label = '';
        if (timeframe === '1h') {
          if (i % 5 === 0) label = `${59-i}m`;
        } else if (timeframe === '24h') {
          if (i % 3 === 0) label = `${23-i}h`;
        } else if (timeframe === '7d') {
          label = `D${7-i}`;
        } else if (timeframe === '30d') {
          if (i % 7 === 0) label = `W${Math.ceil((30-i)/7)}`;
        } else if (timeframe === '90d') {
          const weekNum = Math.floor((90-i)/7);
          if (i % 7 === 0) {
            label = `W${weekNum}`;
          }
        } else {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const monthNum = Math.floor((365-i)/30) % 12;
          if (i % 30 === 0) {
            label = monthNames[monthNum];
          }
        }
        
        data.push({
          name: label,
          value: parseFloat(lastValue.toFixed(2)),
          volume: Math.floor(Math.random() * baseValue * 100 * (1 + Math.sin(i/10) * 0.3))
        });
      }
      
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
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsLightMode(!isDark);
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const getInitialData = async () => {
      const data = await fetchPriceData(asset, timeframe, isPortfolio, portfolioName, portfolioData);
      setChartData(data);
    };
    
    getInitialData();
    
    const intervalId = setInterval(async () => {
      const data = await fetchPriceData(asset, timeframe, isPortfolio, portfolioName, portfolioData);
      setChartData(data);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [asset, timeframe, isPortfolio, portfolioName, portfolioData]);

  const isPositive = chartData.length >= 2 && 
    chartData[chartData.length - 1].value > chartData[0].value;
  
  const percentChange = chartData.length >= 2 ? 
    ((chartData[chartData.length - 1].value - chartData[0].value) / chartData[0].value) * 100 : 0;
  
  const formattedPercent = percentChange >= 0 ? 
    `+${percentChange.toFixed(2)}%` : `${percentChange.toFixed(2)}%`;

  const displayName = isPortfolio ? 'Portfolio Value' : `${asset.charAt(0).toUpperCase() + asset.slice(1)} Price`;
  
  const chartColor = isLightMode 
    ? (isPositive ? "#0EA5E9" : "#FF4545")
    : (isPositive ? "#00FF00" : "#FF4545");
  
  const chartHeight = isMobile ? '220px' : '360px';
  
  const margins = isMobile 
    ? { top: 5, right: 5, left: 20, bottom: 25 }
    : { top: 10, right: 10, left: 50, bottom: 30 };
  
  const formatXAxisTick = (value: string) => {
    return value;
  };

  const getTickInterval = () => {
    if (isMobile) {
      if (timeframe === '1h') return 15;
      if (timeframe === '24h') return 6;
      if (timeframe === '7d') return 2;
      if (timeframe === '30d') return 10;
      if (timeframe === '90d') return 21;
      return 90;
    } else {
      if (timeframe === '1h') return 10;
      if (timeframe === '24h') return 4;
      if (timeframe === '7d') return 1;
      if (timeframe === '30d') return 7;
      if (timeframe === '90d') return 14;
      return 60;
    }
  };

  return (
    <div className="w-full h-full">
      {chartData.length > 0 && (
        <div className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center justify-between'} mb-2`}>
          <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium`}>
            {displayName}
          </div>
          <div className="flex items-center gap-2">
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
              ${chartData[chartData.length - 1].value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium ${isPositive ? 'text-primary' : 'text-red-500'}`}>
              {formattedPercent}
            </span>
          </div>
        </div>
      )}
      
      <div style={{ height: chartHeight }} className="mb-0">
        <ChartContainer
          config={{
            value: {
              label: isPortfolio ? "Portfolio Value" : "Price",
              color: chartColor
            },
            volume: {
              label: "Volume",
              color: isLightMode ? "#D1D5DB" : "#404040"
            }
          }}
          className="pb-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={margins}
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
                dy={isMobile ? 10 : 12}
                tick={{ 
                  fill: isLightMode ? '#666' : '#888', 
                  fontSize: isMobile ? 10 : 12
                }}
                height={isMobile ? 35 : 40}
                padding={{ left: 5, right: 5 }}
                interval={getTickInterval()}
                tickFormatter={formatXAxisTick}
                tickMargin={5}
                minTickGap={5}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ 
                  fill: isLightMode ? '#666' : '#888', 
                  fontSize: isMobile ? 10 : 12 
                }}
                domain={['auto', 'auto']}
                dx={isMobile ? -5 : -10}
                width={isMobile ? 40 : 60}
                tickFormatter={(value) => isMobile 
                  ? value >= 1000 
                    ? `$${(value/1000).toFixed(0)}K` 
                    : `$${value}`
                  : `$${value.toLocaleString()}`
                }
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
                fill={isLightMode ? "#D1D5DB" : "#404040"}
                opacity={0.3}
                barSize={isMobile ? 3 : 5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
