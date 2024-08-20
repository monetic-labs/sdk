import { AxiosClient } from '@/clients/axios';
import { FetchClient } from '@/clients/fetch';
import { HttpClient } from '@/clients/http';

export type ClientType = 'axios' | 'fetch';

export class PylonApiClient {
  private client: HttpClient;

  constructor(baseURL: string, token?: string, clientType: ClientType = 'axios') {
    switch (clientType) {
      case 'fetch':
        this.client = new FetchClient(baseURL, token);
        break;
      case 'axios':
      default:
        this.client = new AxiosClient(baseURL, token);
    }
  }

async get<T>(url: string, params?: object): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data: object): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: object): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}