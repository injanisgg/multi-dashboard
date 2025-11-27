import { useState } from "react";
import { RefreshCw, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataCard } from "@/components/common/DataCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { CryptoMarketTable } from "@/components/charts/CryptoMarketTable";
import { CryptoPriceChart } from "@/components/charts/CryptoPriceChart";
import { useCryptoMarkets, useCryptoChart } from "@/services/hooks/useCryptoData";

export function CryptoDashboard() {
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [chartDays, setChartDays] = useState<number>(7);

    // fetch market data
    const {
        data: markets,
        isLoading: marketsLoading,
        error: marketsError,
        refetch: refetchMarkets,
    } = useCryptoMarkets({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
    });

    // fetch chart data
      const {
        data: chartData,
        isLoading: chartLoading,
        error: chartError,
        refetch: refetchChart,
    } = useCryptoChart(selectedCoin, {
        vs_currency: 'usd',
        days: chartDays,
    });

    // calculate summary statistics
    const totalMarketCap = markets.reduce((sum, coin) => sum + coin.market_cap, 0);
    const totalVolume = markets.reduce((sum, coin) => sum + coin.total_volume, 0);
    const avgPriceChange = markets.length > 0
        ? markets.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / markets.length
        : 0;

    const handleRefresh = () => {
        refetchMarkets();
        refetchChart();
    };

    const handleCoinSelect = (coinId: string) => {
        setSelectedCoin(coinId);
    };

    const selectedCoinData = markets.find(coin => coin.id === selectedCoin);

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Crypto Dashboard</h1>
                    <p className="text-muted-foreground">Real-time cryptocurrency market data powered by CoinGecko</p>
                </div>
                <Button onClick={handleRefresh} variant='outline' size='sm'>
                    <RefreshCw className="mr-2 h-4 w-4" />
                </Button>
            </div>

            {/* summary card */}
            {marketsLoading ? (
                <div className="grid gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                    ))}
                </div>
            ): marketsError ? (
                <ErrorMessage message={marketsError.message} onRetry={handleRefresh} />
            ): (
                <div className="grid gap-4 md:grid-cols-3">
                    <DataCard
                        title="Total Market Cap (Top 10)"
                        value={`$${(totalMarketCap / 1e12).toFixed(2)}T`}
                        icon={DollarSign}
                        description="Combined market capitalization"
                    />
                    <DataCard
                        title="24h Trading Volume"
                        value={`$${(totalVolume / 1e9).toFixed(2)}B`}
                        icon={BarChart3}
                        description="Total trading volume"
                    />
                    <DataCard
                        title="Average 24h Change"
                        value={`${avgPriceChange.toFixed(2)}%`}
                        icon={TrendingUp}
                        trend={{
                        value: avgPriceChange,
                        isPositive: avgPriceChange >= 0,
                        }}
                        description="Across top 10 coins"
                    />
                </div>
            )}

            {/* price chart */}
            <div>
                {chartLoading ? (
                <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
                    <LoadingSpinner size="lg" />
                </div>
                ) : chartError ? (
                <ErrorMessage message={chartError.message} onRetry={refetchChart} />
                ) : (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Time Range:</span>
                    {[1, 7, 30, 90].map((days) => (
                        <Button
                        key={days}
                        variant={chartDays === days ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartDays(days)}
                        >
                        {days === 1 ? '24H' : `${days}D`}
                        </Button>
                    ))}
                    </div>
                    <CryptoPriceChart
                    data={chartData}
                    coinName={selectedCoinData?.name || selectedCoin}
                    currency="USD"
                    />
                </div>
                )}
            </div>

            {/* market table */}
            {marketsLoading ? (
                <div className="h-96 bg-muted animate-pulse rounded-lg" />
            ) : marketsError ? (
                <ErrorMessage message={marketsError.message} onRetry={refetchMarkets} />
            ) : (
                <CryptoMarketTable data={markets} onCoinSelect={handleCoinSelect} />
            )}
        </div>
    )
}