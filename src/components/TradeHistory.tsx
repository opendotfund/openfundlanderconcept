
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TradeHistoryProps {
  asset: string;
}

interface Trade {
  id: number;
  type: 'buy' | 'sell';
  amount: string;
  price: string;
  total: string;
  date: string;
}

// Generate mock trade history data
const generateTradeHistoryData = (asset: string): Trade[] => {
  const trades: Trade[] = [];
  const today = new Date();
  const assetPrice = asset === 'bitcoin' ? 62450 : 
                    asset === 'ethereum' ? 3042 : 
                    asset === 'apple' ? 182 : 100;
  
  // Increased to 20 trades for a longer history
  for (let i = 0; i < 20; i++) {
    const date = new Date(today);
    date.setHours(date.getHours() - i - Math.floor(Math.random() * 5));
    
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const amount = (0.1 + Math.random() * 2).toFixed(3);
    const priceVariance = assetPrice * (0.98 + Math.random() * 0.04);
    const price = priceVariance.toFixed(2);
    const total = (parseFloat(amount) * parseFloat(price)).toFixed(2);
    
    trades.push({
      id: i + 1,
      type,
      amount,
      price,
      total,
      date: date.toLocaleString()
    });
  }
  
  return trades;
};

export const TradeHistory = ({ asset }: TradeHistoryProps) => {
  const trades = generateTradeHistoryData(asset);
  const isMobile = useIsMobile();
  
  return (
    <ScrollArea className={`h-[300px] ${isMobile ? 'h-[350px]' : 'h-[480px]'}`}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className={isMobile ? "px-2 py-2" : ""}>Type</TableHead>
            <TableHead className={isMobile ? "px-2 py-2" : ""}>Amount</TableHead>
            <TableHead className={`text-right ${isMobile ? "px-2 py-2" : ""}`}>Price</TableHead>
            <TableHead className={`text-right ${isMobile ? "px-2 py-2" : ""}`}>Total</TableHead>
            <TableHead className={`text-right ${isMobile ? "px-2 py-2" : ""}`}>
              <div className="flex items-center justify-end">
                <Clock size={isMobile ? 12 : 14} className="mr-1" />
                Time
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell className={isMobile ? "px-2 py-2 text-xs" : ""}>
                <span className={`flex items-center ${trade.type === 'buy' ? 'text-openfund-green' : 'text-red-500'}`}>
                  {trade.type === 'buy' ? (
                    <TrendingUp size={isMobile ? 12 : 16} className="mr-1" />
                  ) : (
                    <TrendingDown size={isMobile ? 12 : 16} className="mr-1" />
                  )}
                  {trade.type.toUpperCase()}
                </span>
              </TableCell>
              <TableCell className={isMobile ? "px-2 py-2 text-xs" : ""}>
                {isMobile && trade.amount.length > 5 
                  ? trade.amount.substring(0, 5) 
                  : trade.amount} {asset.slice(0, 3).toUpperCase()}
              </TableCell>
              <TableCell className={`text-right ${isMobile ? "px-2 py-2 text-xs" : ""}`}>
                ${trade.price}
              </TableCell>
              <TableCell className={`text-right ${isMobile ? "px-2 py-2 text-xs" : ""}`}>
                ${trade.total}
              </TableCell>
              <TableCell className={`text-right text-gray-400 ${isMobile ? "px-2 py-2 text-xs" : "text-sm"}`}>
                {isMobile 
                  ? new Date(trade.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                  : trade.date
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
