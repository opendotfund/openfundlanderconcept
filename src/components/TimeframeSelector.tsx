
import React from 'react';
import { Button } from '@/components/ui/button';

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
  
  return (
    <div className="flex space-x-1">
      {timeframes.map((tf) => (
        <Button
          key={tf.value}
          variant={timeframe === tf.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(tf.value)}
          className={timeframe === tf.value ? 
            'bg-openfund-green text-openfund-gray-dark hover:bg-openfund-green-dark' : 
            'text-gray-300 hover:text-white'
          }
        >
          {tf.label}
        </Button>
      ))}
    </div>
  );
};
