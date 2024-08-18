import fetchWithCache, { basicFetch , basicPost} from "../app/api/fetchFunctions";

export const alpacaClientService = {

  async toggleAssetSelection(symbol: string) {
    try {
      const url = `/api/alpaca/assets`;
      const res = await basicPost<string>(url, { 'symbol' : symbol });


    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  },


};