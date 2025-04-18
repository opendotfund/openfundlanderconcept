import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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

  const enhancedHoldings = useMemo(() => {
    return holdings.map(item => {
      let enhancedColor = item.color;
      
      if (isLightMode) {
        if (item.name === "Major Coins") {
          enhancedColor = "#0ea5e9";
        } else if (item.name === "Alt Coins") {
          enhancedColor = "#3b82f6";
        } else if (item.name === "Meme Coins") {
          enhancedColor = "#2563eb";
        }
      } else {
        if (item.name === "Major Coins") {
          enhancedColor = "#10b981";
        } else if (item.name === "Alt Coins") {
          enhancedColor = "#059669";
        } else if (item.name === "Meme Coins") {
          enhancedColor = "#047857";
        }
      }
      
      return {
        ...item,
        color: enhancedColor
      };
    });
  }, [holdings, isLightMode]);

  const config = enhancedHoldings.reduce((acc, item) => {
    acc[item.name] = { 
      label: item.name,
      color: item.color
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  const chartHeight = isMobile ? "200px" : (isDeFiFund ? "380px" : "280px");
  const outerRadius = isMobile ? (isDeFiFund ? 70 : 60) : (isDeFiFund ? 120 : 90);
  const legendVerticalAlign = isMobile ? "bottom" : "bottom";
  const legendHeight = isMobile ? 60 : 80;

  return (
    <Card className={cn("bg-card border-card", className, {
      "col-span-full": isDeFiFund
    })}>
      <CardHeader className={cn(isMobile ? "p-3 pb-1" : "")}>
        <CardTitle className={cn(isMobile ? "text-base" : "")}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={cn(isMobile ? "p-2 pt-0" : "")}>
        <div className="w-full" style={{ height: chartHeight }}>
          <ChartContainer config={config} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={isMobile ? { top: 0, right: 0, bottom: legendHeight, left: 0 } : { top: 5, right: 10, left: 10, bottom: 25 }}>
                <Pie
                  data={enhancedHoldings}
                  cx="50%"
                  cy={isMobile ? "40%" : "45%"}
                  labelLine={false}
                  outerRadius={outerRadius}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {enhancedHoldings.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
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
                  verticalAlign={legendVerticalAlign}
                  height={legendHeight}
                  content={({ payload }) => (
                    <div className={cn(
                      "flex flex-wrap justify-center gap-2",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      {payload?.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center gap-1">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span>{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
