export type HttpResponse<T> = {
  data: T;
  cookies?: string[];
  // You can add other properties here if needed, like status, headers, etc.
};

export type HttpClient = {
  get: <T>(url: string, params?: object) => Promise<HttpResponse<T>>;
  post: <T>(url: string, data: object) => Promise<HttpResponse<T>>;
  put: <T>(url: string, data: object) => Promise<HttpResponse<T>>;
  delete: <T>(url: string) => Promise<HttpResponse<T>>;
};

export type CreateHttpClient = (baseURL: string, token?: string) => HttpClient;

// Export everything from this file
export * from './http';