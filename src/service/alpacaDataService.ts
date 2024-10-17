
import { BnOhlc } from '@/models/BnOhlc';
import { basicFetch } from '../app/lib/fetchFunctions';


export const alpacaDataService = {

  baseURL: process.env.ALPACA_API_URL,

  async getHistoricalBars(symbol: string, startDate?: string, endDate?: string, timeframe?: string) {
    console.log('baseURL:', this.baseURL);
    console.log('url: ', `${this.baseURL}/api/AlpacaTest/historicalBars/${symbol}?startDate=${startDate}&endDate=${endDate}`)

    const url = `${this.baseURL}/AlpacaData/historical-bars/${symbol}?startDate=${startDate}&endDate=${endDate}`
    http://localhost:5130/AlpacaData/historical-bars/SPY?startDate=2024-09-09&endDate=2024-09-20

    const data = await basicFetch<any[]>(url);
    console.log('data:', data[1]);
    return data;
  },

  async getLatestBar(symbol: string) {

    const res = await fetch(`${this.baseURL}/AlpacaData/latestBar/${symbol}`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return await res.json()


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