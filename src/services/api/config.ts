export const API_CONFIG = {
    COINGECKO: {
        BASE_URL: import.meta.env.VITE_COINGECKO_API,
    },

    openWeather: {
        BASE_URL: import.meta.env.VITE_OPENWEATHER_API,
        API_KEY: import.meta.env.VITE_OPENWEATHER_KEY,
    },

    dummyJson: {
        BASE_URL: import.meta.env.VITE_DUMMYJSON_API,
    },
} as const;

export const REQUEST_TIMEOUT = 10000;

export const CACHE_CONFIG = {
  cryptoTTL: 60000, 
  weatherTTL: 300000,
  productsTTL: 600000,
} as const;