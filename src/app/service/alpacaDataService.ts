import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.ALPACA_API_URL, // Replace with your actual base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const alpacaDataService = {
    async getHistoricalBars(symbol: string, startDate?: string, endDate?: string) {
        try {
            const response = await apiClient.get(`/AlpacaData/historicalBars/${symbol}`, {
                params: { startDate, endDate },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching historical bars:', error);
            throw error;
        }
    },

    async getLatestBar(symbol: string) {
        try {
            const response = await apiClient.get(`/AlpacaData/latestBar/${symbol}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching latest bar:', error);
            throw error;
        }
    },

    async getTrades(symbol: string, startDate?: string, endDate?: string) {
        try {
            const response = await apiClient.get(`/AlpacaData/trades/${symbol}`, {
                params: { startDate, endDate },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching trades:', error);
            throw error;
        }
    },

    async getQuotes(symbol: string, startDate?: string, endDate?: string) {
        try {
            const response = await apiClient.get(`/AlpacaData/quotes/${symbol}`, {
                params: { startDate, endDate },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching quotes:', error);
            throw error;
        }
    },
};