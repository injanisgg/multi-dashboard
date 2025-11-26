import { useState, useEffect, useCallback } from "react";
import { cryptoApi } from "../api/clients/cryptoApi";
import type {
    CryptoMarket,
    CryptoChartData,
    CryptoMarketsParams,
    CryptoMarketChartParams
} from '../api/types/crypto.ts';

export function useCryptoMarkets(params?: CryptoMarketsParams) {
    const [data, setData] = useState<CryptoMarket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const markets = await cryptoApi.getMarkets(params);
            setData(markets);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        } finally {
            setIsLoading(false);
        }
    }, [
        params?.vs_currency,
        params?.order,
        params?.per_page,
        params?.page
    ]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return{ data, isLoading, error, refetch: fetchData };
}

export function useCryptoChart(coinID: string, params: CryptoMarketChartParams) {
    const [data, setData] = useState<CryptoChartData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if(!coinID) return;

        try {
            setIsLoading(true);
            setError(null);

            const chartData = await cryptoApi.getMarketChart(coinID, params);

            const formatted: CryptoChartData[] = chartData.prices.map(
                ([timeStamp, price], i) => ({
                    date: new Date(timeStamp).toLocaleDateString('id-ID', {
                        month: 'short',
                        day: 'numeric'
                    }),
                    price,
                    marketCap: chartData.market_caps[i][1],
                    volume: chartData.total_volumes[i][1]
                })
            );

            setData(formatted);

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        } finally {
            setIsLoading(false);
        }
    }, [coinID, params.days, params.vs_currency]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}
