import { Asset } from "@/model/Asset";
import fetchWithCache, { basicFetch } from "../app/api/fetchFunctions";

export const alpacaTradingService = {

  baseURL: process.env.BASE_API_URL,



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

  async getAssets() : Promise<Asset[]>  {
    return await fetchWithCache(`${this.baseURL}/api/AlpacaTest/assets`, 360);
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