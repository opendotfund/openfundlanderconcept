
import React from 'react';
import { ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { User, Briefcase, LineChart, PiggyBank } from 'lucide-react';

export const DeFiFlowChart = () => {
  return (
    <div className="w-full">
      <div className="w-full max-w-3xl mx-auto overflow-hidden">
        <div className="flow-chart space-y-6 py-4">
          {/* Step 1: Investor Deposits */}
          <div className="flow-step flex items-center">
            <div className="flow-icon bg-primary/10 text-primary p-3 rounded-full">
              <User className="h-6 w-6" />
            </div>
            <div className="flow-arrow h-0.5 w-12 bg-border"></div>
            <div className="flow-text flex-1 bg-card border border-border p-4 rounded-lg">
              <h3 className="text-base font-semibold">1. Investor Deposits</h3>
              <p className="text-sm text-muted-foreground">Investors deposit cryptocurrency into the DeFi fund smart contract.</p>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="h-6 w-0.5 bg-border"></div>
            <div className="h-2 w-2 border-b border-r border-border transform rotate-45 relative -top-1"></div>
          </div>
          
          {/* Step 2: Fund Manager */}
          <div className="flow-step flex items-center">
            <div className="flow-icon bg-primary/10 text-primary p-3 rounded-full">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="flow-arrow h-0.5 w-12 bg-border"></div>
            <div className="flow-text flex-1 bg-card border border-border p-4 rounded-lg">
              <h3 className="text-base font-semibold">2. Fund Manager Allocation</h3>
              <p className="text-sm text-muted-foreground">The fund manager allocates pooled capital across various assets according to the fund's strategy.</p>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="h-6 w-0.5 bg-border"></div>
            <div className="h-2 w-2 border-b border-r border-border transform rotate-45 relative -top-1"></div>
          </div>
          
          {/* Step 3: Market Trading */}
          <div className="flow-step flex items-center">
            <div className="flow-icon bg-primary/10 text-primary p-3 rounded-full">
              <LineChart className="h-6 w-6" />
            </div>
            <div className="flow-arrow h-0.5 w-12 bg-border"></div>
            <div className="flow-text flex-1 bg-card border border-border p-4 rounded-lg">
              <h3 className="text-base font-semibold">3. Trading & Investment</h3>
              <p className="text-sm text-muted-foreground">Assets are traded on exchanges and deployed in DeFi protocols to generate returns.</p>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="h-6 w-0.5 bg-border"></div>
            <div className="h-2 w-2 border-b border-r border-border transform rotate-45 relative -top-1"></div>
          </div>
          
          {/* Step 4: Profit Distribution */}
          <div className="flow-step flex items-center">
            <div className="flow-icon bg-primary/10 text-primary p-3 rounded-full">
              <PiggyBank className="h-6 w-6" />
            </div>
            <div className="flow-arrow h-0.5 w-12 bg-border"></div>
            <div className="flow-text flex-1 bg-card border border-border p-4 rounded-lg">
              <h3 className="text-base font-semibold">4. Returns Distribution</h3>
              <p className="text-sm text-muted-foreground">Profits are automatically distributed according to ownership percentage. Management fees are paid to the fund manager.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          All transactions are recorded on-chain, ensuring complete transparency and verifiability
        </div>
      </div>
    </div>
  );
};
