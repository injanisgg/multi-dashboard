export const API_CONFIG = {
    COINGECKO: {
        BASE_URL: import.meta.env.VITE_COINGECKO_API,
    },

    OPENWEATHER: {
        BASE_URL: import.meta.env.VITE_OPENWEATHER_API,
        API_KEY: import.meta.env.VITE_OPENWEATHER_KEY,
    },

    DUMMYJSON: {
        BASE_URL: import.meta.env.VITE_DUMMYJSON_API,
    },
} as const;

export const REQUEST_TIMEOUT = 10000;

export const CACHE_CONFIG = {
  CRYPTO_DATA: 60000, 
  WEATHER_DATA: 300000,
  PRODUCTS_DATA: 600000,
} as const;