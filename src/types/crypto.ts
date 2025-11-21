// crypto currency market data
export interface CryptoMarket {
    id: string,
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
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: {
        times: number;
        currency: string;
        percentage: number;
    } | null;
    last_update: string;
    sparkline_in_7d?: {
        price: number[];
    };
}

// chart/history data 
export interface CryptoMarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

// global currency data
export interface GlobalData {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: {
        [key: string]: number;
    };
    total_volume: {
        [key: string]: number;
    };
    market_cap_percentage: {
        [key: string]: number;
    };
    market_cap_change_percentage_24h_usd: number;
    update_at: number;
}

// global
export interface GlobalResponse {
    data: GlobalData;
}

export interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: {
    [key: string]: number; 
  };
  total_volume: {
    [key: string]: number;
  };
  market_cap_percentage: {
    [key: string]: number; 
  };
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

// response global
export interface GlobalResponse {
  data: GlobalData;
}

// crypto detail
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
    current_price: {
      [key: string]: number;
    };
    market_cap: {
      [key: string]: number;
    };
    total_volume: {
      [key: string]: number;
    };
    high_24h: {
      [key: string]: number;
    };
    low_24h: {
      [key: string]: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1y: number;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
  };
}

// result
export interface CryptoSearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
}

// response result 
export interface SearchResponse {
  coins: CryptoSearchResult[];
}

// type historical data point format [timestamp, price]
export type HistoricalDataPoint = [number, number];

// options pada getMarkets
export interface MarketOptions {
  order?: 'market_cap_desc' | 'market_cap_asc' | 'volume_desc' | 'volume_asc';
  perPage?: number;
  page?: number;
  sparkline?: boolean;
}

// Interface untuk custom error dari API
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

// API Request Parameters
export interface CryptoMarketsParams {
  vs_currency?: string;
  ids?: string;
  order?: 'market_cap_desc' | 'market_cap_asc' | 'volume_desc' | 'volume_asc';
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
}

export interface CryptoMarketChartParams {
  vs_currency: string;
  days: number | 'max';
  interval?: 'daily' | 'hourly';
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}