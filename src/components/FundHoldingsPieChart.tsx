import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

// Define the types of data we'll be working with
interface HoldingItem {
  name: string;
  value: number;
  color: string;
}

interface FundHoldingsPieChartProps {
  holdings: HoldingItem[];
  title?: string;
  className?: string;
  isDeFiFund?: boolean;
}

export const FundHoldingsPieChart: React.FC<FundHoldingsPieChartProps> = ({
  holdings,
  title = "Holdings Breakdown",
  className,
  isDeFiFund = false
}) => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  
  if (!holdings || holdings.length === 0) {
    return (
      <Card className={cn("bg-card border-card", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No holdings data available</p>
        </CardContent>
      </Card>
    );
  }

  // Enhanced colors based on theme and fund type
  const enhancedHoldings = useMemo(() => {
    return holdings.map(item => {
      let enhancedColor = item.color;
      
      if (isDeFiFund) {
        // DeFi fund color scheme
        if (isLightMode) {
          // Blue variants in light mode
          if (item.name === "Major Coins") {
            enhancedColor = "#0ea5e9"; // Sky blue
          } else if (item.name === "Alt Coins") {
            enhancedColor = "#3b82f6"; // Medium blue
          } else if (item.name === "Meme Coins") {
            enhancedColor = "#2563eb"; // Dark blue
          }
        } else {
          // Green variants in dark mode
          if (item.name === "Major Coins") {
            enhancedColor = "#10b981"; // Bright green
          } else if (item.name === "Alt Coins") {
            enhancedColor = "#059669"; // Medium green
          } else if (item.name === "Meme Coins") {
            enhancedColor = "#047857"; // Dark green
          }
        }
      } else {
        // Other funds - keep the original enhanced colors
        if (item.name === "Major Coins") {
          enhancedColor = "#3b82f6"; // Bright blue for major coins
        } else if (item.name === "Alt Coins") {
          enhancedColor = "#8b5cf6"; // Vibrant purple for alt coins
        } else if (item.name === "Meme Coins") {
          enhancedColor = "#f97316"; // Strong orange for meme coins
        }
      }
      
      return {
        ...item,
        color: enhancedColor
      };
    });
  }, [holdings, isDeFiFund, isLightMode]);

  const config = enhancedHoldings.reduce((acc, item) => {
    acc[item.name] = { 
      label: item.name,
      color: item.color
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  // Adjust pie chart height for DeFi funds
  const chartHeight = isDeFiFund ? "400px" : "300px";

  return (
    <Card className={cn("bg-card border-card", className, {
      "col-span-full": isDeFiFund // Make the chart take full width if it's a DeFi fund
    })}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`h-[${chartHeight}] w-full relative`} style={{ height: chartHeight }}>
          <ChartContainer config={config} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={enhancedHoldings}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isDeFiFund ? 120 : 90}
                  innerRadius={isDeFiFund ? 40 : 0} // Add inner radius for 3D-like donut effect for DeFi funds
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={isDeFiFund ? 4 : 0} // Add padding between segments for 3D effect
                >
                  {enhancedHoldings.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      strokeWidth={isDeFiFund ? 4 : 2}
                      stroke={isDeFiFund ? (isLightMode ? "#ffffff" : "#121212") : undefined}  // Add strokes for 3D effect
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent 
                      active={active} 
                      payload={payload}
                      formatter={(value, name) => {
                        return (
                          <div className="flex justify-between gap-2">
                            <span className="font-medium">{name}:</span>
                            <span>{value}%</span>
                          </div>
                        );
                      }}
                    />
                  )}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  className="mt-4"
                  formatter={(value) => {
                    return <span className="text-sm font-medium">{value}</span>;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
