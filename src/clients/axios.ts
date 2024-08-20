import axios, { AxiosInstance } from 'axios';
import { CreateHttpClient, HttpClient } from './http';

export const createAxiosClient: CreateHttpClient = (baseURL, token) => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const client: HttpClient = {
    get: async <T>(url: string, params?: object): Promise<T> => {
      const response = await axiosInstance.get<T>(url, { params });
      return response.data;
    },

    post: async <T>(url: string, data: object): Promise<T> => {
      const response = await axiosInstance.post<T>(url, data);
      return response.data;
    },

    put: async <T>(url: string, data: object): Promise<T> => {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    },

    delete: async <T>(url: string): Promise<T> => {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    },
  };

  return client;
};