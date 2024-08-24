import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateHttpClient, HttpClient, HttpResponse } from './http';

export const createAxiosClient: CreateHttpClient = (baseURL, token) => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const handleResponse = <T>(response: AxiosResponse<T>): HttpResponse<T> => {
    return {
      data: response.data,
      cookies: response.headers['set-cookie'],
    };
  };

  const client: HttpClient = {
    get: async <T>(url: string, params?: object): Promise<HttpResponse<T>> => {
      const response = await axiosInstance.get<T>(url, { params });
      return handleResponse(response);
    },

    post: async <T>(url: string, data: object): Promise<HttpResponse<T>> => {
      const response = await axiosInstance.post<T>(url, data);
      return handleResponse(response);
    },

    put: async <T>(url: string, data: object): Promise<HttpResponse<T>> => {
      const response = await axiosInstance.put<T>(url, data);
      return handleResponse(response);
    },

    delete: async <T>(url: string): Promise<HttpResponse<T>> => {
      const response = await axiosInstance.delete<T>(url);
      return handleResponse(response);
    },
  };

  return client;
};