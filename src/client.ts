import { createAxiosClient } from '@/clients/axios';
import { createFetchClient } from '@/clients/fetch';
import { HttpClient } from '@/clients/http';

export type ClientType = 'axios' | 'fetch';

function handleCookies(cookies?: string[]) {
  if (cookies && cookies.length > 0) {
    // Store cookies or handle them as needed
    // For browser environments, you might want to use document.cookie
    // For Node.js environments, you might want to store them in memory or a cookie jar
    console.log('Received cookies:', cookies);
  }
}

export function createPylonApiClient(baseURL: string, token?: string, clientType: ClientType = 'fetch'): PylonApiClient {
  const client: HttpClient = clientType === 'fetch'
    ? createFetchClient(baseURL, token)
    : createAxiosClient(baseURL, token);

  return {
    get: async <T>(url: string, params?: object): Promise<T> => {
      const response = await client.get<T>(url, { params });
      handleCookies(response.cookies);
      return response.data;
    },

    post: async <T>(url: string, data: object): Promise<T> => {
      const response = await client.post<T>(url, data);
      handleCookies(response.cookies);
      return response.data;
    },

    put: async <T>(url: string, data: object): Promise<T> => {
      const response = await client.put<T>(url, data);
      handleCookies(response.cookies);
      return response.data;
    },

    delete: async <T>(url: string): Promise<T> => {
      const response = await client.delete<T>(url);
      handleCookies(response.cookies);
      return response.data;
    }
  };
}

export type PylonApiClient = {
  get: <T>(url: string, params?: object) => Promise<T>;
  post: <T>(url: string, data: object) => Promise<T>;
  put: <T>(url: string, data: object) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
};