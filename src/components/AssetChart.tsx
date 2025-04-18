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
  className?: string;
}

const fetchPriceData = async (asset: string, timeframe: string, isPortfolio: boolean = false, portfolioName: string = '', portfolioData?: ChartDataPoint[]): Promise<PriceData[]> => {
  try {
    const baseValues: Record<string, number> = {
      'bitcoin': 80000.00,
      'ethereum': 1600.00,
      'solana': 135.80,
      'apple': 182.40,
      'tesla': 178.32,
      'gold': 2312.75,
      'berkshire-hathaway': 700000.00,
      'renaissance-technologies': 130000.00,
      'bridgewater-associates': 235000.00,
      'blackrock-global-allocation': 50000.00,
      'vanguard-500-index': 800000.00,
      'grayscale-bitcoin-trust': 30300.00,
      'pantera-bitcoin-fund': 5100.00,
      'galaxy-digital-holdings': 2500.00,
      'bitwise-10-crypto-index': 1200.00,
      'a16z-crypto-fund': 3100.00,
      'alpha-seekers-1': 342000.00,
      'alpha-seekers-2': 367000.00,
      'alpha-seekers-3': 392000.00,
      'alpha-seekers-4': 417000.00,
      'alpha-seekers-5': 442000.00
    };
    
    const getVolatilityFactor = (asset: string, timeframe: string) => {
      const assetVolatility: Record<string, number> = {
        'bitcoin': 0.015,
        'ethereum': 0.018,
        'solana': 0.022,
        'apple': 0.008,
        'tesla': 0.012,
        'gold': 0.005,
        'berkshire-hathaway': 0.004,
        'renaissance-technologies': 0.006,
        'bridgewater-associates': 0.005,
        'blackrock-global-allocation': 0.004,
        'vanguard-500-index': 0.003,
        'grayscale-bitcoin-trust': 0.02,
        'pantera-bitcoin-fund': 0.018,
        'galaxy-digital-holdings': 0.025,
        'bitwise-10-crypto-index': 0.016,
        'a16z-crypto-fund': 0.014,
        'alpha-seekers-1': 0.02,
        'alpha-seekers-2': 0.022,
        'alpha-seekers-3': 0.024,
        'alpha-seekers-4': 0.026,
        'alpha-seekers-5': 0.028
      };

      const baseVolatility = assetVolatility[asset] || 0.01;
      
      if (timeframe === '1h') return baseVolatility * 0.2;
      if (timeframe === '24h') return baseVolatility * 0.4;
      if (timeframe === '7d') return baseVolatility * 0.6;
      if (timeframe === '30d') return baseVolatility * 0.8;
      if (timeframe === '90d') return baseVolatility;
      return baseVolatility * 1.2;
    };

    const getTrendFactor = (asset: string) => {
      const trends: Record<string, number> = {
        'bitcoin': 0.12,
        'ethereum': 0.08,
        'solana': 0.15,
        'apple': 0.04,
        'tesla': -0.02,
        'gold': 0.02,
        'berkshire-hathaway': 0.03,
        'renaissance-technologies': 0.06,
        'bridgewater-associates': 0.025,
        'blackrock-global-allocation': 0.035,
        'vanguard-500-index': 0.03,
        'grayscale-bitcoin-trust': 0.14,
        'pantera-bitcoin-fund': 0.11,
        'galaxy-digital-holdings': 0.13,
        'bitwise-10-crypto-index': 0.09,
        'a16z-crypto-fund': 0.1,
        'alpha-seekers-1': 0.22,
        'alpha-seekers-2': 0.25,
        'alpha-seekers-3': 0.28,
        'alpha-seekers-4': 0.31,
        'alpha-seekers-5': 0.34
      };
      return trends[asset] || 0;
    };

    const generateDataPoints = (baseValue: number, timeframe: string, asset: string) => {
      const dataPoints = 
        timeframe === '1h' ? 60 : 
        timeframe === '24h' ? 24 : 
        timeframe === '7d' ? 7 : 
        timeframe === '30d' ? 30 : 
        timeframe === '90d' ? 90 : 
        365;

      let lastValue = baseValue;
      const trend = getTrendFactor(asset) / dataPoints;
      const volatility = getVolatilityFactor(asset, timeframe);
      
      const data: PriceData[] = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dataPoints);
      
      for (let i = 0; i < dataPoints; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        
        const dailyCycle = Math.sin(i / 12) * 0.3;
        const weeklyCycle = Math.sin(i / 30) * 0.2;
        const monthlyCycle = Math.sin(i / 90) * 0.15;
        
        const cycleEffect = timeframe === '90d' ? monthlyCycle :
                          (timeframe === '30d' || timeframe === '7d') ? weeklyCycle :
                          dailyCycle;
                          
        const marketSentiment = Math.sin(i / (dataPoints * 0.5)) * 0.2;
        const change = (Math.random() - 0.5 + trend + cycleEffect + marketSentiment) * volatility * lastValue;
        
        lastValue = Math.max(baseValue * 0.7, lastValue + change);
        
        let label = '';
        if (timeframe === '90d') {
          if (i % 15 === 0 || i === dataPoints - 1) {
            label = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }
        } else if (timeframe === '30d') {
          if (i % 7 === 0 || i === dataPoints - 1) {
            label = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }
        } else if (timeframe === '7d') {
          label = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
        } else if (timeframe === '24h') {
          if (i % 2 === 0 || i === dataPoints - 1) {
            label = currentDate.toLocaleTimeString('en-US', { hour: 'numeric' });
          }
        } else if (timeframe === '1h') {
          if (i % 5 === 0 || i === dataPoints - 1) {
            label = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          }
        }
        
        data.push({
          name: label || currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: lastValue,
          volume: Math.floor(Math.random() * lastValue * 0.05)
        });
      }
      
      return data;
    };

    if (isPortfolio) {
      if (portfolioData && portfolioData.length > 0) {
        return portfolioData.map((dataPoint, index) => {
          const date = new Date(dataPoint.date);
          let label = '';
          
          if (timeframe === '90d') {
            if (index % 15 === 0 || index === portfolioData.length - 1) {
              label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
          } else if (timeframe === '30d') {
            if (index % 7 === 0 || index === portfolioData.length - 1) {
              label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
          } else if (timeframe === '7d') {
            label = date.toLocaleDateString('en-US', { weekday: 'short' });
          } else if (timeframe === '24h') {
            if (index % 2 === 0 || index === portfolioData.length - 1) {
              label = date.toLocaleTimeString('en-US', { hour: 'numeric' });
            }
          } else if (timeframe === '1h') {
            if (index % 5 === 0 || index === portfolioData.length - 1) {
              label = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            }
          }
          
          return {
            name: label || date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: dataPoint.value,
            volume: Math.floor(Math.random() * dataPoint.value * 0.05)
          };
        });
      }
      
      let portfolioBaseValue = 0;
      let portfolioVolatility = 0.02;
      let portfolioTrend = 0.2;
      
      if (portfolioName) {
        const normalizedName = portfolioName.toLowerCase().replace(/\s+/g, '-');
        if (baseValues[normalizedName]) {
          portfolioBaseValue = baseValues[normalizedName];
          portfolioVolatility = getVolatilityFactor(normalizedName, timeframe);
          portfolioTrend = getTrendFactor(normalizedName);
        } else if (portfolioName.includes('Alpha Seekers')) {
          const fundNumber = parseInt(portfolioName.split('#')[1] || '1');
          portfolioBaseValue = 342000 + fundNumber * 25000;
          portfolioVolatility = 0.02 + (fundNumber * 0.002);
          portfolioTrend = 0.22 + (fundNumber * 0.03);
        } else {
          portfolioBaseValue = 250000;
          portfolioVolatility = 0.015;
          portfolioTrend = 0.15;
        }
      } else {
        portfolioBaseValue = 250000;
        portfolioVolatility = 0.015;
        portfolioTrend = 0.15;
      }
      
      const dataPoints = 
        timeframe === '1h' ? 60 : 
        timeframe === '24h' ? 24 : 
        timeframe === '7d' ? 7 : 
        timeframe === '30d' ? 30 : 
        timeframe === '90d' ? 90 : 
        365;

      let lastValue = portfolioBaseValue;
      const trend = portfolioTrend / dataPoints;
      const volatility = portfolioVolatility;
      
      const data: PriceData[] = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dataPoints);
      
      for (let i = 0; i < dataPoints; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        
        const dailyCycle = Math.sin(i / 12) * 0.3;
        const weeklyCycle = Math.sin(i / 30) * 0.2;
        const monthlyCycle = Math.sin(i / 90) * 0.15;
        
        const cycleEffect = timeframe === '90d' ? monthlyCycle :
                          (timeframe === '30d' || timeframe === '7d') ? weeklyCycle :
                          dailyCycle;
                          
        const marketSentiment = Math.sin(i / (dataPoints * 0.5)) * 0.2;
        const change = (Math.random() - 0.5 + trend + cycleEffect + marketSentiment) * volatility * lastValue;
        
        lastValue = Math.max(portfolioBaseValue * 0.7, lastValue + change);
        
        let label = '';
        if (timeframe === '90d') {
          if (i % 15 === 0 || i === dataPoints - 1) {
            label = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }
        } else if (timeframe === '30d') {
          if (i % 7 === 0 || i === dataPoints - 1) {
            label = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }
        } else if (timeframe === '7d') {
          label = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
        } else if (timeframe === '24h') {
          if (i % 2 === 0 || i === dataPoints - 1) {
            label = currentDate.toLocaleTimeString('en-US', { hour: 'numeric' });
          }
        } else if (timeframe === '1h') {
          if (i % 5 === 0 || i === dataPoints - 1) {
            label = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          }
        }
        
        data.push({
          name: label || currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: lastValue,
          volume: Math.floor(Math.random() * lastValue * 0.05)
        });
      }
      
      return data;
    } else {
      const normalizedAsset = asset.toLowerCase().replace(/\s+/g, '-');
      const baseValue = baseValues[normalizedAsset] || 100;
      return generateDataPoints(baseValue, timeframe, normalizedAsset);
    }
  } catch (error) {
    console.error("Error fetching price data:", error);
    return [];
  }
};

