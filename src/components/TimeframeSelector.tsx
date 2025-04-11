
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface TimeframeSelectorProps {
  timeframe: string;
  onChange: (timeframe: string) => void;
}

export const TimeframeSelector = ({ timeframe, onChange }: TimeframeSelectorProps) => {
  const timeframes = [
    { value: '1h', label: '1H' },
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '90d', label: '90D' },
    { value: '1y', label: '1Y' },
  ];
  
  const isMobile = useIsMobile();
  
  return (
    <div className="flex space-x-1">
      {timeframes.map((tf) => (
        <Button
          key={tf.value}
          variant={timeframe === tf.value ? 'default' : 'outline'}
          size={isMobile ? "sm" : "sm"}
          onClick={() => onChange(tf.value)}
          className={`${timeframe === tf.value ? 
            'dark:bg-openfund-green dark:text-openfund-gray-dark bg-openfund-blue text-white hover:bg-openfund-blue-dark dark:hover:bg-openfund-green-dark' : 
            'text-gray-500 dark:text-gray-300 hover:text-foreground dark:hover:text-white'
          } ${isMobile ? 'px-2 py-0.5 h-7 text-xs' : ''}`}
        >
          {tf.label}
        </Button>
      ))}
    </div>
  );
};
