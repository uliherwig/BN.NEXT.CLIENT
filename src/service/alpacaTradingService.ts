import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.ALPACA_API_URL, // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const alpacaTradingService = {
    async getAccount() {
        try {
          const response = await apiClient.get('/AlpacaTrading/account');
          return response.data;
        } catch (error) {
          console.error('Error fetching account:', error);
          throw error;
        }
      },
    
      async getAssets() {
        try {
          const response = await apiClient.get('/AlpacaTrading/assets');
          return response.data;
        } catch (error) {
          console.error('Error fetching assets:', error);
          throw error;
        }
      },
    
      async getAsset(symbol: string) {
        try {
          const response = await apiClient.get(`/AlpacaTrading/asset/${symbol}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching asset:', error);
          throw error;
        }
      },
    
      async createOrder(quantity: number, isBuy: boolean, isMarket: boolean, timeInForceString: string, requestBody: any) {
        try {
          const response = await apiClient.post('/AlpacaTrading/order', requestBody, {
            params: { quantity, isBuy, isMarket, timeInForceString },
          });
          return response.data;
        } catch (error) {
          console.error('Error creating order:', error);
          throw error;
        }
      },
    
      async getOrders() {
        try {
          const response = await apiClient.get('/AlpacaTrading/orders');
          return response.data;
        } catch (error) {
          console.error('Error fetching orders:', error);
          throw error;
        }
      },
    
      async getOrder(orderId: string) {
        try {
          const response = await apiClient.get(`/AlpacaTrading/order/${orderId}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching order:', error);
          throw error;
        }
      },
    
      async deleteOrder(orderId: string) {
        try {
          const response = await apiClient.delete(`/AlpacaTrading/order/${orderId}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting order:', error);
          throw error;
        }
      },
    
      async getPositions() {
        try {
          const response = await apiClient.get('/AlpacaTrading/positions');
          return response.data;
        } catch (error) {
          console.error('Error fetching positions:', error);
          throw error;
        }
      },
    
      async getPosition(symbol: string) {
        try {
          const response = await apiClient.get(`/AlpacaTrading/position/${symbol}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching position:', error);
          throw error;
        }
      },
    
      async deletePosition(symbol: string) {
        try {
          const response = await apiClient.delete(`/AlpacaTrading/position/${symbol}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting position:', error);
          throw error;
        }
      },
};