export const AssetChart = ({ asset = 'bitcoin', timeframe, isPortfolio = false, portfolioName = '', portfolioData, className }: AssetChartProps) => {
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
  
  // Adjust margins to ensure X-axis labels have enough space
  const margins = isMobile 
    ? { top: 10, right: 10, left: 30, bottom: 40 }  // Increased bottom margin for mobile
    : { top: 20, right: 20, left: 50, bottom: 40 };

  return (
    <div className={`w-full h-full ${className || ''}`}>
      {chartData.length > 0 && (
        <div className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center justify-between'} mb-3 px-4`}>
          <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium`}>
            {displayName}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
              ${chartData[chartData.length - 1].value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium ${isPositive ? 'text-primary' : 'text-red-500'}`}>
              {formattedPercent}
            </span>
          </div>
        </div>
      )}
      
      <div className="w-full h-[calc(100%-70px)]">
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
                axisLine={true}
                dy={isMobile ? 15 : 15}
                tick={{ 
                  fill: isLightMode ? '#666' : '#888', 
                  fontSize: isMobile ? 10 : 12
                }}
                height={isMobile ? 50 : 50}
                padding={{ left: 10, right: 10 }}
                interval={isMobile ? "preserveEnd" : "preserveEnd"}
                tickMargin={isMobile ? 20 : 15}
                minTickGap={isMobile ? 20 : 50}
                allowDataOverflow={false}
                angle={isMobile ? -45 : 0}  // Rotate labels on mobile for better readability
              />
              <YAxis 
                tickLine={false}
                axisLine={true}
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
                activeDot={{ r: isMobile ? 4 : 6, fill: chartColor, strokeWidth: 0 }}
              />
              <Bar 
                dataKey="volume" 
                fill={isLightMode ? "#D1D5DB" : "#404040"}
                opacity={0.3}
                barSize={isMobile ? 2 : 5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
