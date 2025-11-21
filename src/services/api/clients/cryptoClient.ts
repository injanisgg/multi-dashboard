import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

export interface ApiError {
    message: string;
    status?: number;
    data? : any;
    code?: string
}

interface CryptoApiConfig {
    baseUrl: string;
    timeout: number;
}

const getApiConfig = (): CryptoApiConfig => {
    const baseUrl = import.meta.env.VITE_COINGECKO_API;
}