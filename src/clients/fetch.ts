import { HttpClient } from './http';

export class FetchClient implements HttpClient {
  private baseURL: string;
  private headers: HeadersInit;

  constructor(baseURL: string, token?: string) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: { ...this.headers, ...options.headers },
      next: { revalidate: 60 }, // Enable revalidation every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(url: string, params?: object): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
    return this.request<T>(`${url}${queryString}`, { method: 'GET' });
  }

  async post<T>(url: string, data: object): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(url: string, data: object): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, { method: 'DELETE' });
  }
}