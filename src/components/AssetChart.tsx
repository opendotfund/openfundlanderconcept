
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
import { 
  getAssetHistoricalData, 
  getAssetPrice, 
  subscribeToAssetUpdates, 
  unsubscribeFromAssetUpdates,
  formatPrice,
  formatCurrency,
  formatLargeNumber,
  AssetPrice,
  PriceDataPoint
} from '@/services/assetService';

interface AssetChartProps {
  asset?: string;
  timeframe: string;
  isPortfolio?: boolean;
  portfolioName?: string;
  portfolioData?: { date: string; value: number }[];
}

interface FormattedChartData {
  name: string;
  value: number;
  volume: number;
}

export const AssetChart = ({ asset = 'bitcoin', timeframe, isPortfolio = false, portfolioName = '', portfolioData }: AssetChartProps) => {
  const [chartData, setChartData] = useState<FormattedChartData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    let subscriptionId: string | null = null;
    
    const fetchInitialData = async () => {
      setIsLoading(true);
      
      try {
        if (isPortfolio && portfolioData) {
          // For portfolio data, use the provided data
          const formattedData = portfolioData.map((item) => ({
            name: item.date,
            value: item.value,
            volume: Math.floor(Math.random() * item.value * 0.05)
          }));
          
          setChartData(formattedData);
          setCurrentPrice(formattedData[formattedData.length - 1]?.value || 0);
          
          const firstPrice = formattedData[0]?.value || 0;
          const lastPrice = formattedData[formattedData.length - 1]?.value || 0;
          const changePct = firstPrice > 0 ? ((lastPrice - firstPrice) / firstPrice) * 100 : 0;
          setPriceChange(changePct);
        } else {
          // For regular assets, fetch from our service
          const priceData = await getAssetPrice(asset);
          setCurrentPrice(priceData.price);
          setPriceChange(priceData.change24h);
          
          const historicalData = await getAssetHistoricalData(asset, timeframe);
          
          // Format historical data for the chart
          const formattedData = formatChartData(historicalData.prices, timeframe);
          setChartData(formattedData);
          
          // Subscribe to real-time updates
          subscriptionId = subscribeToAssetUpdates(asset, (updatedPrice) => {
            setCurrentPrice(updatedPrice.price);
            setPriceChange(updatedPrice.change24h);
          });
        }
      } catch (error) {
        console.error("Error fetching asset data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
    
    // Cleanup subscription
    return () => {
      if (subscriptionId) {
        unsubscribeFromAssetUpdates(subscriptionId);
      }
    };
  }, [asset, timeframe, isPortfolio, portfolioName, portfolioData]);
  
  // Format timestamp to appropriate label based on timeframe
  const formatTimestampForTimeframe = (timestamp: number, timeframe: string, index: number, total: number): string => {
    const date = new Date(timestamp);
    
    // For sparse labeling, only show some labels based on position
    const showLabel = () => {
      if (total <= 12) return true;
      if (total <= 24) return index % 2 === 0 || index === total - 1;
      if (total <= 60) return index % 5 === 0 || index === total - 1;
      return index % 10 === 0 || index === total - 1;
    };
    
    if (!showLabel()) return '';
    
    switch (timeframe) {
      case '1h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '24h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '7d':
        return date.toLocaleDateString([], { weekday: 'short' });
      case '30d':
      case '90d':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      case '12m':
        return date.toLocaleDateString([], { month: 'short', year: '2-digit' });
      default:
        return date.toLocaleDateString();
    }
  };
  
  // Format raw price data to chart format
  const formatChartData = (priceData: PriceDataPoint[], timeframe: string): FormattedChartData[] => {
    if (!priceData || priceData.length === 0) return [];
    
    return priceData.map((point, index) => ({
      name: formatTimestampForTimeframe(point.timestamp, timeframe, index, priceData.length),
      value: point.price,
      volume: point.volume || Math.floor(point.price * 1000 * (1 + Math.sin(index/10) * 0.3))
    }));
  };
  
  const isPositive = priceChange >= 0;
  
  const formattedPercent = isPositive ? 
    `+${priceChange.toFixed(2)}%` : `${priceChange.toFixed(2)}%`;

  const displayName = isPortfolio ? 'Portfolio Value' : `${asset.charAt(0).toUpperCase() + asset.slice(1)} Price`;
  
  const chartColor = isLightMode 
    ? (isPositive ? "#0EA5E9" : "#FF4545")
    : (isPositive ? "#00FF00" : "#FF4545");
  
  const chartHeight = isMobile ? '220px' : '360px';
  
  // Increase bottom margin for better label visibility
  const margins = isMobile 
    ? { top: 5, right: 5, left: 20, bottom: 45 }
    : { top: 10, right: 10, left: 50, bottom: 50 };

  return (
    <div className="w-full h-full">
      <div className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center justify-between'} mb-2`}>
        <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium`}>
          {displayName}
        </div>
        <div className="flex items-center gap-2">
          <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
            {isLoading ? 'Loading...' : (
              isPortfolio ?
                formatCurrency(currentPrice) :
                `$${formatPrice(currentPrice)}`
            )}
          </span>
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium ${isPositive ? 'text-primary' : 'text-red-500'}`}>
            {formattedPercent}
          </span>
        </div>
      </div>
      
      <div style={{ height: chartHeight }}>
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
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
                  dy={isMobile ? 15 : 18}
                  tick={{ 
                    fill: isLightMode ? '#666' : '#888', 
                    fontSize: isMobile ? 9 : 11
                  }}
                  height={isMobile ? 50 : 55}
                  padding={{ left: 5, right: 5 }}
                  interval={0}
                  tickFormatter={(value) => value || ''}
                  tickMargin={10}
                  minTickGap={2}
                  allowDataOverflow={false}
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
                    : `$${formatPrice(value)}`
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
        )}
      </div>
    </div>
  );
};
