import fetchWithCache, { basicFetch , basicPost} from "../app/lib/fetchFunctions";

export const UserSettingsService = {

  baseURL: process.env.ALPACA_API_URL,

  async storeAlpacaAccessData(symbol: string) {
    try {
      const url = `/usersettings`;
      const res = await basicPost<string>(url, { 'symbol' : symbol });


    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  },


};