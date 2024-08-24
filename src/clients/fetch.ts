import { CreateHttpClient, HttpClient, HttpResponse } from './http';


export const createFetchClient: CreateHttpClient = (baseURL, token) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const request = async <T>(url: string, options: RequestInit): Promise<HttpResponse<T>> => {
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers: { ...headers, ...options.headers },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    const cookies = response.headers.get('Set-Cookie');

    return { 
      data, 
      cookies: cookies ? cookies.split(',') : undefined 
    };
  };

  const client: HttpClient = {
    get: async <T>(url: string, params?: object): Promise<HttpResponse<T>> => {
      const queryString = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
      return request<T>(`${url}${queryString}`, { method: 'GET' });
    },

    post: async <T>(url: string, data: object): Promise<HttpResponse<T>> => {
      return request<T>(url, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    put: async <T>(url: string, data: object): Promise<HttpResponse<T>> => {
      return request<T>(url, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async <T>(url: string): Promise<HttpResponse<T>> => {
      return request<T>(url, { method: 'DELETE' });
    },
  };

  return client;
};