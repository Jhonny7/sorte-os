import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface TokenProvider {
  getToken(): Promise<string | null>;
  refreshToken(): Promise<string | null>;
}

export class HttpService {
  private basePath: string;
  private tokenProvider?: TokenProvider;
  private isBearer?: boolean;
  private returnFullResponse: boolean;

  constructor(
    basePath: string,
    tokenProvider?: TokenProvider,
    isBearer?: boolean,
    returnFullResponse: boolean = false 
  ) {
    this.basePath = basePath;
    this.tokenProvider = tokenProvider;
    this.isBearer = isBearer;
    this.returnFullResponse = returnFullResponse;
  }

  private async createHeaders(headers: any = {}): Promise<any> {
    let finalHeaders = { ...headers };

    if (this.tokenProvider) {
      const token = await this.tokenProvider.getToken();
      if (token) {
        finalHeaders["Authorization"] = this.isBearer
          ? `Bearer ${token}`
          : token;
      }
    }

    return finalHeaders;
  }

  private async requestWithRetry(
    method: "get" | "post" | "put" | "delete",
    path: string,
    data: any = {},
    headers: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<any> {
    try {
      const finalHeaders = await this.createHeaders(headers);
      let response: AxiosResponse = await axios({
        method,
        url: `${path.includes("http") ? '' : this.basePath}${path}`,
        data,
        headers: finalHeaders,
        ...config,
      });

      return this.returnFullResponse ? response : response.data;
    } catch (err: any) {
      if (err.response && err.response.status === 401 && this.tokenProvider) {
        console.warn("401 detected, refreshing token...");
        await this.tokenProvider.refreshToken();

        try {
          const finalHeadersRetry = await this.createHeaders(headers);
          const retryResponse: AxiosResponse = await axios({
            method,
            url: `${path.includes("http") ? '' : this.basePath}${path}`,
            data,
            headers: finalHeadersRetry,
            ...config,
          });

          return this.returnFullResponse ? retryResponse : retryResponse.data;
        } catch (retryErr: any) {
          return retryErr?.response ?? retryErr;
        }
      }

      return err?.response?.data ?? {};
    }
  }

  get(path: string, headers: any = {}, config: AxiosRequestConfig = {}) {
    return this.requestWithRetry("get", path, {}, headers, config);
  }

  post(path: string, data: any = {}, headers: any = {}, config: AxiosRequestConfig = {}) {
    return this.requestWithRetry("post", path, data, headers, config);
  }

  put(path: string, data: any = {}, headers: any = {}, config: AxiosRequestConfig = {}) {
    return this.requestWithRetry("put", path, data, headers, config);
  }

  delete(path: string, headers: any = {}, config: AxiosRequestConfig = {}) {
    return this.requestWithRetry("delete", path, {}, headers, config);
  }
}
