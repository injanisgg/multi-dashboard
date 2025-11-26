interface ImportMetaEnv {
    readonly VITE_COINGECKO_API: string;
    readonly VITE_OPENWEATHER_API: string;
    readonly VITE_OPENWEATHER_KEY: string;
    readonly VITE_DUMMYJSON_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}