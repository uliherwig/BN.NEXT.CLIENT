import { BnOhlc } from '@/model/BnOhlc';
import fs from 'fs';
import path from 'path';

export const alpacaDataService = {

    baseURL: process.env.BASE_API_URL,

    async getHistoricalBars(symbol: string, startDate?: string, endDate?: string, timeframe?: string): Promise<BnOhlc[]> {

        // const res = await fetch(`${this.baseURL}/AlpacaData/historicalBars/${symbol}?startDate=${startDate}&endDate=${endDate}`)  

        const filePath = path.join(process.cwd(), '/public/assets/alpaca-bars.json');
        const jsonData = await fs.readFileSync(filePath, 'utf-8');

        const bars = JSON.parse(jsonData);


        const data: BnOhlc[] = bars.bars.SPY

        return data;
    },

    async getLatestBar(symbol: string): Promise<BnOhlc> {

        const res = await fetch(`${this.baseURL}/AlpacaData/latestBar/${symbol}`)

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        const data: BnOhlc = await res.json()

        return data;

    },

    async getTrades(symbol: string, startDate?: string, endDate?: string) {
        try {
            // const response = await apiClient.get(`/AlpacaData/trades/${symbol}`, {
            //     params: { startDate, endDate },
            // });
            // return response.data;
        } catch (error) {
            console.error('Error fetching trades:', error);
            throw error;
        }
    },

    async getQuotes(symbol: string, startDate?: string, endDate?: string) {
        try {
            // const response = await apiClient.get(`/AlpacaData/quotes/${symbol}`, {
            //     params: { startDate, endDate },
            // });
            // return response.data;
        } catch (error) {
            console.error('Error fetching quotes:', error);
            throw error;
        }
    },
};