import { AlpacaUserSettings } from "@/models/alpaca/alpaca-user-settings";
import fetchWithCache, { basicFetch , basicPost} from "../../app/lib/fetchFunctions";

export const AlpacaUserSettingsService = {

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

  async getAlpacaUserSettings(email: string) : Promise<AlpacaUserSettings> {
    try {
      const endpoint = `${process.env.ALPACA_API_URL}/usersettings/${email}`;
      const res = await basicFetch<AlpacaUserSettings>(endpoint);

      return res
   
    } catch (error) {
      throw error;
    }
  },


};