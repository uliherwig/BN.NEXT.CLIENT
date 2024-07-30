import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://localhost:5130';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with successful response data
    return response;
  },
  (error) => {
    if (Object.prototype.hasOwnProperty.call(error.config, 'errorHandle') && error.config.errorHandle === false) {
      return Promise.reject(error);
    }

    // handle errors
    if (error.response) {
      switch (error.response.status) {
        case 204:
          return Promise.reject("Keine zulässige Anfrage.");

        case 400:
          if (error.response) {

            if (error.response.data) {
              if (error.response.data.value) {
                return Promise.reject(error.response.data.value);
              }
              return Promise.reject(error.response.data);
            }
          }
          return Promise.reject("Ein unbekannter Fehler ist aufgetreten.");

        case 404:
          return Promise.reject("HTTP Error 404. URL nicht gefunden.");

        case 500:
          // if (error.response.data) {
          //     return Promise.reject(error.response.data.value);
          // }
          return Promise.reject("Bei der Verarbeitung ist ein Fehler aufgetreten. Bitte prüfen Sie, ob Ihre Änderung übernommen wurde. Wenden Sie sich gern an die Kollegen der Taskforce Abrechnung bei Rückfragen.");

        default:
          if (error.response.data) {
            return Promise.reject(error.response.data.value);
          }
          return Promise.reject("Ein unbekannter Fehler ist aufgetreten.");
      }
    } else {
      return Promise.reject(error.message);
    }
  }
);


// Define your API service functions
export const alpacaService = {

  async getAccount<AccountModel>(): Promise<AccountModel> {
    const response: AxiosResponse<AccountModel> = await apiService.get('');
    return response.data;
  }
  
};

apiService.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with successful response data
    return response;
  },
  (error) => {
    if (Object.prototype.hasOwnProperty.call(error.config, 'errorHandle') && error.config.errorHandle === false) {
      return Promise.reject(error);
    }

    // handle errors
    if (error.response) {
      switch (error.response.status) {
        case 204:
          return Promise.reject("Keine zulässige Anfrage.");

        case 400:
          if (error.response) {

            if (error.response.data) {
              if (error.response.data.value) {
                return Promise.reject(error.response.data.value);
              }
              return Promise.reject(error.response.data);
            }
          }
          return Promise.reject("Ein unbekannter Fehler ist aufgetreten.");

        case 404:
          return Promise.reject("HTTP Error 404. URL nicht gefunden.");

        case 500:
          return Promise.reject("Bei der Verarbeitung ist ein Fehler aufgetreten. Bitte prüfen Sie, ob Ihre Änderung übernommen wurde. Wenden Sie sich gern an die Kollegen der Taskforce Abrechnung bei Rückfragen.");

        default:
          if (error.response.data) {
            return Promise.reject(error.response.data.value);
          }
          return Promise.reject("Ein unbekannter Fehler ist aufgetreten.");
      }
    } else {
      return Promise.reject(error.message);
    }
  }
);
