import { AlpacaAsset } from "@/models/AlpacaAsset";
import fetchWithCache, { basicFetch, basicPost } from "../app/api/fetchFunctions";
import Cookies from 'js-cookie';

export const alpacaTradingService = {

  baseURL: process.env.ALPACA_API_URL,



  async getAccount() {
    try {
      const res = await fetch(`${this.baseURL}/AlpacaTrading/account`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()

    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  },

  async getAssets(): Promise<AlpacaAsset[]> {
    return await fetchWithCache(`${this.baseURL}/AlpacaTrading/assets`);
  },

  async toggleAssetSelection(symbol: string) {

    var selectedAssets: string[] = Cookies.get('asset-selection')?.split(',') || [];

    if (!selectedAssets.includes(symbol)) {
      selectedAssets = [...selectedAssets, symbol];
      Cookies.set('asset-selection', selectedAssets.join(','));
    } ;

    return selectedAssets;
  },

  async getAsset(symbol: string) {
    try {

      const res = await fetch(`${this.baseURL}/AlpacaTrading/asset/${symbol}`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()
    } catch (error) {
      console.error('Error fetching asset:', error);
      throw error;
    }
  },

  async createOrder(quantity: number, isBuy: boolean, isMarket: boolean, timeInForceString: string, requestBody: any) {
    try {
      // const response = await apiClient.post('/AlpacaTrading/order', requestBody, {
      //   params: { quantity, isBuy, isMarket, timeInForceString },
      // });
      //return response.data;
      const res = await fetch(`${this.baseURL}/AlpacaTrading/account`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getOrders() {
    try {
      // const response = await apiClient.get('/AlpacaTrading/orders');
      // return response.data;
      const res = await fetch(`${this.baseURL}/AlpacaTrading/account`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async getOrder(orderId: string) {
    try {
      // const response = await apiClient.get(`/AlpacaTrading/order/${orderId}`);
      // return response.data;
      const res = await fetch(`${this.baseURL}/AlpacaTrading/account`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  async deleteOrder(orderId: string) {
    try {
      // const response = await apiClient.delete(`/AlpacaTrading/order/${orderId}`);
      // return response.data;
      const res = await fetch(`${this.baseURL}/AlpacaTrading/account`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  async getPositions() {
    try {
      // const response = await apiClient.get('/AlpacaTrading/positions');
      // return response.data;
      const res = await fetch(`${this.baseURL}/AlpacaTrading/account`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw error;
    }
  },

  async getPosition(symbol: string) {
    try {
      // const response = await apiClient.get(`/AlpacaTrading/position/${symbol}`);
      // return response.data;
      const res = await fetch(`${this.baseURL}/AlpacaTrading/account`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()
    } catch (error) {
      console.error('Error fetching position:', error);
      throw error;
    }
  },

  async deletePosition(symbol: string) {
    try {
      // const response = await apiClient.delete(`/AlpacaTrading/position/${symbol}`);
      // return response.data;
      const res = await fetch(`${this.baseURL}/AlpacaTrading/account`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return await res.json()
    } catch (error) {
      console.error('Error deleting position:', error);
      throw error;
    }
  },
};