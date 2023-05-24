//4个拦截器

import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface XXRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
//AxiosRequestConfigs是基本的配置信息

//XXRequestConfig是对AxiosRequestConfig进行扩展
export interface XXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XXRequestInterceptors<T>;
  showLoading?: boolean;
  isParams?: boolean;
}
