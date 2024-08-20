export interface HttpResponse<T> {
  data: T;
  // You can add other properties here if needed, like status, headers, etc.
}

export interface HttpClient {
  get<T>(url: string, params?: object): Promise<HttpResponse<T>>;
  post<T>(url: string, data: object): Promise<HttpResponse<T>>;
  put<T>(url: string, data: object): Promise<HttpResponse<T>>;
  delete<T>(url: string): Promise<HttpResponse<T>>;
}