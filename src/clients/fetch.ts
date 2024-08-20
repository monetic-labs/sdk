import { CreateHttpClient, HttpClient } from './http';


export const createFetchClient: CreateHttpClient = (baseURL, token) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const request = async <T>(url: string, options: RequestInit): Promise<T> => {
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const client: HttpClient = {
    get: async <T>(url: string, params?: object): Promise<T> => {
      const queryString = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return request<T>(`${url}${queryString}`, { method: 'GET' });
    },

    post: async <T>(url: string, data: object): Promise<T> => {
      return request<T>(url, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    put: async <T>(url: string, data: object): Promise<T> => {
      return request<T>(url, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async <T>(url: string): Promise<T> => {
      return request<T>(url, { method: 'DELETE' });
    },
  };

  return client;
};