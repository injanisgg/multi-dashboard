// market list (GET /coin/market)
export interface CryptoMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  atl: number;
  atl_change_percentage: number;
  last_updated: string;
}

// chart data (GET /coins/{id}/market_chart)
export interface CryptoMarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface CryptoMarketChartParams {
  vs_currency: string;
  days: number | "max";
  interval?: "daily" | "hourly";
}

// market param (GET /coin/market)
export interface CryptoMarketsParams {
  vs_currency?: string;
  ids?: string;
  order?: "market_cap_desc" | "market_cap_asc" | "volume_desc" | "volume_asc";
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
}

// global market data (GET /global)
export interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;

  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;

  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export interface GlobalResponse {
  data: GlobalData;
}

// crypto detail (GET /coin/{id})
export interface CryptoDetail {
  id: string;
  symbol: string;
  name: string;

  description: {
    en: string;
  };

  image: {
    thumb: string;
    small: string;
    large: string;
  };

  market_data: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;

    high_24h: Record<string, number>;
    low_24h: Record<string, number>;

    price_change_24h: number;
    price_change_percentage_24h: number;
  };

  genesis_date: string | null;
  last_updated: string;
}

// chart data from (GET /coin/{id}/market_charts)
export interface CryptoChartData {
  date: string;
  price: number;
  marketCap?: number;
  volume?: number;
}

// search (GET /search)
export interface CryptoSearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
}

export interface SearchResponse {
  coins: CryptoSearchResult[];
}

// utility 
export type HistoricalDataPoint = [number, number];

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}