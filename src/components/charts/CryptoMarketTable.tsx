import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { CryptoMarket } from "@/services/api/types/crypto";

interface CryptoMarketTableProps {
    data: CryptoMarket[];
    onCoinSelect?: (coin: string) => void;
}

export function CryptoMarketTable({ data, onCoinSelect }: CryptoMarketTableProps) {
    const formatPrice = (price: number) => {
        if (price < 1) {
            return `$${price.toFixed(6)}`;
        }
        
        return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatMarketCap = (marketCap: number) => {
        if (marketCap >= 1e12) {
            return `$${(marketCap / 1e12).toFixed(2)}T`;
        }
        if (marketCap >= 1e9) {
            return `$${(marketCap / 1e9).toFixed(2)}B`;
        }
        if (marketCap >= 1e6) {
            return `$${(marketCap / 1e6).toFixed(2)}M`;
        }
            return `$${marketCap.toLocaleString()}`;
    };

    const formatPercentage = (percentage: number) => {
    const isPositive = percentage >= 0;
    return (
      <div className="flex items-center gap-1">
        {isPositive ? (
          <TrendingUp className="h-3 w-3 text-green-600" />
        ) : (
          <TrendingDown className="h-3 w-3 text-red-600" />
        )}
        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
          {isPositive ? '+' : ''}
          {percentage.toFixed(2)}%
        </span>
      </div>
    );
  };

  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Top Cryptocurrencies by Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Coin</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">24h %</TableHead>
                            <TableHead className="text-right">Market Cap</TableHead>
                            <TableHead className="text-right">Volume (24h)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((coin) => (
                            <TableRow
                             key={coin.id}
                             className={onCoinSelect ? 'cursor-pointer hover:bg-muted/50' : ''}
                             onClick={() => onCoinSelect?.(coin.id)}
                            >
                                <TableCell className="font-medium">
                                    {coin.market_cap_rank}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{coin.name}</span>
                                            <span className="text-xs text-muted-foreground uppercase">
                                            {coin.symbol}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                    {formatPrice(coin.current_price)}
                                </TableCell>
                                <TableCell className="text-right">
                                    {formatPercentage(coin.price_change_percentage_24h)}
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                    {formatMarketCap(coin.market_cap)}
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                    {formatMarketCap(coin.total_volume)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
  );
}