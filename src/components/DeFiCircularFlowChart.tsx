
import React from 'react';
import { Chart, PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const DeFiCircularFlowChart = () => {
  // Data for the circular flow chart
  const data = [
    { name: 'Investor Deposits', value: 30, color: '#3b82f6' },
    { name: 'Fund Management', value: 20, color: '#10b981' },
    { name: 'Trading & Investment', value: 30, color: '#6366f1' },
    { name: 'Returns Distribution', value: 20, color: '#f59e0b' }
  ];

  // Process steps to explain the cycle
  const steps = [
    {
      title: "Investor Deposits",
      description: "Investors deposit assets and receive fund tokens representing their share of the pool."
    },
    {
      title: "Fund Management",
      description: "Fund managers allocate capital according to the fund's investment strategy."
    },
    {
      title: "Trading & Investment",
      description: "Assets are strategically traded across markets and deployed in DeFi protocols."
    },
    {
      title: "Returns Distribution",
      description: "Profits are distributed to token holders proportional to their ownership."
    }
  ];

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Chart Section */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--foreground)'
                }}
              />
              <Legend 
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Description Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">The DeFi Fund Cycle</h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div 
                  className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                  style={{ backgroundColor: data[index].color }}
                >
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            This cycle continues as the fund actively manages assets to generate returns for investors.
          </p>
        </div>
      </div>
    </div>
  );
};
