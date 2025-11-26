import axios from "axios";
import { API_CONFIG, REQUEST_TIMEOUT } from "../config";

import type {
  CryptoMarket,
  CryptoMarketChart,
  CryptoMarketsParams,
  CryptoMarketChartParams,
  GlobalResponse,
  CryptoDetail,
  SearchResponse
} from "../types/crypto";

// AXIOS INSTANCE
const client = axios.create({
  baseURL: API_CONFIG.COINGECKO.BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// GLOBAL ERROR HANDLER
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      const status = err.response.status;

      if (status === 429) throw new Error("Too many requests. Try again later.");
      if (status === 500) throw new Error("Internal server error. Try again later.");

      throw new Error(err.response.data?.message || "Request failed");
    }

    if (err.request) {
      throw new Error("Network error. Check your connection.");
    }

    throw new Error(err.message || "Unexpected error");
  }
);

// API FUNCTION
export const cryptoApi = {
  // GET /coins/markets
  getMarkets: async (params: CryptoMarketsParams = {}) => {
    const defaultParams: CryptoMarketsParams = {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: false,
      ...params,
    };

    const res = await client.get<CryptoMarket[]>("/coins/markets", {
      params: defaultParams,
    });

    return res.data;
  },

  // GET /coins/{id}/market_chart
  getMarketChart: async (id: string, params: CryptoMarketChartParams) => {
    const res = await client.get<CryptoMarketChart>(`/coins/${id}/market_chart`, {
      params,
    });
    return res.data;
  },

  // GET /global
  getGlobalData: async () => {
    const res = await client.get<GlobalResponse>("/global");
    return res.data;
  },

  // GET /coin/{id}
  getCoinDetail: async (id: string) => {
    const res = await client.get<CryptoDetail>(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
      },
    });

    return res.data;
  },

  // GET /search
  searchCoins: async (query: string) => {
    const res = await client.get<SearchResponse>("/search", {
      params: { query },
    });

    return res.data;
  },
} as const;